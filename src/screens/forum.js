import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import Post from "../components/post/default";
import TopLoading from "../components/extras/topLoading";
import StoryMiniature from "../components/story/miniature";
import globalVars from "../helpers/globalVars";
import { pauseAllVideos } from "../helpers/utils";

const ForumScreen = () => {

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
                    fontSize: 28,
                    marginVertical: 10,
                    marginLeft: 10, left: 0
                }}>𝔟𝔢𝔪𝔦𝔱𝔢𝔯</Text>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: globalVars.selectedColors.secundary }} />
            <ScrollView scrollEnabled={scrollEnabled} showsVerticalScrollIndicator={false}
                onScrollBeginDrag={() => pauseAllVideos()}>
                <View style={{ height: 1, width: '100%', backgroundColor: globalVars.selectedColors.secundary }} />
                <Post
                    type={'text'}
                    content={`"I believe we can keep the promise of our founders, the idea that if you're willing to work hard, it doesn't matter who you are or where you come from or what you look like or who you love. It doesn't matter whether you're black or white or Hispanic or Asian or Native American or young or old or rich or poor, able, disabled, gay or straight, you can make it here in America if you're willing to try." - Barack Obama`}
                />
                <Post
                    type={'text'}
                    content="Hoje deu uma preguiça 🥱😴😴"
                />
                <View style={{
                    backgroundColor: globalVars.selectedColors.background,
                    minHeight: 500, width: '100%'
                }} />
            </ScrollView>
        </View>
    );
}

export default ForumScreen;