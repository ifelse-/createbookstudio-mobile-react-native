import { Stack } from "expo-router";
import 'react-native-reanimated'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Montserrat_900Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat_900Black_Italic': require('../assets/fonts/Montserrat-BlackItalic.ttf'),
    'Montserrat_700Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat_700Bold_Italic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
    'Montserrat_800ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat_800ExtraBold_Italic': require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat_200ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat_200ExtraLight_Italic': require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    'Montserrat_400Regular_Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat_300Light': require('../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat_300Light_Italic': require('../assets/fonts/Montserrat-LightItalic.ttf'),
    'Montserrat_500Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat_500Medium_Italic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
    'Montserrat_400Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat_600SemiBold_Italic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat_600SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat_100Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
    'Montserrat_100Thin_Italic': require('../assets/fonts/Montserrat-ThinItalic.ttf'),
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <>
      {fontsLoaded &&
        <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      }
    </>
  );
}
