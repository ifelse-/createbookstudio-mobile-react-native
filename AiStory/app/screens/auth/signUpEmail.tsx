// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from "expo-router";
import BackIcon from "@/app/icons/BackIcon";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { company, logo, name, serverURL } from "@/app/Constants";
import axios from "axios";

export default function SignUpEmail() {

    const params = useLocalSearchParams();
    const [isChecked, setChecked] = useState(false);
    const { colorScheme } = useColorScheme();
    const [load, setLoad] = useState(false);
    const [mName, setName] = useState('');
    const [password, setPassword] = useState('');

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    const handleSubmit = async () => {
        if (!isChecked) {
            showToast('Accept Terms & Privacy Policy')
        } else {
            if (password.length > 0 || mName.length > 0) {
                if (password.length > 8) {
                    setLoad(true);
                    const url = serverURL + '/api/signup';
                    let type = 'free';
                    let emailCase = params.mEmail;
                    let email = emailCase.toLowerCase();
                    const response = await axios.post(url, {
                        email, mName, password, type
                    });
                    if (response.data.success) {
                        setLoad(false);
                        let email = params.mEmail;
                        const data = JSON.stringify(response.data.userId);
                        await AsyncStorage.setItem('email', '' + email);
                        await AsyncStorage.setItem('mName', mName);
                        await AsyncStorage.setItem('uid', data);
                        await AsyncStorage.setItem('type', 'free');
                        await AsyncStorage.setItem('auth', 'true');
                        sendEmail(email, mName)
                    } else {
                        showToast(response.data.message)
                        setLoad(false);
                    }
                } else {
                    setLoad(false);
                    showToast("Your Password Must Be At Least 9 Characters")
                }
            } else {
                setLoad(false);
                showToast("Enter Name & Password")
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

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight + 10 }}>
            <BackIcon />
            <Text className="text-start text-base mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Enter Your Name & Password{'\n'}to Sign Up</Text>
            <View className="mt-4">
                <Text className="text-start text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Name</Text>
                <TextInput onChangeText={(text) => setName(text)} value={mName} selectionColor="lightgrey" keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
            </View>
            <View>
                <Text className="text-start text-xs mt-4 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Password</Text>
                <TextInput selectionColor="lightgrey" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
            </View>
            <View className="mt-6 mx-4 flex-row items-center">
                <Checkbox
                    style={{ borderRadius: 5, borderColor: '#01020A' }}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#01020A' : undefined}
                />
                <Text className="text-start text-xs ml-2" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>I Accept </Text>
                <TouchableOpacity onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: 'Terms & Conditions', type: 'terms' } })} activeOpacity={1}>
                    <Text className="text-start text-xs" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Terms Conditions </Text>
                </TouchableOpacity>
                <Text className="text-start text-xs" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>& </Text>
                <TouchableOpacity onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: 'Privacy Policy', type: 'privacy' } })} activeOpacity={1}>
                    <Text className="text-start text-xs" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <Pressable disabled={load} onPress={handleSubmit} className="w-11/12 h-14 mt-6 justify-center self-center flex-row items-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color='white' /> : <></>}
                <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Sign Up</Text>
            </Pressable>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}
