// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function RetryIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="26" height="26" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M19.0092 1V4.13219C19.0092 4.42605 18.6418 4.55908 18.4537 4.33333C16.6226 2.2875 13.9617 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
