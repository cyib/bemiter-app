import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-paper-grid";
import { ActivityIndicator, Headline, Subheading } from "react-native-paper";
import globalVars from '../helpers/globalVars';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ProfileHeader from '../components/profile/header';
import Miniature from '../components/post/miniature';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData, setData } from "../helpers/cache";
import { apiUrl } from "../helpers/environment";
import { useNavigation } from '@react-navigation/native';
import WidgetModal from "../components/profile/widget";
import ProfileBody from "../components/profile/body";
import ModalWithContent from "../components/extras/modalWithContent";
import SettingsScreen from "./settings";

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    var windowWidth = Dimensions.get('window').width;
    var windowHeight = Dimensions.get('window').height;

    var pId;
    try {
        pId = props.route.params.profileId;
    } catch (error) {
        pId = null;
    }

    var [profileId, setProfileId] = useState(pId ? pId : null);
    var [userInfo, setUserInfo] = useState(null);
    var [myselfProfile, setMyselfProfile] = useState(false);

    var [readyToLoadBody, setReadyToLoadBody] = useState(false);
    var [failRefresh, setFailRefresh] = useState(false);
    useEffect(async () => {

    }, [readyToLoadBody]);

    async function getUserProfile(id) {
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/profile/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        ;
        if (response.status == 200) {
            let responseJson = await response.json();
            setUserInfo({ ...responseJson.User });
            var localUser = await getData('userInfo');
            if (responseJson.User.id == localUser.id) {
                await setData('userInfo', responseJson.User);
                setUpdateNow(!updateNow);
            }
            if (!readyToLoadBody) setReadyToLoadBody(true);
        } else if (response.status == 400) {
            Alert.alert(
                "Perfil não encotrado!",
                "",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } else {
            Alert.alert(
                "Sem acesso à rede!",
                "",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
            setFailRefresh(true);
        }
    }

    async function getOwnerProfile(getFromNetwork = false) {
        var userInfo_ = await getData('userInfo');
        setUserInfo(userInfo_);
        if (getFromNetwork) {
            getUserProfile(userInfo_.id);
        }
    }

    var [isInit, setIsInit] = useState(true);
    useEffect(async () => {
        var localUser = await getData('userInfo');
        if (userInfo) {
            if (userInfo.id == localUser.id) setMyselfProfile(true);
        }

        if (isInit) {
            setIsInit(false);
            var localUser = await getData('userInfo');
            if (!profileId) {
                ;
                getOwnerProfile(true);
            } else {
                if (localUser.id == profileId) {
                    ;
                    getOwnerProfile(true);
                } else {
                    ;
                    getUserProfile(profileId);
                }

            }
        }
    }, [userInfo]);

    var [updateNow, setUpdateNow] = useState(false);
    useEffect(async () => {
        if (myselfProfile) {
            var localUser = await getData('userInfo');
            setUserInfo(null);
            setUserInfo({ ...localUser });
        }
    }, [updateNow]);

    return (<>
        <View style={{ backgroundColor: globalVars.selectedColors.background }}>
            <View style={{
                display: profileId ? 'none' : 'flex',
                backgroundColor: globalVars.selectedColors.background,
                height: 55, width: '100%',
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontSize: 24,
                    marginVertical: 10,
                    marginLeft: 10, left: 0
                }}>𝗕𝗘𝗠𝗜𝗧𝗘𝗥</Text>
                <Text style={{
                    fontSize: 10,
                    marginVertical: 10,
                    marginLeft: 5, left: 0,
                }}>alpha v1.0</Text>
                <View style={{
                    width: 50, height: 50,
                    position: 'absolute', right: 0,
                    padding: 5, marginTop: 5
                }}>
                    <ModalWithContent
                    maxHeight={450}
                        buttonEnabled={true}
                        button={<Text>
                            <MaterialCommunityIcons name="account-cog" color={globalVars.selectedColors.placeholder} size={32} />
                        </Text>}>
                            <SettingsScreen/>
                    </ModalWithContent>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: globalVars.selectedColors.secundary }} />
            {
                !userInfo ?
                    <Loading />
                    :
                    <View style={{
                        backgroundColor: globalVars.currentTheme.colors.background,
                        marginLeft: -10,
                    }}>
                        <ScrollView style={{
                            minHeight: '100%',
                            backgroundColor: globalVars.currentTheme.colors.background
                        }}>
                            <Grid>
                                <ProfileHeader
                                    userInfo={userInfo}
                                    updateNowParentScreen={updateNow}
                                    setUpdateNowParentScreen={setUpdateNow} />
                                {
                                    readyToLoadBody ?
                                        <ProfileBody
                                            userInfo={userInfo}
                                            updateNowParentScreen={updateNow}
                                            myselfProfile={myselfProfile}
                                            setUpdateNowParentScreen={setUpdateNow} />
                                        : null
                                }
                            </Grid>
                        </ScrollView>
                    </View>
            }
        </View>
    </>
    );

    function Loading() {
        return (<View style={{
            height: 1000,
            paddingTop: 50,
            backgroundColor: globalVars.currentTheme.colors.background
        }}>
            <ActivityIndicator size={30} />
        </View>);
    }

    function AddWidgetButton() {
        if (!myselfProfile) return null;
        return (
            <Row>
                <Col></Col>
                <Col>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <WidgetModal userInfo={userInfo} />
                    </View>
                </Col>
                <Col></Col>
            </Row>
        )
    }
}

export default ProfileScreen;