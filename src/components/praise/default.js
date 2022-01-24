import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import globalVars from '../../helpers/globalVars';
import { Col, Row } from 'react-native-paper-grid';

const PraiseComponent = (props) => {
  var [userId, setUserId] = useState(props.userId ? props.userId : null);
  var [visibleModal, setVisibleModal] = useState(false);
  var [profileImage, setProfileImage] = useState(props.profileImage ? props.profileImage : null);
  var [userName, setUserName] = useState(props.userName ? props.userName : null);

  return (
    <>
      <ModalContent
        isVisible={visibleModal}
        setVisibleModal={setVisibleModal}
        profileImage={profileImage}
        userName={userName}
      />
      <TouchableOpacity onPress={() => {
        setVisibleModal(true);
      }}>
        <Text>
          <MaterialCommunityIcons
            name="star-box"
            color={globalVars.selectedColors.placeholder} size={42}
          />
        </Text>
      </TouchableOpacity>
    </>
  );
}

function ModalContent({ isVisible, setVisibleModal, profileImage, userName }) {
  let data = [
    { id: 1, icon: 'bookshelf', text: 'Inteligente' },
    { id: 2, icon: 'party-popper', text: 'Divertido' },
    { id: 3, icon: 'weight-lifter', text: 'Fitness' },
    { id: 4, icon: 'hand-heart', text: 'Saudável' },
    { id: 5, icon: 'assistant', text: 'Talentoso' },
  ];

  let [animationOut, setAnimationOut] = useState('fadeOutDownBig');

  return (
    <View>
      <Modal isVisible={isVisible}
        animationIn={"slideInUp"}
        animationOut={animationOut}
        onBackdropPress={() => {
          setAnimationOut('fadeOutDownBig');
          setVisibleModal(false);
        }}
        // onTouchStart={e => global.startTouch = e.nativeEvent.pageY}
        // onTouchEndCapture={e => {
        //   global.endTouch = e.nativeEvent.pageY;
        //   let startTouch = global.startTouch;
        //   let endTouch = global.endTouch;
        //   if (startTouch < endTouch) {
        //     console.log('down');
        //     setVisibleModal(false);
        //   }
        // }}
        style={{ position: 'absolute', right: 0, bottom: '25%', width: '90%' }}
      >
        <Row>
          <Col>
            <View style={{
              backgroundColor: '#5c5c5c',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: globalVars.selectedColors.backopaque,
              padding: 5,
              width: '100%',

            }}>
              <View style={{
                borderRadius: 10,
                maxHeight: 333,
              }}>
                <Row>
                  <Col size={4}>
                    <Image style={{
                      borderColor: '#333333',
                      borderWidth: 1,
                      borderRadius: 5, width: 100, height: 100,
                      marginLeft: 0,
                      marginBottom: 10,
                      backgroundColor: globalVars.selectedColors.primary,
                    }}
                      source={{ uri: profileImage }} />
                  </Col>
                  <Col size={8}>
                    <Row>
                      <Col>
                        <Text style={{ fontSize: 20 }}>{userName}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <PraiseButton
                          iconName={'link-variant'}
                          text={''}
                          setAnimationOut={setAnimationOut}
                          setVisibleModal={setVisibleModal} />
                      </Col>
                      <Col>
                        <PraiseButton
                          iconName={'account-group'}
                          text={''}
                          setAnimationOut={setAnimationOut}
                          setVisibleModal={setVisibleModal} />
                      </Col>
                      <Col>
                        <PraiseButton
                          iconName={'heart'}
                          text={''}
                          setAnimationOut={setAnimationOut}
                          setVisibleModal={setVisibleModal} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  key={(i) => i.id}
                  data={data}
                  renderItem={({ item, index }) =>
                    <PraiseButton
                      iconName={item.icon}
                      text={item.text}
                      setAnimationOut={setAnimationOut}
                      setVisibleModal={setVisibleModal}
                      exit={true} />
                  } />
              </View>
            </View>
          </Col>
        </Row>
      </Modal>
    </View>
  );
}

function PraiseButton({ 
  iconName, 
  iconNameSec,
  text, 
  setVisibleModal, 
  setAnimationOut,
  textColor = '#ffffff',
  textColorSec = '#5c8fb9ff',
  exit = false
}) {
  iconNameSec = iconNameSec ? iconNameSec : iconName;
  let [selected, setSelect] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setAnimationOut("fadeOutUpBig");
        setSelect(!selected);
        if(exit) setVisibleModal(false);
      }}
      style={{
        width: '100%',
        backgroundColor: globalVars.selectedColors.backdrop,
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <Text style={{ padding: 10 }}>
        <MaterialCommunityIcons
          name={!selected ? iconName : iconNameSec}
          color={!selected ? textColor : textColorSec} 
          size={35}
        />
      </Text>
      <Text style={{ fontSize: 18, color: (!selected ? textColor : textColorSec), width: '65%' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default PraiseComponent;