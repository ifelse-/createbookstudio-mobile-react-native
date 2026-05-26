import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { OnboardFlow } from 'react-native-onboard';
import { router } from "expo-router";

export default function OnBoarding() {

    const one = require('../../assets/one.jpg');
    const two = require('../../assets/two.jpg');
    const three = require('../../assets/three.jpg');
    const welcome = require('../../assets/welcome.jpg');

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>
            <OnboardFlow
                showDismissButton={false}
                pages={[
                    {
                        title: 'Generate Ai Story',
                        subtitle: 'Unleash AI creativity to craft unique stories tailored to your imagination',
                        imageUri: Image.resolveAssetSource(one).uri,
                    },
                    {
                        title: 'Generate Ai Audible Story',
                        subtitle: 'Experience AI-generated stories brought to life in audio, personalized just for you',
                        imageUri: Image.resolveAssetSource(two).uri,
                    },
                    {
                        title: 'Generate Story Any Language',
                        subtitle: 'Explore AI-generated stories in any language of your choice',
                        imageUri: Image.resolveAssetSource(three).uri,
                    }
                ]}
                style={{ marginTop: 8 }}
                type={'fullscreen'}
                primaryButtonStyle={{ borderRadius: 5, backgroundColor: '#01020A' }}
                primaryButtonTextStyle={{ fontFamily: 'Montserrat_700Bold', fontSize: 16 }}
                titleStyle={{ color: '#01020A', fontFamily: 'Montserrat_700Bold', fontSize: 30 }}
                subtitleStyle={{ color: '#01020A', fontFamily: 'Montserrat_500Medium', fontSize: 16 }}
            />
            <View className="flex-1 justify-center">

                <Image className="w-full h-4/5" source={welcome} />

            </View>

            <View className="flex-1">

                <View className="flex-1">
                    <Text className="text-center text-3xl " style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Ai Text-to-Story{'\n'}Generator</Text>
                    <Text className="text-center text-base mt-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Ai Audible Story Generator</Text>
                </View>

                <View className="flex-1">
                    <Pressable onPress={() => router.replace('/screens/auth/signIn')} className="w-11/12 h-14 justify-center self-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                        <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Get Started</Text>
                    </Pressable>
                    <TouchableOpacity onPress={() => router.push('/screens/onBoarding')} activeOpacity={1} className="mt-4">
                        <Text className="text-center text-base" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Take A Tour</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}
