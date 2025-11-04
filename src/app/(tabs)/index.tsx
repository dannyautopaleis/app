import { JSX } from "react";
import {
  FlatList,
  Platform,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { ImgPlaceholder } from "@/@types/svg_reexports";
import { useRouter } from "expo-router";

export default function HomeScreen(): JSX.Element {
  const route = useRoute();
  const params = route.params as { email: string };
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0E0E0"
      }}
    >

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
