
// import React, { View, Text, Dimensions } from "react-native";
// import { Col, Row } from "react-native-paper-grid";
// import globalVars from '../../helpers/globalVars';
// import { Button, Card } from 'react-native-paper';
import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity  } from "react-native";
import { Col, Row } from "react-native-paper-grid";
import globalVars from '../../helpers/globalVars';
import { Button, Card, Paragraph } from 'react-native-paper';
//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const profileHeader = (props) => {
    var windowWidth = Dimensions.get('window').width;

    var profileId = ``;
    var profileImage = `https://stories.adorocinema.com/revival-de-icarly-sera-mais-adulto-e-tera-cenas-sobre-sexo/assets/5.gif`;//`https://placebeard.it/640x360`;
    var profileName = `Miranda Cosgrove`;
    var profileUser = `@miranda`;
    var profileJob = `Atriz de iCarly`;

    var [profileFollowingNumber, setProfileFollowingNumber] = useState(99);
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
        paddingBottom: 10,
        color: globalVars.selectedColors.text
    });

    function follow() {
        if (!following) {
            setFollowText('Parar de seguir');
            setFollowing(true);
            setFollowStyleButton({ ...followStyleButton, backgroundColor: 'lightgray' });
            setFollowStyleText({ ...followStyleText, fontSize: 12, color: 'gray' });
            setProfileFollowersNumbers(profileFollowersNumbers+1);
        }
        if (following) {
            setFollowText('Seguir');
            setFollowing(false);
            setFollowStyleButton({ ...followStyleButton, backgroundColor: globalVars.selectedColors.secundary });
            setFollowStyleText({ ...followStyleText, fontSize: 14, color: globalVars.selectedColors.text });
            setProfileFollowersNumbers(profileFollowersNumbers-1);
        }
    }

    return (
        <>
            <Row style={{
                margin: -10,
                marginTop: 0,
                backgroundColor: globalVars.selectedColors.background
            }}>
                <Col size={2}>
                    <View style={{
                        width: 125,
                        height: 175,
                    }}>
                        <Card.Cover style={{
                            height: 180,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: globalVars.selectedColors.secundary,
                            zIndex: 10
                        }} source={{ uri: profileImage }} />
                        <View style={{
                            backgroundColor: globalVars.selectedColors.primary,
                            height: 600,
                            marginLeft: -10,
                            width: windowWidth + 10,
                            marginTop: -640,
                            zIndex: 1,
                            borderBottomColor: globalVars.selectedColors.secundary,
                            borderBottomWidth: 50
                        }}></View>
                    </View>
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={() => follow()}>
                        <View style={followStyleButton}>
                            <Text style={followStyleText}>{followText}</Text>
                        </View>
                    </TouchableOpacity>
                </Col>
                <Col size={4} style={{ padding: 10 }}>
                    <Row>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '400'
                        }}>{profileName}</Text>
                    </Row>
                    <Row>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '200',
                        }}>{profileUser}</Text>
                    </Row>
                    <Row>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '200',
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
                        <View style={{ height: 0 }}></View>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{ fontWeight: '400', fontSize: 16, textAlign: "center" }}>Seguindo</Text>
                            <Text style={{ fontWeight: '200', fontSize: 16, textAlign: "center" }}>{profileFollowingNumber}</Text>
                        </Col>
                        <Col>
                            <Text style={{ fontWeight: '400', fontSize: 16, textAlign: "center" }}>Seguidores</Text>
                            <Text style={{ fontWeight: '200', fontSize: 16, textAlign: "center" }}>{profileFollowersNumbers}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <View style={{
                            backgroundColor: globalVars.selectedColors.secundary,
                            borderColor: globalVars.selectedColors.secundary,
                            borderWidth: 2,
                            marginTop: 1,
                            marginLeft: -2,
                            padding: 5,
                            height: 65,
                            width: 235,
                            borderRadius: 5
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
        </>)
}

export default profileHeader;