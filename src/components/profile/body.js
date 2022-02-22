import React, { useEffect, useState } from "react";
import { Dimensions, VirtualizedList, Image, Text, View, LogBox, FlatList, ListViewBase } from "react-native";
import { Col, Row } from "react-native-paper-grid";
import { getData } from "../../helpers/cache";
import profileThemes from "../../helpers/profileThemes";
import IconButton from "../extras/iconButton";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import widgetShape, { widgetList } from "../extras/widgetShapes";
import WidgetModal from "./widget";
import uuid from 'react-native-uuid';
import postTemplates from "../../helpers/postTemplates";
import Post from "../post/post";
import { ActivityIndicator } from "react-native-paper";
import { apiUrl } from "../../helpers/environment";
import { groupArr } from "../../helpers/utils";
import { Empty } from "../utils/Empty";

export default function ProfileBody(props) {

    var [userInfo, setUserInfo] = useState(props.userInfo ? props.userInfo : userInfoBase);
    var [colors, setColors] = useState(profileThemes[props.userInfo.theme ? props.userInfo.theme : 'default']);

    var [contents, setContents] = useState(null);
    var [reload, setReload] = useState(false);

    var [emits, setEmits] = useState([]);
    var [posts, setPosts] = useState([]);
    var [readyToShow, setReadyToShow] = useState(false);

    const maxPerRow = 2;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    var [isInit, setIsInit] = useState(true);
    useEffect(async () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (isInit) {
            setIsInit(false);
            getPosts();
        }
    }, [reload]);

    async function getPosts() {
        console.log(userInfo.id);
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/user/posts/${userInfo.id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (response.status == 200) {
            let responseJson = await response.json();
            var docs = responseJson.posts.docs;
            var emits_ = docs.filter(e => e.type == 'text');
            var posts_ = docs.filter(e => e.type == 'photo' || e.type == 'video');
            console.log(emits_.length, posts_.length);
            setEmits(emits_);
            if((posts_.length/2).toString().indexOf('.') != -1) posts_.push({ id: uuid.v4() });
            setPosts(posts_);
            setReadyToShow(true);
        }
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [readyToShow]);

    return (
        <>
            <View style={{ width: Dimensions.get('screen').width }}>
                <Row>
                    <Col>
                        <View style={{
                            backgroundColor: colors.primary, borderRadius: 5,
                            width: Dimensions.get('screen').width - 10,
                            minHeight: 200
                        }}>
                            {
                                !readyToShow ?
                                    <View style={{ paddingTop: 20 }}>
                                        <Empty colors={colors} withLoader={true} message={'Carregando publicações ...'} />
                                    </View>
                                    :
                                    <BodyContent />
                            }
                        </View>
                    </Col>
                </Row>
            </View>
        </>
    );

    function BodyContent() {
        return (
            <View>
                {
                    (!emits || emits.length == 0) && (!posts || posts.length == 0) ?
                        <View style={{ paddingTop: 20 }}>
                            <Empty colors={colors}/>
                        </View>
                        :
                        <>
                            <LastEmit />
                            <Galery />
                        </>
                }
            </View>
        )
    }

    function LastEmit() {
        return (
            <View>
                <View>
                <Row style={{ marginBottom: 3}}>
                    <Col>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 5, marginLeft: 10, marginBottom: -10 }}>
                                <MaterialCommunityIcons name={'timeline-clock-outline'} color={colors.text} size={20} />
                            </Text>
                            <Text style={{ marginTop: 7, marginLeft: 5, marginBottom: -10, color: colors.text }}>
                                Último emit
                            </Text>
                        </View>
                    </Col>
                    <Col>
                        <View style={{ flexDirection: 'row-reverse' }} onTouchEnd={() => {
                            console.log('ir para emits')
                        }}>
                            <Text style={{
                                marginTop: 7,
                                marginLeft: 5,
                                marginBottom: -20,
                                backgroundColor: colors.border,
                                padding: 2,
                                marginRight: 10,
                                paddingHorizontal: 5,
                                fontSize: 12,
                                color: colors.text
                            }}>
                                Mais emits
                            </Text>
                        </View>
                    </Col>
                </Row>
                {
                    (!emits || emits.length == 0) ?
                        <Empty colors={colors} message={'Nenhum emit encontrado'} fontSize={14} iconSize={48} iconName={'bash'} />
                        :
                        <EmitContent />
                }
                </View>
            </View>
        );

        function EmitContent({ }) {
            return (
                <Row>
                    <Col>
                        <Post
                            colors={colors}
                            data={emits[0]}
                            withMaxLinesToText={3}
                            withLitleLike={true}
                            withGoToPost={true}
                            withoutHeader={true}
                            withoutFooter={true}
                            withLitleHash={true}
                        />
                    </Col>
                </Row>
            )
        }
    }

    function Galery() {
        return (
            <View style={{ marginTop: -10 }}>
                <Row>
                    <Col>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 5, marginLeft: 10, marginBottom: -10 }}>
                                <MaterialCommunityIcons name={'camera'} color={colors.text} size={20} />
                            </Text>
                            <Text style={{ marginTop: 7, marginLeft: 5, marginBottom: -10, color: colors.text }}>
                                Galeria
                            </Text>
                        </View>
                    </Col>
                </Row>
                {
                    (!posts || posts.length == 0) ?
                        <Empty message={'Nenhum post encontrado'} fontSize={14} iconSize={48} iconName={'anchor'} />
                        :
                        <GaleryContents />
                }
            </View>
        )

        function GaleryContents() {
            return (
                <Row>
                    <FlatList
                        data={posts}
                        keyExtractor={(post) => post.id}
                        renderItem={({ item }) => {
                            return <Col><Post colors={colors}
                                data={item}
                                withGoToPost={true}
                                postMaxHeight={152}
                                withSourceBorderValue={5}
                                withSourceHeight={150}
                                withLitleLike={true}
                                withoutVolume={true}
                                withoutHeader={true}
                                withoutFooter={true}
                                withoutShowVotes={true} /></Col>
                        }}
                        horizontal={false}
                        numColumns={2}
                    />
                </Row>
            )
        }
    }
}