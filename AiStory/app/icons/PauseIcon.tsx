// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function PauseIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="60" height="60" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M26 51C39.8071 51 51 39.8071 51 26C51 12.1929 39.8071 1 26 1C12.1929 1 1 12.1929 1 26C1 39.8071 12.1929 51 26 51Z" fill='#1ed760' stroke='#1ed760' strokeWidth="1.5"  />
            <Path d="M18 26C18 22.7208 18 21.0812 18.8138 19.9189C19.1149 19.4889 19.4889 19.1149 19.9189 18.8138C21.0812 18 22.7208 18 26 18C29.2792 18 30.9188 18 32.0811 18.8138C32.5111 19.1149 32.8851 19.4889 33.1862 19.9189C34 21.0812 34 22.7208 34 26C34 29.2792 34 30.9188 33.1862 32.0811C32.8851 32.5111 32.5111 32.8851 32.0811 33.1862C30.9188 34 29.2792 34 26 34C22.7208 34 21.0812 34 19.9189 33.1862C19.4889 32.8851 19.1149 32.5111 18.8138 32.0811C18 30.9188 18 29.2792 18 26Z" fill={colorScheme === 'light' ? "#F9F9F9" : '#282C34'} stroke={colorScheme === 'light' ? "#F9F9F9" : '#282C34'} strokeWidth="1.5"  />
        </Svg>
    );
}
