// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function ForwardIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="24" height="24" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12.9351 8.6258C12.6807 9.8374 11.327 10.7077 8.6198 12.4481C5.67528 14.3411 4.20303 15.2876 3.01052 14.9229C2.60662 14.7994 2.23463 14.5823 1.92227 14.2876C1 13.4178 1 11.6118 1 8C1 4.38816 1 2.58224 1.92227 1.71235C2.23463 1.41773 2.60662 1.20057 3.01052 1.07707C4.20304 0.712429 5.67528 1.6589 8.6198 3.55186C11.327 5.29233 12.6807 6.1626 12.9351 7.3742C13.0216 7.7865 13.0216 8.2135 12.9351 8.6258Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linejoin="round" />
            <Path d="M17 1V15" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
        </Svg>
    );
}
