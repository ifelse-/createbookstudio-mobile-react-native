// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function SunIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M16 11C16 13.7614 13.7614 16 11 16C8.23858 16 6 13.7614 6 11C6 8.23858 8.23858 6 11 6C13.7614 6 16 8.23858 16 11Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
            <Path d="M11 1V2.5M11 19.5V21M18.0708 18.0713L17.0101 17.0106M4.98926 4.98926L3.9286 3.9286M21 11H19.5M2.5 11H1M18.0713 3.92871L17.0106 4.98937M4.98975 17.0107L3.92909 18.0714" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
        </Svg>
    );
}