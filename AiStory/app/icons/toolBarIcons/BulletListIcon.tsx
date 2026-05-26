// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function BulletListIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5 1H17" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M1 1H1.00898" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M1 8H1.00898" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M1 15H1.00898" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M5 8H17" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M5 15H17" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
        </Svg>
    );
}
