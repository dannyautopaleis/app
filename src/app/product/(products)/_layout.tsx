import { Stack } from "expo-router";
import { Header } from "../../_layout";
import { Pressable, View, Text, Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function() {
    return <>
    
        <Stack initialRouteName="overview">
            <Stack.Screen name="overview" options={{
                header: Header
            }} /> 
            <Stack.Screen  name="create"  options={{
                header: (props) => (
                    <SafeAreaView edges={["left", "right", "top"]} style={{
                        width: "100%",
                        height: 100,
                        backgroundColor: "#FFEE49",
                        paddingHorizontal: 20,
                        
                    }}>
                        <Pressable style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1
                        }} onPress={() => props.navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={24} color="#494948" />
                             <Text style={{
                            fontSize: 18,
                            fontFamily: Platform.select({
                                ios: "Barlow-Bold",
                                android: "Barlow_700Bold"
                            }),
                            color: "#494948",
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            display: "flex",
                            flexGrow: 1,
                            fontWeight: 600
                        }}>Wat wordt er uitgeleend?</Text>
                        </Pressable>
                    </SafeAreaView>
                )
            }}/>

             <Stack.Screen  name="cats/index"  options={{
                header: (props) => (
                    <SafeAreaView edges={["left", "right", "top"]} style={{
                        width: "100%",
                        height: 100,
                        backgroundColor: "#FFEE49",
                        paddingHorizontal: 20,
                    }}>
                        <Pressable style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1
                        }} onPress={() => props.navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={24} color="#494948" />
                             <Text style={{
                                fontSize: 18,
                                fontFamily: Platform.select({
                                    ios: "Barlow-Bold",
                                    android: "Barlow_700Bold"
                                }),
                                color: "#494948",
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                display: "flex",
                                flexGrow: 1,
                                fontWeight: 600
                            }}>Categorieeen</Text>
                        </Pressable>
                    </SafeAreaView>
                )
            }}/>
        </Stack>
    </>
}