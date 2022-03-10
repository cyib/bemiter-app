import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import globalVars from "../../helpers/globalVars";
import IconButton from "../extras/iconButton";

export function Empty({ colors, message, fontSize, iconSize, iconName, withLoader, height }) {
    colors = colors ? colors : {
        border: colors ? colors.border : globalVars.selectedColors.secundary,
        primary: colors ? colors.secundary : globalVars.selectedColors.backgroundSecondColor,
        text: colors ? colors.text : globalVars.selectedColors.text
      };
    let message_ = message ? message : "Sem publicações";
    let fontSize_ = fontSize ? fontSize : 16;
    let iconSize_ = iconSize ? iconSize : 56;
    let iconName_ = iconName ? iconName : 'ghost';

    return (
        <View>
            <View style={{
                alignItems: 'center',
                justifyContent: height ? 'flex-start' : 'center',
                textAlignVertical: 'center',
                minHeight: height ? height : 150
            }}>
                {
                    !withLoader ?
                        <Text>
                            <IconButton icon={iconName_} color={colors.border} size={iconSize_} />
                        </Text> :
                        <View style={{ padding: 10 }}>
                            <ActivityIndicator color={colors.border} size={32} />
                        </View>
                }
                <Text style={{ fontSize: fontSize_, color: colors.text }}>
                    {message_}
                </Text>
            </View>
        </View>
    )
}