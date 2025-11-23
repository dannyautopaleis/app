import { JSX, useEffect, useRef, useState } from "react";
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { DeviceContext } from "../contexts/DeviceProvider";
import { AuthProvider } from "../contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { View, Text, StatusBar as status, Platform, TouchableOpacity} from "react-native";
import { BackArrow } from "@/@types/svg_reexports";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen';
import { AppStorageKeys, Errors, StoreWrapper, User } from "../lib/StoreWrapper";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { RestClient } from "../lib/RestClient";
import { useMMKVListener } from "react-native-mmkv";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { SheetControlProvider } from "../contexts/SheetControlsProvider";
import { PortalProvider } from "@gorhom/portal";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['nl'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Maart', 'Apr.', 'Mei', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
  dayNamesShort: ['Zo.', 'Ma.', 'Di.', 'Wo.', 'Do.', 'Vr.', 'Za.'],
  today: "Vandaag"
};
LocaleConfig.defaultLocale = "nl";
const ALLOW = true
const DISALLOW = false

import { STORE_INSTANCE } from "../lib/StoreWrapper";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export const RestClientInstance = new RestClient()
export default function RootStackLayout(): JSX.Element {
    const [triggered, triggerRender] = useState(0)

    useMMKVListener((key) => {
        if (key === AppStorageKeys.RETRIEVE_USER)
            console.log("trigger rerender")
            triggerRender((v) => v+1)
    })

    let user: User
    let store = STORE_INSTANCE

    let isSignedIn = false
    let isProperGuest = false
    let normalGuest = false

    try {
        user = store.getUser()
        console.log(user)

        if(JSON.stringify(user) === "{}") {
            normalGuest = true
        } else {
            if(typeof user.isGuest !== "undefined" && user.isGuest === true) {
                isProperGuest = true
            } else if(typeof user.jwt !== "undefined") {
                normalGuest = false
                isSignedIn = true
            }
        }

        
    } catch(err) {
        isProperGuest = true
        if(err === Errors.NotSignedIn) {} // ignore for now
        if(err === Errors.NoInfo) {
            console.log("no info")
        }
    }

    var sheetControls = useRef<null | BottomSheet>(null)
    return (
        <KeyboardProvider>
            <SafeAreaProvider>
                <GestureHandlerRootView>
                    <PortalProvider>
                        <AuthProvider value={store}>
                            <SheetControlProvider value={sheetControls}>
                                <StatusBar translucent={true} style="dark"/>
                                <Stack screenOptions={{
                                    keyboardHandlingEnabled: true,
                                }}>
                                    <Stack.Protected guard={(!isSignedIn && !isProperGuest) || normalGuest ? ALLOW : DISALLOW}>
                                        <Stack.Screen
                                            name="index"
                                            options={{
                                                headerShown: false
                                            }}
                                        />
                                        <Stack.Screen
                                            name="landing/(pages)/reg"
                                            options={{
                                                title: "Registreren",
                                            }}
                                        />
                                    </Stack.Protected>
                                    
                                    <Stack.Protected guard={(isSignedIn || isProperGuest && !normalGuest) ? ALLOW : DISALLOW}>
                                        <Stack.Screen
                                            name="auth/(tabs)"
                                            options={{
                                                headerShown: false
                                            }}
                                        />

                                        <Stack.Screen
                                            name="product/(products)/overview"
                                            options={{
                                                header: Header,
                                            }}
                                        />
                                    </Stack.Protected>
                                </Stack>
                                <Toast />
                            </SheetControlProvider>
                        </AuthProvider>
                    </PortalProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider> 
        </KeyboardProvider>
    )
}

const Header = (props: NativeStackHeaderProps) => {
    const insets = useSafeAreaInsets()
    return (
        <SafeAreaView
            style={{
                // marginTop: status.currentHeight, 
                width: "100%",
                height: 185,
                borderBottomColor: "rgba(0,0,0,0.2)",
                borderBottomWidth: 1,
                boxShadow: "0px 2px 40px 2px rgba(0,0,0, 0.45)"
            }}
            edges={["left", "right", "top"]}
        >
            <TouchableOpacity 
                onPress={(event) => {
                    props.navigation.goBack()
                }}
                style={{
                    position: "absolute", left: insets.left + 10, top: insets.top + 0,  
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                }}
            >
                <BackArrow width={20} height={20} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: "center", marginTop: 5}}>
                <Image source={require("@/assets/img/logo.png")} style={{width: 80, height: 80}} />
                <Text
                    style={{
                    fontFamily: Platform.select({
                        ios: "Barlow Regular",
                        android: "Barlow_400Regular",
                    }),
                    fontSize: 12,
                    color: "#000000",
                    textDecorationLine: "underline",
                    }}
                >
                    <Text style={style.plus}>+</Text> gereedschap zo geregeld{" "}
                    <Text style={style.plus}>+</Text> makkelijk{" "}
                    <Text style={style.plus}>+</Text> vertrouwd{" "}
                    <Text style={style.plus}>+</Text> betaalbaar
                </Text>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
  plus: {
    color: "yellow",
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowRadius: 8,
  },

});
