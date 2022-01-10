import { Dimensions, View } from "react-native";
import * as Progress from 'react-native-progress';
import React from 'react';
import globalVars from "../../helpers/globalVars";

const topLoading = (props) => {
    var percentage = props.percentage ? props.percentage : 100;
    var width = (Dimensions.get('window').width * percentage) / 100;
    var showLoader = props.loading ? props.loading : false;
    return (showLoader ?
        <Progress.Bar
            color={globalVars.theme.primaryColor}
            width={width}
            height={2}
            borderWidth={0}
            borderRadius={0}
            indeterminate={true} /> : null)
}

export default topLoading;