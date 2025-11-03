import { ImgPlaceholder } from "@/@types/svg_reexports";
import {JSX} from "react";
import { Platform, View, Text, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Trade } from "@/@types/svg_reexports";
import { SafeAreaView } from "react-native-safe-area-context";

type Product = { title: string; desc: string; price: Number; }

export default function(): JSX.Element {
    const route = useRoute().params as Product
    return (
        <SafeAreaView style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20
        }}>
            <ImgPlaceholder width={"100%"} height={250} />
            <Text style={{
                marginTop: 15,
                paddingHorizontal: 60,
                alignSelf: "flex-start",
                fontFamily: Platform.select({
                    android: 'Poppins_600SemiBold',
                    ios: 'Poppins-SemiBold',
                }),
                fontSize: 24,
            }}>{route.title}</Text>
            <Text style={{
                color: "#6B5B5B",
                paddingHorizontal: 60,
                alignSelf: "flex-start",
                fontFamily: Platform.select({
                    android: 'Poppins_500Medium',
                    ios: 'Poppins-Medium',
                }),
                fontSize: 16,
            }}>€{Number(route.price).toFixed(2)}</Text>

             <Text style={{
                marginTop: 15,
                paddingHorizontal: 60,
                alignSelf: "flex-start",
                fontFamily: Platform.select({
                    android: 'Poppins_600SemiBold',
                    ios: 'Poppins-SemiBold',
                }),
                fontSize: 24,
            }}>Descriptie</Text>
            <Text style={{
                color: "#424040ff",
                paddingHorizontal: 60,
                alignSelf: "flex-start",
                fontFamily: Platform.select({
                    android: 'Poppins_500Medium',
                    ios: 'Poppins-Medium',
                }),
                fontSize: 16,
            }}>{route.desc}</Text>
            <TouchableOpacity style={{
                position: "absolute",
                bottom: 60,
            }}>
                <View 
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "rgba(253, 255, 114,0.6)",
                        width: 150,
                        height: 40,
                        borderRadius: 30,
                        borderColor: "rgba(143, 151, 96, 0.2)",
                        borderWidth: 0.8,
                    }}
                >
                    <Trade width={18} height={18} />
                    <Text style={{
                        fontFamily: Platform.select({
                            android: 'Poppins_500Medium',
                            ios: 'Poppins-Medium',
                        }),
                        fontSize: 16
                    }}>Leen</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}