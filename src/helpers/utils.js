import { Platform } from "react-native";
import { removeData } from "./cache";

export async function logout() {
    await removeData('token');
    global.globalRefresh();
}

export function pauseAllVideos() {
    if (global.videosRefs) {
        for (let i = 0; i < global.videosRefs.length; i++) {
            const videoRef = global.videosRefs[i];
            videoRef.setIsPlaying(false);
        }
    }
}

export function autoplayIndex(index) {
    if (global.postsRefs) {
        const videoRef = global.postsRefs[index];
        videoRef.setIsPlaying(true);
    }
}

export function muteAllVideos(muted) {
    if (global.videosRefs) {
        for (let i = 0; i < global.videosRefs.length; i++) {
            const videoRef = global.videosRefs[i];
            videoRef.setIsMuted(muted);
        }
    }
}


export function processDatePost(date) {
    var day = (date).getDate();
    day = ('0' + day).slice(-2);

    var monthLabel = date.toLocaleString('pt-BR', { month: 'short' }).toString().replace(".", "");
    if (Platform.OS == 'android') monthLabel = monthLabel.split(' ')[1];
    return { day, monthLabel }
}

export function groupArr(data, n) {
    return data.reduce((r, e, i) =>
        (i % n ? r[r.length - 1].push(e) : r.push([e])) && r
        , []);
}

export function diffTime(firstTap, secondTap) {
    var diffMs = (secondTap - firstTap);
    return diffMs;
}

export function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}