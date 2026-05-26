// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useRef } from "react";
import { Platform, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
import { BANNER } from "../Constants";


export default function BannerAds() {

    const bannerRef = useRef<BannerAd>(null);

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    })

    return (
        <BannerAd ref={bannerRef} unitId={BANNER === '' ? TestIds.BANNER : BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    );
}