// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function UnderLineIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3.5 1V9.5C3.5 13.0899 6.41015 16 10 16C13.5899 16 16.5 13.0899 16.5 9.5V1" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M1 19H19" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
        </Svg>
    );
}
