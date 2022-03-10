import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Platform, Image, TouchableOpacity } from "react-native";
import { Col, Grid, Row } from "react-native-paper-grid";
import globalVars from '../../helpers/globalVars';
import { Button, Card, Paragraph } from 'react-native-paper';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData } from "../../helpers/cache";

import profileThemes from "../../helpers/profileThemes";
import IconButton from "../extras/iconButton";
import PaletteModal from "./palette";
import { apiUrl } from "../../helpers/environment";

const profileHeader = (props) => {
    var avatarBase = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&usqp=CAU`;

    var userInfoBase = {
        id: null,
        name: '',
        username: '',
        followers: 0, 
        following: 0,
        theme: 'default',
        avatar: avatarBase
    };

    var [myselfProfile, setMyselfProfile] = useState(props.myselfProfile ? props.myselfProfile : false);
    var [userInfo, setUserInfo] = useState(props.userInfo ? props.userInfo : userInfoBase);
    var themeMode = props.userInfo.theme ? (props.userInfo.theme != 'default' ? props.userInfo.theme : `default_${globalVars.theme.mode}`) : `default_${globalVars.theme.mode}` ;
    var [colors, setColors] = useState(profileThemes[themeMode]);

    var [followers, setFollowers] = useState(props.userInfo.followers ? props.userInfo.followers : 0);
    var [following, setFollowing] = useState(props.userInfo.following ? props.userInfo.following : 0);
    var [postsCount, setPostsCount] = useState(props.userInfo.postsCount ? props.userInfo.postsCount : 0);
    var [emitsCount, setEmitsCount] = useState(props.userInfo.emitsCount ? props.userInfo.emitsCount : 0);
    var [currConnectionType, setCurrConnectionType] = useState(props.userInfo.connectionType ? props.userInfo.connectionType : null);

    useEffect(async () => {
        var localUser = await getData('userInfo');
        if(userInfo){
            if(userInfo.id == localUser.id) {
                setMyselfProfile(true);
            }else{
                getCurrentConnectionType();
            }
        }
    }, [userInfo]);

    async function getCurrentConnectionType() {
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/profile/connection/status/${userInfo.id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });
        if (response.status == 200) {
            let responseJson = await response.json();
            setCurrConnectionType(responseJson.type ? responseJson.type : null);
        }
    }

    useEffect(() => {
        
    }, [currConnectionType]);

    async function connection() {
        let connectionType = currConnectionType ? 'unfollow' : 'follower';
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/profile/connection/${userInfo.id}?type=${connectionType}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (response.status == 200) {
            let responseJson = await response.json();
            props.setUpdateNowParentScreen(!props.updateNowParentScreen);
            ;
            if(connectionType == 'unfollow'){
                setFollowers(followers-1);
            }else{
                setFollowers(followers+1);
            }
            setCurrConnectionType(responseJson.type ? responseJson.type : null);
        }
    }

    return (<>
        <View style={{ width: Dimensions.get('screen').width + 2, marginTop: -8 }}>
            <View style={{ backgroundColor: colors.primary, paddingTop: 10 }}>
                <Row>
                    <Col size={2}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: colors.border
                                }}
                                source={{ uri: userInfo.avatar ? userInfo.avatar : avatarBase, height: 100, width: 100 }} />
                        </View>
                    </Col>
                    <Col size={4}>
                        <View style={{
                            paddingTop: 0,
                            alignItems: 'flex-start',
                        }}>
                            <View>
                                <Text style={{ 
                                    fontSize: 20, 
                                    fontWeight: 'bold',
                                    color: colors.text,
                                    }}>
                                    {userInfo.name}
                                </Text>
                                <Text style={{ 
                                    fontSize: 12, 
                                    fontWeight: 'normal',
                                    color: colors.text,
                                    }}>
                                    @{userInfo.username}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <PlaceCard title={followers} text={"seguidores"} colors={colors} />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <PlaceCard title={following} text={"seguindo"} colors={colors} />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <PlaceCard title={postsCount} text={"posts"} colors={colors} />
                                </View>
                        </View>
                        </View>
                        {
                            myselfProfile ? 
                            <View style={{ position: 'absolute', right: 10, top: 10 }}>
                                <PaletteModal colors={colors} 
                                updateNowParentScreen={props.updateNowParentScreen}
                                setUpdateNowParentScreen={props.setUpdateNowParentScreen}/>
                            </View> 
                            : null
                        }
                        {
                            !myselfProfile ? 
                            <>
                            {
                                currConnectionType ? 
                                            <TouchableOpacity
                                                onPress={() => { connection() }}
                                                style={{ position: 'absolute', right: 5, top: 5 }}>
                                                {
                                                    <IconButton icon={'heart-broken'} color={colors.text} size={32} />
                                                }

                                            </TouchableOpacity>
                                            : null
                            }
                            {
                                !currConnectionType ? 
                                            <TouchableOpacity
                                                onPress={() => { connection() }}
                                                style={{ position: 'absolute', right: 5, top: 5 }}>
                                                {
                                                    <IconButton icon={'heart-outline'} color={colors.text} size={32} />
                                                }

                                            </TouchableOpacity> 
                                            : null
                            }
                            </>
                            : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col size={4}>
                        <View style={{ height: 20, width: '100%'}}></View>
                    </Col>
                </Row>
            </View>
        </View>
        <View style={{ position: 'absolute', left: -20, top: -500, height: Dimensions.get('screen').height + 1000, width: Dimensions.get('screen').width + 200, 
        backgroundColor: colors.primary, zIndex: -1}}/>
    </>)
}

function PlaceCard({ title, text, colors }) {
    return (
        <View style={{
            borderRadius: 5,
            width: 75, height: 70,
            alignItems: 'center', justifyContent: 'center'
        }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.text }}>{title}</Text>
            <Text style={{ color: colors.text }}>{text}</Text>
        </View>
    )
}

export default profileHeader;