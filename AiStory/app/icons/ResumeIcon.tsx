// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function ResumeIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M23.0002 44.6667C34.9663 44.6667 44.6668 34.9662 44.6668 23C44.6668 11.0339 34.9663 1.33337 23.0002 1.33337C11.034 1.33337 1.3335 11.0339 1.3335 23C1.3335 34.9662 11.034 44.6667 23.0002 44.6667Z" fill='#1ed760' stroke='#1ed760' strokeWidth="1.5" />
            <Path d="M17.5835 21.2662V24.7337C17.5835 28.0255 17.5835 29.6713 18.571 30.3367C19.5584 31.0019 20.9089 30.2659 23.6101 28.7938L26.7912 27.0599C30.0416 25.2884 31.6668 24.4027 31.6668 23C31.6668 21.5973 30.0416 20.7115 26.7912 18.9401L23.6101 17.2062C20.9089 15.734 19.5584 14.998 18.571 15.6632C17.5835 16.3285 17.5835 17.9744 17.5835 21.2662Z" fill={colorScheme === 'light' ? "#F9F9F9" : '#282C34'} />
        </Svg>
    );
}
