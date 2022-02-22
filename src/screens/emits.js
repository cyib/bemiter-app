import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import globalVars from "../helpers/globalVars";
import HomeEmitFeed from "../components/emitFeed/home";
import ActionButton from "../components/extras/actionButton";

const EmitsScreen = () => {

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
                <Text style={{
                    fontSize: 10,
                    marginVertical: 10,
                    marginLeft: 5, left: 0,
                }}>alpha v1.0</Text>
                <View style={{
                    width: 50, height: 50,
                    position: 'absolute', right: 50,
                    padding: 5, marginTop: 5
                }} onTouchStart={() => { navigation.navigate('CreateFeed') }}>
                    <Text>
                        <MaterialCommunityIcons name="format-list-bulleted" color={globalVars.selectedColors.placeholder} size={40} />
                    </Text>
                </View>
                <View style={{
                    width: 50, height: 50,
                    position: 'absolute', right: 0,
                    padding: 5, marginTop: 5
                }} onTouchStart={() => { navigation.navigate('CreateFeed') }}>
                    <Text>
                        <MaterialCommunityIcons name="chat-plus-outline" color={globalVars.selectedColors.placeholder} size={40} />
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: globalVars.selectedColors.secundary }} />
            <HomeEmitFeed/>
        </View>
    );

    function NewEmitFloatButton({  }){
        const floatButtonSize = 50;
        var fromBottomPosition = 128;

        return (<View style={{ padding: 5, borderRadius: 5, position: 'absolute',
        bottom: fromBottomPosition, right: 10, borderWidth: 1, borderColor: globalVars.selectedColors.placeholder, backgroundColor: globalVars.selectedColors.primary }}>
            <ActionButton iconInit={'chat-plus-outline'} size={floatButtonSize - 10} withoutTouch={true} color={globalVars.selectedColors.text} />
        </View>)
    }
}

export default EmitsScreen;