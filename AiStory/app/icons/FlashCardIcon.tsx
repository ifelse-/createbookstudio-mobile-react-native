// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from "nativewind";
import { Path, Svg } from "react-native-svg";

export default function FlashCardIcon() {

    const { colorScheme } = useColorScheme();

    return (
        <Svg width="28" height="26" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 10C1 7.17157 1 5.75736 1.87868 4.87868C2.75736 4 4.17157 4 7 4H9C11.8284 4 13.2426 4 14.1213 4.87868C15 5.75736 15 7.17157 15 10V15C15 17.8284 15 19.2426 14.1213 20.1213C13.2426 21 11.8284 21 9 21H7C4.17157 21 2.75736 21 1.87868 20.1213C1 19.2426 1 17.8284 1 15V10Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
            <Path d="M6.04435 10.762L6.42742 10.3048C7.15621 9.4349 7.52061 9 8 9C8.4794 9 8.8438 9.4349 9.5726 10.3048L9.9556 10.762C10.6519 11.593 11 12.0086 11 12.5C11 12.9914 10.6519 13.407 9.9556 14.238L9.5726 14.6952C8.8438 15.5651 8.4794 16 8 16C7.52061 16 7.15621 15.5651 6.42742 14.6952L6.04435 14.238C5.34812 13.407 5 12.9914 5 12.5C5 12.0086 5.34812 11.593 6.04435 10.762Z" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
            <Path d="M14.9244 18C16.0202 17.3874 16.3929 16.0406 17.1383 13.3469L18.1925 9.5375C18.938 6.84378 19.3107 5.49694 18.678 4.4359C18.0453 3.37485 16.6543 3.01397 13.8724 2.2922L11.9052 1.78183C9.1232 1.06006 7.73225 0.699182 6.63642 1.31177C5.85623 1.74792 5.44258 2.55626 5 3.95786" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" />
        </Svg>
    );
}
