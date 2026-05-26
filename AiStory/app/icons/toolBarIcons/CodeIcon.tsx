// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function CodeIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M14 5L15.8398 6.85008C16.6133 7.6279 17 8.0168 17 8.5C17 8.9832 16.6133 9.3721 15.8398 10.1499L14 12" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M4 5L2.16019 6.85008C1.38673 7.6279 1 8.0168 1 8.5C1 8.9832 1.38673 9.3721 2.16019 10.1499L4 12" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M11.5 1L6.5 17" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
