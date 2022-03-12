import { Platform } from "react-native";
import { apiUrl } from "./environment";
import { getData } from './cache';

export default async function uploadFile(singleFile, description, subtitle, profilePhoto) {
    var token = await getData('token');
    if (singleFile != null) {
        const data = new FormData();
        data.append('file', {
            uri: Platform.OS == 'ios' ? singleFile.uri.replace('file://', '') : singleFile.uri,
            name: typeFile(singleFile).name,
            type: typeFile(singleFile).complete
        });
        data.append('description', description);
        data.append('subtitle', subtitle);
        // Please change file upload URL
        let res = await fetch(`${apiUrl}/user/newpost${profilePhoto ? '?profile=true' : ''}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        });
        let responseJson = await res.json();
        
        if (res.status == 200) {
            return {
                status: 200,
                message: 'post created'
            }
        }
    } else {
        console.warn('Please Select File first');
        return {
            status: 404,
            message: 'please Select File first'
        };
    }
}

function typeFile(file) {
    if (file.uri.indexOf('.jpg') != -1) return { complete: 'image/jpeg', ext: '.jpg', name: 'image.jpg' };
    if (file.uri.indexOf('.png') != -1) return { complete: 'image/png', ext: '.png', name: 'image.png' };
    if (file.uri.indexOf('.mov') != -1) return { complete: 'video/mov', ext: '.mov', name: 'video.mov' };
    if (file.uri.indexOf('.mp4') != -1) return { complete: 'video/mp4', ext: '.mp4', name: 'video.mp4' };
}