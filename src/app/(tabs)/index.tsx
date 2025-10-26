import { JSX } from "react";
import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

export default function HomeScreen(): JSX.Element {
    const route = useRoute();
    const params = route.params as {email: string}

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{fontSize: 16}}>Hi {params?.email}</Text>
        </SafeAreaView>
    )
}
