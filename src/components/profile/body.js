import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, View, LogBox } from "react-native";
import { Col, Row } from "react-native-paper-grid";
import { getData } from "../../helpers/cache";
import profileThemes from "../../helpers/profileThemes";
import IconButton from "../extras/iconButton";
import widgetShape, { widgetList } from "../extras/widgetShapes";
import WidgetModal from "./widget";
import uuid from 'react-native-uuid';

export default function ProfileBody(props) {

    var [userInfo, setUserInfo] = useState(props.userInfo ? props.userInfo : userInfoBase);
    var [colors, setColors] = useState(profileThemes[props.userInfo.theme ? props.userInfo.theme : 'default']);

    var [widgets, setWidgets] = useState(null);
    var [reload, setReload] = useState(false);

    useEffect(async () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        var widgets_ = await getData('userWidgets');
        setWidgets(widgets_);
    }, [reload]);

    useEffect(() => {

    }, [widgets]);

    return (
        <>
            <View style={{ width: Dimensions.get('screen').width }}>
                <Row>
                    <Col>
                        <View style={{
                            alignItems: 'center', justifyContent: 'center',
                            backgroundColor: colors.primary, borderRadius: 5,
                        }}>
                            {
                                (!widgets || widgets.length == 0) ?
                                    <Empty />
                                    :
                                    <FlatList
                                        key={(item) => item.id}
                                        data={widgets}
                                        scrollEnabled={false}
                                        renderItem={({ item }) => <WidgetItem options={item} />}
                                        ListFooterComponent={() => <View style={{ marginBottom: 5 }} />}
                                    />
                            }
                        </View>
                        {props.myselfProfile ?
                            <View style={{
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <WidgetModal
                                    userInfo={userInfo}
                                    reload={reload}
                                    setReload={setReload} />
                            </View>
                            : null}
                    </Col>
                </Row>
            </View>
        </>
    );

    function WidgetItem({ options }) {
        return (<>
            <View style={{ marginBottom: -3 }}>
                {options.title && options.title != '' ?
                    <Text style={{ fontSize: 16, padding: 5 }}>{options.title}</Text>
                    : null}
                {widgetShape[options.functionName](colors, props.myselfProfile)}
            </View>

        </>);
    }

    function Empty() {
        return (
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center', textAlignVertical: 'center', height: '80%' }}>
                    <Text>
                        <IconButton icon={'ghost'} color={colors.border} size={56} />
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        Sem publicações
                    </Text>
                </View>
            </View>
        )
    }
}