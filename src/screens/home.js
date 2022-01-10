import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import Post from "../components/post/default";
import TopLoading from "../components/extras/topLoading";
import StoryMiniature from "../components/story/miniature";
import globalVars from "../helpers/globalVars";
import { pauseAllVideos } from "../helpers/utils";

const HomeScreen = () => {

    const navigation = useNavigation();
    var [scrollEnabled, setScrollEnabled] = useState(true);

    return (
        <View style={{ backgroundColor: globalVars.selectedColors.background }}>
            <View style={{
                backgroundColor: globalVars.selectedColors.background,
                height: 55, width: '100%',
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontSize: 28,
                    marginVertical: 10,
                    marginLeft: 10, left: 0
                }}>𝔟𝔢𝔪𝔦𝔱𝔢𝔯</Text>
                <View style={{
                    width: 50, height: 50,
                    position: 'absolute', right: 0,
                    padding: 5, marginTop: 5
                }} onTouchStart={() => { navigation.navigate('CreateFeed') }}>
                    <Text>
                        <MaterialCommunityIcons name="plus-box" color={globalVars.selectedColors.placeholder} size={40} />
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: globalVars.selectedColors.secundary }} />
            <ScrollView scrollEnabled={scrollEnabled} showsVerticalScrollIndicator={false}
                onScrollBeginDrag={() => pauseAllVideos()}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <StoryMiniature />
                    <StoryMiniature />
                    <StoryMiniature />
                    <StoryMiniature />
                    <StoryMiniature />
                    <StoryMiniature />
                    <StoryMiniature />
                </ScrollView>
                <View style={{ height: 1, width: '100%', backgroundColor: globalVars.selectedColors.secundary }} />
                <Post
                    type={'catalog'}
                    catalogSource={`https://gacomunicacao.com.br/wp-content/uploads/2018/01/Chicken-On-The-Barbie-1-1024x685.jpg`}
                    catalogTitle={`OUTBACK EXPERIENCE`}
                    catalogDescription={`MENU DE ALMOÇO`}
                />
                <Post
                    type={'event'}
                    eventSource={`https://www.housemag.com.br/www/img_notc/notc_2762.jpg`}
                    eventTitle={`Alok Vibes 2022`}
                    eventDescription={`NEVER GIVE UP!!`}
                    eventStart={new Date('11/03/2022')}
                    eventEnd={new Date()}
                />
                <Post
                    name={'Lucas Borges'}
                    subtitle={'Cuiabá'}
                    profileImage={'https://ipfs.io/ipfs/QmfTYg7mNSSuHqXyX3fvP9tFAYahWjqTrbLH7nBhUTsL5u'}
                    type={'photo'}
                    createdAt={new Date()}
                />
                <Post
                    type={'text'}
                    content={`"I believe we can keep the promise of our founders, the idea that if you're willing to work hard, it doesn't matter who you are or where you come from or what you look like or who you love. It doesn't matter whether you're black or white or Hispanic or Asian or Native American or young or old or rich or poor, able, disabled, gay or straight, you can make it here in America if you're willing to try." - Barack Obama`}
                />
                <Post
                    name={'Lucas Borges'}
                    subtitle={'Cuiabá'}
                    profileImage={'https://ipfs.io/ipfs/QmfTYg7mNSSuHqXyX3fvP9tFAYahWjqTrbLH7nBhUTsL5u'}
                    type={'video'}
                    src={"https://rr3---sn-bg0eznle.googlevideo.com/videoplayback?expire=1641797671&ei=x4PbYcDoGd2S-LAPgcCXoAo&ip=45.234.3.108&id=o-AI7Hi1f8nV82baKd88Oa5LuwPE_cG8LnmeQDLWuoyBQV&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=IjiwRtTK3mnTbPnNEWgzFZUG&cnr=14&ratebypass=yes&dur=829.486&lmt=1641170657888528&fexp=24001373,24007246&c=WEB&txp=5532434&n=on0Y9eeRWi64Zw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgIT_bsZDQQzvp7D8768-m4Iv_RCymShoV9W3YkvLdNWcCIQCzMFhBbAb7DKSm9n6bLBBl1Ciyq7KNrMwpdo4lVy0uNg%3D%3D&rm=sn-b8u-jbce7s,sn-bg0ks7s&req_id=2a66dfe06e23a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=b1&mip=208.127.147.196&mm=29&mn=sn-bg0eznle&ms=rdu&mt=1641775489&mv=m&mvi=3&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAPjWgNiVPRVumc47HoNMDtVrw5DC5yG5_K39Fq7ZQiXeAiBnDxefQxbPsesYl5YsAttJFcT7BQr4HHtF-rcA9OKJ9g%3D%3D"}
                    content={'Eu e o Billy brincando depois de eu ter ido levar meu irmão na casa dele! Voltei e ele estava muito feliz em ter me visto :)'}
                />
                <Post
                    name={'Lucas Borges'}
                    subtitle={'Cuiabá'}
                    profileImage={'https://ipfs.io/ipfs/QmfTYg7mNSSuHqXyX3fvP9tFAYahWjqTrbLH7nBhUTsL5u'}
                    type={'video'}
                    src={"https://rr3---sn-bg0eznle.googlevideo.com/videoplayback?expire=1641281061&ei=xaHTYY7sGoOS-LAPn-CXwAg&ip=45.234.3.155&id=o-AOcHVBOpg7l-nNF-eYLp4CzhfpVBCBQ9jClOweoSmMzg&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=792eT1LZHfrQAn8X4SsVYnUG&cnr=14&ratebypass=yes&dur=829.486&lmt=1641170657888528&fexp=24001373,24007246&c=WEB&txp=5532434&n=7LAGtXjNZIgotA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIga5QlQaaMayF3d_29qKuNeGyGgScyeAWj_tROobPw3GMCIGRCKOAjacWolNUyzXlO4nlhEzez2vA10n7161El423p&cm2rm=sn-b8u-jbce7s&req_id=7d04872aa208a3ee&redirect_counter=2&rm=sn-bg0rr7s&cms_redirect=yes&ipbypass=yes&mh=b1&mip=2804:4be4:8349:a001:601c:5390:66:51e&mm=29&mn=sn-bg0eznle&ms=rdu&mt=1641259255&mv=m&mvi=3&pl=36&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgQ7LnTt95ISfHxfsqugtzHpIKIJYcQAn77F3C8c4YFQsCIQDvTn7jLhaviZmxmYGjz6zY7OChn21ACstTlr9Jh4UtQQ%3D%3D"}
                    content={'Via infinda'}
                />
                <Post
                    type={'text'}
                    content="Hoje deu uma preguiça 🥱😴😴"
                />
                <View style={{
                    backgroundColor: globalVars.selectedColors.background,
                    height: 50, width: '100%'
                }} />
            </ScrollView>
        </View>
    );
}

export default HomeScreen;