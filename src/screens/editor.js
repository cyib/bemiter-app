import React, { useState } from "react";
import { View, Image, TouchableOpacity, Dimensions, Text } from "react-native";
import { Video } from 'expo-av';
import globalVars from "../helpers/globalVars";
import { Row, Col } from "react-native-paper-grid";

const EditorScreen = (props) => {
    var [file, setFile] = useState(props.route.params.file);
    console.log(props.route.params.file);

    var maxWidth = Dimensions.get('screen').width;
    var maxHeight = Dimensions.get('screen').height;

    return (
        <View style={{ height: maxHeight, backgroundColor: globalVars.selectedColors.background }}>
            <View style={{}}>
                <Row>
                    <Col>
                        <View style={{ backgroundColor: 'blue'}}>
                            {file ?
                                <>
                                    {file.type == 'image' ?
                                        <Image source={{ uri: file.uri }} style={{ width: '100%', height: 500, zIndex: -1, resizeMode: 'contain' }} />
                                        :
                                        <Video source={{ uri: file.uri }} useNativeControls style={{ width: '100%', height: 500, resizeMode: 'contain' }} />
                                    }
                                </>
                                : null}
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>TESTE</Text>
                    </Col>
                </Row>
            </View>
        </View>
    );
}

export default EditorScreen;