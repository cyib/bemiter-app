import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { View } from "react-native";

//screens
import HomeScreen from "./screens/home";
import SettingsScreen from "./screens/settings";
import StackScreen from "./screens/stack";
import ProfileScreen from "./screens/profile";

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//colors
import globalVars from './helpers/globalVars';
import CreateScreen from "./screens/create";
import CameraScreen from "./screens/camera";
import SendFile from "./screens/sendfile";
import EditorScreen from "./screens/editor";
import ForumScreen from "./screens/forum";

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
                    headerStyle: { backgroundColor: globalVars.selectedColors.background }
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
                    headerStyle: { backgroundColor: globalVars.selectedColors.background }
                }}
            />
            <FeedStackNavigator.Screen
                name="ProfileFeed"
                component={ProfileScreen}
                options={{
                    headerBackTitleVisible: false,
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
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="ForumTab"
                component={ForumScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: globalVars.currentTheme.colors.accent,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="forum" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="SearchTab"
                component={SettingsScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: globalVars.currentTheme.colors.accent,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                    tabBarShowLabel: false,
                    title: '',
                    tabBarInactiveTintColor: globalVars.currentTheme.colors.accent,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={30} />
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

