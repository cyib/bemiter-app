import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator, useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator, useHeaderHeight  } from "@react-navigation/native-stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";

//screens
import HomeScreen from "./screens/home";
import SettingsScreen from "./screens/settings";
import StackScreen from "./screens/stack";
import ProfileScreen from "./screens/profile";
import PostScreen from "./screens/post";
import EmitsViewScreen from "./screens/emitsView";
import CreateEmitScreen from './screens/createEmit';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//colors
import globalVars from './helpers/globalVars';
import CreateScreen from "./screens/create";
import CameraScreen from "./screens/camera";
import SendFile from "./screens/sendfile";
import EditorScreen from "./screens/editor";
import ForumScreen from "./screens/forum";
import EmitsScreen from "./screens/emits";
import HashManageScreen from "./screens/hashManage";

const FeedStackNavigator = createNativeStackNavigator();

function FeedStack() {
    return (
        <FeedStackNavigator.Navigator
            initialRouteName="Home"
        >
            <FeedStackNavigator.Screen
                name="HomeFeed"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="CreateFeed"
                component={CreateScreen}
                options={{
                    title: 'Nova Postagem',
                    headerBackTitle: 'Feed',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="EditorFeed"
                component={EditorScreen}
                options={{
                    title: 'Editar',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="ProfileFeed"
                component={ProfileScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Perfil',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="PostProfile"
                component={PostScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Postagem',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="EmitsView"
                component={EmitsViewScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Buscando emits',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
        </FeedStackNavigator.Navigator>
    )
}

function FeedEmitStack() {
    return (
        <FeedStackNavigator.Navigator
            initialRouteName="Home"
        >
            <FeedStackNavigator.Screen
                name="HomeFeed"
                component={EmitsScreen}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <FeedStackNavigator.Screen
                name="CreateFeed"
                component={CreateEmitScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Novo emit',
                    headerBackTitle: 'Feed',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="HashManageFeed"
                component={HashManageScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Gerenciar Hashtags',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="ProfileFeed"
                component={ProfileScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Perfil',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="PostProfile"
                component={PostScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Emit',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="EmitsView"
                component={EmitsViewScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Buscando emits',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
        </FeedStackNavigator.Navigator>
    )
}

function ProfileStack() {
    return (
        <FeedStackNavigator.Navigator
            initialRouteName="ProfileProfile"
        >
            <FeedStackNavigator.Screen
                name="ProfileProfile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <FeedStackNavigator.Screen
                name="PostProfile"
                component={PostScreen}
                options={{
                    animation: "simple_push",
                    title: 'Postagem',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
            <FeedStackNavigator.Screen
                name="EmitsView"
                component={EmitsViewScreen}
                options={{
                    animation: "slide_from_right",
                    title: 'Buscando emits',
                    headerBackTitle: 'Voltar',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerTintColor: globalVars.selectedColors.text,
                    headerStyle: { backgroundColor: globalVars.selectedColors.background },
                    contentStyle: { backgroundColor: globalVars.selectedColors.background}
                }}
            />
        </FeedStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                unmountOnBlur: true,
                tabBarStyle: { 
                    backgroundColor: globalVars.currentTheme.colors.background,
                    borderTopColor: globalVars.currentTheme.colors.placeholder
                },
                tabBarActiveTintColor: globalVars.currentTheme.colors.text,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={FeedStack}
                options={{
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: globalVars.currentTheme.colors.accent,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-circle" color={color} size={32} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="EmitsTab"
                component={FeedEmitStack}
                options={{
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: globalVars.currentTheme.colors.accent,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="comment-quote" color={color} size={32} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="SearchTab"
                component={SettingsScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: globalVars.currentTheme.colors.accent,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="compass" color={color} size={32} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{
                    tabBarShowLabel: false,
                    title: '',
                    tabBarInactiveTintColor: globalVars.currentTheme.colors.accent,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={32} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}

