import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-paper-grid";
import { Headline, Subheading } from "react-native-paper";
import globalVars from '../helpers/globalVars';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ProfileHeader from '../components/profile/header';
import Miniature from '../components/post/miniature';

const ProfileScreen = (props) => {
    var windowWidth = Dimensions.get('window').width;

    return (
        <View style={{ backgroundColor: globalVars.currentTheme.colors.background, marginLeft: -10 }}>
            <ScrollView>
                <Grid>
                    <ProfileHeader />
                    <Row style={{
                        backgroundColor: globalVars.currentTheme.colors.background,
                        margin: -10,
                        marginTop: 10,
                        minHeight: 700
                    }}>
                        <Col>
                            <Row>
                                <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '300' }}>Fotos próprias</Text>
                            </Row>
                            <Row>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <Miniature src="https://i.giphy.com/media/DHhYExaEKTSXglnX7j/giphy.gif" />
                                    <Miniature src="https://i.giphy.com/media/xUPGcf60DXiKqIe8uc/giphy.gif" />
                                    <Miniature src="https://i.giphy.com/media/f6tQW4YUo2zsgyuqYn/giphy.gif" />
                                    <Miniature />
                                    <Miniature />
                                </ScrollView>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;