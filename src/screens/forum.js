import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import Post from "../components/post/post";
import TopLoading from "../components/extras/topLoading";
import StoryMiniature from "../components/story/miniature";
import globalVars from "../helpers/globalVars";
import { pauseAllVideos } from "../helpers/utils";
import postTemplates from "../helpers/postTemplates";

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
                <Post
                    data={postTemplates.text}
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