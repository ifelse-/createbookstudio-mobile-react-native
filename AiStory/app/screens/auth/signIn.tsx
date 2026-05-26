// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import { router, useFocusEffect } from "expo-router";
import BackIcon from "@/app/icons/BackIcon";
import { useCallback, useState } from "react";
import { useColorScheme } from "nativewind";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import { company, iosClient, logo, name, serverURL, webClient } from "@/app/Constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import countriesData from '../../countries.json';
import * as Cellular from 'expo-cellular';
import {
    GoogleSignin,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';

export default function SignIn() {

    const { colorScheme } = useColorScheme();
    const [inputValue, setInputValue] = useState('');
    const [place, setPlace] = useState('');
    const [load, setLoad] = useState(false);
    const [loadGoogle, setLoadGoogle] = useState(false);

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    useFocusEffect(
        useCallback(() => {
            checkFirstRun();
            GoogleSignin.configure({
                webClientId: webClient,
                iosClientId: iosClient
            });
        }, [])
    );

    async function googleLogin() {
        setLoadGoogle(true);
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            const { email, name } = user.user;
            const url = serverURL + '/api/social';
            const response = await axios.post(url, {
                email, name
            });
            if (response.data.success) {
                setLoadGoogle(false);

                const data = JSON.stringify(response.data.userData);
    
                await AsyncStorage.setItem('email', '' + email);
                await AsyncStorage.setItem('mName', '' + name);
                await AsyncStorage.setItem('uid', '' + response.data.userData._id);
                await AsyncStorage.setItem('type', 'free');
                await AsyncStorage.setItem('auth', 'true');
                await AsyncStorage.setItem('google', 'true');

                if (response.data.message === 'Account created successfully') {
                    sendEmail(email, name)
                } else {
                    router.replace('/')
                }

            } else {
                showToast(response.data.message)
                setLoadGoogle(false);
            }
        } catch (error) {
            setLoadGoogle(false);
            showToast('Internal Server Error')
        }
    }

    const checkFirstRun = async () => {
        const isFirstRun = await AsyncStorage.getItem('first');
        if (isFirstRun === null) {
            await AsyncStorage.setItem('first', 'false');
            await AsyncStorage.setItem('dark', 'false');
            await AsyncStorage.setItem('auth', 'false');

        } else {
            const auth = await AsyncStorage.getItem('auth');
            if (auth !== 'true') {

            } else {
                router.replace('/')
            }
        }
    };


    async function sendEmail(mEmail: string | string[] | undefined, mName: string) {

        try {
            const dataToSend = {
                subject: `Welcome to ${name}`,
                to: mEmail,
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                <html lang="en">
                   <head></head>
                   <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
                      Welcome to AiCourse
                      <div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
                   </div>
                   <body style="margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;color:#01020A">
                      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;width:465px;border-radius:0.25rem;border-width:1px;border-style:solid;border-color:rgb(234,234,234);padding:20px">
                         <tr style="width:100%">
                            <td>
                               <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-top:32px">
                                  <tbody>
                                     <tr>
                                        <td><img alt="Vercel" src="${logo}" width="100" height="100" style="display:block;outline:none;border:none;text-decoration:none;margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px" /></td>
                                     </tr>
                                  </tbody>
                               </table>
                               <h1 style="margin-left:0px;margin-right:0px;margin-top:30px;margin-bottom:30px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:#01020A">Welcome to <strong>${name}</strong></h1>
                               <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Hello <strong>${mName}</strong>,</p>
                               <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Welcome to <strong>${name}</strong>, AI Story Generator app! We are thrilled to have you on board and excited for you to experience the magic of storytelling through artificial intelligence. Whether you're here to discover new worlds, unravel mysteries, or simply enjoy a good tale, our app is designed to immerse you in captivating narratives crafted by cutting-edge AI technology.

Get ready to explore limitless possibilities as our AI creates unique stories that are audible and readable, tailored to your preferences. Dive into a universe where imagination knows no bounds and where every story is a journey waiting to unfold.

Thank you for joining us on this adventure. We look forward to hearing about the stories you discover and the worlds you explore with ${name}.</p>
                               <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-bottom:32px;margin-top:32px;text-align:center">
                   
                               </table>
                               <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Best,
                               <p target="_blank" style="color:#01020A;text-decoration:none;text-decoration-line:none">The <strong>${company}</strong> Team</p>
                               </p>
                            </td>
                         </tr>
                      </table>
                   </body>
                </html>`
            };
            const postURL = serverURL + '/api/data';
            await axios.post(postURL, dataToSend).then(res => {
                router.replace('/')
            }).catch(error => {
                router.replace('/')
            });

        } catch (error) {
            router.replace('/')
        }

    }


    const handleCheck = async () => {
        if (inputValue.length > 0) {
            if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(inputValue)) {
                setLoad(true);
                checkUserExist('email');
            } else if (/^\+?[0-9]{10,}$/.test(inputValue.replace(/\s/g, ''))) {
                if (inputValue.startsWith('+')) {
                    setLoad(true);
                    checkUserExist('phone');
                } else {
                    const codenumber = await Cellular.getIsoCountryCodeAsync();

                    let countryCodeFound = false;
                    countriesData.map((country) => {
                        if (country.code === codenumber?.toLocaleUpperCase()) {
                            setLoad(true);
                            countryCodeFound = true;
                            let newPlace = country.dial_code + inputValue;
                            setInputValue(newPlace);
                            checkUserExist('phone');
                        }
                    });
                    if (!countryCodeFound || codenumber === null) {

                        showToast('Enter Phone No. With + & Country Code');
                        setPlace('+918689869806');
                    }
                }
            } else {
                showToast('Invalid Formate');
            }
        } else {
            showToast('Enter Your Email/Phone No.');
        }
    };

    async function checkUserExist(type: string) {

        const url = serverURL + '/api/check';
        const response = await axios.post(url, {
            type,
            inputValue
        });
        if (response.data.success) {
            setLoad(false);

            if (response.data.message) {
                await AsyncStorage.setItem('email', '' + response.data.userData.email);
                await AsyncStorage.setItem('mName', '' + response.data.userData.mName);
                await AsyncStorage.setItem('uid', '' + response.data.userData._id);
                await AsyncStorage.setItem('type', '' + response.data.userData.type);
                await AsyncStorage.setItem('password', '' + response.data.userData.password);
                await AsyncStorage.setItem('phone', '' + response.data.userData.phone);


                if (type === 'email') {
                    if (response.data.userData.password === null || response.data.userData.password === '' || response.data.userData.password === undefined) {
                        router.navigate({ pathname: '/screens/auth/signInPhone', params: { mPhone: response.data.userData.phone, new: 'no' } });
                    } else {
                        router.navigate('/screens/auth/signInEmail')
                    }
                } else {
                    if (response.data.userData.password) {
                        router.navigate('/screens/auth/signInEmail')
                    } else {
                        router.navigate({ pathname: '/screens/auth/signInPhone', params: { mPhone: response.data.userData.phone, new: 'no' } });
                    }
                }
            } else {
                if (type === 'email') {
                    router.navigate({ pathname: '/screens/auth/signUpEmail', params: { mEmail: inputValue } });
                } else {
                    router.navigate({ pathname: '/screens/auth/signInPhone', params: { mPhone: inputValue, new: 'yes' } });
                }
            }

        } else {
            showToast(response.data.message)
            setLoad(false);
        }
    }

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight + 10 }}>
            <BackIcon />
            <Text className="text-start text-base mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Enter your Email or Phone no.{'\n'}To Continue</Text>
            <View className="mt-4">
                <Text className="text-start text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Email/Phone No.</Text>
                <TextInput placeholder={place} placeholderTextColor='lightgrey' selectionColor="lightgrey" onChangeText={(text) => setInputValue(text)} value={inputValue} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
            </View>
            <Pressable disabled={load} onPress={handleCheck} className="flex-row w-11/12 h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color='white' /> : <></>}
                <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Next</Text>
            </Pressable>
            <View className="flex items-center mt-4">
                <GoogleSigninButton
                    style={{ width: '93%', height: 56 }}
                    size={GoogleSigninButton.Size.Wide}
                    onPress={() => {
                        googleLogin()
                    }}
                    disabled={loadGoogle}
                />
            </View>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}
