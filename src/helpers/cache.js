import AsyncStorage from '@react-native-async-storage/async-storage';
import globalVars from './globalVars';

export async function setData(key, value){
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.warn('ERRO AO SALVAR');
    }
}

export async function getData(key){
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return null;
    }
}

export async function removeData(key){
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.warn('ERRO AO DELETAR');
    }
}