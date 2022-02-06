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

        console.log(response.status);
        if (response.status == 200) {
            let responseJson = await response.json();
            setUserInfo({ ...responseJson.User });
            var localUser = await getData('userInfo');
            if (responseJson.User.id == localUser.id) {
                await setData('userInfo', responseJson.User);
                setUpdateNow(!updateNow);
            }
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
                console.log('Perfil próprio da tela profile ...');
                getOwnerProfile(true);
            } else {
                if (localUser.id == profileId) {
                    console.log('Perfil próprio do feed ...');
                    getOwnerProfile(true);
                } else {
                    console.log('Perfil de outro usuário ...');
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
                            <ProfileBody
                                userInfo={userInfo}
                                updateNowParentScreen={updateNow}
                                myselfProfile={myselfProfile}
                                setUpdateNowParentScreen={setUpdateNow} />
                        </Grid>
                    </ScrollView>
                </View>
        }
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