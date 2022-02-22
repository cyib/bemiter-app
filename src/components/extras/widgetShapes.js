import React, { useState } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { Col, Row } from "react-native-paper-grid";
import globalVars from "../../helpers/globalVars";
import postTemplates from "../../helpers/postTemplates";
import IconButton from "./iconButton";
import Post from "../post/post";

var defaultSize = 144;
//GRIDTYPES: 
// A = ALL
// B = PHOTO
// C = CATALOG
// D = VIDEO
// E = EVENT
// F = TEXT

module.exports = {
    widgetList: [
        { id: 0, label: 'Galeria Horizontal (Foto/Vídeo)', functionName: 'W_DEFAULT_GALERY' },
        { id: 1, label: 'Banner', functionName: 'W_BANNER' },
        { id: 2, label: 'Largo Básico', functionName: 'W_LARGE_BASIC' },
        { id: 3, label: 'Largo (Duas Unidades)', functionName: 'W_LARGE_TWO_UNIT' },
        { id: 3, label: 'Último Emit (Banner)', functionName: 'W_LAST_EMIT' },
    ],
    W_DEFAULT_GALERY,
    W_BANNER,
    W_LARGE_BASIC,
    W_LARGE_TWO_UNIT,
    W_LAST_EMIT
}

function W_DEFAULT_GALERY(colors, edit = false, contents = null) {
    var data = contents ? contents : [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]

    return (
        <>
            <ShapeCard colors={colors} edit={edit}>
                <View style={{ width: '100%' }}>
                    <FlatList
                        key={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => <Content item={item} />}
                    />
                </View>
            </ShapeCard>
        </>
    )

    function Content({ item }) {
        var placeholderImageUri = `https://picsum.photos/400/400?random=${getRandomInt(1, 1000)}`;

        return (
            <View style={{
                width: defaultSize,
                height: defaultSize,
                marginRight: 3
            }}>
                <PlaceHolderImage colors={colors} />
            </View>);
    }
}

function W_BANNER(colors, edit = false, contents = null) {
    return (
        <>
            <ShapeCard colors={colors} edit={edit} height={200}>
                <Row style={{ height: defaultSize }}>
                    <Col style={{ margin: 0, padding: 0, marginRight: 5 }}>
                        {contents ? contents[0] : <PlaceHolderImage colors={colors} />}
                    </Col>
                </Row>
            </ShapeCard>
        </>
    )
}

function W_LAST_EMIT(colors, edit = false, contents = null) {
    var data = postTemplates.text;
    console.log(data.content);
    var content = JSON.parse(data.content);
    return (
        <>
            <ShapeCard colors={colors} edit={edit} height={200}>
                <Row>
                    <Col>
                    <View style={{ marginHorizontal: 10, marginBottom: -10, marginTop: 5 }}>
                        <Text style={{ fontSize: 14 }}>emit mais recente</Text>
                        </View>
                    </Col>
                </Row>
                <Row style={{ height: defaultSize }}>
                    <Col>
                            <>
                                <Post
                                    postId={data.id}
                                    liked={data.liked ? data.liked : false}
                                    
                                    withoutHeader={true}
                                    withoutFooter={false}
                                    withoutSend={true}
                                    withoutSave={true}
                                    
                                    type={data.type}
                                    userId={data['User.id']}
                                    name={data['User.name']}
                                    profileImage={data['User.avatar']}
                                    votes={data.likes}

                                    src={content.source}
                                    content={content.description}
                                    createdAt={data.createdAt}
                                />
                            </>
                    </Col>
                </Row>
            </ShapeCard>
        </>
    )
}

function W_LARGE_BASIC(colors, edit = false, contents = null) {
    return (
        <>
            <ShapeCard colors={colors} edit={edit}>
                <Row style={{ height: defaultSize }}>
                    <Col size={2} style={{ margin: 0, padding: 0, marginRight: 3 }}>
                        {contents ? contents[0] : <PlaceHolderImage colors={colors} />}
                    </Col>
                    <Col size={1} style={{ margin: 0, padding: 0, marginRight: 5 }}>
                        {contents ? contents[1] : <PlaceHolderImage colors={colors} />}
                    </Col>
                </Row>
            </ShapeCard>
        </>
    )
}

function W_LARGE_TWO_UNIT(colors, edit = false, contents = null) {
    return (
        <>
            <ShapeCard colors={colors} edit={edit}>
                <Row style={{ height: defaultSize * 2, margin: 3, padding: 0, }}>
                    <Col size={2} style={{ margin: 0, padding: 0 }}>
                        {contents ? contents[0] : <PlaceHolderImage colors={colors} />}
                    </Col>
                    <Col size={1} style={{ margin: 0, padding: 0 }}>
                        <Row style={{ height: defaultSize + 1, margin: 0, marginTop: -1 }}>
                            <Col style={{ margin: -5 }}>
                                {contents ? contents[1] : <PlaceHolderImage colors={colors} />}
                            </Col>
                        </Row>
                        <Row style={{ height: defaultSize + 2, margin: 0, marginTop: -1 }}>
                            <Col style={{ margin: -5 }}>
                                {contents ? contents[1] : <PlaceHolderImage colors={colors} />}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ShapeCard>
        </>
    )
}

function ShapeCard(props) {

    return (
        <>
            <View style={{
                width: '100%',
                borderRadius: 5,
            }}>
                {props.edit ?
                    <View style={{ position: 'absolute', zIndex: 9999, backgroundColor: props.colors.primary, padding: 5, margin: 0, borderRadius: 3 }}>
                        <IconButton color={props.colors.text} icon={'square-edit-outline'} />
                    </View>
                    : null}
                {props.children}
            </View>
        </>
    )
}

function PlaceHolderImage({ withPhoto = true, colors = null }) {
    var placeholderImageUri;

    if (!withPhoto) placeholderImageUri = 'https://www.maxpixel.net/static/photo/1x/Add-Add-New-Icon-Add-Media-Icon-Add-New-New-2935429.png';
    if (withPhoto) placeholderImageUri = `https://picsum.photos/${defaultSize * 4}/${defaultSize * 2}?random=${getRandomInt(1, 1000)}`;
    return (
        <View style={{ padding: 0 }}>
            <Image source={{ uri: placeholderImageUri }}
                resizeMode={"cover"}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: colors.border
                }} />
        </View>
    )
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}