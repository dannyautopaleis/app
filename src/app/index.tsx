import { useRouter } from "expo-router";
import { JSX } from "react";
import { Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootHome(): JSX.Element {
    const router = useRouter();
    const handleOnPress = () => {
        router.navigate("(tabs)/")
    }

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