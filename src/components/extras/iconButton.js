import React, { Component } from "react";
import { View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalVars from "../../helpers/globalVars";

export default class IconButton extends Component {
  constructor(props) {
    super(props);

    this.baseState = {
      icon: this.props.icon ? this.props.icon : 'heart',
      size: this.props.size ? this.props.size : 40,
      color: this.props.color ? this.props.color : globalVars.selectedColors.primary
    }

    this.state = this.baseState;
  }

  componentDidMount() {

  }

  render() {
    return (
      <View>
        <View
        style={{height: this.state.size}}
          onPress={() => {
          }}>
          <Text>
              <MaterialCommunityIcons name={this.state.icon} color={this.state.color} size={this.state.size} />
          </Text>
        </View>
      </View>
    )
  }

}