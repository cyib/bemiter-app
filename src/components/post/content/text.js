import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import globalVars, { selectedColors } from '../../../helpers/globalVars';

const ContentText = (props) => {
  var [content, setContent] = useState(props.content ? props.content : '...');

  return (
    <View>
        <View style={{ backgroundColor: globalVars.selectedColors.backopaque,
          paddingVertical: 10, paddingHorizontal: 10, margin: 5, borderRadius: 2, marginVertical: -5 }}>
          <Text style={{ fontSize: 16}}>
            {content}
          </Text>
        </View>
    </View>
  );
}

export default ContentText;