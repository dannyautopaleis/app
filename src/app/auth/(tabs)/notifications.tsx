import React, { JSX, useCallback, useContext, useMemo, useState } from "react";
import { FlatList, Image, Platform, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useFocusEffect } from "expo-router";
import { RestClientInstance } from "../../_layout";
import { DynamicHeaderProvider } from "@/src/contexts/DynamicHeaderProvider";
import { CreateToolsResponse, Tools } from "@/src/lib/ApiResponses";

type HistoryItem = Tools;

export default function TestScreen(): JSX.Element {
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState<CreateToolsResponse>([]);
  const [triggered, triggerRender] = useState(false);
  const dynHeader = useContext(DynamicHeaderProvider);

  const balanceText = useMemo(() => "Saldo: 30 tokens", []);

  useMemo(() => {
    RestClientInstance.getTools(
      dynHeader.categoryHandler.selectedCategory
        ? [dynHeader.categoryHandler.selectedCategory]
        : undefined
    )
      .then((tools) => {
        let ser = tools.data as CreateToolsResponse;
        setItems(ser);
      })
      .catch((err) => {
        console.log("hierooo", err);
      });
  }, [triggered]);

  useFocusEffect(
    useCallback(() => {
      triggerRender((v) => !v);
      return () => {};
    }, [])
  );

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const imageUri = item.images_uris?.[0];

    return (
      <View style={styles.row}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.thumbnail} />
        )}

        <View style={styles.rowContent}>
          {!!item.name && <Text style={styles.title}>{item.name}</Text>}

          <Text style={styles.price}>
            € {item.price?.toString?.() ?? ""} token
          </Text>

          {item.location && <Text style={styles.meta}>{item.location}</Text>}

        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* Yellow header (goes into safe area) */}
      <SafeAreaView edges={["top"]} style={styles.headerSafe}>
        <View style={styles.headerInner}>
          {/* <TouchableOpacity activeOpacity={0.8} style={styles.backBtn}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Leenhistorie</Text>
        </View>
      </SafeAreaView>

      {/* Balance bar */}
      <View style={styles.balanceBar}>
        <Text style={styles.balanceText}>{balanceText}</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...styles.listContent,
          paddingBottom: (styles.listContent.paddingBottom ?? 0) + 110 + insets.bottom,
        }}
      />

      {/* NOTE: no bottom sheet here. This screen is just history. */}
      <View style={{ height: Platform.OS === "ios" ? 0 : 0 }} />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  headerSafe: {
    backgroundColor: "#FFD23F",
  },
  headerInner: {
    height: 64,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // backBtn: {
  //   position: "absolute",
  //   left: 18,
  //   height: 44,
  //   width: 44,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // backArrow: {
  //   fontSize: 34,
  //   lineHeight: 34,
  //   color: "#1F1F1F",
  // },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1F1F1F",
  },

  balanceBar: {
    height: 46,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
  },
  separator: {
    height: 18,
  },

  row: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  thumbnail: {
    width: 74,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#111111",
  },
  thumbnailImage: {
    width: 74,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
  },
  rowContent: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1C1C",
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1C1C",
  },
  meta: {
    fontSize: 13,
    color: "#6B6B6B",
    marginTop: 2,
  },

  pill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillGreen: {
    backgroundColor: "#E9F9EE",
    borderColor: "#A8E6B8",
  },
  pillTextGreen: {
    color: "#4CAF50",
  },
  pillRed: {
    backgroundColor: "#FFE6E6",
    borderColor: "#FF8A8A",
  },
  pillTextRed: {
    color: "#E05252",
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },
} as const;