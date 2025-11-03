import { useEffect, useRef, type JSX } from "react";
import { Tabs, useNavigation } from "expo-router";
import {
  View,
  Pressable,
  Animated,
  Easing,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, TouchableOpacity } from "react-native";
import * as React from "react";

// icons imports ---------------
import {
  Home_dark,
  Home_light,
  Archives,
  Chats,
  ShapeLeft,
  ShapeRight,
  Cash,
  Inventory_dark,
  Inventory_light,
  Notifications_dark,
  Notifications_light,
  Calendar_dark,
  Calendar_light,
  User_dark,
  User_light,
  Filter,
} from "@/@types/svg_reexports";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { TextInput } from "react-native";
// ------------end imports

type ColorScheme = "dark" | "light";
type Mappings = {
  [Property in ColorScheme]: { [key: string]: JSX.Element };
};

const dimensions = { width: 15, height: 15 };
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

const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element => {
  const nav = useNavigation();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      duration: 500,
      useNativeDriver: true,
      toValue: 1,
      easing: Easing.bounce,
    }).start();
  }, [state.index]); // [state.index] runs everytime state index changes aka selected tab

  // prevent the user from going back to the stack navigator, typically this is to prevent
  // accidental moving back to login or continue as guest screens
  useEffect(() => {
    nav.addListener("beforeRemove", (e) => e.preventDefault());
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "auto",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#212426",
          width: "70%",
          height: 60,
          marginBottom: 18,
          borderRadius: 30,
          paddingHorizontal: 20,
          boxShadow: "4px 4px 100px 5px rgba(0,0,0, 0.8)",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 2,
          zIndex: 100,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            flexDirection: "row",
            paddingVertical: 2,
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const title = options.title ?? route.name;
            const focused = state.index === index;
            console.log(title);

            return (
              <Pressable
                onLongPress={(e) => {
                  console.log("todo: long press tab bar handle");
                }}
                onPress={() => {
                  if (!focused) anim.setValue(0); // prevent user from spamming animation on same sreen

                  navigation.navigate(title);
                }}
                key={route.key}
              >
                {focused ? (
                  <Animated.View
                    style={{
                      flex: 1,
                      transform: [{ scale: anim }],
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFEE49",
                        padding: 13,
                        borderRadius: 120,
                        width: 45,
                        height: 100,
                      }}
                    >
                      {IconMappings["dark"][title]}
                    </View>
                  </Animated.View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 8,
                      width: 40,
                      height: 100,
                    }}
                  >
                    {IconMappings["light"][title]}
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function TabsLayout(): JSX.Element {
  const items = [
    {
      text: "Geleend",
      icon: <Archives width={32} height={32} />,
    },
    {
      text: "Cash",
      icon: <Cash width={30} height={30} />,
    },
    {
      text: "Chats",
      icon: <Chats width={28} height={28} />,
    },
  ];

  const buildView = items.map((v, index) => {
    return (
      <React.Fragment key={`header-tabs-bar-${index}`}>
        <View>
          <TouchableOpacity
            onPress={(e) => console.log("todo: key handle")}
            onLongPress={(e) => console.log("todo: long presskey handle")}
            style={{
              flex: 1,
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {v.icon}
            <Text
              style={{
                fontFamily: Platform.select({
                  android: "Poppins_500Medium",
                  ios: "Poppins-Medium",
                }),
                fontSize: 15,
                color: "rgba(0,0,0, 0.6)",
                marginTop: 5,
              }}
            >
              {v.text}
            </Text>
          </TouchableOpacity>
        </View>
        {index !== items.length - 1 ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 1,
                height: 26,
                backgroundColor: "rgba(0,0,0, 0.6)",
                borderRadius: 60,
              }}
            />
          </View>
        ) : null}
      </React.Fragment>
    );
  });
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header() {
          return (
            <SafeAreaView
              style={{
                borderColor: "red",
                borderWidth: 2,
                height: 360,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
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
                      ios: "Barlow SemiBold",
                      android: "Barlow_600SemiBold",
                    }),
                    fontSize: 12,
                    color: "#000000",
                    textDecorationLine: "underline",
                  }}
                >
                  <Text style={style.plus}>+</Text> gereedschap zo gergeld{" "}
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

                <View
                  style={{
                    alignSelf: "flex-start",
                    marginTop: 10,
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
              </ScrollView>
            </SafeAreaView>
          );
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="inventory" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="user" />
    </Tabs>
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
