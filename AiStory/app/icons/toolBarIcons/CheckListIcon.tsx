// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function CheckListIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9 3H19" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M9 9H19" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M9 15H19" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M1 4.39286C1 4.39286 2 5.04466 2.5 6C2.5 6 4 2.25 6 1" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M1 15.3929C1 15.3929 2 16.0447 2.5 17C2.5 17 4 13.25 6 12" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}
