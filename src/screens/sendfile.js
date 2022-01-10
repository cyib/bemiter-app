import React, { useState, useEffect } from 'react';
import { Text, Image, View, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import globalVars from '../helpers/globalVars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function SendFile() {
    const [file, setFile] = useState(null);
    const [type, setType] = useState(null);

    const navigation = useNavigation();

    const pickFile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            videoMaxDuration: 10,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setFile(result);
            navigation.navigate('EditorFeed', {
                file: result
            })
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={pickFile} style={{
                backgroundColor: globalVars.selectedColors.primary,
                alignContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginHorizontal: 2,
                padding: 20
            }}>
                <MaterialCommunityIcons name={'cloud-upload'} color={'white'} size={72} />
                <Text style={{fontSize: 16, color: 'white' }}>Escolher foto ou vídeo</Text>
            </TouchableOpacity>
        
        </View>
    );
}