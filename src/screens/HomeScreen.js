import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CadastroEvento")}
      >
        <Text style={styles.button}>Cadastro de Evento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CadastroOrganizador")}
      >
        <Text style={styles.button}>Cadastro de Organizador</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CadastroIngresso")}
      >
        <Text style={styles.button}>Cadastro de Ingresso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  input: {
   width: 200,
   height: 40,
   borderWidth: 1,
   marginBottom: 20,
   peddingHorizontal: 1,
  },
  button: {
    backgroundColor: "gray",
    color: "white",
    borderRadius: 5,
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
