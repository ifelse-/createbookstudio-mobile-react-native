// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function QuoteIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9 5C9 6.88562 9 7.8284 8.41421 8.4142C7.82843 9 6.88562 9 5 9C3.11438 9 2.17157 9 1.58579 8.4142C1 7.8284 1 6.88562 1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1C6.88562 1 7.82843 1 8.41421 1.58579C9 2.17157 9 3.11438 9 5Z" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5"/>
            <Path d="M9 4V8.4821C9 12.4547 6.48429 15.8237 3 17" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M21 5C21 6.88562 21 7.8284 20.4142 8.4142C19.8284 9 18.8856 9 17 9C15.1144 9 14.1716 9 13.5858 8.4142C13 7.8284 13 6.88562 13 5C13 3.11438 13 2.17157 13.5858 1.58579C14.1716 1 15.1144 1 17 1C18.8856 1 19.8284 1 20.4142 1.58579C21 2.17157 21 3.11438 21 5Z" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5"/>
            <Path d="M21 4V8.4821C21 12.4547 18.4843 15.8237 15 17" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
        </Svg>
    );
}
