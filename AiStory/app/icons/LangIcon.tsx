// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function LangIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M6 7.37931H10.5M10.5 7.37931H13.5M10.5 7.37931V6M16 7.37931H13.5M13.5 7.37931C12.9725 9.2656 11.8679 11.0487 10.6071 12.6158M10.6071 12.6158C9.5631 13.9134 8.41205 15.0628 7.39286 16M10.6071 12.6158C9.9643 11.8621 9.0643 10.6426 8.80714 10.0909M10.6071 12.6158L12.5357 14.6207" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M1.5 11C1.5 6.52166 1.5 4.28249 2.89124 2.89124C4.28249 1.5 6.52166 1.5 11 1.5C15.4783 1.5 17.7175 1.5 19.1088 2.89124C20.5 4.28249 20.5 6.52166 20.5 11C20.5 15.4783 20.5 17.7175 19.1088 19.1088C17.7175 20.5 15.4783 20.5 11 20.5C6.52166 20.5 4.28249 20.5 2.89124 19.1088C1.5 17.7175 1.5 15.4783 1.5 11Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
        </Svg>
    );
}