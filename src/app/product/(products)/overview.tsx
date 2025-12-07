import {Fragment, JSX, useContext, useEffect, useRef, useState} from "react";
import { Platform, View, Text, ScrollView, FlatList, Dimensions, Animated, Easing, Pressable, Modal } from "react-native";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faStar } from "@fortawesome/free-regular-svg-icons";
import {Calendar} from "react-native-calendars"
import moment from "moment"
import Toast from "react-native-toast-message";
import { AuthProvider } from "@/src/contexts/AuthProvider";
import CustomBottomSheet from "@/src/components/CustomBottomSheet";
import { SheetControlProvider } from "@/src/contexts/SheetControlsProvider";
import * as Haptics from "expo-haptics"
import { Tools } from "@/src/lib/ApiResponses";
import { RestClientInstance } from "../../_layout";

moment.locale("nl")

export default function(): JSX.Element {
    const params = useRoute().params as any
    const deser: Tools = JSON.parse(params.serialized)
    const screenWidth = Dimensions.get("window").width
    const [slideIndex, setSlideIndex] = useState(0)
    const auth = useContext(AuthProvider)

    const [index, setIndex] = useState(-1)
    const [showModal, setShowModal] = useState(false)
    const [dateRange, setDateRange] = useState<{startDate?: Date, endDate?: Date, lastInputTypeFocus?: "start" | "end"}>({
        lastInputTypeFocus: "start"
    })

    
    const controls = useContext(SheetControlProvider)

    const anim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(anim, {
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.elastic(5),
            toValue: 20
        }).start()
    }, [slideIndex])

    useEffect(() => {
        if(index >= 0) {
            controls?.current?.expand()
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    }, [index])
    
    const buildSlideView = deser.images_uris.map((ctx, index) => (
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

    console.log(index)

    return (
        <SafeAreaView
            style={{
                marginTop: 15,
                flex: 1
            }}
                edges={["left", "right", "bottom","top"]}
            >
            <ScrollView style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    visible={showModal}
                    transparent={true}
                >
                    <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            minHeight: 400,
                            backgroundColor: "#FFFFFF",
                            zIndex: 100,
                            padding: 25,
                            boxShadow: "4px 4px 100px 5px rgba(0,0,0, 0.45)",
                            borderColor: "rgba(0,0,0,1)",
                            borderRadius: 12
                        }}>
                            <View style={{position: "absolute", right: 10, top: 6}}>
                                <Pressable 
                                    onPress={(_) => setShowModal((_) => false)}
                                >
                                    <Text style={{
                                        fontFamily: Platform.select({
                                            ios: "Barlow Bold",
                                            android: "Barlow_700Bold"
                                        }),
                                        color: "#282827",
                                        fontSize: 24
                                    }}>
                                        x
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                gap: 20,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                               <View style={{
                                display: "flex"
                               }}>
                                    <Pressable
                                        onPress={(_) => setDateRange((v) => {
                                            return {
                                                ...v,
                                                lastInputTypeFocus: "start"
                                            }
                                        })}
                                    >
                                        <Text style={{
                                            fontFamily: Platform.select({
                                                ios: "Barlow Bold",
                                                android: "Barlow_700Bold"
                                            }),
                                            color: "#282827",
                                            fontSize: 15
                                        }}>
                                            Start datum
                                        </Text>

                                        <View style={{
                                            backgroundColor: "#E0E0E0",
                                            borderRadius: 6,
                                            width: 120,
                                            height: 30,
                                            padding: 5,
                                            display: "flex",
                                            justifyContent: "center",
                                            paddingHorizontal: 10
                                        }}>
                                            {typeof dateRange.startDate !== "undefined" ? 
                                                <>
                                                    <Text style={{
                                                        fontFamily: Platform.select({
                                                            ios: "Poppins Medium",
                                                            android: "Poppins_500Medium"
                                                        }),
                                                        color: "#282827",
                                                        fontSize: 14
                                                    }}>
                                                         {`${moment(dateRange.startDate).format("l")}`}
                                                    </Text>
                                                </>
                                                : null
                                            }
                                        </View>
                                         
                                    </Pressable>
                               </View>

                               <View style={{
                                display: "flex"
                               }}>
                                    <Pressable
                                        onPress={(_) => setDateRange((v) => {
                                            return {
                                                ...v,
                                                lastInputTypeFocus: "end"
                                            }
                                        })}
                                    >
                                        <Text style={{
                                            fontFamily: Platform.select({
                                                ios: "Barlow Bold",
                                                android: "Barlow_700Bold"
                                            }),
                                            color: "#282827",
                                            fontSize: 16
                                        }}>
                                            Eind datum
                                        </Text>

                                        <View style={{
                                            backgroundColor: "#E0E0E0",
                                            borderRadius: 6,
                                            width: 120,
                                            height: 30,
                                            padding: 5,
                                            display: "flex",
                                            justifyContent: "center",
                                            paddingHorizontal: 10
                                        }}>
                                            {typeof dateRange.endDate !== "undefined" ? 
                                                <>
                                                    <Text style={{
                                                        fontFamily: Platform.select({
                                                            ios: "Poppins Medium",
                                                            android: "Poppins_500Medium"
                                                        }),
                                                        color: "#282827",
                                                        fontSize: 14
                                                    }}>
                                                         {`${moment(dateRange.endDate).format("l")}`}
                                                    </Text>
                                                </>
                                                : null
                                            }
                                        </View>
                                    </Pressable>
                                    
                               </View>
                            </View>
                            <Calendar 
                                style={{marginTop: 25}}
                                enableSwipeMonths
                                firstDay={1}
                                showWeekNumbers
                                theme={{
                                    textDayFontFamily: Platform.select({
                                        ios: "Barlow Bold",
                                        android: "Barlow_700Bold"
                                    }),
                                    textDayStyle: {color: "#4A5660"},
                                    textDayHeaderFontFamily: Platform.select({
                                        ios: "Barlow Bold",
                                        android: "Barlow_700Bold"
                                    }),
                                    textMonthFontFamily: Platform.select({
                                        ios: "Barlow Bold",
                                        android: "Barlow_700Bold"
                                    }),
                                    todayBackgroundColor: "rgba(255, 243, 19, 0.6)",
                                    todayTextColor: "#4da5ecff"
                                }}
                                onDayPress={(date) => {
                                    setDateRange((v) => {
                                        let defaults = {
                                            ...v,
                                            
                                        }
                                        
                                        if(dateRange.lastInputTypeFocus === "start") {
                                            defaults.startDate = new Date(date.timestamp)
                                            defaults.lastInputTypeFocus = "end"
                                        } else if(dateRange.lastInputTypeFocus === "end") {
                                            defaults.endDate = new Date(date.timestamp)
                                        }

                                        return defaults
                                    })
                                }}
                            />

                            <Pressable
                                onPress={(_) => {
                                    if(typeof dateRange.startDate === "undefined" || typeof dateRange.endDate === "undefined") {
                                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                                        return Toast.show({
                                            text1: "Selecteer datum",
                                            text2: "Selecteer eerst een datum om te lenen",
                                            type: "info"
                                        })
                                    }

                                    if(dateRange.startDate.getTime() >= dateRange.endDate.getTime()) {
                                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                                        return Toast.show({
                                            text1: "Foute date range",
                                            text2: "Eind datum kan niet korter dan je start datum zijn",
                                            type: "info"
                                        })
                                    }

                                    // this can produce a tampering, time should be checked server side
                                    if(new Date().getTime() >= dateRange.startDate.getTime()) {
                                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                                         return Toast.show({
                                            text1: "Foute date range",
                                            text2: "Je kunt niet in het verleden lenen",
                                            type: "info"
                                        })
                                    }

                                    RestClientInstance.borrowTool(deser._id).then((ctx) => {
                                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                                        Toast.show({
                                            text1: "Geleend",
                                            text2: "Je hebt deze product geleent!",
                                            type: "info"
                                        })
                                    }).catch((err) => {
                                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                                        if(err?.data === "tool not found, already borrowed, or cant borrow own product") {
                                             return Toast.show({
                                                text1: "Er ging wat mis",
                                                text2: "Product niet gevonden, al geleend of je probeert je eigen product te lenen",
                                                type: "info"
                                            })
                                        }
                                        Toast.show({
                                            text1: "Er ging wat mis",
                                            text2: err.data,
                                            type: "info"
                                        })
                                    }).finally(() => {
                                        setShowModal((_) => false)
                                    })
                                    
                                }}
                            >
                                <View style={{
                                    backgroundColor: "#FFEE49",
                                    width: "60%",
                                    paddingHorizontal: 40,
                                    paddingVertical: 10,
                                    borderColor: "rgba(0,0,0,0.25)",
                                    borderWidth: 1,
                                    borderRadius: 6,
                                    marginTop: 5
                                }}> 
                                    <Text style={{
                                        textAlign: "center",
                                        fontFamily: Platform.select({
                                            ios: "Barlow Bold",
                                            android: "Barlow_700Bold"
                                        }),
                                        color: "#282827",
                                        fontSize: 14
                                    }}>
                                        Leen
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </Modal>
                <FlatList
                    snapToAlignment="start"
                    decelerationRate={0.5}
                    snapToInterval={screenWidth + 15}
                    horizontal
                    data={deser.images_uris}
                    renderItem={({ item }) => (
                        <View style={{padding: 0, height: 300, width: screenWidth}}>
                            <Image
                                style={{ width: screenWidth, height: "100%" }}
                                resizeMode="center"
                                source={{ uri: item }}
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
                    data={deser.categories}
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
                    }}>{deser.name}</Text>
                    <View style={{display: "flex", gap: 4, flexDirection: "row"}}>
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Medium",
                                android: "Barlow_500Medium"
                            }),
                            fontSize: 18,
                            color: "#282827"
                        }}>{deser.price?.toFixed(2) ?? "none"}</Text>
                        
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
                        <Pressable 
                            onPress={async (_) => {
                                let isSignedIn = await auth.isSignedIn()
                                if(isSignedIn) {
                                    return setShowModal((_) => true)
                                }

                                setIndex((v) => v+1)
                            }}
                            style={{flex: 1, zIndex: 50}}>
                            <Text style={{
                                fontFamily: Platform.select({
                                    ios: "Barlow Regular",
                                    android: "Barlow_400Regular"
                                }),
                                fontSize: 17,
                                textAlign: "center"
                            }}>RESERVEER</Text>
                        </Pressable>
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
                    }}>{deser.author_info.email}</Text>

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
                    }}>{deser.desc}</Text>
                </View>
            </ScrollView>
            {/* this will only focus and wake when the user tries to perform an action exceeding guest role limits */}
            <CustomBottomSheet index={index >= 0 ? 0 : -1} title="Geen toestemming" desc="U moet eerst inloggen om een product te kunnen lenen" redir="/" />
        </SafeAreaView>
    )
}