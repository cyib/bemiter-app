import React, { Component } from "react";
import { View, TouchableOpacity, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalVars from "../../helpers/globalVars";

export default class LikeButton extends Component {
  constructor(props) {
    super(props);

    this.baseState = {
      likeReactionsShow: false,
      reactionLevel: 0,
      liked: false,
      iconLiked: this.props.iconLiked ? this.props.iconLiked : 'heart',
      iconInit: this.props.iconInit ? this.props.iconInit : 'heart-outline'
    }

    this.state = this.baseState;
  }

  componentDidMount() {

  }

  render() {
    return (
      <View>
        <TouchableOpacity
        style={{height: 40}}
          onPress={() => { 
          if(!this.state.liked) this.props.setVotes(this.props.votes + 1); 
          if(this.state.liked) this.props.setVotes(this.props.votes - 1); 
          this.setState({liked: !this.state.liked})
          }}>
          <Text>
            {
              this.state.liked ? 
              <MaterialCommunityIcons name={this.state.iconLiked} color={globalVars.selectedColors.primary} size={32} /> 
              :
              <MaterialCommunityIcons name={this.state.iconInit} color={globalVars.selectedColors.primary} size={32} />
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}