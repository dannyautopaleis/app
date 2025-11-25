import { useContext, useEffect, useRef, useState, type JSX } from "react";
import { Tabs, useNavigation, useRouter } from "expo-router";
import {
  View,
  Pressable,
  Animated,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { BottomTabHeaderProps, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DynamicHeaderProvider, INITIAL } from "@/src/contexts/DynamicHeaderProvider";
import { Image } from "expo-image";

// icons imports ---------------
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { IconMappings } from "@/src/components/header";
// ------------end imports

const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element => {
  const anim = useRef(new Animated.Value(0)).current;
  const auth = useContext(AuthProvider)

  useEffect(() => {
    Animated.timing(anim, {
      duration: 500,
      useNativeDriver: true,
      toValue: 1,
      easing: Easing.bounce,
    }).start();
  }, [state.index]); // [state.index] runs everytime state index changes aka selected tab

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

            return (
              <Pressable
                onLongPress={(e) => {
                  console.log("todo: long press tab bar handle");
                }}
                onPress={async () => {
                  if (!focused) anim.setValue(0); // prevent user from spamming animation on same sreen

                  if(title.includes("user") && !(await auth.isSignedIn())) {
                    console.log("user", title)
                    return navigation.navigate(title, {showSheet: true});
                  }
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
import { BackArrow } from "@/@types/svg_reexports";
import CustomBottomSheet from "@/src/components/CustomBottomSheet";
import { SheetControlProvider } from "@/src/contexts/SheetControlsProvider";
import { AuthProvider } from "@/src/contexts/AuthProvider";
type HeaderState = {scrollDown: boolean, scrollUp: boolean, YPos: number, headerSize: number, selectedCategory: string | null}
export default function TabsLayout(): JSX.Element {
  // will transform to react reducer later
  const [currentValue, setValue] = useState<HeaderState>({
    scrollDown: false,
    scrollUp: false,
    YPos: 0,
    headerSize: INITIAL,
    selectedCategory: null,
  }) // scroll data
  const clampAnimHeader = useRef(new Animated.Value(currentValue.headerSize)).current
  const insets = useSafeAreaInsets()

  const scrollHandler = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset =  ev.nativeEvent.contentOffset.y
    const windowSize = ev.nativeEvent.contentSize.height
    const treshold_20 = (windowSize / 100) * 20

    if(offset <= treshold_20 && currentValue.YPos > treshold_20) {
      return setValue((v) => {
        return {...v, scrollUp: true, YPos: offset, scrollDown: false, headerSize: INITIAL, }
      })
    }

    if(offset > treshold_20 && currentValue.YPos <= treshold_20) {
      return setValue((v) => {
        return {...v, scrollUp: false, YPos: offset, scrollDown: true, headerSize: 200}
      })
    }
  }

  useEffect(() => {
    Animated.timing(clampAnimHeader, {
      toValue: currentValue.headerSize,
      useNativeDriver: false,
      duration: 750,
      delay: 0,
      easing: Easing.elastic(1)
    }).start()
  }, [currentValue])

  return (
    <DynamicHeaderProvider value={{
      clampAnimHeader,
      scrollBar: scrollHandler,
      YPos: currentValue.YPos,
      currentValue: currentValue.headerSize,
      categoryHandler: {
        selectedCategory: currentValue.selectedCategory,
        setCategory: setValue as any
      }
    }}>
        <Tabs
          initialRouteName="index"
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{
            tabBarHideOnKeyboard: true,
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
          <Tabs.Screen name="user"  options={{
            headerShown: true,
            header: (props: BottomTabHeaderProps) => {
              return (<StackHeader {...props} insets={insets}/>)
            }
          }}/>
      </Tabs>
    </DynamicHeaderProvider>
  );
}

const StackHeader = (props: BottomTabHeaderProps & {
  insets: EdgeInsets;
}) => {
    return (
        <SafeAreaView
            style={{
                // marginTop: status.currentHeight, 
                width: "100%",
                height: 185,
            }}
            edges={["left", "right", "top"]}
        >
            <TouchableOpacity 
                onPress={(event) => {
                    props.navigation.goBack()
                }}
                style={{
                    position: "absolute", left: props.insets.left + 10, top: props.insets.top + 0,  
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                }}
            >
                <BackArrow width={20} height={20} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: "center", marginTop: 5}}>
                <Image source={require("@/assets/img/logo.png")} style={{width: 80, height: 80}} />
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
            </View>
        </SafeAreaView>
    )
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

});
