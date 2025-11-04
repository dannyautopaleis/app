import { JSX, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import Toast from 'react-native-toast-message';

export default function LandingPagina(): JSX.Element {
  const navigation = useRouter();
  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Sandbox mode",
      text2: "Server/data model gedeactiveert met deze versie",
      position: "bottom",
      visibilityTime: 9000
    })
  })

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Fixmate</Text>
        <Text style={styles.subtitle}>Lenen, reserveren en beheren van gereedschap wordt nu eenvoudiger dan ooit.</Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate("/landing/login")}>
          <Text style={styles.primaryBtnText}>Inloggen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate("/landing/reg")}>
          <Text style={styles.secondaryBtnText}>Registreren</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate({
            pathname: "/auth/(tabs)",
            params: {email: "GUEST"},
          })}>
          <Text style={styles.linkBtnText}>Ga door als gast</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  primaryBtn: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryBtnText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  linkBtn: {
    marginTop: 8,
  },
  linkBtnText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#111827',
  },
});