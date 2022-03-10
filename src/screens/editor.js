import React, { useState } from "react";
import { View, Image, TouchableOpacity, Dimensions, Text, ScrollView, Alert } from "react-native";
import { Video } from 'expo-av';
import globalVars from "../helpers/globalVars";
import { Row, Col } from "react-native-paper-grid";
import uploadFile from '../helpers/uploadFile';
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const EditorScreen = (props) => {
    const navigation = useNavigation();

    var [file, setFile] = useState(props.route.params.file);
    var [description, setDescription] = useState('');
    var [subtitle, setSubtitle] = useState('');
    var [sendButtonDisabled, setSendButtonDisabled] = useState(false);

    var maxWidth = Dimensions.get('screen').width;
    var maxHeight = Dimensions.get('screen').height;

    return (
        <View style={{ minHeight: maxHeight, backgroundColor: globalVars.selectedColors.background }}>
            <ScrollView style={{}}>
                <Row>
                    <Col>
                        <TextInput placeholder="Escreva sua legenda aqui ..."
                            onChangeText={(text) => setDescription(text)} maxLength={50}>

                        </TextInput>
                        <View>
                            <Text>{description.length}/50</Text>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextInput placeholder="Local da publicação ... "
                            onChangeText={(text) => setSubtitle(text)} maxLength={50}>
                        </TextInput>
                        <View>
                            <Text>{subtitle.length}/50</Text>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ width: '100%', justifyContent: 'center' }}>
                            {file ?
                                <>
                                    {file.type == 'image' ?
                                        <Image source={{ uri: file.uri }} style={{ width: '100%', height: 500, zIndex: -1, resizeMode: 'contain' }} />
                                        :
                                        <Video source={{ uri: file.uri }} useNativeControls style={{ width: '100%', height: 500, resizeMode: 'contain' }} />
                                    }
                                </>
                                : null}
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TouchableOpacity onPress={() => {
                            ;
                            uploadFile(file, description, subtitle).then((res) => {
                                ;
                                Alert.alert('Post criado com sucesso :)');
                                navigation.navigate('HomeFeed', {
                                    reload: true
                                })
                            });
                            
                            setSendButtonDisabled(true);
                        }}
                            disabled={sendButtonDisabled}
                            style={{
                                backgroundColor: sendButtonDisabled ? globalVars.selectedColors.backopaque : globalVars.selectedColors.primary,
                                width: '100%',
                                alignItems: 'center',
                                padding: 15, borderRadius: 5
                            }}>
                            <Text style={{ fontSize: 20 }}>{
                                sendButtonDisabled ? 'PUBLICANDO ...' : 'PUBLICAR'
                            }</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ height: 175, width: '100%' }} />
                    </Col>
                </Row>
            </ScrollView>
        </View>
    );
}

export default EditorScreen;