import { JSX, useContext } from "react";
import { Text, View, ScrollView, Platform, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fas, faUser } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { AuthProvider } from "@/src/contexts/AuthProvider";
import { Pressable } from "react-native";
import { User } from "@/src/lib/StoreWrapper";
import { useRouter } from "expo-router";

export default function TestScreen(): JSX.Element {
    const auth = useContext(AuthProvider)
    let signedIn = auth.isSignedIn()

    
    return (
        <SafeAreaView style={{
            flex: 1
        }} edges={["left", "right", "bottom"]}>
            <ScrollView style={{flex: 1}}>
                {/* content */}
                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#D9D9D9",
                        padding: 40,
                        borderRadius: 120
                    }}>
                        <FontAwesomeIcon color="#282827" size={60} icon={faUser} />
                    </View>
                     <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 28,
                        textAlign: "center",
                        color: "#282827"
                    }}>{}</Text>

                    <View style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 2}}>
                        <FontAwesomeIcon size={20} icon={faStar} />
                        <FontAwesomeIcon size={20} icon={faStar} />
                        <FontAwesomeIcon size={20} icon={faStar} />
                        <FontAwesomeIcon size={20} icon={faStar} />
                        <FontAwesomeIcon size={20} icon={faStar} />
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Bold",
                                android: "Barlow_700Bold"
                            }),
                            fontSize: 16,
                            textAlign: "center",
                            color: "#282827"
                        }}>(0)</Text>
                    </View>
                    
                    {/* heel lelijk, kan mooier met een map maar voor nu boeit dit niet had snel gemaakt */}
                    <View style={{width: "90%", height: 1, backgroundColor: "#282827", marginTop: 15}}></View>
                    <Text style={{
                        alignSelf: "flex-start",
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        textAlign: "center",
                        color: "#282827"
                    }}>Mijn Gegevens</Text>
                    <View style={{width: "90%", height: 1, backgroundColor: "#282827", marginTop: 5}}></View>
                    <Text style={{
                        alignSelf: "flex-start",
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        textAlign: "center",
                        color: "#282827"
                    }}>Mijn Reserveringen</Text>
                    <View style={{width: "90%", height: 1, backgroundColor: "#282827", marginTop: 5}}></View>
                    <Text style={{
                        alignSelf: "flex-start",
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        textAlign: "center",
                        color: "#282827"
                    }}>Instellingen</Text>
                    <View style={{width: "90%", height: 1, backgroundColor: "#282827", marginTop: 5}}></View>
                    <Text style={{
                        alignSelf: "flex-start",
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        textAlign: "center",
                        color: "#282827"
                    }}>FAQ</Text>
                    <View style={{width: "90%", height: 1, backgroundColor: "#282827", marginTop: 5}}></View>

                    <Pressable style={{
                        alignSelf: "flex-start",
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                    }} onPress={() => {
                        auth.signOut()
                    }}>
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Bold",
                                android: "Barlow_700Bold"
                            }),
                            fontSize: 16,
                            textAlign: "center",
                            color: "red"
                        }}>Uitloggen</Text>
                    </Pressable>
                    <View style={{width: "90%", height: 1, backgroundColor: "#282827", marginTop: 5}}></View>
                </View>
                {/* end */}
            </ScrollView>
        </SafeAreaView>
    )
}