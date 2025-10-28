import { JSX, useState } from "react";
import { Platform, ScrollView, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen(): JSX.Element {
    const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Registeren</Text>
          <Text style={styles.subtitle}>Maak hier je account aan</Text>
            
          <View style={styles.form}>
            <Text style={styles.label}>E-mailadres</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mailadres"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <Text style={styles.label}>Wachtwoord</Text>
            <TextInput
              style={styles.input}
              placeholder="Wachtwoord"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (pwError) setPwError(null);
              }}
            />
            <Text style={styles.label}>Wachtwoord herhalen</Text>
            <TextInput
              style={styles.input}
              placeholder="Wachtwoord herhalen"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                if (pwError) setPwError(null);
              }}
            />
            {pwError ? <Text style={styles.errorText}>{pwError}</Text> : null}

            <Text style={styles.label}>Voornaam</Text>
            <TextInput style={styles.input} placeholder="Voornaam" autoCapitalize="words" />

            <Text style={styles.label}>Achternaam</Text>
            <TextInput style={styles.input} placeholder="Achternaam" autoCapitalize="words" />

            <Text style={styles.label}>Telefoonnummer</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefoonnummer"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
            />

            <Text style={styles.label}>Adres</Text>
            <TextInput style={styles.input} placeholder="Adres" autoCapitalize="words" />

            <Text style={styles.label}>Postcode</Text>
            <TextInput style={styles.input} placeholder="Postcode" autoCapitalize="characters" />

            <Text style={styles.label}>Plaats</Text>
            <TextInput style={styles.input} placeholder="Plaats" autoCapitalize="words" />

            {/* Acties */}
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => {
                if (!password || !confirmPassword || password !== confirmPassword) {
                  setPwError("Wachtwoorden komen niet overeen");
                  return;
                }
                navigation.navigate('registeren' as never);
              }}
            >
              <Text style={styles.primaryBtnText}>Registreren</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkBtn} onPress={() => {navigation.navigate('login' as never)}}>
              <Text style={styles.linkBtnText}>Al een account? Log in</Text>
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
    // subtle shadow on iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // elevation for Android
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
  errorText: {
    color: '#DC2626',
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
  }
});