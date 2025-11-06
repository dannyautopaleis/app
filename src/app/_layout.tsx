import { JSX, useState } from "react";
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { DeviceContext } from "../contexts/DeviceProvider";
import { AuthProvider } from "../contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { View, Text, StatusBar as status, Platform, TouchableOpacity} from "react-native";
import { BackArrow } from "@/@types/svg_reexports";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const ALLOW = true
const DISALLOW = false
export default function RootStackLayout(): JSX.Element {
    const isGuest = true; // todo depending on app storage in cache

    return (
        <SafeAreaProvider>
            <AuthProvider value={{
                guest: isGuest
            }}>
                <DeviceContext value={{
                    notifications: {
                        pushToken: ""
                    }
                }}>
                    <StatusBar style="dark"/>
                    <Stack>
                        <Stack.Protected guard={isGuest ? ALLOW : DISALLOW}>
                            <Stack.Screen
                                name="index"
                                options={{
                                    title: "Landing",
                                }}
                            />
                            <Stack.Screen
                                name="landing/(pages)/login"
                                options={{
                                    title: "Inloggen"
                                }}
                            />

                            <Stack.Screen
                                name="landing/(pages)/reg"
                                options={{
                                    title: "Registreren"
                                }}
                            />
                        </Stack.Protected>
                        
                        <Stack.Protected guard={true}>
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
                </DeviceContext>
            </AuthProvider>
        </SafeAreaProvider>
    )
}

const Header = (props: NativeStackHeaderProps) => {
    return (
        <SafeAreaView
            style={{
                // marginTop: status.currentHeight, 
                width: "100%",
                height: 100,
            }}
        >
            <TouchableOpacity 
            onPress={(event) => {
                props.navigation.goBack()
            }}
            style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                }}
            >
                <BackArrow style={{
                    color: "red",
                    fill: 'yellow'
                }} width={20} height={20} />
                <Text style={{
                    fontFamily: Platform.select({
                        android: 'Poppins_500Medium',
                        ios: 'Poppins-Medium',
                    }),
                    fontSize: 16,
                }}>Terug</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}