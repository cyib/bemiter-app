import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import globalVars from "../../helpers/globalVars";
import uuid from 'react-native-uuid';
import { Col, Row } from "react-native-paper-grid";
import { Icon, Slider } from "react-native-elements";
import { getData } from "../../helpers/cache";
import { apiUrl } from "../../helpers/environment";
import Toast from 'react-native-toast-message';

const FlatListHashtagManager = ({ data, refreshing, onRefresh }) => {
    var [scrollEnabled, setScrollEnabled] = useState(true);

    const HashtagItem = ({ item, index }) => {

        const [sliderValue, setSliderValue] = useState(item.relevance);
        const [deleteItem, setDeleteItem] = useState(false);
        const [editMode, setEditMode] = useState(false);

        async function changeRelevance(value) {
            let userToken = await getData('token');
            let response = await fetch(`${apiUrl}/hashtag/change/relevance?userhashtagid=${item.id}&value=${value}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            });

            let responseJson = await response.json();
            if (response.status == 200) {
                if (value == 0) {
                    setDeleteItem(true);
                    Toast.show({
                        type: 'success',
                        text1: `Hashtag "${item.Hashtag.name}" removida!`
                    });
                    onRefresh();
                } else {
                    Toast.show({
                        type: 'success',
                        text1: `Relevância para "${item.Hashtag.name}" alterada para ${value}!`
                    });
                }
            }
        }

        useEffect(() => {

        }, [deleteItem]);

        return <>
            <View style={{ display: deleteItem ? 'none' : 'flex' }}>
                <Row style={{
                    width: '95%',
                    flexDirection: 'row', margin: 2,
                    marginHorizontal: 10, borderRadius: 5,
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: globalVars.selectedColors.secundary,
                }}>
                    <Col size={2}>
                        <TouchableOpacity style={{
                            marginVertical: 0,
                            //backgroundColor: globalVars.selectedColors.primary,
                            padding: 5, paddingVertical: 10,
                            borderRadius: 5
                        }} onPress={() => {
                            setEditMode(!editMode);
                        }}>
                            <Icon
                                name={editMode ? "check" : "edit"}
                                color={globalVars.selectedColors.text}
                                size={16}
                            />
                        </TouchableOpacity>
                    </Col>
                    <Col size={8}>
                        <View style={{
                            padding: 15,
                            paddingLeft: 0,
                            flexDirection: 'row', flexGrow: 1,
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Text numberOfLines={1} style={{ fontSize: 18, }}>#{item.Hashtag.name}</Text>
                            </ScrollView>

                        </View>
                    </Col>
                    <Col size={2}>
                        {editMode ? 
                        <TouchableOpacity style={{
                            marginVertical: 0,
                            backgroundColor: globalVars.selectedColors.primary,
                            padding: 5, paddingVertical: 10,
                            borderRadius: 5
                        }} onPress={() => {
                            changeRelevance(0);
                        }}>
                            <Icon
                                name="trash"
                                type="font-awesome"
                                color={globalVars.selectedColors.text}
                                size={16}
                            />
                        </TouchableOpacity>
                        : null}
                    </Col>
                    <Col size={4} style={{
                        padding: 0, marginTop: 10, paddingHorizontal: 20,
                        borderRadius: 5
                    }}>
                        {
                            !editMode ?
                            <View style={{ position: 'absolute', top: -15, left: 10, backgroundColor:'transparent', height: '100%', width: '125%', zIndex: 999 }}/>
                            : null
                        }
                        <Text style={{ marginVertical: -10, fontSize: 10 }}>Relevância:</Text>
                        <Slider
                            onSlidingComplete={(value) => { 
                                changeRelevance(value); 
                            }}
                            thumbStyle={{
                                height: 0,
                                width: 10,
                                backgroundColor: 'transparent'
                            }}
                            minimumTrackTintColor={globalVars.selectedColors.primary}
                            thumbProps={{
                                children: (
                                    <Icon
                                        name={editMode ? "adjust" : "circle"}
                                        type="material-design"
                                        size={5}
                                        color={editMode ? globalVars.selectedColors.primary : 'transparent'}
                                        containerStyle={{ bottom: 14, right: 10 }}
                                        reverse={true}
                                    />
                                ),
                            }}
                            value={sliderValue}
                            onValueChange={(value) => { 
                                setSliderValue(value); 
                            }}
                            maximumValue={100}
                            minimumValue={0}
                            step={10}
                        />
                    </Col>
                    <Col size={2}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>{sliderValue}</Text>
                        </View>
                    </Col>
                </Row>
            </View>
        </>
    }

    return (
        <FlatList
            style={{ height: '50%', width: '100%' }}
            scrollEnabled={scrollEnabled}
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <HashtagItem item={item} index={index} />}
        />
    );
}

export default FlatListHashtagManager;