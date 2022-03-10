import { Dimensions, TouchableOpacity, View } from "react-native";
import React from 'react';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ActionButton from "./actionButton";
import globalVars from "../../helpers/globalVars";

export default function floatButton({  }){
    const tabHeight = useBottomTabBarHeight();
    const floatButtonSize = 50;
    const fromBottomPosition = floatButtonSize + tabHeight - 10;
    ;

    return (<TouchableOpacity style={{ padding: 5, borderRadius: 5, position: 'absolute', bottom: fromBottomPosition, right: 10, borderWidth: 1, borderColor: globalVars.selectedColors.placeholder, backgroundColor: globalVars.selectedColors.primary }}>
        <ActionButton iconInit={'pencil-box-outline'} size={floatButtonSize - 10} withoutTouch={true} color={globalVars.selectedColors.text} />
    </TouchableOpacity>)
}