import * as React from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import { Avatar, Card, Title, ActivityIndicator } from 'react-native-paper';
import globalVars from '../../helpers/globalVars';

const SmallPost = (props) => {
  var [loading, setLoading] = useState(true);

  //IF TEXT SET CONTENT
  var [content, setContent] = useState(props.content ? props.content : null);

  //USER INFOS
  var [userId, setUserId] = useState(props.userId ? props.userId : null);
  var [name, setName] = useState(props.name ? props.name : `Username`);
  var [subtitle, setSubtitle] = useState(props.subtitle ? props.subtitle : ` `);
  var [profileImage, setProfileImage] = useState(props.profileImage ? props.profileImage : globalVars.placeholders.images.profile)

  return (
    <Card style={{
      backgroundColor: 'transparent',
      margin: 10,
    }}>

    </Card>
  );
}

export default SmallPost;