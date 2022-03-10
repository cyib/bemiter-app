import React, { useEffect, useState } from "react";
import { Dimensions, VirtualizedList, Image, Text, View, LogBox, FlatList, ListViewBase, TouchableOpacity } from "react-native";
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
import globalVars from "../../helpers/globalVars";
import { useNavigation } from '@react-navigation/native';

export default function ProfileBody(props) {
    const navigation = useNavigation();

    var [userInfo, setUserInfo] = useState(props.userInfo ? props.userInfo : userInfoBase);
    var themeMode = props.userInfo.theme ? (props.userInfo.theme != 'default' ? props.userInfo.theme : `default_${globalVars.theme.mode}`) : `default_${globalVars.theme.mode}` ;
    var theme = profileThemes[themeMode];
    var [colors, setColors] = useState(theme);
    
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
        ;
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/user/posts/${userInfo.id}?limit=10`, {
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
            ;
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
            <View style={{ width: Dimensions.get('screen').width + 2, margin: -10 }}>
                <Row>
                    <Col>
                        <View style={{
                            backgroundColor: colors.primary,
                            width: Dimensions.get('screen').width + 10,
                            minHeight: 200
                        }}>
                            <View style={{ height: 4, backgroundColor: colors.border }}/>
                            {
                                !readyToShow ?
                                    <View style={{ paddingTop: 20 }}>
                                        <Empty colors={colors} withLoader={true} height={600} message={'Carregando publicações ...'} />
                                    </View>
                                    :
                                    <BodyContent />
                            }
                        </View>
                    </Col>
                </Row>
            </View>
            <View style={{ position: 'absolute', left: -20, top: -500, height: Dimensions.get('screen').height + 1000, width: Dimensions.get('screen').width + 200, 
        backgroundColor: colors.primary, zIndex: -1}}/>
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
                        <View style={{ paddingBottom: 150 }}>
                            <LastEmit />
                            <Galery />
                            </View>
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
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EmitsView', {
                                    userInfo: userInfo
                                  })
                            }}>
                            <Text style={{
                                marginTop: 7,
                                marginLeft: 5,
                                marginBottom: -20,
                                backgroundColor: colors.border,
                                padding: 2,
                                marginRight: 10,
                                paddingHorizontal: 5,
                                fontSize: 14,
                                color: colors.text
                            }}>
                                Mais emits
                            </Text>
                            </TouchableOpacity>
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
            var colors_ = colors;
            colors_.secundary = colors_.secundary == 'transparent' ? '#00000008' : colors_.secundary;
            return (
                <Row>
                    <Col>
                    <View style={{ margin: 5, borderRadius: 5}}>
                        <Post
                            colors={colors_}
                            data={emits[0]}
                            withMaxLinesToText={3}
                            withLitleLike={true}
                            withGoToPost={true}
                            withoutBorderMode={true}
                            withoutHeader={true}
                            withoutFooter={true}
                            withLitleHash={true}
                            withShowReferencePost={true}
                        />
                        </View>
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