// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function LineIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="22" height="2" viewBox="0 0 22 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M18 1H20.5" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M12.5 1H15" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M7 1H9.5" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M1.5 1H4" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}
