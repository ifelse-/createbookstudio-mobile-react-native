// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function PlayIcon({ size }) {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width={size ? "21" : "19"} height={size ? "22" : "20"} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <Path d="M14.8906 9.346C14.5371 10.689 12.8667 11.638 9.5257 13.5361C6.296 15.3709 4.6812 16.2884 3.37983 15.9196C2.8418 15.7671 2.35159 15.4776 1.95624 15.0787C1 14.1139 1 12.2426 1 8.5C1 4.7574 1 2.8861 1.95624 1.92132C2.35159 1.52245 2.8418 1.23288 3.37983 1.08042C4.6812 0.71165 6.296 1.62907 9.5257 3.46393C12.8667 5.36197 14.5371 6.311 14.8906 7.654C15.0365 8.2084 15.0365 8.7916 14.8906 9.346Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linejoin="round" />
        </Svg >
    );
}
