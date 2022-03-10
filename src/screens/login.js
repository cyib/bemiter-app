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

const image = { uri: "https://i.pinimg.com/originals/05/7b/2b/057b2be2e40c928f071a47a50769cdf6.jpg" };

const LoginScreen = (props) => {

    var [login, setLogin] = useState(null);
    var [password, setPassword] = useState(null);

    const OnSubmitLogin = async () => {
        let res = await fetch(`${apiUrl}/auth/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login,
                password
            }),
        });

        let responseJson = await res.json();
        ;
        if (res.status == 200) {
            ;
            await setData('token', responseJson.token);
            await setData('userInfo', responseJson.User);
            props.setIsLogged(true);
        }else if(res.status == 401){
            Alert.alert(responseJson.message);
        }else{
            Alert.alert('server error');
        }

        //
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.card}>
                    <View style={{ width: 200, marginTop: 20 }}>
                        <Text style={{
                            fontSize: 36,
                            color: 'white',
                            width: '100%',
                            textAlign: 'center'
                        }}>
                            𝗕𝗘𝗠𝗜𝗧𝗘𝗥
                        </Text>
                    </View>
                    <TextInput
                        placeholderTextColor="#ffffff9f"
                        style={styles.input}
                        secureTextEntry={false}
                        placeholder="Username ou email"
                        onChangeText={(value) => setLogin(value)}></TextInput>
                    <TextInput
                        placeholderTextColor="#ffffff9f"
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Senha"
                        onChangeText={(value) => setPassword(value)}></TextInput>
                    <TouchableOpacity style={styles.button}
                        onPress={() => OnSubmitLogin()}>
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                        }}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0
    },
    button: {
        width: '50%',
        backgroundColor: 'grey',
        color: 'white',
        padding: 10,
        marginTop: 15,
        marginBottom: 25,
        alignItems: 'center',
        marginHorizontal: 75,
        borderRadius: 5
    },
    input: {
        width: '90%',
        margin: 10,
        borderRadius: 2,
        zIndex: 9999,
        color: 'white',
        backgroundColor: '#369ae1FF',
        borderColor: globalVars.defaultTheme.secundaryColor,
        borderWidth: 1,
        padding: Platform.OS == 'ios' ? 15 : 8
    },
    image: {
        flex: 1,
        justifyContent: "center",
        zIndex: -1
    },
    card: {
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: "#000000e0",
        zIndex: 0
    },
    text: {
        color: "white",
        fontSize: 32,
        lineHeight: 64,
        padding: 10,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default LoginScreen;