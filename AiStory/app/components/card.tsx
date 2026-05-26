// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Image, Pressable, Text, View } from "react-native";
import PlayIcon from "../icons/PlayIcon";
import CertificateIcon from "../icons/CertificateIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { ADSON } from "../Constants";
import BannerAds from "./bannerAds";

export default function Card({ data, type, index }) {

    const { colorScheme } = useColorScheme();
    function getFromatDate(originalDate: string | number | Date) {
        const dateObject = new Date(originalDate);
        const day = dateObject.getUTCDate().toString().padStart(2, '0');
        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getUTCFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    async function redirectCourseContent() {
        const completed = '' + data.complete;
        await AsyncStorage.setItem('courseId', data._id);
        await AsyncStorage.setItem('first', completed);

        const jsonData = JSON.parse(data.content);
        const mainTopicData = jsonData['chapters'][0];
        const mTopic = jsonData['chapters'].find(topic => topic.chapter_number === 1);
        mTopic.done = true
        await AsyncStorage.setItem('jsonData', JSON.stringify(jsonData))

        let ending = '';
        if (data.completed) {
            ending = data.end;
        }

        router.navigate({ pathname: '/screens/connectScreens/courseContent', params: { dat: JSON.stringify(jsonData), mainTopic: data.mainTopic.toUpperCase(), type: data.type, courseId: data._id, end: ending, lang: data.lang, photo: data.photo } })

    }

    function getTheoryPlainText(htmlString) {
        var plainString = htmlString.replace(/<[^>]+>/g, '');
        return plainString;
    }

    return (
        <>
            <View className="flex-col w-screen mt-6 mx-4">

                <Pressable className="w-11/12" onPress={redirectCourseContent}>
                    <Image style={{ aspectRatio: 3 / 2, borderRadius: 5, resizeMode: 'cover' }} src={data.photo} />
                </Pressable>

                <Pressable onPress={redirectCourseContent} className="justify-center w-11/12 mt-4">
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base uppercase">{data.mainTopic}</Text>
                    <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} numberOfLines={4} ellipsizeMode='tail' className="text-xs mt-2 capitalize">{getTheoryPlainText(data.type)}</Text>
                </Pressable>


            </View>
            {type === 'free' ?
                <View className="mt-2">
                    {ADSON && index % 2 === 0 ? <BannerAds /> : <></>}
                </View>
                :
                <></>
            }
        </>
    );
}
