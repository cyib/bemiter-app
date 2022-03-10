import React, { useEffect, useState } from "react";
import { Button, Dimensions, FlatList, Text, View } from "react-native";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import { getData } from "../../../helpers/cache";
import { apiUrl } from "../../../helpers/environment";
import globalVars from "../../../helpers/globalVars";
import { Empty } from "../../utils/Empty";
import Post from "../post";

function PostComments({ postId, loadMore }) {

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  var [isInit, setIsInit] = useState(true);
  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      getComments();
    }
  }, []);

  useEffect(() => {
    getComments();
  }, [loadMore]);


  async function getComments() {
    let userToken = await getData('token');
    let response = await fetch(`${apiUrl}/post/comments/${postId}?page=${page}&limit=${perPage}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      },
    });

    let responseJson = await response.json();
    if (response.status == 200) {
      var comments_ = [...comments, ...responseJson.posts.docs];
      comments_ = [...new Map(comments_.map(item => [item.id, item])).values()];
      if (responseJson.posts.docs.length > 0) setPage(page + 1);
      setComments(comments_);
    }
  }

  return (
    <View style={{ backgroundColor: globalVars.selectedColors.background, width: '100%', height: '100%' }}>
      {comments.length == 0 ?
        <View>
          <Empty message={'Sem comentários ainda :)'} />
        </View>
        :
        <View>
          <View style={{ margin: 10, marginVertical: 5 }}>
            <Text style={{ fontSize: 12 }}>Comentários:</Text>
          </View>
          <FlatList
            style={{ backgroundColor: globalVars.selectedColors.background }}
            data={comments}
            onEndReached={() => {
              getComments()
            }}
            onEndReachedThreshold={0.3}
            initialNumToRender={3}
            refreshing={refreshing}
            ListFooterComponent={<FooterList load={loading} refresh={refreshing} />}
            keyExtractor={item => String(item.id)}
            renderItem={(item) => {
              let post = item.item;
              return <View>
                <Post data={post} withoutPraiseButton={true} withoutFooter={true}
                  withGoToPost={true}
                  withMaxLinesToText={5}
                  withLitleLike={true}
                  withLitleHash={true}
                  litleLikeSize={25} litleLikeBottomMargin={28} profileImageSize={32} />
              </View>
            }}
          />
        </View>
      }
    </View>
  );
}

function FooterList({ load, refresh }) {
  if (!load) return null;
  return (
    <>
      <View style={styles.loading}>
        <ActivityIndicator size={25} color={refresh ? globalVars.selectedColors.primary : globalVars.selectedColors.text} />
      </View>
      <View style={{ backgroundColor: globalVars.selectedColors.background, height: Dimensions.get('screen').height }} />
    </>
  );
}

export default PostComments;