import { faArrowRight, faBoltLightning, faCalculator, faCircleNodes, faHouse, faRectangleXmark, faRuler, faToolbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { View, Text, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  {usePreventRemove} from "@react-navigation/native"
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStorageKeys } from "@/src/lib/StoreWrapper";


export type Cats = {
    index: number;
    selected: boolean;
    tag: string;
}
export default function(){
    const navigation = useNavigation();
    const [tools, setTools] = useState([
        {index: 1, selected: false, tag: "Handgereedschap"},
        {index: 2, selected: false, tag: "Machinaal gereedschap"},
        {index: 3, selected: false, tag: "Bevestiging en montage"},
        {index: 4, selected: false, tag: "Meet gereedschap"},
        {index: 5, selected: false, tag: "Tuin gereedschap"},
    ])

    useEffect(() => {
        AsyncStorage.getItem(AppStorageKeys.CURRENT_CATEGORIES)
            .then((item) => {
                if(item === null)
                    return

                let d: Array<Cats> = JSON.parse(item)
                let selected = d.filter((v) => v.selected)

                setTools((old) => {
                    let newArr: Array<Cats> = [...old]
                    for (let i = 0; i < selected.length; i++) {
                        let el = selected[i];
                        newArr[el.index -1].selected = el.selected
                    }

                    return newArr
                })
            })
    }, [])
    usePreventRemove(true, (ev) => {
        let saveSelected = tools.filter((v) => v.selected)
        AsyncStorage.setItem(AppStorageKeys.CURRENT_CATEGORIES, JSON.stringify(saveSelected)).then(() => {
            navigation.dispatch(ev.data.action)
        }).catch(() => navigation.dispatch(ev.data.action)) 
    })

    return <SafeAreaView edges={["left", "right"]} style={{flex: 1, display: "flex", backgroundColor: "white"}}>
        <View style={{
            display: "flex",
        }}>
            {/* cat */}
            <Pressable onPress={() => {
                let index = 1 -1
                setTools((prev) => {
                    const next = [...prev];
                    next[index] = { ...next[index], selected: !next[index].selected };
                    return next;
                })
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: tools[0].selected ? "#e5e749ff": "white"
                }}>
                    <FontAwesomeIcon style={{marginRight: 15}} size={24} color="#3a3a3aff" icon={faToolbox} />
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        color: "#494948",
                        fontWeight: 500
                    }}>Handgereedschap</Text>

                    <View style={{
                        display: "flex",
                        flexGrow: 1,
                        borderColor: "red",
                        alignItems: "flex-end",
                    }}>
                        <FontAwesomeIcon size={20} color="#3a3a3aff" icon={faArrowRight} />
                    </View>
                </View>

                {/* sep */}
                <View style={{
                    height: 5,
                    width: "100%",
                    backgroundColor: "#f1efefff",
                }}></View>
                {/* end */}
            </Pressable>

            {/* end */}

            {/* cat */}
            <Pressable onPress={() => {
                let index = 2 -1
                 setTools((prev) => {
                    const next = [...prev];
                    next[index] = { ...next[index], selected: !next[index].selected };
                    return next;
                })
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: tools[1].selected ? "#e5e749ff": "white"
                }}>
                    <FontAwesomeIcon style={{marginRight: 15}} size={24} color="#3a3a3aff" icon={faBoltLightning} />
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        color: "#494948",
                        fontWeight: 500
                        
                    }}>Machinaal gereedschap</Text>

                    <View style={{
                        display: "flex",
                        flexGrow: 1,
                        borderColor: "red",
                        alignItems: "flex-end",
                    }}>
                        <FontAwesomeIcon size={20} color="#3a3a3aff" icon={faArrowRight} />
                    </View>
                </View>

                {/* sep */}
                <View style={{
                    height: 5,
                    width: "100%",
                    backgroundColor: "#f1efefff",
                }}></View>
                {/* end */}
            </Pressable>
            {/* end */}

            {/* cat */}
            <Pressable onPress={() => {
                let index = 3 -1
                 setTools((prev) => {
                    const next = [...prev];
                    next[index] = { ...next[index], selected: !next[index].selected };
                    return next;
                })
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: tools[2].selected ? "#e5e749ff": "white"
                }}>
                    <FontAwesomeIcon style={{marginRight: 15}} size={24} color="#3a3a3aff" icon={faCircleNodes} />
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        color: "#494948",
                        fontWeight: 500
                    }}>Bevestiging en montage</Text>

                    <View style={{
                        display: "flex",
                        flexGrow: 1,
                        borderColor: "red",
                        alignItems: "flex-end",
                    }}>
                        <FontAwesomeIcon size={20} color="#3a3a3aff" icon={faArrowRight} />
                    </View>
                </View>

                {/* sep */}
                <View style={{
                    height: 5,
                    width: "100%",
                    backgroundColor: "#f1efefff",
                }}></View>
                {/* end */}
            </Pressable>
            {/* end */}

            {/* cat */}
            <Pressable onPress={() => {
                let index = 4 -1
                 setTools((prev) => {
                    const next = [...prev];
                    next[index] = { ...next[index], selected: !next[index].selected };
                    return next;
                })
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: tools[3].selected ? "#e5e749ff": "white"
                }}>
                    <FontAwesomeIcon style={{marginRight: 15}} size={24} color="#3a3a3aff" icon={faRuler} />
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        color: "#494948",
                        fontWeight: 500
                    }}>Meet gereedschap</Text>

                    <View style={{
                        display: "flex",
                        flexGrow: 1,
                        borderColor: "red",
                        alignItems: "flex-end",
                    }}>
                        <FontAwesomeIcon size={20} color="#3a3a3aff" icon={faArrowRight} />
                    </View>
                </View>

                {/* sep */}
                <View style={{
                    height: 5,
                    width: "100%",
                    backgroundColor: "#f1efefff",
                }}></View>
                {/* end */}
            </Pressable>
            {/* end */}

            {/* cat */}
            <Pressable onPress={() => {
                let index = 5 -1
                 setTools((prev) => {
                    const next = [...prev];
                    next[index] = { ...next[index], selected: !next[index].selected };
                    return next;
                })
            }}> 
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: tools[4].selected ? "#e5e749ff": "white"
                }}>
                    <FontAwesomeIcon style={{marginRight: 15}} size={24} color="#3a3a3aff" icon={faHouse} />
                    <Text style={{
                        fontFamily: Platform.select({
                            ios: "Barlow Bold",
                            android: "Barlow_700Bold"
                        }),
                        fontSize: 16,
                        color: "#494948",
                        fontWeight: 500
                    }}>Tuin gereedschap</Text>

                    <View style={{
                        display: "flex",
                        flexGrow: 1,
                        borderColor: "red",
                        alignItems: "flex-end",
                    }}>
                        <FontAwesomeIcon size={20} color="#3a3a3aff" icon={faArrowRight} />
                    </View>
                </View>

                {/* sep */}
                <View style={{
                    height: 5,
                    width: "100%",
                    backgroundColor: "#f1efefff",
                }}></View>
                {/* end */}
            </Pressable>
            {/* end */}
            
        </View>
    </SafeAreaView>
}