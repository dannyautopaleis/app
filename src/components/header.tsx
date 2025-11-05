import { Animated, Text, Platform, TouchableOpacity, View, TextInput, Pressable, StyleSheet, FlatList } from "react-native"
import { DynamicHeaderProvider } from "../contexts/DynamicHeaderProvider"
import { JSX, useContext, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from "expo-image"
import { Calendar_dark, Calendar_light, Filter, Home_dark, Home_light, Inventory_dark, Inventory_light, Notifications_dark, Notifications_light, User_dark, User_light } from "@/@types/svg_reexports"
import { FlashList } from "@shopify/flash-list"

type ColorScheme = "dark" | "light";
type Mappings = {
  [Property in ColorScheme]: { [key: string]: JSX.Element };
};

const dimensions: {width: number, height: number} = { width: 15, height: 15 };
const IconMappings: Mappings = {
  dark: {
    index: <Home_dark {...dimensions} />,
    inventory: <Inventory_dark {...dimensions} />,
    notifications: <Notifications_dark {...dimensions} />,
    calendar: <Calendar_dark {...dimensions} />,
    user: <User_dark {...dimensions} />,
  },
  light: {
    index: <Home_light {...dimensions} />,
    inventory: <Inventory_light {...dimensions} />,
    notifications: <Notifications_light {...dimensions} />,
    calendar: <Calendar_light {...dimensions} />,
    user: <User_light {...dimensions} />,
  },
};

const dimensions_ = {width: 30, height: 30}
const CATS = [
    {
        text: "Handgereedschap",
        icon: (<Image
                    source={require("@/assets/img/cats/plus.png")}
                    style={{
                        ...dimensions_
                    }}
                />),
    },
    {
        text: "Elektrisch gereedschap",
        icon: (<Image
                    source={require("@/assets/img/cats/lightning.png")}
                    style={{
                        ...dimensions_
                    }}
                />),
    },
    {
        text: "Groot gereedschap",
        icon: (<Image
                    source={require("@/assets/img/cats/leaf.png")}
                    style={{
                        ...dimensions_
                    }}
                />),
    }, 
    {
        text: "Accu",
        icon: (<Image
                    source={require("@/assets/img/cats/battery.png")}
                    style={{
                        ...dimensions_
                    }}
                />),
    },{
        text: "Komt binnekort bij update",
        icon: (<Image
                    source={require("@/assets/img/cats/leaf.png")}
                    style={{
                        ...dimensions_
                    }}
                />),
    }, {
        text: "Komt binnekort bij update",
        icon: (<Image
                    source={require("@/assets/img/cats/leaf.png")}
                    style={{
                        ...dimensions_
                    }}
                />),
    }, 
]
const INITIAL = 380

export {IconMappings, CATS, INITIAL};
export default function Header({routeName}: {routeName: string}) {
    const [tabIndex, selectTabIndex] = useState(1)
    const TabIndexMappings = [
        {left: 0}, {right: 0}
    ]

    const dynHeader = useContext(DynamicHeaderProvider)
    const expand = dynHeader.YPos === 0 ? true : false

    return (
        <>
            {
            routeName === "index" ? 
            <SafeAreaView edges={['right', 'left', 'top']}
                style={{
                    backgroundColor: "##FFFFFF",
                    height: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 0,
                    padding: 0,
                    overflow: "hidden"
                }}
            >
                <Animated.View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        height: dynHeader.clampAnimHeader
                    }}
                >
                    <Image
                        source={require("@/assets/img/logo.png")}
                        style={{
                        width: 80,
                        height: 80,
                        }}
                    />
                    <Text
                        style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Regular",
                            android: "Barlow_400Regular",
                        }),
                        fontSize: 12,
                        color: "#000000",
                        textDecorationLine: "underline",
                        }}
                    >
                        <Text style={style.plus}>+</Text> gereedschap zo geregeld{" "}
                        <Text style={style.plus}>+</Text> makkelijk{" "}
                        <Text style={style.plus}>+</Text> vertrouwd{" "}
                        <Text style={style.plus}>+</Text> betaalbaar
                    </Text>

                    <View
                        style={{
                        display: "flex",
                        flexDirection: "row",
                        }}
                    >
                        <TouchableOpacity
                            onPress={(ev) =>
                                console.log("pressed filter, bottomsheet todo..")
                            }
                            style={{
                                position: "absolute",
                                right: 16,
                                top: 16,
                                zIndex: 100,
                            }}
                        >
                            <Filter width={17} height={17} />
                        </TouchableOpacity>

                        <TextInput
                            keyboardType="default"
                            inputMode="text"
                            style={style.input}
                            placeholder="zoeken"
                        />
                    </View>

                    {
                        expand ?
                        <>
                            <View
                                style={{
                                    alignSelf: "flex-start",
                                    marginLeft: 20,
                                }}
                            >
                            <Text
                                style={{
                                fontFamily: Platform.select({
                                    ios: "Barlow Bold",
                                    android: "Barlow_700Bold",
                                }),
                                fontWeight: 700,
                                fontSize: 18,
                                }}
                            >
                                Categorieën
                            </Text>
                            </View>
                            
                            <FlatList 
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    alignSelf: "flex-start",
                                }}
                                snapToAlignment="start"
                                snapToInterval={60}
                                // scrollEnabled={false}
                                contentContainerStyle={{
                                    paddingHorizontal: 20,
                                    gap: 15,
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    // borderColor: "red",
                                    // borderWidth: 1,
                                    // borderStyle: "solid",
                                }}
                                horizontal={true} data={CATS} renderItem={({item}) => {
                                    return (
                                        <Pressable style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <View style={{
                                                width: 60,
                                                height: 60, 
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#282827",
                                                borderRadius: 120
                                            }}>
                                                {item.icon}
                                            </View>
                                            <Text style={{
                                                textAlign: "center",
                                                maxWidth: 90,
                                                fontFamily: Platform.select({
                                                    ios: "Inter Regular",
                                                    android: "Inter_400Regular"
                                                }),
                                                color: "#282827",
                                                fontSize: 12,
                                            }}>{item.text}</Text>
                                        </Pressable>
                                    )
                                }} 
                            />

                            <View style={{
                                marginTop: 15,
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 60,
                            }}>
                            <TouchableOpacity onPress={(_) => selectTabIndex(1)} >
                                <Text
                                    style={{
                                        fontFamily: Platform.select({
                                        ios: "Inter Regular",
                                        android: "Inter_400Regular", 
                                        }),
                                        fontSize: 19,
                                        marginBottom: 8
                                    }}
                                >
                                    Voor jou
                                </Text>
                            </TouchableOpacity>

                            <View style={{
                                position: "absolute",
                                backgroundColor: "#282827",
                                width: 200,
                                height: 5,
                                bottom: 0,
                                ...TabIndexMappings[tabIndex-1]
                            }}/>

                            <TouchableOpacity onPress={(_) => selectTabIndex(2)} >
                                <Text
                                style={{
                                    fontFamily: Platform.select({
                                    ios: "Inter Regular",
                                    android: "Inter_400Regular",
                                    }),
                                    fontSize: 19,
                                    marginBottom: 8,
                                }}
                                >
                                    In de buurt
                                </Text>
                            </TouchableOpacity>
                            </View>
                        </> :
                        <></>
                    }
                </Animated.View>
            </SafeAreaView>
            : <></>
            } 
        </>
    );
}

const style = StyleSheet.create({
  plus: {
    color: "yellow",
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowRadius: 8,
  },
  input: {
    marginBottom: 15,
    marginTop: 5,
    fontFamily: Platform.select({
      ios: "Inter Regular",
      android: "Inter_400Regular",
    }),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    borderRadius: 30,
    minWidth: 260,
    paddingHorizontal: 20,
  },
});
