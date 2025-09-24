import { type JSX } from "react"
import { Tabs } from 'expo-router';
import { View, Pressable } from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

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
 } from "../../../@types/svg_reexports";
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
                                <Pressable onPress={() => navigation.navigate(title)} key={route.key}>
                                    {focused ? (
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
    return (
        <Tabs 
            tabBar={(props) => <TabBar {...props} />} 
            screenOptions={{
                headerShown: false,
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