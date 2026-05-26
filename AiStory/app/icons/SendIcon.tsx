// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function SendIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="26" height="26" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M19.1593 10.5062C19.2778 7.30754 3.63016 -0.214228 2.15636 1.27871C0.485074 2.97169 4.48089 8.00243 5.38083 9.60439C5.92212 10.5677 5.9072 10.9855 5.29181 11.9478C2.50482 16.306 1.12228 18.4774 1.98156 19.416C3.35108 20.9122 19.0437 13.6278 19.1593 10.5062Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
            <Path d="M5.72727 10.4774H10.677" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
