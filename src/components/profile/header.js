
// import React, { View, Text, Dimensions } from "react-native";
// import { Col, Row } from "react-native-paper-grid";
// import globalVars from '../../helpers/globalVars';
// import { Button, Card } from 'react-native-paper';
import React, { useState } from "react";
import { View, Text, Dimensions, Platform, TouchableOpacity } from "react-native";
import { Col, Row } from "react-native-paper-grid";
import globalVars from '../../helpers/globalVars';
import { Button, Card, Paragraph } from 'react-native-paper';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const profileHeader = (props) => {
    var windowWidth = Dimensions.get('window').width;

    var profileId = ``;
    var profileImage = `https://br.web.img3.acsta.net/newsv7/19/06/07/17/30/1373423.jpg`;//`https://placebeard.it/640x360`;
    var profileName = `Tom Holland`;
    var profileUser = `@tomholland`;
    var profileJob = `Spider Man`;

    var [profileFollowingNumber, setProfileFollowingNumber] = useState(122);
    var [profileFollowersNumbers, setProfileFollowersNumbers] = useState(10290);

    var [followText, setFollowText] = useState(`Seguir`);
    var [following, setFollowing] = useState(false);
    var [followStyleButton, setFollowStyleButton] = useState({
        backgroundColor: globalVars.selectedColors.secundary,
        marginLeft: 10,
        borderRadius: 5,
        borderTopStartRadius: 0,
        borderTopEndRadius: 0
    });
    var [followStyleText, setFollowStyleText] = useState({
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        padding: 4,
        paddingTop: 3,
        paddingBottom: 0,
        height: 30,
        color: globalVars.selectedColors.text
    });

    function follow() {
        if (!following) {
            setFollowText('Parar de seguir');
            setFollowing(true);
            setFollowStyleButton({ ...followStyleButton, backgroundColor: 'lightgray' });
            setFollowStyleText({ ...followStyleText, fontSize: 13, fontWeight: '200', color: 'gray' });
            setProfileFollowersNumbers(profileFollowersNumbers + 1);
        }
        if (following) {
            setFollowText('Seguir');
            setFollowing(false);
            setFollowStyleButton({ ...followStyleButton, backgroundColor: globalVars.selectedColors.secundary });
            setFollowStyleText({ ...followStyleText, fontSize: 13, fontWeight: '300', color: globalVars.selectedColors.text });
            setProfileFollowersNumbers(profileFollowersNumbers - 1);
        }
    }

    return (<>
        <View style={{ backgroundColor: globalVars.selectedColors.background, margin: -10, marginLeft: 3, paddingBottom: 0 }}>
            <View style={{ position:'absolute', backgroundColor: globalVars.selectedColors.background, height: 1000, width: windowWidth+200, marginLeft: -200, zIndex: -2  }}/>
            <Row>
                <Col size={2} style={{ zIndex: 10 }}>
                    <View style={{ alignItems: 'center', paddingTop: 10, zIndex: 10 }}>
                        <Card.Cover style={{
                            width: '100%',
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: globalVars.selectedColors.secundary,
                            maxHeight: 175,
                            zIndex: 10,
                        }} source={{ uri: profileImage }} />
                        <TouchableOpacity style={{ minWidth: 100, maxHeight: 35, marginLeft: -10 }} onPress={() => follow()}>
                            <View style={followStyleButton}>
                                <Text style={followStyleText}>{followText}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Col>
                <Col size={4} style={{ paddingTop: 15 }}>
                    <Row style={{ zIndex: 10 }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: Platform.OS === 'android' ? 'bold' : '400'
                        }}>{profileName}</Text>
                    </Row>
                    <Row style={{ zIndex: 10 }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: Platform.OS === 'android' ? 'normal' : '200'
                        }}>{profileUser}</Text>
                    </Row>
                    <Row>
                        <View style={{
                            position: 'absolute',
                            backgroundColor: globalVars.selectedColors.primary,
                            height: 1030,
                            width: windowWidth + 200,
                            marginTop: -1000,
                            marginLeft: -200,
                            zIndex: -1
                        }}></View>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: Platform.OS === 'android' ? 'normal' : '200'
                        }}>
                            {profileJob != `` ?
                                <>
                                    <MaterialCommunityIcons name="check-circle" color={'lightgreen'} size={14} />
                                    {" "}Verificado - {profileJob}
                                </>
                                : null}
                        </Text>
                    </Row>
                        <Row>
                            <View style={{ position: 'absolute', backgroundColor: globalVars.selectedColors.secundary, width: windowWidth+200, marginLeft: -200, height: '115%', zIndex:-1 }}/>
                            <Col>
                                <Text style={{ fontWeight: Platform.OS === 'android' ? 'bold' : '400', fontSize: 16, textAlign: "center" }}>Seguindo</Text>
                                <Text style={{ fontWeight: '200', fontSize: 16, textAlign: "center" }}>{profileFollowingNumber}</Text>
                            </Col>
                            <Col style={{ paddingRight: 15 }}>
                                <Text style={{ fontWeight: Platform.OS === 'android' ? 'bold' : '400', fontSize: 16, textAlign: "center" }}>Seguidores</Text>
                                <Text style={{ fontWeight: '200', fontSize: 16, textAlign: "center" }}>{profileFollowersNumbers}</Text>
                            </Col>
                        </Row>
                    <Row>
                    <View style={{
                            backgroundColor: globalVars.selectedColors.secundary,
                            borderColor: globalVars.selectedColors.secundary,
                            borderRadius: 5,
                            marginTop: 1,
                            marginLeft: -2,
                            padding: 10,
                            maxHeight: 64,
                        }}>
                            <Paragraph style={{
                                fontWeight: '300',
                                fontSize: 14,
                                textAlign: "left",
                            }}>"throw me to the wolves and i'll be back leading the pack!"</Paragraph>
                        </View>
                    </Row>
                </Col>
            </Row>
        </View>
    </>)
}

export default profileHeader;