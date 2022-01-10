import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Avatar, Card, Text, ActivityIndicator } from 'react-native-paper';
import globalVars from '../../helpers/globalVars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row } from 'react-native-paper-grid';
import LikeButton from '../extras/likeButton';
import ContentPhoto from './content/photo';
import ContentText from './content/text';
import ContentVideo from './content/video';
import ContentEvent from './content/event';
import ContentCatalog from './content/catalog';

const CardSimple = (props) => {
  //POST INFO
  var [loading, setLoading] = useState(false);
  var [votes, setVotes] = useState(0);
  var [createdAt, setCreatedAt] = useState(props.createdAt ? props.createdAt : null);

  var [type, setType] = useState(props.type ? props.type : 'photo');

  //IF PHOTO OR VIDEO - SET SOURCE
  var [source, setSource] = useState(props.src ? props.src : null);

  //IF TEXT SET CONTENT
  var [content, setContent] = useState(props.content ? props.content : null);

  //IF EVENT SET SCHEDULE
  var [eventSource, setEventSource] = useState(props.eventSource ? props.eventSource : null);
  var [eventStart, setEventStart] = useState(props.eventStart ? props.eventStart : null);
  var [eventEnd, setEventEnd] = useState(props.eventEnd ? props.eventEnd : null);
  var [eventTitle, setEventTitle] = useState(props.eventTitle ? props.eventTitle : null);
  var [eventDescription, setEventDescription] = useState(props.eventDescription ? props.eventDescription : null);
  var [eventWillGo, setEventWillGo] = useState(0);

  //IF CATALOG SET OPTIONS
  var [catalogSource, setCatalogSource] = useState(props.catalogSource ? props.catalogSource : null);
  var [catalogTitle, setCatalogTitle] = useState(props.catalogTitle ? props.catalogTitle : null);
  var [catalogDescription, setCatalogDescription] = useState(props.catalogDescription ? props.catalogDescription : null);

  //USER INFOS
  var [name, setName] = useState(props.name ? props.name : `Tom Holland`);
  var [subtitle, setSubtitle] = useState(props.subtitle ? props.subtitle : `Edmonton`);
  var [profileImage, setProfileImage] = useState(props.profileImage ? props.profileImage : `https://br.web.img3.acsta.net/newsv7/19/06/07/17/30/1373423.jpg`)

  var [isInit, setIsInit] = useState(true);
  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      if (type == 'photo') setLoading(true);
      if (type == 'video') setLoading(true);
      if (type == 'event') setLoading(true);
    }
  }, []);

  return (
    <View>
      <Card style={{
        borderRadius: 0,
        borderBottomColor: globalVars.currentTheme.colors.background,
        borderBottomWidth: 4,
      }}>
        <Card.Title title={name} subtitle={subtitle} left={() =>
          <Image style={{
            borderRadius: 3, width: 48, height: 48,
            marginLeft: -5,
            backgroundColor: globalVars.currentTheme.colors.primary
          }}
            source={{ uri: profileImage }} />
        } right={() => <>
        { createdAt ? <View style={{ position: 'absolute', top: 0, right: 0, padding: 10, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 9, color: globalVars.selectedColors.placeholder }}>{(createdAt).toLocaleDateString()}</Text>
            <Text style={{ fontSize: 9, color: globalVars.selectedColors.placeholder }}>{(createdAt).toLocaleTimeString()}</Text>
          </View> : null}
          
        </>} />
        {loading ? <ActivityIndicator
          size="small" color={globalVars.selectedColors.primary}
          style={{ zIndex: 10, position: 'absolute', left: '46%', top: '47%' }} /> : null}
        {type == 'photo' ? <ContentPhoto src={source} setLoading={setLoading} /> : null}
        {type == 'text' ? <ContentText content={content} /> : null}
        {type == 'video' ? <ContentVideo src={source} setLoading={setLoading} /> : null}
        {type == 'event' ? <ContentEvent
          source={eventSource}
          title={eventTitle}
          description={eventDescription}
          start={eventStart}
          end={eventEnd}
          setLoading={setLoading} /> : null}
        {type == 'catalog' ? <ContentCatalog
          source={catalogSource}
          title={catalogTitle}
          description={catalogDescription}
          setLoading={setLoading} /> : null}
        <Card.Actions>
          <Row style={{
            flex: 1,
            justifyContent: 'center'
          }}>
            {(type == 'video' || type == 'photo') && content ?
              <Col size={18}>
                <View style={{ left: -15 }}>
                  <ContentText content={content} />
                </View>
              </Col>
              : null}
            {(type == 'video' || type == 'photo') && !content ?
              <Col size={18}></Col>
              : null}
            <>
              {type == 'event' ? <>
                <Col size={2}>
                  <View style={{ zIndex: 100, marginLeft: -5 }}>
                    <LikeButton votes={eventWillGo} setVotes={setEventWillGo}
                      iconInit='checkbox-marked-circle-outline'
                      iconLiked='checkbox-marked-circle'
                      setScrollEnabled={props.setScrollEnabled} />
                  </View>
                </Col>
                <Col size={2} style={{ marginTop: 5, marginLeft: -15 }}>
                  <Text style={{
                    color: globalVars.selectedColors.placeholder,
                    fontSize: 14,
                    textAlign: 'center'
                  }}>{eventWillGo}</Text>
                </Col>
                <Col size={14}></Col>
              </> : null}
            </>
            {(type == 'text' || type == 'catalog') ? <Col size={18}></Col> : null}
            <Col size={2} style={{ marginLeft: -20, marginTop: 5 }}>
              <Text style={{
                color: globalVars.selectedColors.placeholder,
                fontSize: 14,
                textAlign: 'center'
              }}>{votes}</Text>
            </Col>
            <Col size={2}>
              <View style={{ zIndex: 100, marginLeft: -5 }}>
                <LikeButton votes={votes} setVotes={setVotes} setScrollEnabled={props.setScrollEnabled} />
              </View>
            </Col>
          </Row>
        </Card.Actions>
      </Card>
    </View>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default CardSimple;