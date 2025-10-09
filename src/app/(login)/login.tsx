import { JSX, useState } from "react";
import { Platform, ScrollView, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen(): JSX.Element {
      const navigation = useNavigation();
    
      const [password, setPassword] = useState("");
        const [emailAddress, setEmailAddress] = useState("");
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            
            <Text style={styles.title}>Welkom 👋</Text>
            <Text style={styles.subtitle}>Log in om verder te gaan</Text>

            <Text style={styles.label}>E-mailadres</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mailadres"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
                onChangeText={(t) => {
                    setEmailAddress(t);
                }}
            />

            <Text style={styles.label}>Wachtwoord</Text>
            <TextInput
              style={styles.input}
              placeholder="Wachtwoord"
              secureTextEntry
              textContentType="password"
              onChangeText={(t) => {
                setPassword(t);
              }}
            />

            <TouchableOpacity style={styles.primaryBtn}
                onPress={() => {
                if (!password || !emailAddress) {

                  return;
                }
                navigation.navigate('index' as never);
              }}>
              <Text style={styles.primaryBtnText}>Inloggen</Text>
            </TouchableOpacity>

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