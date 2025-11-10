import { JSX, useContext } from "react";
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
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { DynamicHeaderProvider } from "@/src/contexts/DynamicHeaderProvider";
import { FlashList } from "@shopify/flash-list"; // we'll use flashlist upon production, its fully compatible with flatlist so we do not mind speeding the process
import { RestClientInstance } from "../../_layout";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

// this is used for testing
const staticItems = [
  {
    author: "Sanne Vermeer",
    title: "Accuboormachine",
    description: "Draadloze boor / schroefmachine met 2 accu’s en lader, ideaal voor montage en renovatie.",
    images: [
      "https://www.fastarshop.nl/media/catalog/product/cache/73db33e49707961bad315f208f5eb460/d/d/ddf482rtj_a1c0.jpg",
      "https://www.toolmax.nl/resize/602102530.jpeg/0/1100/True/metabo-bs-18-lt-compact-accuboormachine-18v-20ah-li-ion-602102530.jpeg"
    ],
    price: "7.50",
    place: "Utrecht-Oost",
    tags: ["Elektrisch gereedschap", "Boren", "Doe-het-zelf"]
  },
  {
    author: "Thomas Koster",
    title: "Gereedschapskist",
    description: "Robuuste koffer gevuld met tangen, schroevendraaiers, steeksleutels en bits — klaar voor kluswerk.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRH9C80ufRdnQD7XENF8wLcIfxj3gvTbn3jQ&s",
      "https://www.datona.nl/media/catalog/product/cache/b30bbc9f7a09ef96a1b867e7fab67384/5/1/51160-gereedschapskist-4-lades-dsc8610_ox76urgn6zobbkno.png"
    ],
    price: "4.00",
    place: "Amersfoort-Centrum",
    tags: ["Handgereedschap", "Koffer", "Reparatie"]
  },
  {
    author: "Lisa van der Linden",
    title: "Decoupeerzaag",
    description: "Precieze zaagmachine voor hout, kunststof en lichte metalen, inclusief zaagbladen.",
    images: [
      "https://www.manutan.nl/img/S/GRP/ST/AIG5503192.jpg",
      "https://cdn.klium.nl/images/adee4b4e-24a5-45e4-a3b6-c0e44c33f112/makita_djv182t1j_16/makita_djv182t1j_16_532x532.jpg"
    ],
    price: "6.25",
    place: "Rotterdam-Kralingen",
    tags: ["Zagen", "Elektrisch gereedschap", "Houtbewerking"]
  },
  {
    author: "Joost Meijer",
    title: "Slagboor",
    description: "Krachtige boormachine met slagfunctie, geschikt voor beton en steen – professioneel resultaat.",
    images: [
      "https://bmbshop.nl/app/uploads/2023/06/PDE13RX-1.jpg",
      "https://bmbshop.nl/app/uploads/2023/05/PD2E202220R.jpg"
    ],
    price: "8.00",
    place: "Leiden-Noord",
    tags: ["Elektrisch gereedschap", "Boren", "Beton"]
  },
  {
    author: "Nina Bakker",
    title: "Aluminium ",
    description: "Lichtgewicht aluminium ladder tot ongeveer 5 meter, perfect voor schilder- of onderhoudswerkzaamheden.",
    images: [
      "https://aldorr.nl/wp-content/uploads/2021/12/Hoofdfoto-5.png",
      "https://images.kkeu.de/is/image/BEG/Ladders/Multifunctionele_reformladders_telescoopladders/Aluminium_vouwladder_pdplarge-mrd--000059268983_PRD_org_all.jpg"
    ],
    price: "5.75",
    place: "Haarlem-Zuid",
    tags: ["Ladders", "Onderhoud", "Werkhoogte"]
  },
  {
    author: "Ruben Willems",
    title: "Compressorset",
    description: "Kleine maar krachtige compressor voor spijkerpistool, banden of blaaswerk — handig voor werkplaats of thuis.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVxhXNcVrYjfhSmEcJNgespRp9NuiEgg53g&s",
      "https://assets.hbm-machines.com/f/255106/9a5ad6df1e/6a4908b7ce427ee97b25df7970818641c75dde79_1129981027_2.jpg/m/3840x0"
    ],
    price: "9.20",
    place: "Eindhoven-Strijp",
    tags: ["Pneumatisch", "Werkplaats", "Gereedschap"]
  },
  {
    author: "Eva Jansen",
    title: "Multischuurmachine",
    description: "Oscillerende schuurmachine met set schuurpapier in diverse korrelgroottes — ideaal voor meubels & kozijnen.",
    images: [
      "https://media.s-bol.com/B1GxJPGOGD6J/g530J6Y/550x486.jpg",
      "https://m.media-amazon.com/images/I/510CbMIGpOL._AC_UF894,1000_QL80_.jpg"
    ],
    price: "6.00",
    place: "Den Haag-Benoordenhout",
    tags: ["Schuren", "Houtbewerking", "Elektrisch gereedschap"]
  },
  {
    author: "Martijn de Jong",
    title: "Cirkelzaag",
    description: "Professionele cirkelzaag met lasergids voor nauwkeurige zaagsneden — ideaal bij bouw of timmerwerk.",
    images: [
      "https://www.cirkelzaagkopen.nl/wp-content/uploads/2014/07/Einhell-mini.jpg",
      "https://m.media-amazon.com/images/I/71Iz+K784ZL.jpg"
    ],
    price: "7.80",
    place: "Arnhem-Zuid",
    tags: ["Zagen", "Precisie", "Bouw"]
  },
  {
    author: "Lotte Visser",
    title: "Accu",
    description: "Compacte slagschroevendraaier met hoge draaimoment — perfect voor montage- en kluswerk.",
    images: [
      "https://media.s-bol.com/733DRWqRAqWO/550x323.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfN4DpX5JDye0N7IYiubV8SNynvjHqrdfIg&s"
    ],
    price: "7.10",
    place: "Groningen-Centrum",
    tags: ["Elektrisch gereedschap", "Schroeven", "Montage"]
  },
];

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
          contentContainerStyle={{
            paddingHorizontal: 10
          }} 
          centerContent={true}
          data={staticItems} 
          renderItem={(ctx) => {
            const { item } = ctx
            return (
              <Pressable onPress={(_) => {
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
                  <Image style={{padding: 0, width: "100%", height: 120}} source={item.images[0]} contentFit="fill" contentPosition={"center"}/>
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
                      }}>{item.place}</Text>
                    </View>
                </View>
              </Pressable>
            )
        }}/>
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
