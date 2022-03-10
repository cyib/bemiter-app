import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, NativeSyntheticEvent, NativeScrollEvent, Dimensions, ScrollView, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getData } from '../../helpers/cache';
import { apiUrl } from '../../helpers/environment';
import globalVars from '../../helpers/globalVars';
import { pauseAllVideos } from '../../helpers/utils';
import Post from "../post/post";
import StoryMiniature from "../../components/story/miniature";
import PropTypes from 'prop-types';

export default function ComponentEmitFeedGlobal(props) {
    const perPage = 4;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [firstUpdate, setFirstUpdate] = useState(true);

    const [urlRoute, setUrlRoute] = useState(props.urlRoute ? props.urlRoute : '/feed/emits');
    const [extrasParams, setExtrasParams] = useState(props.extrasParams ? props.extrasParams : '');

    const [focusedIndex, setFocusedIndex] = useState(0);

    var [isInit, setIsInit] = useState(true);
    useEffect(() => {
        if (isInit) {
            setIsInit(false);
            loadApi();
        }
    }, []);

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    async function loadApi(isRefresh) {
        let diffLastUpdateInSeconds = (new Date() - lastUpdate) / 1000;
        
        if(diffLastUpdateInSeconds < 2 && !firstUpdate && !isRefresh) {
            await sleep(4000);
            loadApi(isRefresh);
            return null;
        }

        setLoading(true);
        let page_ = page;
        if(isRefresh === true){ 
            page_ = 1;
            setData([]);
        }

        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}${urlRoute}?page=${page_}&limit=${perPage}${extrasParams}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({ 
                emitsId: urlRoute == '/feed/emits' && !isRefresh ? data.map(post => post.id) : []
            })
        });

        let responseJson = await response.json();
        if (response.status == 200) {
            if(isRefresh === true){
                setData([... responseJson.posts.docs ? responseJson.posts.docs : responseJson.posts]);
            }else{
                setData([...data, ...responseJson.posts.docs ? responseJson.posts.docs : responseJson.posts]);
            }
            setPage(page_ + 1);
            setLastUpdate(new Date());
            setFirstUpdate(false);
            setRefreshing(false);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    const handleScroll = useCallback(({ nativeEvent: { contentOffset: { y } } }) => {
        const offset = Math.round(y / 500);
        setFocusedIndex(offset);
    }, [setFocusedIndex]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadApi(true);
    }

    return (
        <View style={{ backgroundColor: globalVars.selectedColors.background, minHeight: data.length < perPage ? Dimensions.get('screen').height -200 : undefined }}>
            <FlatList
                style={{ backgroundColor: globalVars.selectedColors.background }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 110 }}
                onScrollBeginDrag={() => pauseAllVideos()}
                onScroll={handleScroll}
                initialNumToRender={perPage}
                data={data}
                onEndReached={() => {
                    if(data.length >= perPage) loadApi()
                }}
                onEndReachedThreshold={0.1}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListFooterComponent={<FooterList load={loading} refresh={refreshing} />}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, index }) => <ListPost data={item} index={index} />}
            />
        </View>
    );

}

function ListPost({ data, index }) {
    return (<Post data={data} withoutPraiseButton={true} withoutFooter={true} 
        withGoToPost={true}
        withMaxLinesToText={3}
        withLitleLike={true} 
        withLitleHash={true}
        withShowReferencePost={true}
        litleLikeSize={25} litleLikeBottomMargin={28} profileImageSize={32}/>)
}

function FooterList({ load, refresh }) {
    if (!load) return <View style={{ backgroundColor: globalVars.selectedColors.background, height: 10 }} />;
    return (
        <>
            <View style={styles.loading}>
                <ActivityIndicator size={25} color={refresh ? globalVars.selectedColors.primary : globalVars.selectedColors.text} />
            </View>
            <View style={{ backgroundColor: globalVars.selectedColors.background, height: Dimensions.get('screen').height }} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    loading: {
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width
    }
});

ComponentEmitFeedGlobal.propTypes = {
    urlRoute: PropTypes.string
}