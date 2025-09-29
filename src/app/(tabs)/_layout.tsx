import { useEffect, useRef, type JSX } from "react"
import { Tabs, useNavigation } from 'expo-router';
import { View, Pressable, Animated, Easing, Text } from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, TouchableOpacity } from 'react-native';
import * as React from "react"

// icons imports --------------- 
import { 
    Home,
    Home_dark,
    Products,
    Products_dark,
    Lendings,
    Lendings_dark,
    Notifications,
    Notifications_dark,
    Settings,
    Settings_dark,
    Archives,
    Chats,
    ShapeLeft, 
    ShapeRight, 
    Cash 
 } from "@/@types/svg_reexports";
import { SafeAreaView } from "react-native-safe-area-context";
// ------------end imports

type ColorScheme = "dark" | "light"
type Mappings = {
    [Property in ColorScheme]: {[key: string]: JSX.Element};
}

const IconMappings: Mappings = {
    dark: {
        "index": (<Home_dark width={16} height={20} />),
        "products": (<Products_dark width={16} height={20} />),
        "lendings": (<Lendings_dark width={16} height={20} />),
        "notifications": (<Notifications_dark width={16} height={20} />),
        "settings": (<Settings_dark width={16} height={20} />)
    },
    light: {
        "index": (<Home width={16} height={20} />),
        "products": (<Products width={16} height={20} />),
        "lendings": (<Lendings width={16} height={20} />),
        "notifications": (<Notifications width={16} height={20} />),
        "settings": (<Settings width={16} height={20} />)
    }
}

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps): JSX.Element => {
    const nav = useNavigation()
    const anim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(anim, {
            duration: 500,
            useNativeDriver: true,
            toValue: 1,
            easing: Easing.bounce
        }).start()
    }, [state.index])  // [state.index] runs everytime state index changes aka selected tab

    // prevent the user from going back to the stack navigator, typically this is to prevent 
    // accidental moving back to login or continue as guest screens 
    useEffect(() => {
        nav.addListener("beforeRemove", (e) => e.preventDefault())
    }, [navigation])
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: "auto"
        }}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#212426",
                width: "75%",
                height: 60,
                marginBottom: 50,
                borderRadius: 30,
                paddingHorizontal: 20,
                boxShadow: "4px 4px 100px 5px rgba(0,0,0, 0.8)",
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 2
            }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    paddingVertical: 2,
                    justifyContent: "center",
                    gap: 10
                }}>
                    {
                        state.routes.map((route, index) => {
                            const { options } = descriptors[route.key]

                            const title = options.title ?? route.name
                            const focused = state.index === index

                            return (
                                <Pressable 
                                onLongPress={(e) => {
                                    console.log("todo: long press tab bar handle")
                                }}
                                onPress={() => {
                                    if(!focused)
                                        anim.setValue(0) // prevent user from spamming animation on same sreen

                                    navigation.navigate(title)
                                }} key={route.key}>
                                    {focused ? (
                                       <Animated.View style={{
                                            flex: 1,
                                            // opacity: anim
                                            transform: [{scale: anim}]
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#FEE9E9",
                                                padding: 8,
                                                borderRadius: 120,
                                                width: 40,
                                                height: 100
                                            }}>
                                                {IconMappings["dark"][title]}
                                            </View>
                                        </Animated.View>
                                    ) : (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 8,
                                            width: 40,
                                            height: 100
                                        }}>
                                            {IconMappings["light"][title]}
                                        </View>
                                    )}
                                </Pressable>
                            )
                        })
                    }
                </View>
                
            </View>
        </View>
    )
}

export default function TabsLayout(): JSX.Element {
    const items = [
        {
            text: "Geleend",
            icon: (<Archives width={32} height={32} />)
        }, {
            text: "Cash",
            icon: (<Cash width={30} height={30} />)
        }, {
            text: "Chats",
            icon: (<Chats width={28} height={28} />)
        }
    ]

    const buildView = items.map((v, index) => {
        return (
            <React.Fragment key={`header-tabs-bar-${index}`}>
                <View>
                    <TouchableOpacity
                    onPress={(e) => console.log("todo: key handle") }
                    onLongPress={(e) =>  console.log("todo: long presskey handle") }
                    style={{
                        flex: 1, 
                        padding: 10,   
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                            {v.icon}
                            <Text style={{
                                fontFamily: Platform.select({
                                    android: 'Poppins_500Medium',
                                    ios: 'Poppins-Medium',
                                }),
                                fontSize: 15,
                                color: "rgba(0,0,0, 0.6)",
                                marginTop: 5
                        }}>{v.text}</Text>
                    </TouchableOpacity>
                </View>
                {index !== items.length -1 ? (
                   <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                   }}>
                     <View style={{
                        width: 1,
                        height: 26,
                        backgroundColor: "rgba(0,0,0, 0.6)",
                        borderRadius: 60
                    }}/>
                   </View>
                ): null}
            </React.Fragment>
        )
    })
    return (
        <Tabs 
            tabBar={(props) => <TabBar {...props} />} 
            screenOptions={{
                header() {
                    return (
                        <>
                            <LinearGradient
                                colors={["#F1FF5C", "rgba(253,255, 114, 0.55)","rgba(253,255, 114, 0.2)","transparent"]} 
                                locations={[0, 0.5, 0.7, 1]}   
                                start={{x: 0.5, y: 0}}
                                style={{display: "flex", height: 300, width: "100%"}}
                            >
                                <SafeAreaView style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <Text style={{
                                            fontFamily: Platform.select({
                                                android: 'Poppins_500Medium',
                                                ios: 'Poppins-Medium',
                                            }),
                                            fontSize: 17,
                                            fontWeight: 500
                                        }}>Welkom terug,</Text>
                                        <Text style={{
                                            fontFamily: Platform.select({
                                                android: 'Poppins_Poppins_600SemiBold',
                                                ios: 'Poppins-SemiBold',
                                            }),
                                            fontSize: 34,
                                            fontWeight: 700
                                        }}>👋 John Doe</Text>
                                    </View>                         

                                    <View style={{
                                        position: "absolute",
                                        right: 0,
                                        bottom: 40,
                                        overflow: "hidden",
                                        height: 100
                                    }}>
                                        <ShapeRight style={{
                                            
                                        }} width={100} height={130}/>
                                    </View>
                                    <ShapeLeft style={{
                                        position: "absolute",
                                        left: -30,
                                        top: 30
                                    }} width={100} height={100}/>                               

                                    <View style={{
                                        position: "absolute",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        padding: 5,
                                        alignItems: "center",
                                        flexDirection: "row",
                                        right: 15,
                                        top: 45,
                                        width: 90,
                                        height: 35,
                                        borderRadius: 10,
                                        backgroundColor: "white",
                                        gap: 10
                                    }}>
                                        <Cash width={20} height={20} />
                                        <Text style={{fontWeight: 600}}>-------</Text>
                                    </View>

                                    {/* Tabs: header */}
                                    <View style={{
                                        backgroundColor: "white",
                                        width: "80%",
                                        height: 80,
                                        zIndex: 100,
                                        borderRadius: 10,
                                        display: "flex",    
                                        flexDirection: "row",
                                        position: "absolute",
                                        bottom: 0,
                                        // boxShadow: "5px 5px 100px 5px rgba(0, 0, 0, 0.3)",
                                        gap: 20,
                                        justifyContent: "center",
                                    }}>
                                        {buildView}
                                    </View>
                                </SafeAreaView>
                            </LinearGradient>
                        </>
                        
                    )
                },
            }}
        >
            <Tabs.Screen
                name="index"
            />
            <Tabs.Screen
                name="products"
            />
             <Tabs.Screen
                name="lendings"
            />
            <Tabs.Screen
                name="notifications"
            />
            <Tabs.Screen
                name="settings"
            />
        </Tabs>
    )
}