import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, NativeModules } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import globalVars from '../helpers/globalVars';
import { removeData, setData } from '../helpers/cache';

const SettingsScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ height: '100%' }}>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                globalVars.theme.mode = 'dark';
                setData('userTheme', 'dark').then(() => {
                    NativeModules.DevSettings.reload();
                });
            }}>Tema escuro</Button>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                globalVars.theme.mode = 'default';
                setData('userTheme', 'default').then(() => {
                    NativeModules.DevSettings.reload();
                });
            }}>Tema claro</Button>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                ;
                await removeData('userTheme');
            }}>APAGAR CACHE</Button>
            <Button style={{ backgroundColor: 'white', marginBottom: 5 }} color={'black'} onPress={async () => {
                ;
                await removeData('token');
                NativeModules.DevSettings.reload();
            }}>Sair da conta</Button>
        </View>
    );
}

export default SettingsScreen;