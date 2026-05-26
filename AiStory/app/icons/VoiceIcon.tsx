// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function VoiceIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="26" height="26" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1.604 11.5C1.604 6.83507 1.604 4.5026 3.05321 3.05338C4.50243 1.60417 6.8349 1.60417 11.4998 1.60417C16.1647 1.60417 18.4972 1.60417 19.9465 3.05338C21.3957 4.5026 21.3957 6.83507 21.3957 11.5C21.3957 16.1649 21.3957 18.4974 19.9465 19.9467C18.4972 21.3958 16.1647 21.3958 11.4998 21.3958C6.8349 21.3958 4.50243 21.3958 3.05321 19.9467C1.604 18.4974 1.604 16.1649 1.604 11.5Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
            <Path d="M11.5 7.33333V15.6667" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M8.375 9.41667V13.5833" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M5.25 10.4583V12.5417" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M14.625 9.41667V13.5833" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M17.75 10.4583V12.5417" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
