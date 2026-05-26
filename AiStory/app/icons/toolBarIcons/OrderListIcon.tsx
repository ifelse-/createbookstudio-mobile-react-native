// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function OrderListIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9 4H19" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M9 10H19" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M9 16H19" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round"/>
            <Path d="M1 13H2.5C2.77879 13 2.91819 13 3.03411 13.0231C3.51014 13.1177 3.88225 13.4899 3.97694 13.9659C4 14.0818 4 14.2212 4 14.5C4 14.7788 4 14.9182 3.97694 15.0341C3.88225 15.5101 3.51014 15.8823 3.03411 15.9769C2.91819 16 2.77879 16 2.5 16C2.22121 16 2.08181 16 1.96589 16.0231C1.48986 16.1177 1.11775 16.4899 1.02306 16.9659C1 17.0818 1 17.2212 1 17.5V18.4C1 18.6828 1 18.8243 1.08787 18.9121C1.17574 19 1.31716 19 1.6 19H4" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M1 1H2.2C2.36569 1 2.5 1.13431 2.5 1.3V7M2.5 7H1M2.5 7H4" stroke={colorScheme === 'light' ? "#141B34" : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}
