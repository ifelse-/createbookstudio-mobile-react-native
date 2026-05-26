// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function BoldIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 2.58579 1 1.87868 1.43934 1.43934C1.87868 1 2.58579 1 4 1H8.5789C11.0206 1 13 3.01472 13 5.5C13 7.98528 11.0206 10 8.5789 10H1V4Z" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M8.4286 10H9.6667C12.0599 10 14 12.0147 14 14.5C14 16.9853 12.0599 19 9.6667 19H4C2.58579 19 1.87868 19 1.43934 18.5607C1 18.1213 1 17.4142 1 16V10" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}

