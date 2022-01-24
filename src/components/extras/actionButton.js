import React, { Component } from "react";
import { View, TouchableOpacity, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalVars from "../../helpers/globalVars";

export default class ActionButton extends Component {
  constructor(props) {
    super(props);

    this.baseState = {
      likeReactionsShow: false,
      filled: this.props.filled ? this.props.filled : false,
      iconFilled: this.props.iconFilled ? this.props.iconFilled : 'heart',
      iconInit: this.props.iconInit ? this.props.iconInit : 'heart-outline',
      size: this.props.size ? this.props.size : 32,
      color: this.props.color ? this.props.color : globalVars.selectedColors.primary,
      colorFilled: this.props.colorFilled ? this.props.colorFilled : globalVars.selectedColors.primary
    }

    this.state = this.baseState;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    nextState.filled = nextProps.filled;
  }


  render() {
    return (
      <View>
        <TouchableOpacity
          style={{ 
            height: 40, 
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if(this.props.press){
              if (!this.state.filled) this.props.press(true);
              if (this.state.filled) this.props.press(false);
            }
            this.setState({ filled: !this.state.filled });
          }}>
          <Text>
            {
              this.state.filled ?
                <MaterialCommunityIcons
                  name={this.state.iconFilled}
                  color={this.state.colorFilled}
                  size={this.state.size} />
                :
                <MaterialCommunityIcons
                  name={this.state.iconInit}
                  color={this.state.color}
                  size={this.state.size} />
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}