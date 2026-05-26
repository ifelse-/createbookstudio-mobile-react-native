// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function DownloadIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 11L1.23384 11.6626C2.144 14.2413 2.59908 15.5307 3.63742 16.2654C4.67576 17 6.0431 17 8.7778 17H11.2222C13.9569 17 15.3242 17 16.3626 16.2654C17.4009 15.5307 17.856 14.2413 18.7662 11.6626L19 11" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
            <Path d="M10 11V1M10 11C9.2998 11 7.99153 9.0057 7.5 8.5M10 11C10.7002 11 12.0085 9.0057 12.5 8.5" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
