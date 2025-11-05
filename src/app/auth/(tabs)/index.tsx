import { JSX, useContext } from "react";
import {
  Animated,
  Easing,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { DynamicHeaderProvider } from "@/src/contexts/DynamicHeaderProvider";

// this is used for testing
const staticItems = [
  ...([1,2,3,4,5,6,7,8,9,10].map((index) => {
    return {
      title: `test ${index}`,
      description: "yolo",
      image: require("@/assets/img/placeholder.png"),
      price: Number((index * 20.2)%1.2).toFixed(2)
    }
  }))
]

export default function HomeScreen(): JSX.Element {
  const header = useContext(DynamicHeaderProvider)
  const route = useRoute();
  const params = route.params as unknown;
  const router = useRouter();

  return (
    <SafeAreaView edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
      }}
    >
      <View style={{marginTop: 5}}/>
      <FlatList 
      bounces={false}
      showsVerticalScrollIndicator={false}
      directionalLockEnabled={true}
      onScroll={header.scrollBar}
      numColumns={2}
      snapToAlignment="start"
      snapToInterval={30}
      contentContainerStyle={{
        width: "100%",
        // borderColor: "red",
        // borderWidth: 1,
      }} data={staticItems} renderItem={({item}) => {
        return (
          <View style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            width: 180,
            height: 160,
            margin: 7,
            borderRadius: 2,
            boxShadow: "4px 4px 100px 1px rgba(0, 0, 0, 0.05)"
          }}>
            <Image style={{padding: 0, width: "100%", height: "75%", backgroundColor: "red"}} source={item.image} />
            <View style={{backgroundColor: "#282827", width: "100%", height: 1.5}}/>

            <View style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-start",
              padding: 5,
              paddingHorizontal: 8,
              flex: 1
            }}>
              <Text style={{
                fontFamily: Platform.select({
                  ios: "Barlow Bold",
                  android: "Barlow_700Bold"
                }), 
                fontWeight: 700
              }}>{item.title}</Text>
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
                }}>{item.price}</Text>
                <View style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "yellow",
                  width: 25,
                  height: 25,
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
          </View>
        )
      }}/>
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
