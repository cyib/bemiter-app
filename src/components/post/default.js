import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Avatar, Card, Text, ActivityIndicator } from 'react-native-paper';
import globalVars from '../../helpers/globalVars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row } from 'react-native-paper-grid';
import ActionButton from '../extras/actionButton';
import ContentPhoto from './content/photo';
import ContentText from './content/text';
import ContentVideo from './content/video';
import ContentEvent from './content/event';
import ContentCatalog from './content/catalog';
import { apiUrl } from '../../helpers/environment';
import { getData } from '../../helpers/cache';
import PraiseComponent from '../praise/default';
import DoubleTap from '../utils/DoubleTap';

const CardSimple = (props) => {
  //POST INFO
  var [loading, setLoading] = useState(false);
  var [liked, setLiked] = useState(props.liked ? props.liked : false);
  var [saved, isSaved] = useState(props.saved ? props.saved : false);

  var [votes, setVotes] = useState(props.votes ? props.votes : 0);
  var [createdAt, setCreatedAt] = useState(props.createdAt ? new Date(props.createdAt) : null);
  var [onlyContent, setOnlyContent] = useState(props.onlyContent ? props.onlyContent : false);

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
  var [name, setName] = useState(props.name ? props.name : `Username`);
  var [subtitle, setSubtitle] = useState(props.subtitle ? props.subtitle : ` `);
  var [profileImage, setProfileImage] = useState(props.profileImage ? props.profileImage : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&usqp=CAU`)

  var [isInit, setIsInit] = useState(true);
  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      if (type == 'photo') setLoading(true);
      if (type == 'video') setLoading(true);
      if (type == 'event') setLoading(true);
    }
  }, [votes, liked, saved]);

  const like = async (value_) => {
    let value = value_ ? 1 : -1;
    setLiked(value_);
    var userToken = await getData('token');
    var postId = props.postId;
    setVotes(votes + value);
    await fetch(`${apiUrl}/feed/interaction/${postId}/like`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      }
    });
  }

  const save = async (value_) => {
    isSaved(value_);
  }

  return (
    <View>
      <Card style={{
        borderRadius: 0,
        borderBottomColor: globalVars.currentTheme.colors.background,
        borderBottomWidth: 4,
      }}>
        {!onlyContent ? <>
          <Card.Title title={name} subtitle={subtitle} left={() =>
            <Image style={{
              borderRadius: 3, width: 48, height: 48,
              marginLeft: -5,
              backgroundColor: globalVars.currentTheme.colors.primary
            }}
              source={{ uri: profileImage }} />
          } right={() => <>
            {createdAt ? <View style={{ position: 'absolute', top: -30, right: 10, padding: 5, alignItems: 'flex-end' }}>
              <Row>
                <Col>
                  {/* <Text style={{ fontSize: 9, color: globalVars.selectedColors.placeholder }}>{(createdAt).toLocaleTimeString()}</Text> */}
                  <PraiseComponent
                    profileImage={profileImage}
                    userName={name}
                  />
                </Col>
              </Row>
            </View> : null}
          </>} />
        </> : null}
        {loading ? <ActivityIndicator
          size="small" color={globalVars.selectedColors.primary}
          style={{ zIndex: 10, position: 'absolute', left: '46%', top: '47%' }} /> : null}

        <DoubleTap onDoubleTap={() => { like(true); }}>
          {type == 'photo' ? <ContentPhoto src={source} setLoading={setLoading} /> : null}
          {type == 'text' ? <ContentText content={content} /> : null}
          {type == 'video' ? <ContentVideo src={source} setLoading={setLoading} /> : null}
        </DoubleTap>

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
        {!onlyContent ?
          <>
            <Card.Actions>
              <Row>
                <Col style={{ marginHorizontal: -10 }}>
                  <Row>
                    {(type == 'video' || type == 'photo') && content ?
                      <View style={{ width: '100%' }}>
                        <ContentText content={content} />
                      </View>
                      : null}
                  </Row>
                  <Row>
                    {type != 'catalog' ?
                      <>
                        <Col size={12}>
                          <Row>
                            <Col style={{ alignItems: 'center' }}>
                              <View style={{ zIndex: 100, marginBottom: -10 }}>
                                <ActionButton
                                  size={30}
                                  filled={false}
                                  iconInit={'send-circle-outline'}
                                  iconFilled={'send-circle'} />
                              </View>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>
                              <View style={{ zIndex: 100, marginBottom: -10 }}>
                                <ActionButton
                                  colorFilled={'#f12020'}
                                  size={40}
                                  press={like}
                                  filled={liked} />
                              </View>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>
                              <View style={{ zIndex: 100, marginBottom: -10 }}>
                                <ActionButton
                                  size={30}
                                  filled={saved}
                                  press={save}
                                  iconInit={'bookmark-check-outline'}
                                  iconFilled={'bookmark-check'} />
                              </View>
                            </Col>
                          </Row>
                        </Col>
                      </>
                      :
                      null
                    }
                  </Row>
                </Col>
              </Row>
            </Card.Actions>
          </>
          : null}
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