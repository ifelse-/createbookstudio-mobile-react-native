// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Image, Pressable, ScrollView, View, AppState, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from "expo-router";
import StyledText from "@/app/components/styledText";
import Header from "@/app/components/header";
import ChatIcon from "@/app/icons/ChatIcon";
import { useCallback, useEffect, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { useFocusEffect } from "@react-navigation/native";
import ShortNotesIcon from "@/app/icons/ShortNotesIcon";
import ImageView from "react-native-image-viewing";
import { SvgUri } from "react-native-svg";
import PagerView from 'react-native-pager-view';
import { PageIndicator } from "react-native-page-indicator";

export default function Course() {

    const { theory, subtopic } = useLocalSearchParams();

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View className="flex-row">
                <View className="flex-1 ">
                    <Header title={subtopic} />
                </View>
            </View>
            <ScrollView className="h-full mx-4 mt-4" showsVerticalScrollIndicator={false}>
                <StyledText text={theory} />
            </ScrollView>
        </View>
    );
}
