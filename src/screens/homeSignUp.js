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
    ScrollView,
    Dimensions
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { apiUrl } from "../helpers/environment";
import globalVars from "../helpers/globalVars";
import { setData, getData } from '../helpers/cache';
import { Col, Row } from "react-native-paper-grid";
import IconButton from "../components/extras/iconButton";
import { validateEmail } from "../helpers/utils";

const image = { uri: null };

const SignInScreen = (props) => {

    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConfirm, setPasswordConfirm] = useState('');

    var [validUsername, setValidUsername] = useState(false);
    var [editing, setEditing] = useState(false);

    var [loadingForm, setLoadingForm] = useState(false);

    var [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoadingForm(false);
        }, 1200);
    }, []);

    useEffect(() => {

    }, [username, validUsername, editing]);

    const checkUsername = async (username_) => {
        try {
            if (username_.length < 4) {
                setValidUsername(false);
                return;
            }

            let res = await fetch(`${apiUrl}/user/check?username=${username_}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
            });

            if (res.status == 200) {
                setValidUsername(true);
            } else {
                setValidUsername(false);
            }
        } catch (error) {
            Alert.alert('Falha no servidor', 'Ops, nosso servidor esta com problemas, tente novamente mais tarde.');;
        }
    }

    async function registerUser() {
        if(!validUsername){
            Alert.alert('Ops, algo deu errado!','Este usuário não é válido, verifique e tente novamente!');
            return;
        }
        
        if(name.length == 0){
            Alert.alert('Ops, algo deu errado!','O nome deve ser preenchido corretamente, verifique e tente novamente!');
            return;
        }

        if(email.length == 0 || !validateEmail(email)){
            Alert.alert('Ops, algo deu errado!','E-mail inválido, verifique e tente novamente!');
            return;
        }

        if(password.length < 8 || password.length > 32){
            Alert.alert('Ops, algo deu errado!','A senha deve ser preenchida corretamente (min. 8, max. 32), verifique e tente novamente!');
            return;
        }
        
        setLoading(true);
        try {
            let res = await fetch(`${apiUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    name,
                    email,
                    password
                }),
            });
    
            if (res.status == 200) {
                Alert.alert('Cadastro feito com sucesso!', 'Agora é só fazer login :)');
                props.goToPage('login');
                setLoading(false);
            }else{
                Alert.alert('Ocorreu um erro!', 'Falha ao realizar o cadastro');
                setLoading(false);
            }
        } catch (error) {
            Alert.alert('Falha no servidor', 'Ops, nosso servidor esta com problemas, tente novamente mais tarde.');;
            setLoading(false);
        }
    }

    return (<>
        {
            loadingForm ?
                <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={"large"} />
                    </View>
                </ImageBackground>

                :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={styles.container}>
                    <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
                        <View style={styles.card}>
                            <View style={{ width: 200, marginTop: 20, marginBottom: 10 }}>
                                <Text style={{
                                    fontSize: 28,
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    𝗕𝗘𝗠𝗜𝗧𝗘𝗥
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: -5
                                }}>
                                    Criando nova conta
                                </Text>
                            </View>
                            <Row>
                                <Col size={11}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            placeholderTextColor="#ffffff9f"
                                            autoComplete="off"
                                            style={styles.input}
                                            secureTextEntry={false}
                                            value={username}
                                            numberOfLines={1}
                                            placeholder="Usuário"
                                            onChangeText={(value) => {
                                                setUsername(value.replace(/\s/g, ''));
                                                setEditing(true);
                                            }}
                                            onEndEditing={() => {
                                                setEditing(false);
                                                let usernameChecked = username.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '');
                                                setUsername(usernameChecked);
                                                checkUsername(usernameChecked);
                                            }}></TextInput>
                                        {editing || (!username || username && username.length == 0) ? <IconButton icon={'alert-circle-outline'} size={32} /> : null}
                                        {!editing && (username && username.length > 0 && validUsername) ? <IconButton icon={'check-circle-outline'} color={'#0fb100'} size={32} /> : null}
                                        {!editing && (username && username.length > 0 && !validUsername) ? <IconButton icon={'close-circle-outline'} color={'#ff3030'} size={32} /> : null}
                                    </View>
                                </Col>
                                <Col size={1} >
                                </Col>
                            </Row>

                            <TextInput
                                placeholderTextColor="#ffffff9f"
                                autoComplete="off"
                                style={styles.input}
                                secureTextEntry={false}
                                placeholder="Nome"
                                onChangeText={(value) => setName(value)}></TextInput>
                            <TextInput
                                placeholderTextColor="#ffffff9f"
                                autoComplete="off"
                                style={styles.input}
                                secureTextEntry={false}
                                placeholder="E-mail"
                                value={email}
                                onChangeText={(value) => setEmail(value.replace(/\s/g, ''))}></TextInput>
                            <TextInput
                                placeholderTextColor="#ffffff9f"
                                autoComplete="off"
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder="Senha"
                                onChangeText={(value) => setPassword(value)}></TextInput>
                            <TouchableOpacity style={styles.button}
                                disabled={loading}
                                onPress={() => registerUser()}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18,
                                }}>{ loading ? 'Registrando ...' : 'Registrar' }</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            paddingTop: 15,
                            alignItems: 'center',
                            textAlign: "center",
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#000000b1',
                                borderWidth: 1,
                                borderColor: '#000000b1',
                                borderRadius: 3,
                                padding: 10, paddingHorizontal: 20,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }} onPress={() => { props.goToPage('login') }}>
                                <Text style={{ fontSize: 13, color: 'white' }}>
                                    {'←'} Já tenho registro, fazer login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
        }
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0
    },
    button: {
        width: '50%',
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
        height: Dimensions.get('screen').height,
        zIndex: -1
    },
    card: {
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: '#000000b1', //"#000000e0",
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

export default SignInScreen;