import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Avatar, Card, Text, ActivityIndicator, Chip } from 'react-native-paper';
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
import ModalHash from './modalHash';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import PropTypes from 'prop-types';
import ModalWithContent from '../extras/modalWithContent';
import CreateEmit from '../../screens/createEmit';

const PostCard = (props) => {
  const navigation = useNavigation();

  const data = props.data ? props.data : null;
  const contentData = props.data && props.data.content ? JSON.parse(props.data.content) : null;

  if (!contentData) return <></>;

  const colors = props.colors ? props.colors : null;
  var postColors = {
    border: colors ? colors.border : globalVars.selectedColors.secundary,
    primary: colors ? colors.secundary : globalVars.selectedColors.backgroundSecondColor,
    secundary: colors ? colors.secundary : globalVars.selectedColors.secundary,
    image: colors ? colors.primary : globalVars.currentTheme.colors.primary,
    tags: colors ? colors.primary : globalVars.selectedColors.backopaque,
    button: colors ? colors.text : globalVars.selectedColors.primary,
    text: colors ? colors.text : globalVars.selectedColors.text
  }

  //POST INFO
  var [loading, setLoading] = useState(false);
  var [liked, setLiked] = useState(data.liked ? data.liked : false);
  var [saved, isSaved] = useState(data.saved ? data.saved : false);

  var [comments, setComments] = useState(data.comments ? data.comments : 0);
  var [votes, setVotes] = useState(data.likes ? data.likes : 0);
  var [createdAt, setCreatedAt] = useState(data.createdAt ? new Date(data.createdAt) : null);

  //VISUALIZATION MODE
  var [onlyContent, setOnlyContent] = useState(props.onlyContent ? props.onlyContent : false);
  var [withoutHeader, setWithoutHeader] = useState(props.withoutHeader ? props.withoutHeader : false);
  var [withoutFooter, setWithoutFooter] = useState(props.withoutFooter ? props.withoutFooter : false);
  var [withoutSend, setWithoutSend] = useState(props.withoutSend ? props.withoutSend : false);
  var [withoutLike, setWithoutLike] = useState(props.withoutLike ? props.withoutLike : false);
  var [withoutComment, setWithoutLike] = useState(props.withoutComment ? props.withoutComment : false);
  var [withoutSave, setWithoutSave] = useState(props.withoutSave ? props.withoutSave : false);
  var [withoutDescription, setWithoutDescription] = useState(props.withoutDescription ? props.withoutDescription : false);
  var [withSourceHeight, setWithSourceHeight] = useState(props.withSourceHeight ? props.withSourceHeight : null);
  var [withResizeMode, setWithResizeMode] = useState(props.withResizeMode ? props.withResizeMode : null);
  var [withSourceBorderValue, setWithSourceBorderValue] = useState(props.withSourceBorderValue ? props.withSourceBorderValue : null);
  var [withMaxLinesToText, setWithMaxLinesToText] = useState(props.withMaxLinesToText ? props.withMaxLinesToText : 10);
  var [postMaxHeight, setPostMaxHeight] = useState(props.postMaxHeight ? props.postMaxHeight : 1000);
  var [withoutVolume, setWithoutVolume] = useState(props.withoutVolume ? props.withoutVolume : false);
  var [withoutPlay, setWithoutPlay] = useState(props.withoutPlay ? props.withoutPlay : false);
  var [withGoToPost, setWithGoToPost] = useState(props.withGoToPost ? props.withGoToPost : false);
  var [withGoToPostOnlyDescription, setWithGoToPostOnlyDescription] = useState(props.withGoToPostOnlyDescription ? props.withGoToPostOnlyDescription : false);
  var [withoutShowVotes, setWithoutShowVotes] = useState(props.withoutShowVotes ? props.withoutShowVotes : false);
  var [withoutShowComments, setWithoutShowComments] = useState(props.withoutShowComments ? props.withoutShowComments : false);
  var [withLitleLike, setWithLitleLike] = useState(props.withLitleLike ? props.withLitleLike : false);
  var [withLitleHash, setWithLitleHash] = useState(props.withLitleHash ? props.withLitleHash : false);
  var [litleLikeSize, setLitleLikeSize] = useState(props.litleLikeSize ? props.litleLikeSize : 20);
  var [litleHashSize, setLitleHashSize] = useState(props.litleHashSize ? props.litleHashSize : 20);
  var [litleLikeBottomMargin, setLitleLikeBottomMargin] = useState(props.litleLikeBottomMargin ? props.litleLikeBottomMargin : 5);
  var [withoutPraiseButton, setWithoutPraiseButton] = useState(props.withoutPraiseButton ? props.withoutPraiseButton : false);
  var [profileImageSize, setProfileImageSize] = useState(props.profileImageSize ? props.profileImageSize : 48);
  var [withoutBorderMode, setWithoutBorderMode] = useState(props.withoutBorderMode ? props.withoutBorderMode : false);
  var [withShowReferencePost, setWithShowReferencePost] = useState(props.withShowReferencePost ? props.withShowReferencePost : false);

  var [type, setType] = useState(data.type ? data.type : 'photo');

  //IF PHOTO OR VIDEO - SET SOURCE
  var [source, setSource] = useState(contentData.source ? contentData.source : null);

  //IF TEXT SET CONTENT
  var [content, setContent] = useState(contentData.description ? contentData.description : null);
  var [hashtags, setHashtags] = useState(contentData.hashtags ? JSON.parse(contentData.hashtags) : null);

  //IF EVENT SET SCHEDULE
  var [eventSource, setEventSource] = useState((data.type == 'event' && contentData.source) ? contentData.source : null);
  var [eventStart, setEventStart] = useState((data.type == 'event' && contentData.start) ? contentData.start : null);
  var [eventEnd, setEventEnd] = useState((data.type == 'event' && contentData.end) ? contentData.end : null);
  var [eventTitle, setEventTitle] = useState((data.type == 'event' && contentData.title) ? contentData.title : null);
  var [eventDescription, setEventDescription] = useState((data.type == 'event' && contentData.description) ? contentData.description : null);
  var [eventWillGo, setEventWillGo] = useState(0);

  //IF CATALOG SET OPTIONS
  var [catalogSource, setCatalogSource] = useState((data.type == 'catalog' && contentData.source) ? contentData.source : null);
  var [catalogTitle, setCatalogTitle] = useState((data.type == 'catalog' && contentData.title) ? contentData.title : null);
  var [catalogDescription, setCatalogDescription] = useState((data.type == 'catalog' && contentData.description) ? contentData.description : null);

  //USER INFOS
  var [userId, setUserId] = useState(data['User.id'] || data.User.id ? data['User.id'] || data.User.id: null);
  var [name, setName] = useState(data['User.name'] || data.User.name ? data['User.name'] || data.User.name : `Username`);
  var [subtitle, setSubtitle] = useState(contentData.subtitle ? contentData.subtitle : ` `);
  var [profileImage, setProfileImage] = useState(
    data['User.avatar'] ? data['User.avatar'] : ( 
    data.User && data.User.avatar !== undefined && data.User.avatar !== null ? data.User.avatar : 
    globalVars.placeholders.images.profile)
  );

  if((type == 'photo' || type == 'video') && withLitleLike) {
    postColors.text = 'white';
    postColors.button = 'white';
  }

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
    if ((liked == true && value_ == true) || (liked == false && value_ == false)) return null;
    var userToken = await getData('token');
    var postId = data.id;
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

  function gotoProfile() {
    navigation.navigate('ProfileFeed', {
      profileId: userId
    })
  }

  function gotoHashtag(hashtagName) {
    navigation.navigate('EmitsView', {
      hashtagName
    })
  }
  
  return (
    <View>
      <Card style={{
        borderRadius: !withoutBorderMode ? 5 : null,
        borderWidth: !withoutBorderMode ? 1 : null,
        borderColor: !withoutBorderMode ? postColors.border : null,
        padding: 0,
        minHeight: 50,
        maxHeight: postMaxHeight,
        marginHorizontal: !withoutBorderMode ? 7 : null,
        marginVertical: !withoutBorderMode ? 5 : null,
        marginBottom: withoutBorderMode ? 12 : null,
        paddingBottom: withoutBorderMode ? 10 : null,
        backgroundColor: postColors.primary,
      }}>
        {(!withoutHeader) ? <>
          <Card.Title
            // title={name} subtitle={subtitle}
            left={() =>
              <TouchableOpacity onPress={() => gotoProfile()}
                style={{ minWidth: 200, flexDirection: 'row' }}>
                <Image style={{
                  borderRadius: 3, width: profileImageSize, height: profileImageSize,
                  marginLeft: -5,
                  backgroundColor: postColors.image
                }}
                  source={{ uri: profileImage }} />
                <View>
                  <Text style={{ fontSize: 18, marginLeft: 10 }}>{name}</Text>
                  <Text style={{
                    fontSize: 12, marginLeft: 10, marginTop: 5,
                    color: globalVars.selectedColors.placeholder
                  }}>{subtitle}</Text>
                </View>
              </TouchableOpacity>
            }
            right={() => <>
              <View style={{ position: 'absolute', right: 0, top: -30 }}>
                <Row>
                  <Col>
                    {
                      !withoutPraiseButton ?
                        <PraiseComponent
                          profileImage={profileImage}
                          userName={name}
                        /> : null
                    }
                  </Col>
                </Row>
              </View>
            </>} />
        </> : null}
        {loading ? <ActivityIndicator
          size="small" color={globalVars.selectedColors.primary}
          style={{ zIndex: 10, position: 'absolute', left: '46%', top: '47%' }} /> : null}

        <View style={{ marginTop: (type == 'text' && !withoutHeader && withoutPraiseButton && profileImageSize < 48) ? -20 : 0 }}>
          {type == 'photo' ? <ContentPhoto
            src={source}
            setLoading={setLoading}
            postData={data}
            liked={liked}
            doubleTap={like}
            withGoToPost={withGoToPost}
            withSourceHeight={withSourceHeight}
            withResizeMode={withResizeMode}
            withSourceBorderValue={withSourceBorderValue} /> : null}
          {type == 'text' ? <ContentText
            colors={colors}
            content={content}
            postData={data}
            liked={liked}
            doubleTap={like}
            withGoToPost={withGoToPost}
            withShowReferencePost={withShowReferencePost}
            withMaxLinesToText={withMaxLinesToText} /> : null}
          {type == 'video' ? <ContentVideo src={source} setLoading={setLoading}
            postData={data}
            liked={liked}
            doubleTap={like}
            withoutPlay={withoutPlay}
            withGoToPost={withGoToPost}
            withoutVolume={withoutVolume}
            withSourceHeight={withSourceHeight}
            withResizeMode={withResizeMode}
            buttonColor={withGoToPost ? postColors.primary : null}
            iconColor={withGoToPost ? postColors.text : null}
            withSourceBorderValue={withSourceBorderValue} /> : null}
        </View>
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
        {!withoutFooter ?
          <>
            <Card.Actions>
              <Row>
                <Col style={{ marginHorizontal: -15 }}>
                  <Row>
                    {(type == 'video' || type == 'photo') && content && !withoutDescription ?
                      <View style={{ width: '100%', marginBottom: 15, marginTop: -15 }}>
                        <ContentText content={content} postData={data} withGoToPost={withGoToPostOnlyDescription} withMaxLinesToText={withMaxLinesToText} />
                      </View>
                      : null}
                  </Row>
                  <Row>
                    {type != 'catalog' ?
                      <>
                        <Col size={12}>
                          <Row>
                            {!withoutSend ?
                              <Col style={{ alignItems: 'center' }}>
                                <View style={{ zIndex: 100, marginBottom: -5 }}>
                                  <ActionButton
                                    color={postColors.button}
                                    size={28}
                                    filled={false}
                                    iconInit={'send-circle-outline'}
                                    iconFilled={'send-circle'} />
                                </View>
                              </Col>
                              : null}
                            {!withoutComment ?
                              <Col style={{ alignItems: 'center' }}>
                                <View style={{ zIndex: 100, marginBottom: -10, alignItems: 'center', justifyContent: 'center' }}>
                                  {!withoutShowComments ? <Text style={{ position: 'absolute', bottom: -12, fontSize: 10 }}>{comments}</Text> : null}
                                  <ModalWithContent
                                    buttonEnabled
                                    button={<ActionButton
                                      withoutTouch
                                      color={postColors.button}
                                      iconInit={'comment-text-outline'}
                                      size={28} />}
                                  >
                                    <View style={{ borderRadius: 5, alignItems: 'center' }}>
                                      <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                                        <Text>Comentando publicação de </Text>
                                        <Text style={{ fontWeight: 'bold'}}>{name}</Text>
                                      </View>
                                    </View>
                                    <View style={{ borderRadius: 5 }}>
                                      <CreateEmit postReferenceId={data.id}/>
                                    </View>
                                  </ModalWithContent>
                                </View>
                              </Col>
                              : null}
                            {!withoutLike ?
                              <Col style={{ alignItems: 'center' }}>
                                <View style={{ zIndex: 100, marginBottom: -10, alignItems: 'center', justifyContent: 'center' }}>
                                  {!withoutShowVotes ? <Text style={{ position: 'absolute', bottom: -12, fontSize: 10 }}>{votes}</Text> : null}
                                  <ActionButton
                                    color={postColors.button}
                                    colorFilled={'#f12020'}
                                    size={28}
                                    press={like}
                                    filled={liked} />
                                </View>
                              </Col>
                              : null}
                            {!withoutSave ?
                              <Col style={{ alignItems: 'center' }}>
                                <View style={{ zIndex: 100, marginBottom: -10 }}>
                                  <ActionButton
                                    color={postColors.button}
                                    size={28}
                                    filled={saved}
                                    press={save}
                                    iconInit={'bookmark-check-outline'}
                                    iconFilled={'bookmark-check'} />
                                </View>
                              </Col>
                              : null}
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
          : <Card.Actions>
            <Row>
              <Col style={{ marginHorizontal: -15 }}>
                <View style={{ height: 50 }} />
              </Col>
            </Row>
          </Card.Actions>}
        {
          createdAt ?
            <View style={{ position: 'absolute', left: 10, bottom: withLitleHash || withLitleLike ? 5 : -5 }}>
              <Text style={{ fontSize: 11, color: postColors.text }}>{getTimeOfPost()} atrás</Text>
            </View>
            : null
        }
        {
          withLitleHash && (hashtags && hashtags.length > 0) ?
            <>
              <View style={{ position: 'absolute', flexDirection: 'row', left: 0, bottom: 22, maxWidth: 280, borderRadius: 5, padding: 2 }}>
                <FlatList data={hashtags} horizontal={true}
                  keyExtractor={(item) => uuid.v5(item, 'key')}
                  showsHorizontalScrollIndicator={false} renderItem={({ item }) => {
                    return <TouchableOpacity style={{ flexWrap: 'wrap', marginHorizontal: 4 }} onPress={() => gotoHashtag(item)}>
                      <Chip selectedColor={postColors.text} icon="pound" style={{ borderRadius: 5, backgroundColor: postColors.tags }}
                        key={() => uuid.v5(item, 'key')}
                      >
                        <Text style={{ color: postColors.text }}>
                          {item.toLowerCase()}
                        </Text>
                      </Chip>
                    </TouchableOpacity>
                  }} />
              </View><View style={{ height: 10 }} /></>
            : null
        }
        {
          withLitleLike ?
            <View style={{ position: 'absolute', right: 10, bottom: type == 'text' ? 15 : 0, flexDirection: 'row', alignItems: 'center' }}>
              {!withoutShowVotes ? <Text style={{ maxWidth: 30, minWidth: 5, marginRight: 5, color: postColors.text }}>{votes}</Text> : null}
              <ActionButton
                color={postColors.button}
                colorFilled={'#f12020'}
                size={litleLikeSize}
                press={like}
                filled={liked} />
            </View>
            : null
        }
      </Card>
    </View>
  );

  function getTimeOfPost() {
    var now = new Date();
    var postTime = createdAt;
    var diffMs = (now - postTime);
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays > 0) return `${diffDays}d`;
    if (diffHrs > 0) return `${diffHrs}h`;
    if (diffMins >= 0) return `${diffMins}m`;
  }
}

export default PostCard;

PostCard.propTypes = {
  withoutHeader: PropTypes.bool,
  withoutFooter: PropTypes.bool,
  withoutSend: PropTypes.bool,
  withoutLike: PropTypes.bool,
  withoutComment: PropTypes.bool,
  withoutSave: PropTypes.bool,
  withoutDescription: PropTypes.bool,
  withSourceHeight: PropTypes.number,
  withResizeMode: PropTypes.string,
  withSourceBorderValue: PropTypes.number,
  withMaxLinesToText: PropTypes.number,
  postMaxHeight: PropTypes.number,
  withoutVolume: PropTypes.bool,
  withoutPlay: PropTypes.bool,
  withGoToPost: PropTypes.bool,
  withGoToPostOnlyDescription: PropTypes.bool,
  withoutShowVotes: PropTypes.bool,
  withoutShowComments: PropTypes.bool,
  withLitleLike: PropTypes.bool,
  withLitleHash: PropTypes.bool,
  litleLikeSize: PropTypes.number,
  withoutPraiseButton: PropTypes.bool,
  profileImageSize: PropTypes.number,
  withoutBorderMode: PropTypes.bool,
  withShowReferencePost: PropTypes.bool
}