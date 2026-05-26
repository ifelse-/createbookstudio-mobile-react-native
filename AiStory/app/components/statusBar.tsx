// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import { StatusBar } from "react-native";

export default function StatusBarComp() {

    const { colorScheme } = useColorScheme();

    return (
        <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
    );
}