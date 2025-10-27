import { JSX } from "react";
import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

const staticProducts: Array<{
    title: string
    desc: string
    price: Number
}> = [
   {
    title: "Hamer",
    desc: "Wees er zuinig mee",
    price: 50.00
   }, {
    title: "Schaar",
    desc: "Wees er zuinig mee dankje!!",
    price: 20.00
   }
]

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
