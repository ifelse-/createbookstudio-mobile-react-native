// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function UndoIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8 1H12.5C14.9853 1 17 3.01472 17 5.5C17 7.9853 14.9853 10 12.5 10H1" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M3.99998 7C3.99998 7 1.00001 9.2095 1 10C0.99999 10.7906 4 13 4 13" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

