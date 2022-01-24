import { Platform } from "react-native";
import { apiUrl } from "./environment";
import { getData } from './cache';

export default async function uploadFile(singleFile, description, subtitle) {
    console.log('UPLOADING FILE ...');
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
        let res = await fetch(`${apiUrl}/user/newpost`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            body: data,
        });
        let responseJson = await res.json();
        console.warn('DONE');
        if (responseJson.status == 200) {
            console.log('Upload Successful');
            return ('Upload Successful');
        }
    } else {
        console.warn('Please Select File first');
        return ('Please Select File first');
    }
}

function typeFile(file) {
    if (file.uri.indexOf('.jpg') != -1) return { complete: 'image/jpeg', ext: '.jpg', name: 'image.jpg' };
    if (file.uri.indexOf('.png') != -1) return { complete: 'image/png', ext: '.png', name: 'image.png' };
    if (file.uri.indexOf('.mov') != -1) return { complete: 'video/mov', ext: '.mov', name: 'video.mov' };
    if (file.uri.indexOf('.mp4') != -1) return { complete: 'video/mp4', ext: '.mp4', name: 'video.mp4' };
}