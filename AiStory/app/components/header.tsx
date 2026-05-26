// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import BackIcon from "../icons/BackIcon";

export default function Header({ title }) {

    const { colorScheme } = useColorScheme();

    return (
        <View className="flex-row items-center">
            <BackIcon />
            <View className="w-3/4 flex-row items-center">
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base mt-4">{title}</Text>
            </View>
        </View>
    );
}