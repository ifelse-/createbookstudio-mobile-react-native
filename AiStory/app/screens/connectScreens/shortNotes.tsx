// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Header from '@/app/components/header';
import StatusBarComp from '@/app/components/statusBar';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Constants from 'expo-constants';
import StyledText from '@/app/components/styledText';

export default function ShortNotes() {

    const { main, text } = useLocalSearchParams();

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={main + " Short Notes"} />
            <ScrollView className="flex-1 mt-6" showsVerticalScrollIndicator={false}>
               <View className='mx-4 mb-4'>
               <StyledText text={text} />
               </View>
            </ScrollView>
            <StatusBarComp />
        </View>
    );
}