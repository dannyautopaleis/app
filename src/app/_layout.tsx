import { JSX, useState } from "react";
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { DeviceContext } from "../contexts/DeviceProvider";
import { AuthProvider } from "../contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { View, Text, StatusBar as status, Platform, TouchableOpacity} from "react-native";
import { BackArrow } from "@/@types/svg_reexports";

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
                        <Stack.Screen
                            name="(stack)"
                            options={{
                                headerShown: true,
                                header(props) {
                                    return (
                                        <View
                                            style={{
                                                marginTop: status.currentHeight, 
                                                width: "100%",
                                                height: 50,
                                            }}
                                        >
                                          <TouchableOpacity 
                                            onPress={(event) => {
                                                props.navigation.goBack()
                                            }}
                                            style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 10,
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 10
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
                                        </View>
                                    )
                                },
                            }}
                        />
                    </Stack>
                   <Toast />
                </DeviceContext>
            </AuthProvider>
        </SafeAreaProvider>
    )
}