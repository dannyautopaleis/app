import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { Portal } from "@gorhom/portal"
import { useRouter } from "expo-router"
import { useContext } from "react"
import { Platform, Pressable, Text } from "react-native"
import { SheetControlProvider } from "../contexts/SheetControlsProvider"

export default function CustomBottomSheet({title, desc, redir, index}: {title: string, desc: string, redir: string, index: number}) {
    const router = useRouter()
    const controls = useContext(SheetControlProvider)
    
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
                    ios: "Poppins SemiBold",
                    android: "Poppins_600SemiBold"
                    }),
                    fontSize: 18,
                    color: "white"
                }}>{title}</Text>
                    <Text style={{
                    fontFamily: Platform.select({
                        ios: "Poppins Regular",
                        android: "Poppins_400Regular"
                    }),
                    fontSize: 13,
                    color: "white",
                    marginTop: 2
                    }}>
                        {desc}
                    </Text>

                    <Pressable 
                    onPress={(_) => {
                        router.navigate(redir as any)
                        controls?.current?.forceClose()
                    }}
                    style={{
                        backgroundColor: "#FFEE49",
                        width: 90,
                        height: 35,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 6,
                        alignSelf: "flex-start",
                        marginTop: 2
                    }}>
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Poppins Bold",
                            android: "Poppins_700Bold"
                        }),
                        fontSize: 14,
                        color: "black"
                        }}>Login</Text>
                    </Pressable>
                </BottomSheetView>
            </BottomSheet>
        </Portal>
    )
}