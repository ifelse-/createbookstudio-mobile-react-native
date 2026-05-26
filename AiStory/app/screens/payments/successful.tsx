// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { company, logo, serverURL } from '@/app/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/app/components/header';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import StatusBarComp from '@/app/components/statusBar';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import Toast from 'react-native-toast-message';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function Successful() {

    const { plan, email, mName, lastName, post, address, country, admin, cost, sub } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const [processing, setProcessing] = useState(true);
    const [method, setMethod] = useState('');
    const [type, setType] = useState('');
    const [jsonData, setJsonData] = useState({});
    const [next, setNext] = useState('');
    const [start, setStart] = useState('');

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        getDetails();
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

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    async function getDetails() {
        let subscriptionId = sub;
        let mMethod = await AsyncStorage.getItem('method');
        let mType = await AsyncStorage.getItem('type');
        setMethod(mMethod)
        setType(mType);
        const dataToSend = {
            subscriberId: subscriptionId,
            uid: await AsyncStorage.getItem('uid'),
            plan: await AsyncStorage.getItem('plan')
        };
        try {
            if (await AsyncStorage.getItem('method') === 'paypal') {
                const postURL = serverURL + '/api/paypaldetails';
                await axios.post(postURL, dataToSend).then(async res => {
                    setJsonData(res);
                    await AsyncStorage.setItem('type', await AsyncStorage.getItem('plan'));
                    getStatus(res);
                });
            } else if (await AsyncStorage.getItem('method') === 'razorpay') {
                const postURL = serverURL + '/api/razorapydetails';
                await axios.post(postURL, dataToSend).then(async res => {
                    setJsonData(res.data);
                    await AsyncStorage.setItem('type', await AsyncStorage.getItem('plan'));
                    getStatus(res.data);
                });
            }
        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    }

    function getDates(dat) {
        const dateEnd = new Date(dat);
        const endDate = dateEnd.toLocaleDateString('en-GB');
        return endDate;
    }

    async function getStatus(res) {
        if (method === 'paypal') {
            const {
                start_time,
                billing_info,
            } = res['data'];
            setNext(getDates(billing_info.next_billing_time));
            setStart(getDates(start_time));
            setProcessing(false);
            sendEmail(res);
        } else {

            const {
                current_start,
                charge_at,
            } = res;

            const date = new Date(current_start * 1000);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const startDate = `${year}-${month}-${day}`;

            const date2 = new Date(charge_at * 1000);
            const year2 = date2.getFullYear();
            const month2 = date2.getMonth() + 1;
            const day2 = date2.getDate();
            const endDate = `${year2}-${month2}-${day2}`;

            setNext(endDate);
            setStart(startDate);
            setProcessing(false);
            sendEmail(res);
        }
    }

    async function download() {

        if (method === 'paypal') {
            const {
                start_time,
                billing_info,
            } = jsonData['data'];

            const html = `<!DOCTYPE html>
            <html>
            
            <head>
                <title>Certificate</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            </head>
            
            <body>
                <div class="Frame2" style="width: 816px; height: 1000px; position: relative; background: white">
                    <div class="Receipt" style="width: 500px; height: 916.41px; left: 158px; top: 70px; position: absolute">
                        <img src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/bg.png?alt=media&token=c1083379-e48d-4f70-a396-0651e7a5d533" class="Bg" style="width: 500px; height: 916.41px; left: 0px; top: 0px; position: absolute; background: white"></img>
                        <div class="Frame" style="width: 221px; height: 52.15px; left: 139px; top: 58px; position: absolute">
                            <img class="Vector" style="width: 221px; height: 82.15px; left: 0px; top: 0px; position: absolute" src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/mugup.png?alt=media&token=fb4eee12-7e72-49e1-b3fd-b91eabf2d21c" />
                        </div>
                        <div class="99" style="width: 123.84px; left: 190px; top: 165px; position: absolute; text-align: center; color: #01020A; font-size: 40px; font-family: Montserrat; font-weight: 900; word-wrap: break-word">${cost}</div>
                        <div class="PaymentMethodPaypal" style="width: 244.58px; height: 23.22px; left: 37.15px; top: 487.62px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Payment Method : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${method}</span></div>
                        <div class="NameShivanshuMeena" style="width: 396px; height: 23.22px; left: 37.15px; top: 376.16px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Name : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${mName + ' ' + lastName}</span></div>
                        <div class="MailShivanshuGmailCom" style="width: 396px; height: 23.22px; left: 37.15px; top: 431.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Mail : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${email}</span></div>
                        <div class="YearlyPlan" style="left: 180px; top: 279px; position: absolute; text-align: center; color: #01020A; font-size: 24px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${plan}</div>
                        <div class="Total99" style="left: 165px; top: 827px; position: absolute; text-align: center; color: #01020A; font-size: 32px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">Total : ${cost}</div>
                        <div class="StartingDate02042024" style="width: 249.23px; height: 23.22px; left: 37.15px; top: 602.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Starting Date : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${getDates(start_time)}</span></div>
                        <div class="SubscriptionIdI4fyhwemk6p8m" style="width: 396px; height: 23.22px; left: 37.15px; top: 544.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Subscription Id : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${sub}</span></div>
                        <div class="NextPayment02052024" style="width: 255.42px; height: 23.22px; left: 37.15px; top: 659.44px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Next Payment : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${getDates(billing_info.next_billing_time)}</span></div>
                        <div class="AddressMumbai" style="width: 396px; height: 23.22px; left: 37.15px; top: 715.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Address : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${address + ' ' + post + ' ' + country + + ' ' + admin}</span></div>
                    </div>
                </div>
            </body>
            
            </html>`;
            const { uri } = await Print.printToFileAsync({ html });
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Open With' });
        } else {
            const {
                id,
                current_start,
                charge_at,
            } = jsonData;

            const date = new Date(current_start * 1000);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const startDate = `${year}-${month}-${day}`;

            const date2 = new Date(charge_at * 1000);
            const year2 = date2.getFullYear();
            const month2 = date2.getMonth() + 1;
            const day2 = date2.getDate();
            const endDate = `${year2}-${month2}-${day2}`;

            const html = `<!DOCTYPE html>
            <html>
            
            <head>
                <title>Certificate</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            </head>
            
            <body>
                <div class="Frame2" style="width: 816px; height: 1000px; position: relative; background: white">
                    <div class="Receipt" style="width: 500px; height: 916.41px; left: 158px; top: 70px; position: absolute">
                        <img src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/bg.png?alt=media&token=c1083379-e48d-4f70-a396-0651e7a5d533" class="Bg" style="width: 500px; height: 916.41px; left: 0px; top: 0px; position: absolute; background: white"></img>
                        <div class="Frame" style="width: 221px; height: 52.15px; left: 139px; top: 58px; position: absolute">
                            <img class="Vector" style="width: 221px; height: 82.15px; left: 0px; top: 0px; position: absolute" src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/mugup.png?alt=media&token=fb4eee12-7e72-49e1-b3fd-b91eabf2d21c" />
                        </div>
                        <div class="99" style="width: 123.84px; left: 190px; top: 165px; position: absolute; text-align: center; color: #01020A; font-size: 40px; font-family: Montserrat; font-weight: 900; word-wrap: break-word">${cost}</div>
                        <div class="PaymentMethodPaypal" style="width: 244.58px; height: 23.22px; left: 37.15px; top: 487.62px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Payment Method : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${method}</span></div>
                        <div class="NameShivanshuMeena" style="width: 396px; height: 23.22px; left: 37.15px; top: 376.16px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Name : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${mName + ' ' + lastName}</span></div>
                        <div class="MailShivanshuGmailCom" style="width: 396px; height: 23.22px; left: 37.15px; top: 431.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Mail : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${email}</span></div>
                        <div class="YearlyPlan" style="left: 180px; top: 279px; position: absolute; text-align: center; color: #01020A; font-size: 24px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${plan}</div>
                        <div class="Total99" style="left: 165px; top: 827px; position: absolute; text-align: center; color: #01020A; font-size: 32px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">Total : ${cost}</div>
                        <div class="StartingDate02042024" style="width: 249.23px; height: 23.22px; left: 37.15px; top: 602.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Starting Date : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${startDate}</span></div>
                        <div class="SubscriptionIdI4fyhwemk6p8m" style="width: 396px; height: 23.22px; left: 37.15px; top: 544.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Subscription Id : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${id}</span></div>
                        <div class="NextPayment02052024" style="width: 255.42px; height: 23.22px; left: 37.15px; top: 659.44px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Next Payment : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${endDate}</span></div>
                        <div class="AddressMumbai" style="width: 396px; height: 23.22px; left: 37.15px; top: 715.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Address : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${address + ' ' + post + ' ' + country + + ' ' + admin}</span></div>
                    </div>
                </div>
            </body>
            
            </html>`;
            const { uri } = await Print.printToFileAsync({ html });
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Open With' });
        }

    }

    async function sendEmail(res) {

        if (method === 'paypal') {
            const {
                id,
                subscriber,
                billing_info,
            } = res['data'];

            const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
                           <h1 style="margin-left:0px;margin-right:0px;margin-top:30px;margin-bottom:30px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:#01020A">Congratulations <strong>${mName}</strong></h1>
                           <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Hello <strong>${mName}</strong>,</p>
                           <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Your payment for plan ${plan} was successful. Your next payment date is ${getDates(billing_info.next_billing_time)}. You can download the receipt of payment from the 'Manage Subscription' section.</p>
                           <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-bottom:32px;margin-top:32px;text-align:center">
                           </table>
                           <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Best,
                           <p target="_blank" style="color:#01020A;text-decoration:none;text-decoration-line:none">The <strong>${company}</strong> Team</p>
                           </p>
                        </td>
                     </tr>
                  </table>
               </body>
            </html>`;

            const user = await AsyncStorage.getItem('uid');
            const subscription = id;
            const subscriberId = subscriber.email_address;
            const method = await AsyncStorage.getItem('method');
            const postURL = serverURL + '/api/sendreceipt';
            await axios.post(postURL, { html, email, plan, subscriberId, user, method, subscription, cost });
        } else {

            const {
                customer_id,
                charge_at,
            } = res;

            const date2 = new Date(charge_at * 1000);
            const year2 = date2.getFullYear();
            const month2 = date2.getMonth() + 1;
            const day2 = date2.getDate();
            const endDate = `${year2}-${month2}-${day2}`;

            const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
                           <h1 style="margin-left:0px;margin-right:0px;margin-top:30px;margin-bottom:30px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:#01020A">Congratulations <strong>${mName}</strong></h1>
                           <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Hello <strong>${mName}</strong>,</p>
                           <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Your payment for plan ${plan} was successful. Your next payment date is ${endDate}. You can download the receipt of payment from the 'Manage Subscription' section.</p>
                           <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-bottom:32px;margin-top:32px;text-align:center">
                           </table>
                           <p style="font-size:14px;line-height:24px;margin:16px 0;color:#01020A">Best,
                           <p target="_blank" style="color:#01020A;text-decoration:none;text-decoration-line:none">The <strong>${company}</strong> Team</p>
                           </p>
                        </td>
                     </tr>
                  </table>
               </body>
            </html>`;

            const user = await AsyncStorage.getItem('uid');
            const subscription = sub;
            const subscriberId = customer_id;;
            const method = await AsyncStorage.getItem('method');
            const postURL = serverURL + '/api/sendreceipt';
            await axios.post(postURL, { html, email, plan, subscriberId, user, method, subscription, cost });

        }

    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={i18n.t('Invoice')} />
            <View className='flex-1'>

                {processing ?
                    <View className="h-full justify-center self-center">
                        <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                    </View>
                    :
                    <ScrollView showsVerticalScrollIndicator={false} className='mt-3'>
                        <View className='mx-4 flex-col mt-4'>
                            <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Billing')}</Text>
                            <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{mName} {lastName} {'\n'}{address} {post} {'\n'}{country}</Text>
                        </View>


                        <View className='mx-4 flex-col mt-6'>
                            <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('PaymentStatus')}</Text>
                            {!processing && <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('StartingDate')} : {start}{'\n'}{i18n.t('NextPayment')} : {next}{'\n'}{i18n.t('Plan')} : {plan}</Text>}
                        </View>

                        <View className='mx-4 flex-col mt-6'>
                            <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('InvoiceDetails')}</Text>
                            <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('SubscriptionId')} : {sub}{'\n'}{i18n.t('Amount')} : {cost}{'\n'}{i18n.t('Method')} : {method.toUpperCase()}</Text>
                        </View>

                        <Pressable onPress={download} className="flex-row w-11/12 h-14 mt-8 mb-9 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                            <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('DownloadInvoice')}</Text>
                        </Pressable>

                    </ScrollView>
                }

            </View>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBarComp />
        </View>
    );
}