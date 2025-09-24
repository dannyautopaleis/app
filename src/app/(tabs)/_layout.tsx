import { type JSX } from "react"
import { Tabs } from 'expo-router';
import { View, Pressable } from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

// @ts-ignore
// todo: auto ignore w/tsconfig configuration
import Home from '../../../assets/svgs/home.svg';
// @ts-ignore
import Products from '../../../assets/svgs/products.svg';
// @ts-ignore
import Lendings from '../../../assets/svgs/repair.svg';
// @ts-ignore
import Notifications from '../../../assets/svgs/notifications.svg';
// @ts-ignore
import Settings from '../../../assets/svgs/gear.svg';

const IconMappings: { [key: string]: JSX.Element } = {
    "index": (<Home width={20} height={20} />),
    "products": (<Products width={20} height={20} />),
    "lendings": (<Lendings width={20} height={20} />),
    "notifications": (<Notifications width={20} height={20} />),
    "settings": (<Settings width={20} height={20} />)
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
                boxShadow: "4px 4px 100px 5px rgba(0,0,0, 0.8)"
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
                            const icon = IconMappings[title] 
                            const focused = state.index === index

                            return (
                                <Pressable onPress={() => console.log("todo: navigation change route etc")} key={route.key}>
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
                                            {IconMappings[title]}
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
                                            {IconMappings[title]}
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