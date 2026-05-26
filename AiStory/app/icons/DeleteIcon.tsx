// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function DeleteIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M17.5 4.5L16.8803 14.5251C16.7219 17.0864 16.6428 18.3671 16.0008 19.2879C15.6833 19.7431 15.2747 20.1273 14.8007 20.416C13.8421 21 12.559 21 9.9927 21C7.42312 21 6.1383 21 5.17905 20.4149C4.7048 20.1257 4.296 19.7408 3.97868 19.2848C3.33688 18.3626 3.25945 17.0801 3.10461 14.5152L2.5 4.5" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
            <Path d="M7 10.7349H13" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
            <Path d="M8.5 14.6543H11.5" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
            <Path d="M1 4.5H19M14.0555 4.5L13.3729 3.09173C12.9194 2.15626 12.6926 1.68852 12.3015 1.39681C12.2148 1.3321 12.1229 1.27454 12.0268 1.2247C11.5937 1 11.0739 1 10.0343 1C8.9686 1 8.4358 1 7.99549 1.23412C7.89791 1.28601 7.80479 1.3459 7.7171 1.41317C7.32145 1.7167 7.10044 2.20155 6.65842 3.17126L6.05273 4.5" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" />
        </Svg>
    );
}
