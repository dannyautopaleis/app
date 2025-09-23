import { type JSX } from "react"
import { Tabs } from 'expo-router';


export default function TabsLayout(): JSX.Element {
    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
            />
        </Tabs>
    )
}