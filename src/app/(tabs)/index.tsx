import { JSX } from "react";
import { FlatList, Platform, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ImgPlaceholder } from "@/@types/svg_reexports";
import { useRouter } from "expo-router";

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
    const router = useRouter()

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            {/* <Text style={{fontSize: 16}}>Hi {params?.email}</Text> */}
            <FlatList
                data={staticProducts}
                renderItem={(ctx) => {
                    return (
                        <TouchableOpacity
                            onPress={(event) => {
                                console.log("pressed on item:", ctx.item)
                                router.navigate({
                                    pathname: "/product/overview",
                                    params: {
                                        ...ctx.item as any
                                    }
                                })
                            }}
                        >
                            <View style={css.container}>
                                <ImgPlaceholder width={"100%"} height={150} />
                                <View style={css.header}>
                                    <Text style={{
                                        fontFamily: Platform.select({
                                            android: 'Poppins_500Medium',
                                            ios: 'Poppins-Medium',
                                        }),
                                        fontSize: 17,
                                        // fontWeight: 600
                                    }}>{ctx.item.title}</Text>
                                    <Text style={{
                                        fontFamily: Platform.select({
                                            android: 'Poppins_500Medium',
                                            ios: 'Poppins-Medium',
                                        }),
                                        fontSize: 14,
                                        color: "#6B5B5B"
                                    }}>€{ctx.item.price.toFixed(2)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(i) => `prod-${i.title}`}
                horizontal={false}
                numColumns={2}
                // ItemSeparatorComponent={() => (
                //     <View style={{width: 100}}>a</View>
                // )}
                // getItemLayout={(data, index) => (
                //     {length: 90, offset: 90 + 20, index}
                // )}
                contentContainerStyle={{
                    marginTop: 15,
                    gap: 10,
                }}
                columnWrapperStyle={{
                    gap: 15
                }}
            />
        </SafeAreaView>
    )
}

const css: {[key: string]: StyleProp<ViewStyle>} = {
    container: {
        width: 180,
        height: 225,
        backgroundColor: "#FFFFFF",
        borderColor: "#D9D0D0",
        borderWidth: 0.5,
        display: "flex",
        flexDirection: "column",
        padding: 0,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        overflow: "hidden",
        borderRadius: 6,
        boxShadow: "4px 4px 30px 1px rgba(0,0,0, 0.1)"
    },
    header: {
        display: "flex",
        flexDirection: "column",
        padding: 10
    }
}