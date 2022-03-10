import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from "react-native";
import { ActivityIndicator, Button, Switch, TextInput } from "react-native-paper";
import { Col, Row } from "react-native-paper-grid";
import globalVars from "../helpers/globalVars";
import uuid from 'react-native-uuid';
import FlatListHashtagManager from '../components/emitHashtags/flatListHashtagManager';
import { getData } from "../helpers/cache";
import { apiUrl } from "../helpers/environment";
import Toast from 'react-native-toast-message';
import ModalWithContent from "../components/extras/modalWithContent";

const HashManageScreen = () => {
    var [loadingPopularHashtags, setLoadingPopularHashtags] = useState(true);
    var [loadingSelectedHashtags, setLoadingSelectedHashtags] = useState(true);
    var [loadingSearchHashtags, setLoadingSearchHashtags] = useState(true);
    var [popularHashtags, setPopularHashtags] = useState([]);
    var [selectedHashtags, setSelectedHashtags] = useState([]);
    var [searchHashtags, setSearchHashtags] = useState([]);

    var [searchInput, setSearchInput] = useState('');
    var [searchButtonEnabled, setSearchButtonEnabled] = useState(false);

    var [refreshing, setRefreshing] = useState(false);

    var [isInit, setIsInit] = useState(true);
    useEffect(() => {
        if (isInit) {
            setIsInit(false);
            getPopularHashtags();
            getUserHashtags();
        }
    }, [popularHashtags, selectedHashtags]);

    async function getPopularHashtags() {
        setLoadingPopularHashtags(true);
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/hashtag/popular?page=${1}&limit=${10}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        let responseJson = await response.json();
        if (response.status == 200) {
            var hashtags_ = responseJson.hashtags.docs.map((item) => item.name);
            setLoadingPopularHashtags(false);
            setPopularHashtags([...hashtags_]);
        }
    }

    async function getUserHashtags() {
        setLoadingSelectedHashtags(true);
        setRefreshing(true);
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/hashtag/user?page=${1}&limit=${100}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        let responseJson = await response.json();
        if (response.status == 200) {
            var hashtags_ = responseJson.hashtags.docs;
            setLoadingSelectedHashtags(false);
            setRefreshing(false);
            setSelectedHashtags([...hashtags_]);
        }
    }

    async function followHashtag(hashtagName) {
        ;
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/hashtag/user/follow?hashtag=${hashtagName}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        let responseJson = await response.json();
        if (response.status == 200) {
            ;
            getUserHashtags();
        }
        if (response.status == 409) {
            Toast.show({
                type: 'info',
                text1: `A hashtag "${hashtagName}" já está na lista!`
            });
        }
    }


    async function getSearchHashtags() {
        setLoadingSearchHashtags(true);
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/hashtag/search?q=${searchInput}&page=${1}&limit=${7}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        let responseJson = await response.json();
        if (response.status == 200) {
            var hashtags_ = responseJson.hashtags.docs.map((item) => item);
            setLoadingSearchHashtags(false);
            setSearchHashtags(hashtags_);
        }
    }

    async function changeRelevance(hashtag, value) {
        ;
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/hashtag/change/relevance?hashtagId=${hashtag.id}&value=${value}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        let responseJson = await response.json();
        if (response.status == 200) {
            getUserHashtags();
        }
    }

    return (
        <View>
            <Toast
                position='bottom'
                bottomOffset={20}
            />
            <View style={{ zIndex: -1 }}>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Col size={8}>
                        <TextInput value={searchInput} onChangeText={(value) => {
                            if (value.length >= 3 && value.length <= 32) {
                                setSearchButtonEnabled(true);
                            } else {
                                setSearchButtonEnabled(false);
                            }
                            setSearchInput(value);
                        }} placeholder={'Procurar nova hashtag ...'} />
                    </Col>
                    <Col size={2}>
                        <ModalWithContent
                            buttonAction={getSearchHashtags}
                            buttonEnabled={searchButtonEnabled} button={
                                <View style={{
                                    backgroundColor:
                                        searchButtonEnabled ? globalVars.selectedColors.primary : globalVars.selectedColors.disabled,
                                    borderRadius: 5,
                                    height: 60,
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text>
                                        <MaterialCommunityIcons name="magnify" color={'white'} size={40} />
                                    </Text>
                                </View>
                            }>
                            <Row>
                                <Col>
                                    <Text style={{ fontSize: 12 }}>Buscando por: {searchInput.toLocaleLowerCase().replace('#', '')}</Text>
                                </Col>
                            </Row>
                            <FlatList
                                data={searchHashtags}
                                keyExtractor={(item) => uuid.v5(item.name, 'key')}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return <View style={{ backgroundColor: globalVars.selectedColors.backopaque, padding: 10, margin: 2, borderRadius: 2 }}>
                                        <Row>
                                            <Col>
                                                <Text style={{ fontSize: 18 }}>#{item.name}</Text>
                                                <Text style={{ fontSize: 9, marginVertical: 5 }}>Emits nas últimas 24h: {item.relevance}</Text>
                                            </Col>
                                            <Col style={{ flexDirection: 'row-reverse' }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 10, marginBottom: 3 }}>Seguindo:</Text>
                                                    <Switch value={item.follow} onValueChange={() => {
                                                        var searchHashtags_ = searchHashtags;
                                                        searchHashtags_ = searchHashtags_.map(h => {
                                                            if(item.id == h.id){
                                                                h.follow = !h.follow;
                                                                if(!h.follow){
                                                                    changeRelevance(item, 0);
                                                                }else{
                                                                    followHashtag(item.name);
                                                                }
                                                            }
                                                            return h;
                                                        })
                                                        
                                                        setSearchHashtags(searchHashtags_);
                                                    }} />
                                                </View>
                                            </Col>
                                        </Row>
                                    </View>;
                                }
                                }
                            />
                        </ModalWithContent>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={{ padding: 5, fontSize: 16 }}>Hashtags populares:</Text>
                        {
                            (popularHashtags && popularHashtags.length > 0) ?
                                <FlatList
                                    data={popularHashtags}
                                    keyExtractor={(item) => uuid.v5(item, 'key')}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity style={{ backgroundColor: globalVars.selectedColors.backopaque, padding: 10, margin: 2, borderRadius: 2 }}
                                            onPress={() => {
                                                followHashtag(item);
                                            }}>
                                            <Text style={{ fontSize: 18 }}>#{item}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                                :
                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    {
                                        loadingPopularHashtags ? <ActivityIndicator />
                                            : <Text style={{ margin: 10, backgroundColor: globalVars.selectedColors.secundary, padding: 5, borderRadius: 5 }}>
                                                Nada encontrado por aqui, tente novamente!</Text>
                                    }

                                </View>
                        }

                    </Col>
                </Row>
                <View style={{ minHeight: '69%', width: '100%' }}>
                    <Text style={{ padding: 5, fontSize: 16 }}>Minhas hashtags / relevância pessoal:</Text>
                    {selectedHashtags && selectedHashtags.length > 0 ?
                        <FlatListHashtagManager
                            data={selectedHashtags}
                            refreshing={refreshing}
                            onRefresh={getUserHashtags} />
                        :
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            {
                                loadingPopularHashtags ? <ActivityIndicator />
                                    : <Text style={{ margin: 10, backgroundColor: globalVars.selectedColors.secundary, padding: 5, borderRadius: 5 }}>
                                        Você não esta seguindo nada ainda!
                                    </Text>
                            }

                        </View>
                    }
                </View>
            </View>
        </View>
    );
}

export default HashManageScreen;