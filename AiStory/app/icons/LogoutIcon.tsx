// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function LogoutIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M13 15.625C12.9264 17.4769 11.3831 19.0494 9.3156 18.9988C8.8346 18.987 8.2401 18.8194 7.05112 18.484C4.18961 17.6768 1.70555 16.3203 1.10956 13.2815C1 12.723 1 12.0944 1 10.8373V9.1627C1 7.90561 1 7.27705 1.10956 6.71846C1.70555 3.67965 4.18961 2.32316 7.05112 1.51603C8.2401 1.18064 8.8346 1.01295 9.3156 1.00119C11.3831 0.950607 12.9264 2.52307 13 4.37501" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
            <Path d="M19 10H8M19 10C19 9.2998 17.0057 7.99153 16.5 7.5M19 10C19 10.7002 17.0057 12.0085 16.5 12.5" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
