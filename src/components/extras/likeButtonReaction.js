import React, { Component } from "react";
import { View, TouchableOpacity, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalVars from "../../helpers/globalVars";
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactionSlider from '../extras/likeSlider';

var reactionLike = require('../../assets/reactions/like.gif');



export default class LikeButton extends Component {
  constructor(props) {
    super(props);

    this.baseState = {
      likeReactionsShow: false,
      reactionLevel: 0,
      thumbIcon: reactionLike
    }

    this.state = this.baseState;
  }

  componentDidMount() {

  }

  stopTouch = () => {
    // this.props.setScrollEnabled(true);
    // this.setState({ likeReactionsShow: false });
  }

  render() {
    return (
      <View onTouchEndCapture={() => this.stopTouch()}>
        <TouchableOpacity
          style={{ zIndex: -1 }}
          delayPressIn={100} onPressIn={() => {
            this.props.setScrollEnabled(false);
          }}
          delayLongPress={250} onLongPress={() => {
            this.setState({ likeReactionsShow: true });
          }}
          onPressOut={() => this.stopTouch()}
          onPress={() => {
            this.props.setVotes(this.props.votes + 1);
          }}>
          <Text>
            <MaterialCommunityIcons name="heart-outline" color={globalVars.selectedColors.primary} size={40} />
          </Text>
        </TouchableOpacity>
      </View>)
  }

  // return (
  //   <View onTouchEnd={() => {
  //     this.props.setScrollEnabled(true);
  //     this.setState({ likeReactionsShow: false });
  //   }}>
  //     <TouchableOpacity
  //       style={{ zIndex: -1 }}
  //       delayPressIn={100} onPressIn={() => {
  //         this.props.setScrollEnabled(false);
  //       }}
  //       delayLongPress={250} onLongPress={() => {
  //         console.log('pressed');
  //         this.setState({ likeReactionsShow: true });
  //       }}
  //       onPress={() => { this.props.setVotes(this.props.votes + 1) }}>
  //       <Text>
  //         <MaterialCommunityIcons name="heart-outline" color={globalVars.selectedColors.primary} size={40} />
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  // )
}