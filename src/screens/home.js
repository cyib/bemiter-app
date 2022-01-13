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
                    profileImage={'https://bafybeibbuqm2vf3mkmvugxbqwgx2k4s6hsx3yultiqmtc267knsgjelp6u.ipfs.dweb.link/eu.PNG'}
                    type={'photo'}
                    createdAt={new Date()}
                />
                <Post
                    name={'Lucas Borges'}
                    subtitle={'Cuiabá'}
                    profileImage={'https://bafybeibbuqm2vf3mkmvugxbqwgx2k4s6hsx3yultiqmtc267knsgjelp6u.ipfs.dweb.link/eu.PNG'}
                    type={'video'}
                    src={""}
                    content={'Eu e o Billy brincando depois de eu ter ido levar meu irmão na casa dele! Voltei e ele estava muito feliz em ter me visto :)'}
                />
                <Post
                    name={'Lucas Borges'}
                    subtitle={'Cuiabá'}
                    profileImage={'https://bafybeibbuqm2vf3mkmvugxbqwgx2k4s6hsx3yultiqmtc267knsgjelp6u.ipfs.dweb.link/eu.PNG'}
                    type={'video'}
                    src={"https://bafybeic3ay42dqhnud4ylsk7lao6zj7gf4noutbqswvtvqc6yoebiq4qq4.ipfs.dweb.link/videoplayback.mp4"}
                    content={'Via infinda'}
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