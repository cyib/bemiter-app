import React, { useState, useEffect } from 'react';
import { Text, Image, View, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import globalVars from '../helpers/globalVars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function SendFile({ profilePhoto }) {
    const [file, setFile] = useState(null);
    const [type, setType] = useState(null);

    const navigation = useNavigation();

    const pickFile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: profilePhoto ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.All,
            videoMaxDuration: 600,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setFile(result);
            if(profilePhoto) global.lastModalVisibility(false);
            navigation.navigate('EditorFeed', {
                file: result,
                profilePhoto: profilePhoto ? profilePhoto : false
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
                <Text style={{fontSize: 16, color: 'white' }}>{
                    profilePhoto ? 
                    'Escolher foto de perfil'
                    :
                    'Escolher foto ou vídeo'
                }</Text>
            </TouchableOpacity>
        
        </View>
    );
}