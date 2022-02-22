import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, NativeSyntheticEvent, NativeScrollEvent, Dimensions, ScrollView, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getData } from '../../helpers/cache';
import { apiUrl } from '../../helpers/environment';
import globalVars from '../../helpers/globalVars';
import { pauseAllVideos } from '../../helpers/utils';
import Post from "../post/post";
import StoryMiniature from "../../components/story/miniature";

export default function ComponentEmitFeedLocal() {
    const perPage = 3;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);

    const [focusedIndex, setFocusedIndex] = useState(0);

    var [isInit, setIsInit] = useState(true);
    useEffect(() => {
        if (isInit) {
            setIsInit(false);
            loadApi();
        }
    }, []);

    async function loadApi(isRefresh) {
        setLoading(true);
        let page_ = page;
        if(isRefresh === true){ 
            page_ = 1;
            setData([]);
        }
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/feed/posts?page=${page_}&limit=${perPage}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        let responseJson = await response.json();
        if (response.status == 200) {
            if(isRefresh === true){
                setData([...responseJson.posts.docs]);
            }else{
                setData([...data, ...responseJson.posts.docs]);
            }
            setPage(page_ + 1);
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
        <View style={{ backgroundColor: globalVars.selectedColors.background }}>
            <FlatList
                style={{ backgroundColor: globalVars.selectedColors.background }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 110 }}
                onScrollBeginDrag={() => pauseAllVideos()}
                onScroll={handleScroll}
                initialNumToRender={3}
                data={data}
                onEndReached={loadApi}
                onEndReachedThreshold={0.3}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListHeaderComponent={<HeaderComponent refresh={refreshing} />}
                ListFooterComponent={<FooterList load={loading} refresh={refreshing} />}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, index }) => <ListPost data={item} index={index} />}
            />
        </View>
    );

}

function ListPost({ data, index }) {
    let content = JSON.parse(data.content);
    return (<Post data={data}/>)
}

function FooterList({ load, refresh }) {
    if (!load) return null;
    return (
        <>
            <View style={styles.loading}>
                <ActivityIndicator size={25} color={refresh ? globalVars.selectedColors.primary : globalVars.selectedColors.text} />
            </View>
            <View style={{ backgroundColor: globalVars.selectedColors.background, height: Dimensions.get('screen').height }} />
        </>
    );
}

function HeaderComponent({ refresh }) {
    if(refresh) return null;
    return (
        <>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <StoryMiniature src={`https://bafybeidjavehhnvtolrewsmj6l6qpnvfjzklibfoym6iipwbw4wzphw44u.ipfs.dweb.link/photo.jpg`}/>
                <StoryMiniature />
                <StoryMiniature />
                <StoryMiniature />
                <StoryMiniature />
                <StoryMiniature />
                <StoryMiniature />
            </ScrollView>
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
    }
});