// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function EditNotesIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="23" height="24" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8.1401 19.298H7.31685C4.33906 19.298 2.85016 19.298 1.92508 18.3583C1 17.4185 1 15.9061 1 12.8813V8.29794C1 5.2731 1 3.76068 1.92508 2.82099C2.85016 1.88129 4.33906 1.88129 7.31685 1.88129H10.024C13.0018 1.88129 14.7415 1.93187 15.6667 2.87157C16.5918 3.81126 16.5833 5.2731 16.5833 8.29794V9.38549"  stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5"  stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M13.3249 1V2.83333M8.74153 1V2.83333M4.1582 1V2.83333"  stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M5.125 12.9167H8.79167M5.125 8.33337H12.4583"  stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5"  stroke-linecap="round" />
            <Path opacity="0.93" d="M17.7381 12.8053C16.9081 11.8755 16.4102 11.9308 15.8569 12.0968C15.4696 12.1522 14.1417 13.7021 13.5884 14.1956C12.68 15.0932 11.7675 16.0171 11.7072 16.1377C11.5353 16.4173 11.3753 16.9126 11.2979 17.4661C11.1539 18.2964 10.9464 19.2312 11.2093 19.3113C11.4721 19.3913 12.2052 19.2375 13.0351 19.1157C13.5884 19.016 13.9757 18.9053 14.2524 18.7393C14.6397 18.5068 15.359 17.6876 16.5983 16.4698C17.3756 15.6514 18.1254 15.0859 18.3468 14.5324C18.568 13.7021 18.2361 13.2593 17.7381 12.8053Z"  stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5"  />
        </Svg>
    );
}
