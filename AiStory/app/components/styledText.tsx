// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { useColorScheme } from 'nativewind';
import { Dimensions } from 'react-native';
import HTML, { defaultSystemFonts } from 'react-native-render-html';

export default function StyledText({ text }) {

    const { colorScheme } = useColorScheme();
    const systemFonts = [...defaultSystemFonts,
        'Montserrat_100Thin',
        'Montserrat_100Thin_Italic',
        'Montserrat_200ExtraLight',
        'Montserrat_200ExtraLight_Italic',
        'Montserrat_300Light',
        'Montserrat_300Light_Italic',
        'Montserrat_400Regular',
        'Montserrat_400Regular_Italic',
        'Montserrat_500Medium',
        'Montserrat_500Medium_Italic',
        'Montserrat_600SemiBold',
        'Montserrat_600SemiBold_Italic',
        'Montserrat_700Bold',
        'Montserrat_700Bold_Italic',
        'Montserrat_800ExtraBold',
        'Montserrat_800ExtraBold_Italic',
        'Montserrat_900Black',
        'Montserrat_900Black_Italic'
    ];

    return (
        <HTML defaultTextProps={{ selectable: true }} systemFonts={systemFonts} baseStyle={{ color: colorScheme === 'dark' ? 'white' : '#282C34', paddingBottom: 50, fontFamily: 'Montserrat_500Medium' }} source={{ html: text }} tagsStyles={{
            pre: {
                backgroundColor: '#282C34',
                borderRadius: 10,
                paddingHorizontal: 8,
                paddingTop: 10,
                color: '#fff'
            },
            strong: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_700Bold',
            },
            h1: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_700Bold'
            },
            h2: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_700Bold'
            },
            h3: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_700Bold'
            },
            h4: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_700Bold'
            },
            h5: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_700Bold'
            },
            h6: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_700Bold'
            },
            p: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium'
            },
            a: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium'
            },
            em: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium_Italic'
            },
            i: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium_Italic'
            },
            ul: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium'
            },
            ol: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium'
            },
            li: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium'
            },
            blockquote: {
                fontWeight: 'normal',
                fontFamily: 'Montserrat_500Medium_Italic',
                borderLeftColor: '#282C34',
                borderLeftWidth: 4,
                paddingLeft: 10,
                marginLeft: 10,
            }
        }} contentWidth={Dimensions.get('screen').width} />
    );
}