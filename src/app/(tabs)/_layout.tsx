import { useEffect, useRef, type JSX } from "react"
import { Tabs } from 'expo-router';
import { View, Pressable, Animated, Easing, Text } from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from 'expo-linear-gradient';

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
    Settings_dark
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
    const anim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(anim, {
            duration: 500,
            useNativeDriver: true,
            toValue: 1,
            easing: Easing.bounce
        }).start()
    }, [state.index])  // [state.index] runs everytime state index changes aka selected tab

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
                                <Pressable onPress={() => {
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

import { ShapeLeft, ShapeRight, Cash } from "@/@types/svg_reexports";
export default function TabsLayout(): JSX.Element {
    return (
        <Tabs 
            tabBar={(props) => <TabBar {...props} />} 
            screenOptions={{
                header(props) {
                    return (
                        <View style={{display: "flex", height: 240, width: "100%", overflow: "hidden"}}>
                            
                            <LinearGradient
                                colors={["#F1FF5C", "rgba(253,255, 114, 0.55)"]} 
                                locations={[0, 80]}   
                                start={{x: 0.5, y: 0}}
                                style={{flex: 1, width: "100%", height: "100%"}}
                            >
                                <SafeAreaView style={{flex: 1}}>
                                    <ShapeLeft style={{
                                        position: "absolute",
                                        left: -30,
                                        top: 30
                                    }} width={100} height={100}/>

                                    <ShapeRight style={{
                                        position: "absolute",
                                        right: -30,
                                        bottom: -30
                                    }} width={130} height={130}/>

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
                                </SafeAreaView>
                            </LinearGradient>
                        </View>
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