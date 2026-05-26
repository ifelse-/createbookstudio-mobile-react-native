import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { router } from "expo-router";

export default function Welcome() {

  const welcome = require('../../assets/welcome.jpg');


  return (
    <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>

      <View className="flex-1 justify-center">

        <Image className="w-full h-4/5" source={welcome} />

      </View>

      <View className="flex-1">

        <View className="flex-1">
          <Text className="text-center text-3xl " style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Ai Text-to-Story{'\n'}Generator</Text>
          <Text className="text-center text-base mt-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Ai Audible Story Generator</Text>
        </View>

        <View className="flex-1">
          <Pressable onPress={() => router.navigate('/screens/auth/signIn')} className="w-11/12 h-14 justify-center self-center" style={{ backgroundColor: '#01020A' , borderRadius: 5 }}>
            <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Get Started</Text>
          </Pressable>
          <TouchableOpacity onPress={() => router.navigate('/screens/onBoarding')} activeOpacity={1} className="mt-4">
            <Text className="text-center text-base" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Take A Tour</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}
