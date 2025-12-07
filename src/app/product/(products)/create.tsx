import { faArrowRight, faCamera, faEuroSign, faNoteSticky, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, Platform, Pressable, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-toast-message";
import { Ref, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStorageKeys } from "@/src/lib/StoreWrapper";
import { Cats } from "./cats";
import { RestClientInstance } from "../../_layout";
import * as Haptics from "expo-haptics"

export default function() {
    const router = useRouter()
    const [images, setImages] = useState<Array<{encoded: string, ext: string}>>([])
    const [cats, setCats] = useState<Array<Cats>>([])

    useEffect(() => {
        AsyncStorage.removeItem(AppStorageKeys.CURRENT_CATEGORIES)
    }, [])
    const imagePicker = async (op: "galleryPicker" | "cameraPicker") => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permissionResult.granted) {
            return Toast.show({
                type: "error",
                text1: "Geen permissie",
                text2: "Galerij toegang is benodigd voor deze actie"
            })
        }

        let result: Promise<ImagePicker.ImagePickerResult>
        if(op === "galleryPicker") {
            result = ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                quality: 1,
                base64: true
            });
        } else {
            result = ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                quality: 1,
                base64: true
            });
        }

        let res = await result
        if(!res.canceled) {
            for (let i = 0; i < res.assets.length; i++) {
                let asset = res.assets[i];
                asset.mimeType
                if(typeof asset.base64 !== "undefined" && asset.base64 !== null && typeof asset.mimeType !== "undefined" )
                    setImages((v) => [...v, {encoded: asset.base64 as string, ext: asset.mimeType as string}])
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            // focused
            AsyncStorage.getItem(AppStorageKeys.CURRENT_CATEGORIES).then((v) => {
                if(v === null)
                    return

                let d: Array<Cats> = JSON.parse(v)
                setCats((v) => d)
            }).catch(() => {})

            return () => {
                // unfocused | do nothing
                console.log('Screen unfocused');
            };
        }, [])
    );

    const [inputs, setInputs] = useState<{
        title?: string,
        desc?: string,
        price?: string
        location?: string
    }>()

    console.log("cats", cats, inputs)
    return <>
    
        <SafeAreaView edges={["left", "right", "bottom"]} style={{flex: 1, backgroundColor: "white"}}>      
            <ScrollView style={{flex: 1}} contentContainerStyle={{ alignItems: "center", display: "flex" }}>
                <Pressable style={{backgroundColor: "white"}} onPress={() => imagePicker("galleryPicker")}>
                    <View style={{
                        minHeight: 50,
                        minWidth: 250,
                        borderColor: "#494948",
                        borderWidth: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 16,
                        flexDirection: "row",
                        marginTop: 20
                    }}>
                        <FontAwesomeIcon style={{marginRight: 8, marginTop: 2}} icon={faPlus} size={18} color="#494948" />
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Bold",
                                android: "Barlow_700Bold"
                            }),
                            fontSize: 16,
                            color: "#494948"
                        }}>Upload foto's</Text>
                    </View>
                </Pressable>

                <Pressable onPress={() => imagePicker("cameraPicker")}>
                    <View style={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <FontAwesomeIcon style={{marginRight: 8, marginTop: 2}} icon={faCamera} size={18} color="#494948" />
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow SemiBold",
                                android: "Barlow_600SemiBold"
                            }),
                            fontSize: 16,
                            color: "#494948"
                        }}>Of maak een foto</Text>
                    </View>
                </Pressable>

                <View style={{width: "80%"}}>
                    <FlatList 
                        style={{
                            marginTop: 15
                        }}  
                        ItemSeparatorComponent={() => {
                            return <View style={{marginHorizontal: 5}}></View>
                        }} data={images} horizontal={true} renderItem={({index, item}) => {
                            let biggerInSize = index % 2
                            return (
                                <View style={{display: "flex", justifyContent: "center", alignItems: "center", minWidth: 100, height: 80, backgroundColor: "red"}}>
                                    <Image 
                                        style={{ width: "100%", height: biggerInSize ? "125%": "100%" }}
                                        contentFit="cover" contentPosition={"center"}
                                        source={{uri: `data:${item.ext};base64,${item.encoded}`}} />
                                </View>
                            )
                        }} 
                    />
                    {images.length > 0 ? 
                        <>
                            <Text style={{
                                fontFamily: Platform.select({
                                    ios: "Barlow Medium",
                                    android: "Barlow_500Medium"
                                }),
                                fontSize: 13,
                                color: "#494948"
                            }}>Aantal foto's: {images.length}</Text>
                        </> : null
                    }
                </View>
                
                <View style={{
                    backgroundColor: "#FFEE49",
                    width: "80%",
                    minHeight: 60,
                    maxHeight: 80,
                    padding: 5,
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 5
                }}>
                    <FontAwesomeIcon size={24} color="#494948" icon={faNoteSticky} style={{marginRight: 5}} />
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow SemiBold",
                            android: "Barlow_600SemiBold"
                        }),
                        fontSize: 12,
                        color: "#494948",
                        maxWidth: "90%"
                    }}>Foto's van het juiste perspectief en kwaliteit maken het duidelijker voor potentiele leners</Text>
                </View>

                <View style={{
                    marginTop: 25,
                    height: 25,
                    width: "100%",
                    backgroundColor: "#f1efefff"
                }}></View>

                <View
                    style={{
                        width: "100%",
                        alignSelf: "flex-start",
                        marginLeft: 40,
                        paddingVertical: 20
                    }}
                >
                    {/* input */}
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 18,
                        color: "#494948",
                        maxWidth: "80%",
                    }}>Titel</Text>
                    <TextInput 
                        onChangeText={(text) => setInputs((v) => {
                            return {...v, title: text}
                        })} 
                        placeholderTextColor={"#ADADAD"} 
                        placeholder="Naam van je product of gereedschap" 
                        style={{
                            borderColor: "black",
                            color: "#494948",
                            paddingVertical: 10
                        }} 
                    />
                    <View style={{width: "80%", minHeight: 1, height: 1, backgroundColor: "#E0E0E0", marginBottom: 15}}></View>
                    {/* end */}

                     {/* input */}
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 18,
                        color: "#494948",
                        maxWidth: "80%"
                    }}>Beschrijving</Text>
                    <TextInput 
                        onChangeText={(text) => setInputs((v) => {
                            return {...v, desc: text}
                        })} 
                        textAlign="left" 
                        textAlignVertical="top" 
                        placeholderTextColor={"#ADADAD"} 
                        placeholder="Typ hier de beschrijving van je product, je kunt schrijven over meerdere lijnen voor gemak"
                        multiline
                        style={{
                            color: "#494948",
                            height: 80,
                            maxWidth: "80%",
                            paddingVertical: 10
                        }} 
                    />
                    <View style={{width: "80%", minHeight: 1, height: 1, backgroundColor: "#E0E0E0"}}></View>
                    {/* end */}
                </View>
                <View style={{
                    height: 25,
                    width: "100%",
                    backgroundColor: "#f1efefff",
                    marginBottom: 10
                }}></View>

                <Pressable onPress={() => {
                    router.navigate("/product/cats")
                }}>
                    <View style={{
                        alignSelf: "flex-start",
                        marginLeft: 40,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Bold",
                                android: "Barlow_700Bold"
                            }),
                            fontSize: 18,
                            color: "#494948",
                        }}>Categorieen</Text>
                        <View style={{
                            display: "flex",
                            flexGrow: 1,
                            borderColor: "red",
                            alignItems: "flex-end",
                            marginRight: 25
                        }}>
                            <FontAwesomeIcon  icon={faArrowRight} size={20} color="#494948" />
                        </View>
                    </View>
                </Pressable>

                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 70,
                    width: "100%",
                    marginTop: 20
                }}>  
                    {/* input */}
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        color: "#494948",
                        maxWidth: "80%"
                    }}>Prijs</Text>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <FontAwesomeIcon icon={faEuroSign} size={16}  color="#494948" />
                        <TextInput 
                            onChangeText={(text) => setInputs((v) => {
                                return {...v, price: Number(text).toFixed(2)}
                            })} 
                            textAlign="left" 
                            textAlignVertical="top" 
                            placeholderTextColor={"#ADADAD"} 
                            placeholder="Vul hier de prijs in "
                            style={{
                                color: "#494948",
                                maxWidth: "80%",
                                paddingVertical: 10
                            }} 
                            inputMode="decimal"
                        />
                    </View>
                    <View style={{width: "80%", minHeight: 1, height: 1, backgroundColor: "#E0E0E0"}}></View>
                    {/* end */}

                     {/* input */}
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        color: "#494948",
                        maxWidth: "80%",
                        marginTop: 20
                    }}>Locatie</Text>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <TextInput 
                            onChangeText={(text) => setInputs((v) => {
                                return {...v, location: text}
                            })} 
                            textAlign="left" 
                            textAlignVertical="top" 
                            placeholderTextColor={"#ADADAD"} 
                            placeholder="Vul je locatie in"
                            style={{
                                color: "#494948",
                                maxWidth: "80%",
                                paddingVertical: 10
                            }} 
                        />
                    </View>
                    <View style={{width: "80%", minHeight: 1, height: 1, backgroundColor: "#E0E0E0"}}></View>
                    {/* end */}
                </View>

                <Pressable
                    onPress={(_) => {
                        if(typeof inputs?.title === "undefined" || typeof inputs?.desc === "undefined" || typeof inputs?.price === "undefined"
                            || typeof inputs?.location === "undefined"
                        ) {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                            return Toast.show({
                                type: "error",
                                text1: "Vul alle velden in en upload minimaal 1 foto"
                            })
                        }

                        if(inputs.price === "NaN") {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                            return Toast.show({
                                type: "error",
                                text1: "Vul een geldige prijs in, gebruik een punt ipv comma's"
                            })
                        }

                        if(!(images.length >= 1)) {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                             return Toast.show({
                                type: "error",
                                text1: "Upload minimaal 1 foto"
                            })
                        }

                        if(!(cats.length >= 1)) {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                             return Toast.show({
                                type: "error",
                                text1: "Selecteer minstens een categorie"
                            })
                        }
                        
                        RestClientInstance.createTool({
                            name: inputs.title,
                            desc: inputs.desc,
                            categories: cats.map((v) => {
                                return v.tag;
                            }),
                            image_ext: images.map((v) => v.ext),
                            location: inputs.location,
                            price: Number(inputs.price),
                            images: images.map((v) => v.encoded)
                        }).then((ctx) => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                            Toast.show({
                                type: "success",
                                text1: "Geupload"
                            })
                        }).catch((err) => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                            console.log("uploading product went wrong", err)
                             Toast.show({
                                type: "error",
                                text1: "Uploaden ging fout",
                                text2: err.data
                            })
                        })
                    }}
                >
                    <View style={{
                        marginTop: 40,
                        alignSelf: "center",
                        backgroundColor: "#FFEE49",
                        paddingHorizontal: 80,
                        paddingVertical: 10,
                        borderRadius: 15,
                        borderColor: "rgba(0,0,0,0.25)",
                        borderWidth: 1
                    }}>
                        <Text style={{
                            fontFamily: Platform.select({
                                ios: "Barlow Bold",
                                android: "Barlow_700Bold"
                            }),
                            fontSize: 16,
                            color: "#494948",
                            maxWidth: "80%",
                            textAlign: "center"
                        }}>Upload</Text>
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    </>
}