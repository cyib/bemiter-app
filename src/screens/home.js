import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import Post from "../components/post/default";
import TopLoading from "../components/extras/topLoading";
import StoryMiniature from "../components/story/miniature";
import globalVars from "../helpers/globalVars";
import { pauseAllVideos } from "../helpers/utils";
import ComponentFeed from "../components/feed/home";
import Modal from "../components/story/default";

const HomeScreen = () => {

    const navigation = useNavigation();
    var [scrollEnabled, setScrollEnabled] = useState(true);

    return (
        <View style={{ backgroundColor: globalVars.selectedColors.background }}>
            <View style={{
                backgroundColor: globalVars.selectedColors.background,
                height: 55, width: '100%',
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontSize: 24,
                    marginVertical: 10,
                    marginLeft: 10, left: 0
                }}>𝗕𝗘𝗠𝗜𝗧𝗘𝗥</Text>
                <View style={{
                    width: 50, height: 50,
                    position: 'absolute', right: 0,
                    padding: 5, marginTop: 5
                }} onTouchStart={() => { navigation.navigate('CreateFeed') }}>
                    <Text>
                        <MaterialCommunityIcons name="plus-box" color={globalVars.selectedColors.placeholder} size={40} />
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: globalVars.selectedColors.secundary }} />
                <ComponentFeed/>
        </View>
    );
}

export default HomeScreen;