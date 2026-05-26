// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function ChatIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="27" height="26" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7 12H15M7 7H11" stroke="#141B34" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M5.09881 17.5C3.7987 17.3721 2.82475 16.9816 2.17157 16.3284C1 15.1569 1 13.2712 1 9.5V9C1 5.22876 1 3.34315 2.17157 2.17157C3.34315 1 5.22876 1 9 1H13C16.7712 1 18.6569 1 19.8284 2.17157C21 3.34315 21 5.22876 21 9V9.5C21 13.2712 21 15.1569 19.8284 16.3284C18.6569 17.5 16.7712 17.5 13 17.5C12.4395 17.5125 11.9931 17.5551 11.5546 17.655C10.3562 17.9309 9.2465 18.5441 8.14987 19.0789C6.58729 19.8408 5.806 20.2218 5.31569 19.8651C4.37769 19.1665 5.29454 17.0019 5.5 16" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
        </Svg>
    );
}
