// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function RedoIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M10 1H5.5C3.01472 1 1 3.01472 1 5.5C1 7.9853 3.01472 10 5.5 10H17" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M14 7C14 7 17 9.2095 17 10C17 10.7906 14 13 14 13" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

