// entire changes are subjected to the param-wise user credential passing
// but beforehand, the backend should'be done because otherwise there is no point in storing some token in the app's cache & provider
//
// required endpoints: login/register/token verify

import { JSX } from "react";
import { Platform, ScrollView, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { object, string, setLocale } from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { useRouter } from "expo-router";

setLocale({
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
  const navigation = useRouter();
  const initialValues: loginDef = {email: "", password: ""}

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.form}>
            
            <Text style={styles.title}>Welkom 👋</Text>
            <Text style={styles.subtitle}>Log in om verder te gaan</Text>

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={(user: loginDef) => {
                console.log("gebruiker", user);

                navigation.navigate({
                  pathname: "/(tabs)",
                  params: {email: user.email},
                })
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
                <>
                  <Text style={styles.label}>E-mailadres</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="E-mailadres"
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="emailAddress"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    id="email-1"
                  />

                  {/* display err msg */}
                  <ErrorMessage name="email" render={(err) => <Text style={{fontSize: 13, color: "red", fontWeight: 400}}>{err}</Text>}/>

                  <Text style={styles.label}>Wachtwoord</Text>
                  <TextInput
                    style={styles.input}
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
                    disabled={values.email === "" || values.password === "" ? true : false }
                    style={{
                      ...styles.primaryBtn,
                    }}
                    onPress={e => handleSubmit(e as any)}>
                  <Text style={styles.primaryBtnText}>Inloggen</Text>
                </TouchableOpacity>
                </>
              )}
            </Formik>

            <TouchableOpacity style={styles.linkBtn} onPress={() => {navigation.navigate('registeren' as never)}}>
              <Text style={styles.linkBtnText}>Nog geen account? Meld je nu aan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  form: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  primaryBtn: {
    marginTop: 24,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkBtn: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkBtnText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#111827',
  },
});