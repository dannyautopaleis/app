import { JSX, useCallback, useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fas, faUser } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { AuthProvider } from "@/src/contexts/AuthProvider";
import { Pressable } from "react-native";
import CustomBottomSheet from "@/src/components/CustomBottomSheet";
import { useRoute } from '@react-navigation/native';
import { SheetControlProvider } from "@/src/contexts/SheetControlsProvider";
import { useFocusEffect } from "expo-router";

export default function UserScreen(): JSX.Element {
    const auth = useContext(AuthProvider)
    const params = useRoute().params as any

    let signedIn = auth.isSignedIn()
    // Portal is memoized therefore we cannot trigger more bottomsheets on user screen after initial render
    let index = typeof params !== "undefined" && typeof params?.showSheet !== "undefined" && params.showSheet ? 0 : -1
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
                    }}>{signedIn ? auth.getUser().claims?.email : "GAST"}</Text>

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

            {/* this will only focus and wake when the user tries to perform an action exceeding guest role limits */}
            <CustomBottomSheet index={index} title="Herinnering" desc="U moet eerst inloggen om uw profiel te kunnen gebruiken" redir="/" /> 
        </SafeAreaView>
    )
}