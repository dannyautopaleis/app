import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { Portal } from "@gorhom/portal"
import { useRouter } from "expo-router"
import { useContext } from "react"
import { Platform, Pressable, Text } from "react-native"
import { SheetControlProvider } from "../contexts/SheetControlsProvider"
import { AuthProvider } from "../contexts/AuthProvider"

export default function CustomBottomSheet({title, desc, redir, index}: {title: string, desc: string, redir: string, index: number}) {
    const controls = useContext(SheetControlProvider)
    const auth = useContext(AuthProvider)
    
    return (
        <Portal>
            {/* we use portal to display at the root ancestor tree without triggering a rerender, this enables the bottom sheet to display above order on tabbar */}
            <BottomSheet index={index} handleIndicatorStyle={{backgroundColor: "white", width: 80}} backgroundStyle={{backgroundColor: "#2E2E2E"}}  enablePanDownToClose ref={controls}>
                <BottomSheetView style={{
                    flex: 1,
                    height: 300,
                    display: "flex",
                    paddingHorizontal: 60,
                    backgroundColor: "#2E2E2E",
                    maxHeight: 180,
                    padding: 10
                }}>
                <Text style={{
                    fontFamily: Platform.select({
                    ios: "Roboto SemiBold",
                    android: "Roboto_600SemiBold"
                    }),
                    fontSize: 18,
                    color: "white"
                }}>{title}</Text>
                    <Text style={{
                    fontFamily: Platform.select({
                        ios: "Roboto Regular",
                        android: "Roboto_400Regular"
                    }),
                    fontSize: 16,
                    color: "rgba(214, 212, 212, 0.97)",
                    marginTop: 2
                    }}> 
                        {desc}
                    </Text>

                    <Pressable 
                        onPress={(_) => {
                            auth.signOut()
                            controls?.current?.forceClose()
                        }}
                        style={{
                            marginTop: 5
                        }}
                    >
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Roboto Bold",
                                android: "Roboto_700Bold"
                            }),
                            fontSize: 16,
                            color: "rgba(70, 139, 230, 0.9)",
                            textDecorationLine: "underline"
                        }}>Klik hier om in te loggen</Text>
                    </Pressable>
                </BottomSheetView>
            </BottomSheet>
        </Portal>
    )
}