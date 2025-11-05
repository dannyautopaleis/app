import { useEffect, useRef, useState, type JSX } from "react";
import { Tabs, useNavigation } from "expo-router";
import {
  View,
  Pressable,
  Animated,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DynamicHeaderProvider } from "@/src/contexts/DynamicHeaderProvider";

// icons imports ---------------

import { SafeAreaView } from "react-native-safe-area-context";
import { IconMappings, INITIAL } from "@/src/components/header";
// ------------end imports

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

  console.log(state.routeNames[state.index])
  return (
    <SafeAreaView edges={["left", "right", "bottom"]}
      style={{
        position: "absolute",
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "auto",
        // backgroundColor: state.routeNames[state.index] === "index" ? "#E0E0E0" : "transparent"
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
          borderRadius: 30,
          paddingHorizontal: 20,
          boxShadow: "4px 4px 100px 5px rgba(0,0,0, 0.5)",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 2,
          // zIndex: 100,
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

import Header from "@/src/components/header";
export default function TabsLayout(): JSX.Element {
  const [currentValue, setValue] = useState<{scrollDown: boolean, scrollUp: boolean, YPos: number, headerSize: number}>({
    scrollDown: false,
    scrollUp: false,
    YPos: 0,
    headerSize: INITIAL
  }) // scroll data
  const clampAnimHeader = useRef(new Animated.Value(currentValue.headerSize)).current

  const scrollHandler = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset =  ev.nativeEvent.contentOffset.y
    if(offset === 0 && currentValue.YPos > 0) {
      return setValue((_) => {
        return {scrollUp: true, YPos: offset, scrollDown: false, headerSize: INITIAL}
      })
    }

    if(offset > 100 && currentValue.YPos === 0) {
      return setValue((_) => {
        return {scrollUp: false, YPos: offset, scrollDown: true, headerSize: 200}
      })
    }
  }

  useEffect(() => {
    Animated.timing(clampAnimHeader, {
      toValue: currentValue.headerSize,
      useNativeDriver: false,
      duration: 350,
      delay: 0,
      easing: Easing.elastic(0.4)
    }).start()
  }, [currentValue])

  return (
    <DynamicHeaderProvider value={{
      clampAnimHeader,
      scrollBar: scrollHandler,
      YPos: currentValue.YPos
    }}>
        <Tabs
          initialRouteName="index"
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{
            header(props) {
              return (
                <Header routeName={props.route.name} />
              );
            },
          }}
        >
          <Tabs.Screen name="index"/>
          <Tabs.Screen name="inventory" />
          <Tabs.Screen name="notifications" />
          <Tabs.Screen name="calendar" />
          <Tabs.Screen name="user" />
      </Tabs>
    </DynamicHeaderProvider>
  );
}