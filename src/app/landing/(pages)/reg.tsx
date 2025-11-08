import { JSX } from "react";
import { Platform, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { object, string, setLocale, ref } from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import {useHeaderHeight} from "@react-navigation/elements"
import {KeyboardAvoidingView, KeyboardAwareScrollView} from "react-native-keyboard-controller"

setLocale({
  mixed: {
    required: "Verplichte veld"
  },
  string: {
    email: () => `Geen geldige email`,
    min: ({ min }) => `Minimaal ${min} karakters nodig`,
    max: ({ max }) =>  `Maximaal ${max} karakters mogelijk`,
  }
});

// register schema definition
 type registerDef = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterSchema = object<registerDef>().shape({
  username: string().required().min(3).max(30),
  email: string().email().required().min(4).max(50),
  password: string().required().min(6).max(50),
  confirmPassword: string()
    .required()
    .oneOf([ref('password')], 'Wachtwoorden komen niet overeen'),
});

export default function RegisterScreen(): JSX.Element {
  const headerY = useHeaderHeight()
  const navigation = useRouter();
  const initialValues: registerDef = { username: "", email: "", password: "", confirmPassword: "" };
  console.log(headerY)
  return (
    <SafeAreaView style={{ flex: 1}}>
      <KeyboardAvoidingView  behavior={"padding"} keyboardVerticalOffset={headerY - 183} style={{ flex: 1, height: "100%", width: "100%" }}>
        <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{...styles.container}} showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <Image
            style={{ width: 90, height: 90}}
            source={require("@/assets/img/logo.png")}
          />

          {/* Titel */}
          <Text
            style={{
              fontSize: 32,
              fontFamily: Platform.select({ ios: "Barlow Regular", android: "Barlow_400Regular" }),
              marginTop: 5
            }}
          >REGISTREREN</Text>

          {/* Form */}
          <View style={{ display: "flex", width: "100%", minHeight: 360, marginTop: 25, padding: 10, paddingHorizontal: 20 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={(user: registerDef) => {
                // TODO: call backend: POST /register -> store token -> navigate
                console.log("nieuwe gebruiker", user);
                Toast.show({ text1: "Gelukt", text2: "Account aangemaakt (dummy)", type: "success", position: "bottom" });
                navigation.replace({ pathname: "/auth/(tabs)", params: { email: user.email } });
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  {/* Gebruikersnaam */}
                  <Text style={styles.label}>Gebruikersnaam</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Uw gebruikersnaam"
                    autoCapitalize="none"
                    keyboardType="default"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                  />
                  <ErrorMessage name="username" render={(err) => <Text style={styles.err}>{err}</Text>} />

                  {/* Email */}
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Uw email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  <ErrorMessage name="email" render={(err) => <Text style={styles.err}>{err}</Text>} />

                  {/* Wachtwoord */}
                  <Text style={styles.label}>Wachtwoord</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Wachtwoord"
                    secureTextEntry
                    textContentType="password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <ErrorMessage name="password" render={(err) => <Text style={styles.err}>{err}</Text>} />

                  {/* Wachtwoord bevestigen */}
                  <Text style={styles.label}>Wachtwoord bevestigen</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Herhaal wachtwoord"
                    secureTextEntry
                    textContentType="password"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                  />
                  <ErrorMessage name="confirmPassword" render={(err) => <Text style={styles.err}>{err}</Text>} />

                  {/* CTA */}
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={(e) => {
                      if (values.username === '' || values.email === '' || values.password === '' || values.confirmPassword === '') {
                        return Toast.show({ text1: "Fout", text2: "Vul alle velden in", type: "error", position: "bottom" });
                      }
                      if (values.password !== values.confirmPassword) {
                        return Toast.show({ text1: "Fout", text2: "Wachtwoorden komen niet overeen", type: "error", position: "bottom" });
                      }
                      // submit
                      // @ts-ignore
                      handleSubmit(e);
                    }}
                  >
                    <Text style={styles.primaryBtnText}>Registreren</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ marginTop: 16 }}
                    onPress={() => navigation.back()}
                  >
                    <Text style={styles.link}>Al een account? Inloggen</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, alignItems: "center"},
  label: {
    fontSize: 16,
    fontFamily: Platform.select({ ios: "Inter Regular", android: "Inter_400Regular" }),
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    fontSize: 14,
    fontFamily: Platform.select({ ios: "Inter Regular", android: "Inter_400Regular" }),
    backgroundColor: "#FFFFFF",
    borderColor: "#b4b0b0ff",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#7c7a7aff"
  },
  err: { fontSize: 13, color: "red", fontWeight: "400" as any },
  primaryBtn: {
    marginTop: 18,
    backgroundColor: "#FFEE49",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black"
  },
  primaryBtnText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: Platform.select({ ios: "Inter Regular", android: "Inter_400Regular" }),
  },
  link: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: Platform.select({ ios: "Inter Regular", android: "Inter_400Regular" }),
  }
});