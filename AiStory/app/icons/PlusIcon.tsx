// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function PlusIcon({ selected }) {

    const { colorScheme } = useColorScheme();

    return (
        <>
            {selected ?
                <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12.5 8.5V16.5M16.5 12.5H8.5" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M3 12.5C3 8.02166 3 5.78249 4.39124 4.39124C5.78249 3 8.02166 3 12.5 3C16.9783 3 19.2175 3 20.6088 4.39124C22 5.78249 22 8.02166 22 12.5C22 16.9783 22 19.2175 20.6088 20.6088C19.2175 22 16.9783 22 12.5 22C8.02166 22 5.78249 22 4.39124 20.6088C3 19.2175 3 16.9783 3 12.5Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="2" />
                </Svg>
                :
                <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12.5 8.5V16.5M16.5 12.5H8.5" stroke="grey" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M3 12.5C3 8.02166 3 5.78249 4.39124 4.39124C5.78249 3 8.02166 3 12.5 3C16.9783 3 19.2175 3 20.6088 4.39124C22 5.78249 22 8.02166 22 12.5C22 16.9783 22 19.2175 20.6088 20.6088C19.2175 22 16.9783 22 12.5 22C8.02166 22 5.78249 22 4.39124 20.6088C3 19.2175 3 16.9783 3 12.5Z" stroke="grey" strokeWidth="2" />
                </Svg>}
        </>
    );
}
