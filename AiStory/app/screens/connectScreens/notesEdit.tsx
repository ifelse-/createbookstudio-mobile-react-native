// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import Header from "@/app/components/header";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import React = require("react");
import UndoIcon from "@/app/icons/toolBarIcons/UndoIcon";
import RedoIcon from "@/app/icons/toolBarIcons/RedoIcon";
import BoldIcon from "@/app/icons/toolBarIcons/BoldIcon";
import UnderLineIcon from "@/app/icons/toolBarIcons/UnderLineIcon";
import HeadingIcon from "@/app/icons/toolBarIcons/HeadingIcon";
import BulletListIcon from "@/app/icons/toolBarIcons/BulletListIcon";
import OrderListIcon from "@/app/icons/toolBarIcons/OrderListIcon";
import CheckListIcon from "@/app/icons/toolBarIcons/CheckListIcon";
import StrikeIcon from "@/app/icons/toolBarIcons/StrikeIcon";
import CenterIcon from "@/app/icons/toolBarIcons/CenterIcon";
import RightIcon from "@/app/icons/toolBarIcons/RightIcon";
import LeftIcon from "@/app/icons/toolBarIcons/LeftIcon";
import LineIcon from "@/app/icons/toolBarIcons/LineIcon";
import ItalicIcon from "@/app/icons/toolBarIcons/ItalicIcon";
import QuoteIcon from "@/app/icons/toolBarIcons/QuoteIcon";
import CodeIcon from "@/app/icons/toolBarIcons/CodeIcon";
import FontFamilyStylesheet from '../../stylesheet';
import { serverURL } from "@/app/Constants";
import axios from "axios";
import Toast from "react-native-toast-message";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import DownloadIcon from "@/app/icons/DownloadIcon";

const handleUndo = () => <UndoIcon />
const handleRedo = () => <RedoIcon />
const handleBold = () => <BoldIcon />
const handleUnderLine = () => <UnderLineIcon />
const handleItalic = () => <ItalicIcon />
const handleHeading = () => <HeadingIcon />
const handleBulletList = () => <BulletListIcon />
const handleOrderList = () => <OrderListIcon />
const handleCheckList = () => <CheckListIcon />
const handleStrike = () => <StrikeIcon />
const handleCenter = () => <CenterIcon />
const handleRight = () => <RightIcon />
const handleLeft = () => <LeftIcon />
const handleLine = () => <LineIcon />
const handleQuote = () => <QuoteIcon />
const handleCode = () => <CodeIcon />

const fontFamily = 'Montserrat';

export default function NotesEdit() {

    const richText = React.createRef() || React.useRef();
    const { colorScheme } = useColorScheme();
    const { main } = useLocalSearchParams();
    const [processing, setProcessing] = useState(false);
    const [notesText, setNotesText] = useState(' ');
    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        getLocal();
        checkNotes();
    }, []);

    async function checkNotes() {
        let storageName = 'notes' + main;
        let notesCheck = await AsyncStorage.getItem(storageName);
        if (notesCheck !== null) {
            setNotesText(notesCheck)
        } else {
            getNotes();
        }
    }

    async function getNotes() {
        setProcessing(true);
        const url = serverURL + '/api/getnotes';
        let user = await AsyncStorage.getItem('uid');
        let notes = notesText;
        let course = main;
        const response = await axios.post(url, {
            user, notes, course
        });
        if (response.data.success) {
            let storageName = 'notes' + main;
            await AsyncStorage.setItem(storageName, response.data.message.notes);
            setNotesText(response.data.message.notes)
            setProcessing(false);
        } else {
            getNotes();
        }
    }

    async function getLocal() {
        let lang = await AsyncStorage.getItem('lang');
        if (lang === null | undefined | '') {
            setLocal('en')
            await AsyncStorage.setItem('lang', 'en');
        } else {
            setLocal(lang)
        }
    }

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    async function saveNotes() {
        setProcessing(true);
        let storageName = 'notes' + main;
        await AsyncStorage.setItem(storageName, notesText);
        const url = serverURL + '/api/savenotes';
        let user = await AsyncStorage.getItem('uid');
        let notes = notesText;
        let course = main;
        const response = await axios.post(url, {
            user, notes, course
        });
        if (response.data.success) {
            showToast("Saved");
            setProcessing(false);
        } else {
            saveNotes();
        }
    }

    async function download() {
        const html = notesText;
        const { uri } = await Print.printToFileAsync({ html });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Open With' });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View className="flex-row">
                <View className="flex-1 ">
                    <Header title={main + ' ' + i18n.t('Notes')} />
                </View>
                <TouchableOpacity onPress={download} className="mr-4 justify-center mt-4">
                    <DownloadIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={saveNotes} className="mr-4 justify-center mt-4">
                    <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm">{i18n.t('Save')}</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-1 mt-4 ">
                {processing ?
                    <View className="flex-1 justify-center self-center">
                        <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                    </View>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <RichEditor
                            style={{ backgroundColor: colorScheme === 'light' ? '#fff' : '#01020A', color: colorScheme === 'light' ? '#01020A' : '#fff' }}
                            editorStyle={{ backgroundColor: colorScheme === 'light' ? '#fff' : '#01020A', color: colorScheme === 'light' ? '#01020A' : '#fff', initialCSSText: `${FontFamilyStylesheet}`, contentCSSText: `font-family: ${fontFamily}` }}
                            ref={richText}
                            placeholder={i18n.t('NotesPlace')}
                            showsVerticalScrollIndicator={false}
                            initialFocus={true}
                            initialContentHTML={notesText}
                            onChange={descriptionText => {
                                setNotesText(descriptionText);
                            }}
                        />
                    </ScrollView>
                }
            </View>
            <View className="w-screen flex-row items-center" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34' }}>
                <RichToolbar
                    editor={richText}
                    style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', height: 56, marginBottom: Platform.OS === 'ios' ? 32 : 0 }}
                    actions={[actions.redo, actions.undo, actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList, actions.insertOrderedList, actions.checkboxList, actions.setStrikethrough, actions.alignCenter, actions.alignRight, actions.alignLeft, actions.insertLine, actions.blockquote, actions.code]}
                    iconMap={{ [actions.redo]: handleRedo, [actions.undo]: handleUndo, [actions.setBold]: handleBold, [actions.setItalic]: handleItalic, [actions.setUnderline]: handleUnderLine, [actions.heading1]: handleHeading, [actions.insertBulletsList]: handleBulletList, [actions.insertOrderedList]: handleOrderList, [actions.checkboxList]: handleCheckList, [actions.setStrikethrough]: handleStrike, [actions.alignCenter]: handleCenter, [actions.alignLeft]: handleLeft, [actions.alignRight]: handleRight, [actions.setItalic]: handleItalic, [actions.insertLine]: handleLine, [actions.blockquote]: handleQuote, [actions.code]: handleCode, }}
                />
            </View>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </KeyboardAvoidingView>
    );
}
