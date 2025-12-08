import { JSX, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  StyleProp,
  Text,
  FlatList,
  View,
  ViewStyle,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePreventRemove, useRoute } from "@react-navigation/native";
import { useFocusEffect, useRouter } from "expo-router";
// import { Image } from "expo-image";
import { Image } from "react-native";
import { DynamicHeaderProvider } from "@/src/contexts/DynamicHeaderProvider";
import { FlashList } from "@shopify/flash-list"; // we'll use flashlist upon production, its fully compatible with flatlist so we do not mind speeding the process
import { RestClientInstance } from "../../_layout";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { SheetControlProvider } from "@/src/contexts/SheetControlsProvider";
import {Portal} from "@gorhom/portal"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { AuthProvider } from "@/src/contexts/AuthProvider";
import { CreateToolsResponse } from "@/src/lib/ApiResponses";

export default function HomeScreen(): JSX.Element {
  const header = useContext(DynamicHeaderProvider)
  const route = useRoute();
  const params = route.params as unknown;
  const router = useRouter();
  const barHeight = useBottomTabBarHeight()
  const auth = useContext(AuthProvider)
  
  const [isSignedIn, setSignedIn] = useState(false)
  const [items, setItems] = useState<CreateToolsResponse>()
  const [triggered, triggerRender] = useState(false)

  useMemo(()=> {
      auth.isSignedIn().then((v) => {
        setSignedIn(v)
      }).catch((_) => {})
  }, [])
  
  useMemo(() => {
    RestClientInstance.getTools()
      .then((tools) => {
        let ser = tools.data as CreateToolsResponse
        setItems(ser)
      })
      .catch((err) => {
        console.log("hierooo", err)
      })
  }, [triggered])

  useFocusEffect(
    useCallback(() => {
      triggerRender((v) => !v)
      return () => {}
    }, [])
  );

  return (
    <SafeAreaView edges={["left", "right"]}
      style={{
        flex: 1
      }}
    >
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior={Platform.OS === "ios" ? "padding" : "padding"} style={{ flex: 1}}>
        <FlatList 
          initialNumToRender={5}
          style={{
            width: "100%",
            height: "auto"
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          onScroll={header.scrollBar}
          numColumns={2}
          snapToAlignment="start"
          snapToInterval={30}
          scrollToOverflowEnabled={false}
          centerContent={true}
          data={items} 
          renderItem={(ctx) => {
            const { item } = ctx
            return (
              <Pressable onPress={(_) => {
                console.log("ga")
                router.navigate({
                  pathname: "/product/overview",
                  params: {serialized: JSON.stringify(item)}
                })
              }}>
                <View style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  minWidth: 195,
                  minHeight: 160,
                  margin: 5,
                  borderRadius: 2,
                  boxShadow: "4px 4px 100px 1px rgba(0, 0, 0, 0.05)"
                }}>
                  <Image resizeMode="center" style={{padding: 0, width: "100%", height: 120}} source={{uri: item.images_uris[0]}} />
                  <View style={{backgroundColor: "#282827", width: "100%", height: 1.5}}/>

                  <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    paddingTop: 5,
                    paddingHorizontal: 8,
                    flex: 1
                  }}>
                    <Text style={{
                      fontFamily: Platform.select({
                        ios: "Barlow Bold",
                        android: "Barlow_700Bold"
                      }), 
                      fontWeight: 700
                    }}>{item.name}</Text>
                    <View style={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 1,
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}>
                      
                      <Text style={{
                        fontFamily: Platform.select({
                          ios: "Barlow Regular",
                          android: "Barlow_400Regular"
                        }),
                        fontSize: 14,
                        marginRight: 2
                      }}>{item.price?.toFixed(2) ?? "-"}</Text>
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
                  </View>
                  
                    <View style={{
                      alignSelf: "flex-start",
                      marginHorizontal: 5,
                      paddingHorizontal: 15,
                      marginBottom: 10,
                      backgroundColor: "#2C2C2C",
                      borderRadius: 20,
                      padding: 2,
                    }}>
                      <Text style={{
                        fontFamily: Platform.select({
                          ios: "Poppins Regular",
                          android: "Poppins_400Regular"
                        }), 
                        color: "white",
                        fontSize: 12
                      }}>{item.location ?? "none"}</Text>
                    </View>
                </View>
              </Pressable>
            )
        }}/>

        {isSignedIn ? <>
        <Pressable onPress={() => {
            router.navigate("/product/create")
        }}>
            <View style={{
              position: "absolute",
              right: 20,
              bottom: barHeight + 15,
              width: 50,
              height: 50,
              borderRadius: 20,
              backgroundColor: "rgba(230, 227, 56, 0.95)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "4px 4px 100px 5px rgba(0,0,0,1)",
              borderColor: "black",
              borderWidth: 1
            }}>
              <FontAwesomeIcon icon={faPlus} size={18} />
            </View>
          </Pressable>
        </>: null}
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const css: { [key: string]: StyleProp<ViewStyle> } = {
  container: {
    width: 180,
    height: 225,
    backgroundColor: "#FFFFFF",
    borderColor: "#D9D0D0",
    borderWidth: 0.5,
    display: "flex",
    flexDirection: "column",
    padding: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    borderRadius: 6,
    boxShadow: "4px 4px 30px 1px rgba(0,0,0, 0.1)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
};
