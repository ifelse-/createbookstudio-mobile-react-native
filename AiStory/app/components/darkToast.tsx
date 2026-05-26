// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {

    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'white', backgroundColor: '#01020A' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 12,
                fontFamily: 'Montserrat_500Medium',
                color: 'white'
            }}
        />
    ),

};

const DarkToasts = () => {

    return (
        <>
            <Toast config={toastConfig} />
        </>
    );
}

export default DarkToasts;