import { Platform } from "react-native";

export function pauseAllVideos(){
    if(global.videosRefs){
        for (let i = 0; i < global.videosRefs.length; i++) {
            const videoRef = global.videosRefs[i];
            videoRef.setIsPlaying(false);
        }
    }
}

export function muteAllVideos(muted){
    if(global.videosRefs){
        for (let i = 0; i < global.videosRefs.length; i++) {
            const videoRef = global.videosRefs[i];
            videoRef.setIsMuted(muted);
        }
    }
}


export function processDatePost(date){
    var day = (date).getDate();
    day = ('0' + day).slice(-2);
    
    var monthLabel = date.toLocaleString('pt-BR', { month: 'short' }).toString().replace(".", "");
    if(Platform.OS == 'android') monthLabel = monthLabel.split(' ')[1];
    return { day, monthLabel }
}
