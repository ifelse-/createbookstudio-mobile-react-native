// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import StatusBarComp from '@/app/components/statusBar';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import Header from '@/app/components/header';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { serverURL } from '@/app/Constants';
import axios from 'axios';
import StyledText from '@/app/components/styledText';

export default function Policy() {

    const { colorScheme } = useColorScheme();
    const { title, type } = useLocalSearchParams();
    const [processing, setIsLoading] = useState(true);
    const [policies, setText] = useState('');

    useEffect(() => {
        getDetails();
    }, []);

    async function getDetails() {
        const postURL = serverURL + `/api/policies`;
        const response = await axios.get(postURL);
        setIsLoading(false);
        if (type === 'privacy') {
            setText(response.data[0].privacy);
        } else if (type === 'terms') {
            setText(response.data[0].terms);
        } else if (type === 'delete') {
            setText(response.data[0].delete);
        } else if (type === 'billing') {
            setText(response.data[0].billing);
        } else if (type === 'refund') {
            setText(response.data[0].refund);
        } else if (type === 'cancel') {
            setText(response.data[0].cancel);
        }
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={title} />
            {processing ?
                <View className="h-full justify-center self-center">
                    <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false} className='mt-4 mx-4'>
                    <StyledText text={policies} />
                </ScrollView>
            }
            <StatusBarComp />
        </View >
    );
}