import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, NativeModules } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import globalVars from '../helpers/globalVars';
import { removeData, setData } from '../helpers/cache';
import { logout } from "../helpers/utils";

const SettingsScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ height: '100%' }}>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                globalVars.theme.mode = 'dark';
                setData('userTheme', 'dark').then(() => {
                    global.globalRefresh();
                    setTimeout(() => {
                        navigation.goBack();
                    }, 200);
                });
            }}>Tema escuro</Button>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                globalVars.theme.mode = 'default';
                setData('userTheme', 'default').then(() => {
                    global.globalRefresh();
                    setTimeout(() => {
                        navigation.goBack();
                    }, 200);
                   
                });
            }}>Tema claro</Button>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                await removeData('userTheme');
                await removeData('token');
                global.globalRefresh();
            }}>APAGAR TODO CACHE</Button>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                logout();
            }}>Sair da conta</Button>
        </View>
    );
}

export default SettingsScreen;