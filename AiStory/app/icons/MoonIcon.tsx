// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function MoonIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M20 12.5784C18.8003 13.2189 17.4301 13.5821 15.9751 13.5821C11.2491 13.5821 7.41792 9.7509 7.41792 5.02485C7.41792 3.56986 7.78105 2.19968 8.42163 1C4.16765 1.99698 1 5.81513 1 10.3731C1 15.6899 5.3101 20 10.6269 20C15.1849 20 19.003 16.8324 20 12.5784Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}