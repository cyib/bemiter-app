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
      iconInit: this.props.iconInit ? this.props.iconInit : 'heart-outline',
      iconFilled: this.props.iconFilled ? this.props.iconFilled : (this.props.iconInit ? this.props.iconInit : 'heart'),
      size: this.props.size ? this.props.size : 32,
      color: this.props.color ? this.props.color : globalVars.selectedColors.primary,
      colorFilled: this.props.colorFilled ? this.props.colorFilled : (this.props.color ? this.props.color : globalVars.selectedColors.primary),
      colorBackground: this.props.colorBackground ? this.props.colorBackground : 'transparent',
      withoutTouch: this.props.withoutTouch ? this.props.withoutTouch : false
    }

    this.state = this.baseState;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    nextState.filled = nextProps.filled;
  }

  render() {
    return (
      <View>
        {
          !this.state.withoutTouch ?
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (this.props.press) {
                  if (!this.state.filled) this.props.press(true);
                  if (this.state.filled) this.props.press(false);
                }
                this.setState({ filled: !this.state.filled });
              }}>
              <Content
                colorBackground={this.state.colorBackground}
                filled={this.state.filled}
                iconInit={this.state.iconInit}
                iconFilled={this.state.iconFilled}
                color={this.state.color}
                colorFilled={this.state.colorFilled}
                size={this.state.size}
              />
            </TouchableOpacity>
            :
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
            <Content
              colorBackground={this.state.colorBackground}
              filled={this.state.filled}
              iconInit={this.state.iconInit}
              iconFilled={this.state.iconFilled}
              color={this.state.color}
              colorFilled={this.state.colorFilled}
              size={this.state.size}
            />
            </View>
        }
      </View>
    );

    function Content({ colorBackground, filled, iconInit, iconFilled, color, colorFilled, size }) {
      return (<View style={{
        backgroundColor: colorBackground, borderRadius: 3,
      }}>
        <Text style={{ width: size, height: size}}>
          {
            filled ?
              <MaterialCommunityIcons
                name={iconFilled}
                color={colorFilled}
                size={size} />
              :
              <MaterialCommunityIcons
                name={iconInit}
                color={color}
                size={size} />
          }
        </Text>
      </View>)
    }
  }

}