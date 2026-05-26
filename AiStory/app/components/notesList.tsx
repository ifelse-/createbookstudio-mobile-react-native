// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import { Pressable, Text, View } from 'react-native';
import EditNotesIcon from '../icons/EditNotesIcon';
import { router } from 'expo-router';

export default function NotesList({ data }) {

    const { colorScheme } = useColorScheme();

    function getFromatDate(originalDate: string | number | Date) {
        const dateObject = new Date(originalDate);
        const day = dateObject.getUTCDate().toString().padStart(2, '0');
        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getUTCFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    function redirectNotes() {
        router.navigate({ pathname: '/screens/connectScreens/notesEdit', params: { main: data.course } })
    }

    function getPlainText(htmlString) {
        var plainString = htmlString.replace(/<[^>]+>/g, '');
        return plainString;
    }

    return (
        <Pressable onPress={redirectNotes} className='flex-1 flex-row mx-4 mb-6 items-center'>
            <View className='flex-1 flex-col w-4/5 mr-4'>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base">{data.course}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs">{data.notes !== ' ' ? getPlainText(data.notes) : getFromatDate(data.date)}</Text>
            </View>
            <View className='mx-3 '>
                <EditNotesIcon />
            </View>
        </Pressable>
    );
}