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

export default function RootStackLayout(): JSX.Element {
    let [deviceToken, setDeviceToken] = useState<string>()
    Notifications.getDevicePushTokenAsync()
        .then((v) => {
            setDeviceToken(v.data)
            console.log("Notifications push token:",v.data)
        })
        .catch((err) => {
            console.log("failed retrieving device push token")
        })

    return (
        <SafeAreaProvider>
            <AuthProvider value={{
                jwt: ""
            }}>
                <DeviceContext value={{
                    notifications: {
                        pushToken: deviceToken ?? ""
                    }
                }}>
                    <StatusBar style="dark"/>
                    <Stack  
                        initialRouteName="(login)/index"
                    >
                        
                        <Stack.Screen
                            name="(login)/index"
                            options={{
                                title: "Landing"
                            }}
                        />
                        <Stack.Screen
                            name="(login)/login"
                            options={{
                                title: "Login"
                            }}
                        />

                        <Stack.Screen
                            name="(login)/reg"
                            options={{
                                title: "Registreren"
                            }}
                        />
                        
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="(product)/index"
                            options={{
                                header: Header,
                            }}
                        />
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
                marginTop: status.currentHeight, 
                width: "100%",
                height: "auto",
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
                <BackArrow width={20} height={20} />
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