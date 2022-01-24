import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, NativeModules } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import globalVars from '../helpers/globalVars';
import { removeData, setData } from '../helpers/cache';

const SettingsScreen = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Mudar tema</Text>
            <Button onPress={async () => {
                globalVars.theme.mode = 'dark';
                setData('userTheme', 'dark').then(() => {
                    NativeModules.DevSettings.reload();
                });
            }}>DARK</Button>
            <Button onPress={async () => {
                globalVars.theme.mode = 'default';
                setData('userTheme', 'default').then(() => {
                    NativeModules.DevSettings.reload();
                });
            }}>DEFAULT</Button>
            <Button onPress={async () => {
                console.log('apagando cache ...');
                await removeData('userTheme');
            }}>APAGAR CACHE</Button>
            <Button onPress={async () => {
                console.log('fazendo logout ...');
                await removeData('token');
                NativeModules.DevSettings.reload();
            }}>LOGOUT</Button>
            {/* <Button onPress={() => navigation.navigate("Stack")}>CHANGE</Button> */}
        </View>
    );
}

export default SettingsScreen;