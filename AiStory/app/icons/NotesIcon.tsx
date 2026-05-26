// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function NotesIcon({ selected }) {

    const { colorScheme } = useColorScheme();

    return (
        <>
            {selected ?
                <Svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M14.5 1V3M9.5 1V3M4.5 1V3" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M1 9C1 5.70017 1 4.05025 2.02513 3.02513C3.05025 2 4.70017 2 8 2H11C14.2998 2 15.9497 2 16.9749 3.02513C18 4.05025 18 5.70017 18 9V14C18 17.2998 18 18.9497 16.9749 19.9749C15.9497 21 14.2998 21 11 21H8C4.70017 21 3.05025 21 2.02513 19.9749C1 18.9497 1 17.2998 1 14V9Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M5.5 14H9.5M5.5 9H13.5" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="2" stroke-linecap="round" />
                </Svg>
                :
                <Svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M14.5 1V3M9.5 1V3M4.5 1V3" stroke="grey" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M1 9C1 5.70017 1 4.05025 2.02513 3.02513C3.05025 2 4.70017 2 8 2H11C14.2998 2 15.9497 2 16.9749 3.02513C18 4.05025 18 5.70017 18 9V14C18 17.2998 18 18.9497 16.9749 19.9749C15.9497 21 14.2998 21 11 21H8C4.70017 21 3.05025 21 2.02513 19.9749C1 18.9497 1 17.2998 1 14V9Z" stroke="grey" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M5.5 14H9.5M5.5 9H13.5" stroke="grey" strokeWidth="2" stroke-linecap="round" />
                </Svg>
            }
        </>
    );
}