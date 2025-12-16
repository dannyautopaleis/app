import React, { JSX, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RestClientInstance } from "../../_layout";
import { DynamicHeaderProvider } from "@/src/contexts/DynamicHeaderProvider";
import { CreateToolsResponse, Tools } from "@/src/lib/ApiResponses";
import { useFocusEffect } from "expo-router";
import { Image } from "react-native";

import { log } from "console";


// type AdStatus = "Beschikbaar" | "Gereserveerd" | "Uitgeleend";
type AdItem = {
  _id: string;
  name: string;
  desc?: string;
  price: number;
  categories?: string[];
  images_uris?: string[];
  image_ext?: string;
  location?: string;
  author?: string;
  author_info?: any;
  status?: "Beschikbaar" | "Gereserveerd" | "Uitgeleend";
};

export default function InventoryScreen(): JSX.Element {
  const [selectedAd, setSelectedAd] = useState<AdItem | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [items, setItems] = useState<CreateToolsResponse>([])
  const [triggered, triggerRender] = useState(false)
    const dynHeader = useContext(DynamicHeaderProvider)

  useMemo(() => {
    RestClientInstance.getTools(dynHeader.categoryHandler.selectedCategory ? [dynHeader.categoryHandler.selectedCategory] : undefined)
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

  // simpele bottom sheet animatie
  const sheetTranslateY = useRef(new Animated.Value(320)).current;

  const openSheet = (ad: AdItem) => {
    setSelectedAd(ad);
    setSheetVisible(true);
  };

  const closeSheet = () => {
    // eerst animatie, daarna pas modal sluiten
    Animated.timing(sheetTranslateY, {
      toValue: 320,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setSheetVisible(false);
      setSelectedAd(null);
    });
  };

  useEffect(() => {
    if (!sheetVisible) return;

    // reset startpositie
    sheetTranslateY.setValue(320);

    Animated.timing(sheetTranslateY, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [sheetVisible, sheetTranslateY]);

  const renderItem = ({ item }: { item: Tools }) => {
    // const isAvailable = item.status === "Beschikbaar";

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openSheet(item as any)}
        style={styles.card}
      >
        {(() => {
          const imageUri = item.images_uris?.[0];

          if (imageUri) {
            return (
              <Image
                source={{ uri: imageUri }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            );
          }

          return <View style={styles.thumbnail} />;
        })()}

        <View style={styles.cardContent}>
          {!!item.name && <Text style={styles.title}>{item.name}</Text>}
          <Text style={styles.price}>€ {item.price.toString()} token</Text>

          {item.location && (
            <Text style={styles.meta}>{item.location}</Text>
          )}

          {/* {item.status && (
            <View
              style={[
                styles.statusPill,
                isAvailable
                  ? styles.statusPillAvailable
                  : styles.statusPillOther,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  isAvailable
                    ? styles.statusTextAvailable
                    : styles.statusTextOther,
                ]}
              >
                {item.status}
              </Text>
            </View>
          )} */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <SafeAreaView edges={["top"]} style={styles.headerSafe}>
        <View style={styles.headerInner}>
          <Text style={styles.headerTitle}>Mijn advertenties</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>

        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        visible={sheetVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSheet}
      >
        <Pressable style={styles.backdrop} onPress={closeSheet} />

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY: sheetTranslateY }],
            },
          ]}
        >
          <View style={styles.sheetHandle} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sheetRow}
            onPress={() => {
              // TODO: nav naar edit screen
              closeSheet();
            }}
          >
            <Text style={styles.sheetRowText}>Advertentie bewerken</Text>
          </TouchableOpacity>

          <View style={styles.sheetDivider} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sheetRow}
            onPress={() => {
              closeSheet();
            }}
          >
            <Text style={styles.sheetRowText}>Advertentie verbergen</Text>
          </TouchableOpacity>

          <View style={styles.sheetDivider} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sheetRow}
            onPress={() => {
              // TODO: delete confirm
              closeSheet();
            }}
          >
            <Text style={[styles.sheetRowText, styles.dangerText]}>
              Advertentie verwijderen
            </Text>
          </TouchableOpacity>

          {/* beetje ruimte onderin */}
          <View style={{ height: Platform.OS === "ios" ? 10 : 16 }} />
        </Animated.View>
      </Modal>
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
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1F1F1F",
  },
  content: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 30,
  },
  separator: {
    height: 18,
  },
  card: {
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
  cardContent: {
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
  statusPill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusPillAvailable: {
    backgroundColor: "#E9F9EE",
    borderColor: "#A8E6B8",
  },
  statusPillOther: {
    backgroundColor: "#F2F2F2",
    borderColor: "#D5D5D5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statusTextAvailable: {
    color: "#4CAF50",
  },
  statusTextOther: {
    color: "#666666",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 14,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 54,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D9D9D9",
    marginBottom: 10,
  },
  sheetRow: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  sheetRowText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1C",
  },
  sheetDivider: {
    height: 1,
    backgroundColor: "#E9E9E9",
  },
  dangerText: {
    color: "#E05252",
    fontWeight: "700",
  },
} as const;