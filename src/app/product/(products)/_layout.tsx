import { Stack } from "expo-router";
import { Header } from "../../_layout";

export default function() {
    return <>
    
        <Stack initialRouteName="overview">
            <Stack.Screen name="overview" options={{
                header: Header
            }} /> 
            <Stack.Screen  name="create"  options={{
                headerStyle: {
                    backgroundColor: "#FFEE49"
                },
                headerTitle: "Wat wordt er uitgeleend?",
                headerTitleAlign: "center"
            }}/>

             <Stack.Screen  name="cats/index"  options={{
                headerStyle: {
                    backgroundColor: "#FFEE49"
                },
                headerTitle: "Categorieen",
                headerTitleAlign: "left"
            }}/>
        </Stack>
    </>
}