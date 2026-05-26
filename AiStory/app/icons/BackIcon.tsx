// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function BackIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Pressable className="mx-4 mt-4" onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>
            <Svg width="24" height="18" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1 6H17" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M5.99996 11C5.99996 11 1.00001 7.3176 1 6C0.99999 4.6824 6 1 6 1" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </Svg>
        </Pressable>
    );
}
