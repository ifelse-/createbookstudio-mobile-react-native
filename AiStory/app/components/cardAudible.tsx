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

export default function CardAudible({ data }) {

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
        const jsonData = JSON.parse(data.content);
        router.navigate({ pathname: '/screens/connectScreens/audioCourse', params: { main: data.mainTopic.toUpperCase(), json: JSON.stringify(jsonData), lang: data.lang, type: data.type, courseId: data._id } });

    }

    function getTheoryPlainText(htmlString) {
        var plainString = htmlString.replace(/<[^>]+>/g, '');
        return plainString;
    }

    return (
        <View className="flex-row w-screen items-center mt-6 mx-4">

            <Pressable className="w-1/4 justify-center " onPress={redirectCourseContent}>
                <Image style={{ width: "100%", aspectRatio: 3 / 2, borderRadius: 5, resizeMode: 'cover' }} src={data.photo} />
            </Pressable>

            <Pressable onPress={redirectCourseContent} style={{width: '65%'}} className="justify-center ml-2">
                <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base uppercase">{data.mainTopic}</Text>
                <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} numberOfLines={1} ellipsizeMode='tail' className="text-xs mt-1 capitalize">{getTheoryPlainText(data.type)}</Text>
            </Pressable>

        </View>
    );
}
