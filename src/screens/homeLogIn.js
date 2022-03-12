import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    StyleSheet, Text, View,
    TextInput,
    Image,
    Alert,
    Dimensions
} from "react-native";
import { Button } from "react-native-paper";
import { alphaMode, apiUrl } from "../helpers/environment";
import globalVars from "../helpers/globalVars";
import { setData, getData } from '../../src/helpers/cache';
import ModalWithContent from "../components/extras/modalWithContent";
import ModalPromptBasic from "../components/extras/modalPromptBasic";
import { Col, Row } from "react-native-paper-grid";

const image = { uri: null };

const LogInScreen = (props) => {
    var [login, setLogin] = useState(null);
    var [password, setPassword] = useState(null);

    var [working, setWorking] = useState(false);

    const OnSubmitLogin = async () => {
        setWorking(true);

        if (!login || login == '' || !password || password == '') {
            Alert.alert('Preecha todos os campos!');
            setWorking(false);
            return null;
        }

        try {

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
            if (res.status == 200) {
                await setData('token', responseJson.token);
                await setData('userInfo', responseJson.User);
                props.setIsLogged(true);
            } else if (res.status == 401) {
                let error = responseJson.message;
                if (responseJson.message == 'user not found or invalid password') error = 'Usuário ou senha inválidos';
                Alert.alert(error);
                setWorking(false);
            } else {
                Alert.alert('Ops, nosso servidor esta com problemas, tente novamente mais tarde. (Login)');
                setWorking(false);
            }
        } catch (error) {
            Alert.alert('Ops, nosso servidor esta com problemas, tente novamente mais tarde. (API)');
            setWorking(false);
        }
    }

    useEffect(() => {

    }, [working]);

    return (
        <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.card}>
                <View style={{ width: 200, marginTop: 20, marginBottom: 10 }}>
                    <Text style={{
                        fontSize: 36,
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        𝗕𝗘𝗠𝗜𝗧𝗘𝗥
                    </Text>
                    <Text style={{
                        fontSize: 9,
                        color: 'white',
                        textAlign: 'center',
                        marginTop: -10
                    }}>
                        version: alpha members 1.0
                    </Text>
                </View>
                <TextInput
                    placeholderTextColor="#ffffff9f"
                    style={styles.input}
                    secureTextEntry={false}
                    value={login}
                    placeholder="Usuário ou email"
                    onChangeText={(value) => setLogin(value.replace(/\s/g, ''))}></TextInput>
                <TextInput
                    placeholderTextColor="#ffffff9f"
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Senha"
                    onChangeText={(value) => setPassword(value)}></TextInput>
                <TouchableOpacity style={styles.button}
                    disabled={working}
                    onPress={() => OnSubmitLogin()}>
                    <Text style={{
                        color: 'white',
                        fontSize: working ? 14 : 18,
                    }}>{working ? 'Carregando ...' : 'Entrar'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                paddingTop: 15,
                alignItems: 'center',
                textAlign: "center",
            }}>
                <ButtonGoSignUpScreen withCheck={alphaMode}/>
            </View>
        </ImageBackground>
    );

    function ButtonGoSignUpScreen({ withCheck }) {

        if(!withCheck) {
            return <TouchableOpacity style={styles.buttonSignUp} onPress={() => { props.goToPage('register'); }}>
            <Text style={{ fontSize: 14, color: 'white' }}>Não tenho uma conta, criar agora {'→'}</Text>
        </TouchableOpacity>
        }
        const [checking, setChecking] = useState(false);
        const [key, setKey] = useState('');

        useEffect(() => {
            
        }, [key]);

        async function checkKey() {
            setChecking(true);
            if(key == '' || key.length < 3) {
                Alert.alert('Chave incorreta', 'Por favor, insira uma chave de acesso válida!');
                setChecking(false);
                return;            
            }
            try {
                let key_ = key.replace(/\s/g, '').toLowerCase();
                let res = await fetch(`${apiUrl}/status/keycheck/${key_}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                });

                if (res.status == 200) {
                    let responseJson = await res.json();
                    Alert.alert(responseJson.title, responseJson.message);
                    props.goToPage('register');
                }else{
                    setChecking(false);
                    Alert.alert('Chave inválida', 'Por favor, insira uma chave de acesso válida!');
                }
            } catch (error) {
                setChecking(false);
                Alert.alert('Falha no servidor', 'Ops, nosso servidor esta com problemas, tente novamente mais tarde.');
            }
        }

        return <ModalPromptBasic
            backgroundColor={'#000000'}
            buttonEnabled={true}
            maxHeight={300}
            button={<View style={styles.buttonSignUp}>
                <Text style={{ fontSize: 14, color: '#FFF' }}>Não tenho uma conta, criar agora {'→'}</Text>
            </View>}
        >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Row>
                    <Col>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Chave de acesso</Text>
                            <Text style={{ fontWeight: 'normal', fontSize: 13, textAlign: 'center', marginTop: 5, color: 'white' }}>Estamos em fase de acesso antecipado, por favor insira o código que recebeu no convite</Text>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <TextInput
                            placeholderTextColor="#ffffff9f"
                            autoFocus={true}
                            style={styles.input}
                            secureTextEntry={false}
                            placeholder="Digite seu código aqui"
                            onChangeText={(value) => setKey(value)}></TextInput>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity disabled={checking} style={{ borderWidth: 1, borderColor: globalVars.selectedColors.primary , padding: 10, paddingHorizontal: 30}}
                            onPress={() => {checkKey();}}>
                                <Text style={{ color: globalVars.selectedColors.primary }}>{ checking ? 'Verificando chave' : 'OK'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Col>
                </Row>
            </View>
        </ModalPromptBasic>
    }
}

const styles = StyleSheet.create({
    buttonSignUp: {
        backgroundColor: '#000000b1',
        borderWidth: 1,
        borderColor: '#000000b1',
        borderRadius: 3,
        padding: 10, paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        zIndex: 0
    },
    button: {
        width: '60%',
        backgroundColor: globalVars.defaultTheme.primaryColor,
        borderWidth: 1,
        borderColor: globalVars.defaultTheme.secundaryColor,
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
        backgroundColor: '#000000b1',
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

export default LogInScreen;