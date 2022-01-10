import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import globalVars from '../../../helpers/globalVars';

const ContentText = (props) => {
  var [content, setContent] = useState(props.content ? props.content : '...');

  return (
    <View>
        <View style={{ backgroundColor: globalVars.selectedColors.background,
          paddingVertical: 10, paddingHorizontal: 10, margin: 10, borderRadius: 5, marginVertical: 0 }}>
          <Text style={{ fontSize: 16}}>
            {content}
          </Text>
        </View>
    </View>
  );
}

export default ContentText;