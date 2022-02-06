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
    var [colors, setColors] = useState(profileThemes[props.userInfo.theme ? props.userInfo.theme : 'default']);

    var [followers, setFollowers] = useState(props.userInfo.followers ? props.userInfo.followers : 0);
    var [following, setFollowing] = useState(props.userInfo.following ? props.userInfo.following : 0);
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

        console.log(response.status);
        if (response.status == 200) {
            let responseJson = await response.json();
            props.setUpdateNowParentScreen(!props.updateNowParentScreen);
            console.log(responseJson.message);
            if(connectionType == 'unfollow'){
                setFollowers(followers-1);
            }else{
                setFollowers(followers+1);
            }
            setCurrConnectionType(responseJson.type ? responseJson.type : null);
        }
    }

    return (<>
        <View style={{ width: Dimensions.get('screen').width }}>
            <View style={{ backgroundColor: colors.primary, margin: 5, borderRadius: 5, paddingTop: 5 }}>
                <Row>
                    <Col size={2}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{
                                    borderRadius: 5,
                                }}
                                source={{ uri: userInfo.avatar ? userInfo.avatar : avatarBase, height: 100, width: 100 }} />
                        </View>
                    </Col>
                    <Col size={4}>
                        <View style={{
                            paddingTop: 10,
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
                            <View style={{
                                marginTop: 15,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: colors.secundary,
                                padding: 5,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: colors.border
                            }}>
                                <Text style={{
                                    fontSize: 11,
                                    color: colors.text,
                                }}>Traço: Inteligente</Text>
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
                                                style={{ position: 'absolute', right: 10, top: 10 }}>
                                                {
                                                    <IconButton icon={'account-off'} color={colors.text} size={40} />
                                                }

                                            </TouchableOpacity>
                                            : null
                            }
                            {
                                !currConnectionType ? 
                                            <TouchableOpacity
                                                onPress={() => { connection() }}
                                                style={{ position: 'absolute', right: 10, top: 10 }}>
                                                {
                                                    <IconButton icon={'account-multiple-plus'} color={colors.text} size={40} />
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
                        <View>
                            <Row>
                                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <PlaceCard title={followers} text={"seguidores"} colors={colors} />
                                </Col>
                                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <PlaceCard title={following} text={"seguindo"} colors={colors} />
                                </Col>
                                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <PlaceCard title={0} text={"publicações"} colors={colors} />
                                </Col>
                            </Row>
                        </View>
                    </Col>
                </Row>
            </View>
        </View>
    </>)
}

function PlaceCard({ title, text, colors }) {
    return (
        <View style={{
            backgroundColor: colors.secundary,
            padding: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#FFFFFA39',
            width: 100, height: 70,
            alignItems: 'center', justifyContent: 'center'
        }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>{title}</Text>
            <Text style={{ color: colors.text }}>{text}</Text>
        </View>
    )
}

export default profileHeader;