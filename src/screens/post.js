import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaViewBase, ScrollView, Dimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostComments from "../components/post/comment/postComments";
import Post from "../components/post/post";
import { Empty } from "../components/utils/Empty";
import { getData } from "../helpers/cache";
import { apiUrl } from "../helpers/environment";
import globalVars from "../helpers/globalVars";

const PostScreen = (props) => {
    var postId = props.route.params.postId;
    var [postData, setPostData] = useState(null);
    var [loadMoreComments, setLoadMoreComments] = useState(false);

    useEffect(async () => {
        let userToken = await getData('token');
        let response = await fetch(`${apiUrl}/post/${postId}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (response.status == 200) {
            let responseJson = await response.json();
            setPostData(responseJson.post);
        }
    }, []);


    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };

      useEffect(() => {}, [loadMoreComments])

    return (
        <View style={{ backgroundColor: globalVars.selectedColors.background }}>
            <ScrollView showsVerticalScrollIndicator={false}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                      setLoadMoreComments(!loadMoreComments);
                    }
                  }}
                  scrollEventThrottle={400}>
                {
                    !postData ?
                        <View style={{ paddingTop: 200 }}>
                            <Empty withLoader={true} message={'Carregando publicação'} fontSize={16} iconSize={56} />
                        </View>
                        :
                        <View style={{ minHeight: Dimensions.get('window').height }}>
                            <Post data={postData} withShowReferencePost={true} withoutPraiseButton withoutBorderMode={true} />
                            <PostComments postId={postId} loadMore={loadMoreComments}/>
                        </View>
                }
            </ScrollView>
        </View>
    );
}

export default PostScreen;