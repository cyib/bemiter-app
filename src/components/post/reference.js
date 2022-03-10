import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Avatar, Card, Title, ActivityIndicator } from 'react-native-paper';
import { Row, Col } from 'react-native-paper-grid';
import { getData } from '../../helpers/cache';
import { apiUrl } from '../../helpers/environment';
import globalVars from '../../helpers/globalVars';

const PostReference = ({ postId, colors, postReference }) => {
  var [randomNum, setRandomNum] = useState(getRandomInt(1, 1000));
  var source = `https://picsum.photos/400/400?random=${randomNum}`;
  var [loading, setLoading] = useState(true);
  
  var [postData, setPostData] = useState(null);

  useEffect(() => {
    if (!postData && !postReference) getPost();
    if (!postData && postReference) setPostdataFromReference();
  }, [postData]);

  function setPostdataFromReference(){
    try {
      var post_ = postReference;
      post_.content = post_.content ? JSON.parse(post_.content) : {};
      setPostData(post_);
    } catch (error) {
      getPost();
    }
  }

  async function getPost() {
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
      var post_ = responseJson.post;
      post_.content = post_.content ? JSON.parse(post_.content) : {};
      setPostData(post_);
    }
  }

  return (
    <>
      {postData ?
        <Card style={{
          backgroundColor: colors && colors.primary != 'transparent' ? colors.primary : globalVars.selectedColors.background,
          margin: 0,
          marginBottom: 5
        }}>
          <Row style={{ flexDirection: 'row', padding: 0, paddingLeft: 5, paddingTop: 5 }}>
            <Col style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10,
              color: colors ? colors.text : globalVars.selectedColors.text }}>Sobre {
                postData.type == 'photo' ? 'foto' :
                postData.type == 'video' ? 'vídeo' :
                postData.type == 'text' ? 'emit' : null
              } de </Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold',
            color: colors ? colors.text : globalVars.selectedColors.text }}>{postData['User.name']}</Text>
            </Col>
          </Row>
          <Row>
            {
              postData.content.source && postData.type == 'photo' ? <Col size={2} style={{ flexDirection: 'row' }}>
              <Image style={{
                height: 56,
                width: '100%',
                borderRadius: 5,
                borderWidth: 0,
                borderColor: globalVars.selectedColors.primary,
              }}
                resizeMode={'contain'}
                source={{ uri: postData.content.source }}
                onLoadEnd={() => setLoading(false)} />
            </Col> : null
            }
            <Col size={8} style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: globalVars.selectedColors.backopaque, height: 56, width: '100%', borderRadius: 3, paddingLeft: 5, justifyContent: 'center' }}>
                <Text ellipsizeMode='tail'
                  numberOfLines={2}
                  style={{ fontSize: 16, color: colors ? colors.text : globalVars.selectedColors.text }}>
                  {
                    postData.content.description
                  }
                </Text>
              </View>
            </Col>
          </Row>
        </Card>
        : null}
    </>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default PostReference;