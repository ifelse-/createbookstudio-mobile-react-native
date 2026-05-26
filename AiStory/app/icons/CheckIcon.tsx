// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function CheckIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 8.125C1 4.76624 1 3.08687 2.04343 2.04343C3.08687 1 4.76624 1 8.125 1C11.4837 1 13.1631 1 14.2066 2.04343C15.25 3.08687 15.25 4.76624 15.25 8.125C15.25 11.4837 15.25 13.1631 14.2066 14.2066C13.1631 15.25 11.4837 15.25 8.125 15.25C4.76624 15.25 3.08687 15.25 2.04343 14.2066C1 13.1631 1 11.4837 1 8.125Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.3" />
            <Path d="M5.125 8.5L7 10.375L11.125 5.875" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.3" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
