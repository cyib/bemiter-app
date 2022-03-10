import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ComponentEmitFeedGlobal from "../components/emitFeed/global";

const EmitsViewScreen = (props) => {
    const navigation = useNavigation();
    var params = props.route.params;

    var [hashtagName, setHashtagName] = useState(params.hashtagName ? params.hashtagName : null);
    var [userInfo, setUserInfo] = useState(params.userInfo ? params.userInfo : null);

    const type = params.hashtagName ? 'hashtag' : 'user';
    
    useEffect(() => {
        ;
    }, []);

    return (
        <View>
            <Text
                style={{
                    fontSize: 14,
                    textAlign: "left",
                    margin: 10
                }}
            >
                { type == 'hashtag' ? `Emits sobre ${hashtagName}:` : null }
                { type == 'user' ? `Emits de ${userInfo.name}:` : null }
            </Text>
            <ComponentEmitFeedGlobal 
            urlRoute={'/feed/emits/search'} 
            extrasParams={`&type=${type}&q=${type == 'hashtag' ? hashtagName : userInfo.id}`}/>
        </View>
    );
}

export default EmitsViewScreen;