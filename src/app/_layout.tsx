import { JSX, useState } from "react";
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { DeviceContext } from "../contexts/DeviceProvider";
import { AuthProvider } from "../contexts/AuthProvider";

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
                    <StatusBar style="dark" />
                    <Stack initialRouteName="(login)">
                        <Stack.Screen
                            name="(login)"
                            options={{
                                title: "Login"
                            }}
                        />
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false
                            }}
                        />
                    </Stack>
                </DeviceContext>
            </AuthProvider>
        </SafeAreaProvider>
    )
}