import React from "react";
import {
    ImageBackground,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    StyleSheet, Text, View,
    TextInput,
    Image
} from "react-native";
import { Button } from "react-native-paper";
import globalVars from "../helpers/globalVars";

const image = { uri: "https://i.imgur.com/l1GfwNJ.gif" };

const LoginScreen = (props) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <View style={styles.card}>
                <View style={{width: 200, marginTop: 20}}>
                    <Text style={{ 
                        fontSize: 42,
                        color: 'white', 
                        width: '100%', 
                        textAlign: 'center'
                    }}>
                    𝔟𝔢𝔪𝔦𝔱𝔢𝔯
                    </Text>
                </View>
                <TextInput style={styles.input}>Login</TextInput>
                <TextInput secureTextEntry={true} style={styles.input}>Password</TextInput>
                <TouchableOpacity style={styles.button}
                onPress={() => props.setIsLogged(true)}>
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                    }}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
);

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
        backgroundColor: "#000000d0",
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