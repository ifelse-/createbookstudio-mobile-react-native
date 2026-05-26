// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function RightIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 10C1 6.25027 1 4.3754 1.95491 3.06107C2.26331 2.6366 2.6366 2.26331 3.06107 1.95491C4.3754 1 6.25027 1 10 1C13.7497 1 15.6246 1 16.9389 1.95491C17.3634 2.26331 17.7367 2.6366 18.0451 3.06107C19 4.3754 19 6.25027 19 10V12C19 15.7497 19 17.6246 18.0451 18.9389C17.7367 19.3634 17.3634 19.7367 16.9389 20.0451C15.6246 21 13.7497 21 10 21C6.25027 21 4.3754 21 3.06107 20.0451C2.6366 19.7367 2.26331 19.3634 1.95491 18.9389C1 17.6246 1 15.7497 1 12V10Z" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M15 8.5H7M15 13.5H12" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}
