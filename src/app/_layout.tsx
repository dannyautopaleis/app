import { JSX } from "react";
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootStackLayout(): JSX.Element {
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" />
            <Stack initialRouteName="(tabs)" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen 
                    name="(tabs)"
                />
            </Stack>
        </SafeAreaProvider>
    )
}