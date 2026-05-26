// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function TransactionIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M13.5 9.5C13.5 10.8807 12.3807 12 11 12C9.6193 12 8.5 10.8807 8.5 9.5C8.5 8.1193 9.6193 7 11 7C12.3807 7 13.5 8.1193 13.5 9.5Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
            <Path d="M18 8.64153C17.6749 8.59443 17.341 8.55863 17 8.53473M5 10.4653C4.65897 10.4415 4.32511 10.4056 4 10.3585" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M11 17C9.6675 17.6224 7.91707 18 6 18C4.93408 18 3.91969 17.8833 3 17.6726C1.49957 17.3289 1 16.4264 1 14.886V4.11397C1 3.12914 2.04003 2.45273 3 2.6726C3.91969 2.88325 4.93408 3 6 3C7.91707 3 9.6675 2.62236 11 2C12.3325 1.37764 14.0829 1 16 1C17.0659 1 18.0803 1.11675 19 1.3274C20.5817 1.68968 21 2.62036 21 4.11397V14.886C21 15.8709 19.96 16.5473 19 16.3274C18.0803 16.1167 17.0659 16 16 16C14.0829 16 12.3325 16.3776 11 17Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
        </Svg>
    );
}
