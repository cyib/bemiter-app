import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Dimensions, Text, ScrollView, Alert, FlatList, Platform } from "react-native";
import { Video } from 'expo-av';
import globalVars from "../helpers/globalVars";
import { Row, Col } from "react-native-paper-grid";
import uploadFile from '../helpers/uploadFile';
import uuid from 'react-native-uuid';
import { TextInput, Chip, Switch } from "react-native-paper";
import { getData } from "../helpers/cache";
import { apiUrl } from "../helpers/environment";

const CreateEmit = (props) => {
    const [emitInput, setEmitInput] = useState('');
    const [hashtagInput, setHashtagInput] = useState('');

    const emitInputMaxLen = 300;
    const hashtagInputMaxLen = 25;

    const [trendHashtags, setTrendHashtags] = useState([]);
    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
    const [isSwitchHashtagsOn, setIsSwitchHashtagsOn] = useState(false);

    var maxWidth = Dimensions.get('screen').width;
    var maxHeight = Dimensions.get('screen').height;

    function addHashtag() {
        var hashtagInput_ = hashtagInput;
        if (hashtagInput_ == '') return null;

        hashtagInput_ = hashtagInput_.toString().replace(/#/g, '').replace(/\s/g, '').toLowerCase();

        var selectedHashtags_ = selectedHashtags;
        if (selectedHashtags_.includes(hashtagInput_)) {
            setHashtagInput('');
            Alert.alert('Hashtag já adicionada!');
            return null;
        }

        selectedHashtags_.push(hashtagInput_);
        setHashtagInput('');
        setSelectedHashtags(selectedHashtags_);
    }

    useEffect(() => {
        setSendButtonDisabled(false);
    }, [emitInput, hashtagInput, selectedHashtags]);

    async function emit() {
        try {
            setSendButtonDisabled(true);
            const data = {
                emitInput: emitInput,
                hashtags: JSON.stringify(selectedHashtags)
            };
            var token = await getData('token');
            let res = await fetch(`${apiUrl}/post/create/emit`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            let responseJson = await res.json();
            console.warn('DONE');
            if (responseJson.status == 200) {
                Alert.alert('Emit realizado com sucesso!');
            }
        } catch (error) {
            console.log(error);
        }
        setSendButtonDisabled(false);
    }

    const onToggleSwitch = () => setIsSwitchHashtagsOn(!isSwitchHashtagsOn);

    return (
        <View style={{ minHeight: maxHeight, backgroundColor: globalVars.selectedColors.background }}>
            <ScrollView>
                <Row>
                    <Col>
                        <TextInput placeholder="Fale sobre o que quiser aqui ..."
                            multiline={true}
                            style={{ borderColor: globalVars.selectedColors.secundary, borderWidth: 1 }}
                            onChangeText={(text) => setEmitInput(text)} maxLength={emitInputMaxLen}>
                        </TextInput>
                        <View>
                            <Text>{emitInput.length}/{emitInputMaxLen}</Text>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Switch value={isSwitchHashtagsOn} onValueChange={onToggleSwitch} />
                            <Text style={{ fontSize: 18, marginLeft: 5 }}>Usar hashtags</Text>
                        </View>
                    </Col>
                </Row>
                {
                    isSwitchHashtagsOn ?
                        <>
                            <Row>
                                <Col size={3}>
                                    <TextInput placeholder="(Opcional) Hashtag"
                                        value={hashtagInput}
                                        multiline={true}
                                        style={{ borderColor: globalVars.selectedColors.secundary, borderWidth: 1 }}
                                        onChangeText={(text) => setHashtagInput(text)} maxLength={hashtagInputMaxLen}>
                                    </TextInput>
                                    <View>
                                        <Text>{hashtagInput.length}/{hashtagInputMaxLen}</Text>
                                    </View>
                                </Col>
                                <Col size={1}>
                                    <TouchableOpacity onPress={() => {
                                        addHashtag();
                                    }}
                                        disabled={sendButtonDisabled}
                                        style={{
                                            backgroundColor: sendButtonDisabled ? globalVars.selectedColors.backopaque : 'black',
                                            width: '100%',
                                            alignItems: 'center',
                                            paddingBottom: 10, borderRadius: 5
                                        }}>
                                        <Text style={{ fontSize: 44 }}>{
                                            '+'
                                        }</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    selectedHashtags.length > 0 ?
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Text>Hashtags selecionadas:</Text>
                                        </View>
                                        : null
                                }
                            </Row>
                            <Row>
                                <FlatList data={selectedHashtags} horizontal={true}
                                    keyExtractor={(item) => uuid.v5(item, 'key')}
                                    showsHorizontalScrollIndicator={false} renderItem={({ item }) => {
                                        return <View style={{ flexWrap: 'wrap', margin: 4, marginVertical: 10 }}>
                                            <Chip icon="pound" closeIcon={"heart"} style={{ borderRadius: 5 }}
                                                key={() => uuid.v5(item, 'key')}
                                                onPress={() => {
                                                    var selectedHashtags_ = selectedHashtags;
                                                    selectedHashtags_ = selectedHashtags_.filter(e => e != item);
                                                    setSelectedHashtags(selectedHashtags_);
                                                }}
                                            >{item.toLowerCase()}</Chip>
                                        </View>
                                    }} />
                            </Row>
                            <Row>
                                <Col>
                                    <View style={{ height: 175, width: '100%' }} />
                                </Col>
                            </Row>
                        </>
                        : null
                }
            </ScrollView>
            <View style={{
                position: 'absolute', width: Dimensions.get('screen').width - 10, marginHorizontal: 5,
                bottom: Platform.OS == 'ios' ? 175 : 225
            }}>
                <TouchableOpacity onPress={emit}
                    disabled={sendButtonDisabled}
                    style={{
                        backgroundColor: sendButtonDisabled ? globalVars.selectedColors.backopaque : 'black',
                        width: '100%',
                        alignItems: 'center',
                        padding: 15, borderRadius: 5
                    }}>
                    <Text style={{ fontSize: 20 }}>{
                        sendButtonDisabled ? 'PUBLICANDO ...' : 'PUBLICAR'
                    }</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CreateEmit;