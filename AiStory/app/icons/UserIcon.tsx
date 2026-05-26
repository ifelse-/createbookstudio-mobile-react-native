// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function UserIcon() {

    const { colorScheme } = useColorScheme();

    async function redirectProfile() {
        router.navigate({ pathname: '/screens/connectScreens/profile', params: { username: await AsyncStorage.getItem('mName') } })
    }

    return (
        <Pressable onPress={redirectProfile} className="mx-4 mt-4">
            <Svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M4.57757 14.4816C3.1628 15.324 -0.546637 17.0441 1.71266 19.1966C2.81631 20.248 4.04549 21 5.59087 21H14.4091C15.9545 21 17.1837 20.248 18.2873 19.1966C20.5466 17.0441 16.8372 15.324 15.4224 14.4816C12.1048 12.5061 7.89519 12.5061 4.57757 14.4816Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M14.5 5.5C14.5 7.98528 12.4853 10 10 10C7.51472 10 5.5 7.98528 5.5 5.5C5.5 3.01472 7.51472 1 10 1C12.4853 1 14.5 3.01472 14.5 5.5Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="2" />
            </Svg>
        </Pressable>
    );
}
