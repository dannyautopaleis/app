import React from "react";
import { useRouter } from "expo-router";
import { JSX } from "react";
import { Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

export default  function RootHome(): JSX.Element {
    const router = useRouter();
    const handleOnPress = () => {
        router.navigate("(tabs)/")
    }

    // token to send notifications
    var token = Notifications.getDevicePushTokenAsync().then((v) => token = v).catch((err) => {
        console.error(err)
        token = null
    })

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Button title="Tabs test" onPress={handleOnPress} />
        </SafeAreaView>
    )
}