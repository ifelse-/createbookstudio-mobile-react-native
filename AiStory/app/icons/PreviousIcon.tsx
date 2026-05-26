// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function PreviousIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.06492 9.6258C5.31931 10.8374 6.67295 11.7077 9.3802 13.4481C12.3247 15.3411 13.797 16.2876 14.9895 15.9229C15.3934 15.7994 15.7654 15.5823 16.0777 15.2876C17 14.4178 17 12.6118 17 9C17 5.38816 17 3.58224 16.0777 2.71235C15.7654 2.41773 15.3934 2.20057 14.9895 2.07707C13.797 1.71243 12.3247 2.6589 9.3802 4.55186C6.67295 6.29233 5.31931 7.1626 5.06492 8.3742C4.97836 8.7865 4.97836 9.2135 5.06492 9.6258Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linejoin="round" />
            <Path d="M1 1V17" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
        </Svg>
    );
}
