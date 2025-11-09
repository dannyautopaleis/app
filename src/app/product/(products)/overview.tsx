import { ImgPlaceholder } from "@/@types/svg_reexports";
import {Fragment, JSX, useEffect, useRef, useState} from "react";
import { Platform, View, Text, ScrollView, FlatList, Dimensions, Animated, Easing } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Trade } from "@/@types/svg_reexports";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faStar } from "@fortawesome/free-regular-svg-icons";

type Product = {
    title: string;
    description: string;
    images: Array<string>;
    price: string;
    place: string;
    tags: Array<string>
    author: string
}

export default function(): JSX.Element {
    const params = useRoute().params as any
    const deser: Product = JSON.parse(params.serialized)
    const screenWidth = Dimensions.get("window").width
    const [slideIndex, setSlideIndex] = useState(0)

    console.log(slideIndex)
    const anim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(anim, {
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.elastic(5),
            toValue: 20
        }).start()
    }, [slideIndex])
    
    const buildSlideView = deser.images.map((ctx, index) => (
        <Fragment key={`slide-${index}`}>
            {
                slideIndex === index ? 
                    <>
                        <Animated.View style={{width: anim, paddingHorizontal: 15, borderColor: "black", borderWidth: 0.9, height: 8, backgroundColor: "yellow", borderRadius: 20}}></Animated.View>
                    </> : 
                    <>
                        <View style={{width: 10, height: 8, backgroundColor: "black", borderRadius: 20}}></View>
                    </>
            }
        </Fragment>
    ))

    const categoriesView = deser.tags.map((ctx, index) => (
        <Fragment key={`cat-${index}`}>
        </Fragment>
    ))

    return (
        <SafeAreaView
            style={{
                marginTop: 15,
                flex: 1
            }}
                edges={["left", "right", "bottom"]}
            >
            <ScrollView style={{flex: 1}}>
                <FlatList
                    snapToAlignment="start"
                    decelerationRate={0.5}
                    snapToInterval={screenWidth + 15}
                    horizontal
                    data={deser.images}
                    renderItem={({ item }) => (
                        <View style={{padding: 0, height: 300, width: screenWidth}}>
                            <Image
                                style={{ width: screenWidth, height: "100%" }}
                                source={{ uri: item }}
                                contentFit="cover" contentPosition={"center"}
                            />
                        </View>
                    )}
                    contentContainerStyle={{ gap: 15}}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 35
                    }}
                    onViewableItemsChanged={(ctx) => {
                        let items = ctx.viewableItems
                        for (let i = 0; i < items.length; i++) {
                            let view = items[i];
                            if(view.index !== null){
                                console.log("view index", view.index)
                                setSlideIndex(view.index)
                            }
                        }
                    }}
                
                />
            
                <View style={{
                    display: "flex",
                    width: screenWidth,
                    marginTop: 5,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: 4, alignItems: "center", width: "auto" ,  paddingHorizontal: 4, paddingVertical: 2, height: 14, backgroundColor: "#F5F5F5", borderColor: "#282827", borderWidth: 0.9, borderRadius: 20}}>
                        {buildSlideView}
                    </View>
                </View>


                <FlatList
                    style={{marginTop: 5}}
                    snapToAlignment="start"
                    decelerationRate={0.5}
                    snapToInterval={100}
                    horizontal
                    data={deser.tags}
                    renderItem={({ item }) => (
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 0, height: 30, width: "auto", paddingHorizontal: 15, backgroundColor: "#312f2fff", 
                                borderRadius: 10}}>
                            <Text style={{
                                fontFamily: Platform.select({
                                    ios: "Inter Regular",
                                    android: "Inter_400Regular"
                                }),
                                color: "white",
                                fontSize: 14,
                            }}>{item}</Text>
                        </View>
                    )}
                    contentContainerStyle={{ gap: 5, paddingHorizontal: 5}}
                    showsHorizontalScrollIndicator={false}
                />

                {/* hero */}
                <View style={{display: "flex", width: screenWidth, padding: 20, }}>
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 20,
                        color: "#282827"
                    }}>{deser.title}</Text>
                    <View style={{display: "flex", gap: 4, flexDirection: "row"}}>
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Medium",
                                android: "Barlow_500Medium"
                            }),
                            fontSize: 18,
                            color: "#282827"
                        }}>{deser.price}</Text>
                        
                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#efbc3cff",
                            width: 23,
                            height: 23,
                            borderRadius: 30,
                            borderColor: "#282827",
                            borderWidth: 1,
                            padding: 0.1
                        }}>
                            <View style={{
                            borderRadius: 30,
                            borderColor: "#282827",
                            borderWidth: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "90%",
                            height: "90%"
                            }}>
                                <Text style={{
                                    fontSize: 10
                                }}>$</Text>
                            </View>
                      </View>
                    </View>
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        marginTop: 2,
                        color: "282827"
                    }}>Beschikbaar vanaf NA</Text>

                    <View style={{
                        marginTop: 15,
                        alignSelf: "center",
                        width: "70%",
                        backgroundColor: "#FFEE49",
                        paddingVertical: 10,
                        paddingHorizontal: 35,
                        borderRadius: 10,
                        borderColor: "#282827",
                        borderWidth: 1
                    }}>
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Regular",
                                android: "Barlow_400Regular"
                            }),
                            fontSize: 17,
                            textAlign: "center"
                        }}>RESERVEER</Text>
                    </View>
                </View>
                {/* end */}

                <View style={{width: screenWidth, height: 1, backgroundColor: "#282827", marginBottom: 5}}></View>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    width: screenWidth,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    alignItems: "center",
                    gap: 5
                }}>
                    <FontAwesomeIcon size={24} icon={faUser} />
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 15,
                        textAlign: "center",
                        color: "#282827"
                    }}>{deser.author}</Text>

                    <View style={{flex: 1, flexDirection: "row", gap: 1, justifyContent: "flex-end", alignItems: "center"}}>
                        <FontAwesomeIcon size={23} icon={faStar} />
                        <FontAwesomeIcon size={23} icon={faStar} />
                        <FontAwesomeIcon size={23} icon={faStar} />
                        <FontAwesomeIcon size={23} icon={faStar} />
                        <FontAwesomeIcon size={23} icon={faStar} />
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Bold",
                                android: "Barlow_700Bold"
                            }),
                            fontSize: 15,
                            textAlign: "center"
                        }}>(0)</Text>
                    </View>
                </View>
                <View style={{width: screenWidth, height: 1, backgroundColor: "#282827", marginTop: 5}}></View>
                <View style={{ display: "flex", alignItems: "flex-start", padding: 15, justifyContent: "flex-start"}}>
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 20,
                        textAlign: "center",
                        color: "#282827"
                    }}>Beschrijving</Text>

                    <Text style={{
                        padding: 15,
                        fontFamily: Platform.select({
                            ios: "Barlow Regular",
                            android: "Barlow_400Regular"
                        }),
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#282827"
                    }}>{deser.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}