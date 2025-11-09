// entire changes are subjected to the param-wise user credential passing
// but beforehand, the backend should'be done because otherwise there is no point in storing some token in the app's cache & provider
//
// required endpoints: login/register/token verify
import { JSX, useContext, useState } from "react";
import { Platform, ScrollView, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { object, string, setLocale } from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { RestClient, User, type RequestResponse} from "../lib/RestClient";
import { RestClientInstance } from "./_layout";
import { AuthProvider } from "../contexts/AuthProvider";
import { useMMKVListener } from "react-native-mmkv";
import { AppStorageKeys } from "../lib/StoreWrapper";

setLocale({
  mixed: {
    required: "Verplichte veld",
  },
  string: {
    email: () => `Geen geldige email`,
    min: ({ min }) => `Minimaal ${min} karakters nodig`,
    max: ({ max }) =>  `Maximaal ${max} karakters mogelijk`,
  }
});

// login schema definition
type loginDef = {
  email: string
  password: string
}

const LoginSchema = object<loginDef>().shape({
  email: string().email().required().min(4).max(30).email(),
  password: string().min(4).max(30),
});


export default function LoginScreen(): JSX.Element {
  const [triggered, triggerRender] = useState(0)
  const navigation = useRouter();
  const initialValues: loginDef = {email: "", password: ""}
  const auth = useContext(AuthProvider)

  useMMKVListener((key) => {
    if (key === AppStorageKeys.RETRIEVE_USER)
      triggerRender(1)
  })

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{flex: 1, alignItems: "center", paddingHorizontal: 20}}>
          <Image style={{
            width: 90,
            height: 90,
            marginTop: 80
          }} source={require("@/assets/img/logo.png")} />

          <Text style={{
            fontSize: 32,
            fontFamily: Platform.select({
              ios: "Barlow Regular",
              android: "Barlow_400Regular"
            }),
            marginTop: 5
          }}>WELKOM</Text>
          
          <View style={{
              display: "flex",
              width: "100%",
              height: "auto",
              minHeight: 300,
              marginTop: 25,
              padding: 10,
              paddingHorizontal: 20
            }}>
              <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={(user: loginDef) => {
                RestClientInstance.login(user.email, user.password)
                  .then((ctx) => {
                    let user = ctx.data
                    let m = {
                      jwt: user.token,
                      isGuest: false,
                      claims: user.claims
                    }

                    console.log(m)
                    if(auth.saveUser(m))
                      navigation.navigate({
                        pathname: "/auth/(tabs)",
                      })
                    else
                      return Toast.show({
                        text1: "Fout",
                        text2: "Er ging wat mis, probeer het later nog eens",
                        type: "error",
                        position: "bottom"
                      })
                  })
                  .catch((err) => {
                    if(err.data === "invalid email or password given") {
                        return Toast.show({
                          text1: "Fout",
                          text2: "Account bestaat niet of gegevens zijn onjuist",
                          type: "error",
                          position: "bottom"
                        })
                    }

                      console.error(err)
                      return Toast.show({
                        text1: "Fout",
                        text2: "Er ging wat mis, probeer het later nog eens",
                        type: "error",
                        position: "bottom"
                      })
                  })

                
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
                <>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: Platform.select({
                      ios: "Inter Regular",
                      android: "Inter_400Regular"
                    }),
                    marginBottom: 5
                  }}>Email</Text>
                  <TextInput
                    style={{
                      fontSize: 14,
                      fontFamily: Platform.select({
                        ios: "Inter Regular",
                        android: "Inter_400Regular"
                      }),
                      backgroundColor: "#FFFFFF",
                      borderColor: "#b4b0b0ff",
                      borderWidth: 0.5,
                      borderRadius: 10,
                      paddingHorizontal: 15,
                      color: "#7c7a7aff"
                    }}
                    placeholder="Uw email"
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="none"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    id="email-1"
                  />

                  {/* display err msg */}
                  <ErrorMessage name="email" render={(err) => <Text style={{fontSize: 13, color: "red", fontWeight: 400}}>{err}</Text>}/>

                  <Text style={{
                    marginTop: 15,
                    fontSize: 16,
                    fontFamily: Platform.select({
                      ios: "Inter Regular",
                      android: "Inter_400Regular"
                    }),
                    marginBottom: 5
                  }}>Wachtwoord</Text>
                  <TextInput
                    style={{
                      fontSize: 14,
                      fontFamily: Platform.select({
                        ios: "Inter Regular",
                        android: "Inter_400Regular"
                      }),
                      backgroundColor: "#FFFFFF",
                      borderColor: "#b4b0b0ff",
                      borderWidth: 0.5,
                      borderRadius: 10,
                      paddingHorizontal: 15,
                      color: "#7c7a7aff"
                    }}
                    placeholder="Wachtwoord"
                    secureTextEntry
                    textContentType="password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    id="pass-1"
                  />
                  {/* display err msg */}
                  <ErrorMessage name="password" render={(err) => <Text style={{fontSize: 13, color: "red", fontWeight: 400}}>{err}</Text>}/>

                  <TouchableOpacity
                      style={{
                        marginTop: 15 ,
                        backgroundColor: "#2e2e2cff",
                        padding: 10,
                        borderRadius: 10
                      }}
                      onPress={e => {
                        if(values.email === "" || values.password === "") {
                          return Toast.show({
                            text1: "Fout",
                            text2: "Vul eerst uw inloggegevens in",
                            type: "error",
                            position: "bottom"
                          })
                        }

                        handleSubmit(e as any)
                      }}>
                    <Text style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 15,
                      fontFamily: Platform.select({
                        ios: "Inter Regular",
                        android: "Inter_400Regular"
                      }),
                    }}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        marginTop: 8,
                        backgroundColor: "#FFEE49",
                        padding: 10,
                        borderRadius: 10
                      }}
                      onPress={e => {
                        navigation.navigate("/landing/reg")
                      }}>
                    <Text style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontFamily: Platform.select({
                        ios: "Inter Regular",
                        android: "Inter_400Regular"
                      }),
                    }}>Registreren</Text>
                  </TouchableOpacity>
                </>
              )}
              </Formik>
              <TouchableOpacity style={{
                display: "flex",
                width: "100%",
                paddingHorizontal: 0,
                marginTop: 15
              }} onPress={() => {
                Toast.show({
                  text1: "Info",
                  text2: "Deze feature is beschikbaar bij een nieuwe update",
                  type: "info",
                  position: "bottom"
                })
              }}>
                <Text style={{
                  fontFamily: Platform.select({
                    ios: "Inter Regular",
                    android: "Inter_400Regular"
                  }),
                  textDecorationLine: "underline"
                }}>Wachtwoord vergeten?</Text>
              </TouchableOpacity>
          </View>
          <View style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
            <TouchableOpacity style={{
              display: "flex",
              width: "100%",
              paddingHorizontal: 30,
              justifyContent: "flex-end",
              alignItems: "center",
            }} onPress={() => {
              navigation.navigate("/auth/(tabs)")
            }}>
              <Text style={{
                fontFamily: Platform.select({
                  ios: "Inter Regular",
                  android: "Inter_400Regular"
                }),
                textDecorationLine: "underline"
              }}>Doorgaan als gast</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, 
  },
});