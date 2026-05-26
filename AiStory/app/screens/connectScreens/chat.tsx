// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import { useLocalSearchParams } from "expo-router";
import Header from "@/app/components/header";
import { useColorScheme } from "nativewind";
import SendIcon from "@/app/icons/SendIcon";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverURL } from "@/app/Constants";
import axios from "axios";
import { RenderHTML, defaultSystemFonts } from 'react-native-render-html';
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function Chat() {

    const { main } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const MemoizedRenderHtml = React.memo(RenderHTML);

    const systemFonts = [...defaultSystemFonts,
        'Montserrat_100Thin',
        'Montserrat_100Thin_Italic',
        'Montserrat_200ExtraLight',
        'Montserrat_200ExtraLight_Italic',
        'Montserrat_300Light',
        'Montserrat_300Light_Italic',
        'Montserrat_400Regular',
        'Montserrat_400Regular_Italic',
        'Montserrat_500Medium',
        'Montserrat_500Medium_Italic',
        'Montserrat_600SemiBold',
        'Montserrat_600SemiBold_Italic',
        'Montserrat_700Bold',
        'Montserrat_700Bold_Italic',
        'Montserrat_800ExtraBold',
        'Montserrat_800ExtraBold_Italic',
        'Montserrat_900Black',
        'Montserrat_900Black_Italic'
    ];

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        loadMessages();
        getLocal();
    }, []);

    async function getLocal() {
        let lang = await AsyncStorage.getItem('lang');
        if (lang === null | undefined | '') {
            setLocal('en')
            await AsyncStorage.setItem('lang', 'en');
        } else {
            setLocal(lang)
        }
    }

    const defaultMessage = `<p>Hey there! I'm your AI teacher. If you have any questions about your ${main} course, whether it's about videos, images, or theory, just ask me. I'm here to clear your doubts.</p>`;
    const defaultPrompt = `I have a doubt about this topic :- ${main}. Please clarify my doubt in very short :- `;

    const loadMessages = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(main);
            if (jsonValue !== null) {
                setMessages(JSON.parse(jsonValue));
            } else {
                const newMessages = [...messages, { text: defaultMessage, sender: 'bot' }];
                setMessages(newMessages);
                await storeLocal(newMessages);
            }
        } catch (error) {
            loadMessages();
        }
    };

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        const userMessage = { text: newMessage, sender: 'user' };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        await storeLocal(updatedMessages);
        setNewMessage('');

        let mainPrompt = defaultPrompt + newMessage;
        const dataToSend = { prompt: mainPrompt };
        const url = serverURL + '/api/chat';

        try {
            const response = await axios.post(url, dataToSend);

            if (response.data.success === false) {
                sendMessage();
            } else {
                const botMessage = { text: response.data.text, sender: 'bot' };
                const updatedMessagesWithBot = [...updatedMessages, botMessage];
                setMessages(updatedMessagesWithBot);
                await storeLocal(updatedMessagesWithBot);
            }
        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    };

    async function storeLocal(messages) {
        try {
            await AsyncStorage.setItem(main, JSON.stringify(messages));
        } catch (error) {
            await AsyncStorage.setItem(main, JSON.stringify(messages));
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={i18n.t('AiTeacher')} />
            <View className="flex-1 mt-4 ">
                <ScrollView showsVerticalScrollIndicator={false}>
                    {messages.map((msg, index) => (
                        <View key={index} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', margin: 16, width: '70%' }}>
                            <View style={{ borderBottomStartRadius: 5, borderBottomEndRadius: 5, borderTopStartRadius: msg.sender === 'user' ? 5 : 0, borderTopEndRadius: msg.sender === 'user' ? 0 : 5, overflow: 'hidden' }}>
                                {msg.sender === 'user' ?
                                    <MemoizedRenderHtml contentWidth={Dimensions.get('screen').width} defaultTextProps={{ selectable: true }} systemFonts={systemFonts} baseStyle={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', padding: 16, color: colorScheme === 'light' ? '#01020A' : '#fff', fontFamily: 'Montserrat_500Medium' }} source={{ html: msg.text }} />
                                    :
                                    <MemoizedRenderHtml contentWidth={Dimensions.get('screen').width} defaultTextProps={{ selectable: true }} systemFonts={systemFonts} baseStyle={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#F9F9F9', paddingHorizontal: 16, paddingVertical: 4, color: colorScheme === 'light' ? '#fff' : '#01020A', fontFamily: 'Montserrat_500Medium' }} source={{ html: msg.text }} />
                                }
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <View className="w-screen flex-row items-center" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34' }}>
                <TextInput value={newMessage} onChangeText={setNewMessage} numberOfLines={1} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} placeholderTextColor={colorScheme === 'light' ? "lightgrey" : "#000"} placeholder={i18n.t('AskSomething')} keyboardType="default" className="w-10/12 h-14 self-start" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', marginBottom: Platform.OS === 'ios' ? 32 : 0, paddingHorizontal: 16 }} />
                <Pressable onPress={sendMessage} className="flex-1 items-center" style={{ marginBottom: Platform.OS === 'ios' ? 32 : 0 }}>
                    <SendIcon />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}
