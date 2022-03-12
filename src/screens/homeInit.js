import React, { useState } from "react";
import {
    ImageBackground,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    StyleSheet, Text, View,
    TextInput,
    Image,
    Alert
} from "react-native";
import { Button } from "react-native-paper";
import { apiUrl } from "../helpers/environment";
import globalVars from "../helpers/globalVars";
import { setData, getData } from '../../src/helpers/cache';
import LogInScreen from "./homeLogIn";
import SignInScreen from "./homeSignUp";

const HomeInitScreen = (props) => {

    var [pageName, setPageName] = useState('login');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            {
                pageName == 'login' ?
                    <LogInScreen goToPage={setPageName} setIsLogged={props.setIsLogged}/>
                    :
                    <SignInScreen goToPage={setPageName} setIsLogged={props.setIsLogged}/>
            }

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0
    },
});

export default HomeInitScreen;