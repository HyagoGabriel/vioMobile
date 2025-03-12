import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import api from "../axios/axios";

export default function CadastroEvento({ navigation }) {
  const [evento, setEvento] = useState({
    nome: "",
    descricao: "",
    data_hora: "",
    local: "",
    fk_id_evento: "",
  });

  async function handleEvento() {
    await api.postEvento(evento).then(
      (response) => {
        console.log(response.data.message);
        Alert.alert("OK", response.data.message);
      },
      (error) => {
        Alert.alert("Erro", error.response.data.error);
        console.log(error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Evento</Text>
      <TextInput
        placeholder="Nome do Evento"
        value={evento.nome}
        onChangeText={(value) => {
          setEvento({ ...evento, nome: value });
        }}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição do Evento"
        value={evento.descricao}
        onChangeText={(value) => {
          setEvento({ ...evento, descricao: value });
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="Data Do Evento"
        value={evento.data_hora}
        onChangeText={(value) => {
          setEvento({ ...evento, data_hora: value });
        }}
        style={styles.input}
      />

      <TextInput
        placeholder="Local"
        value={evento.local}
        onChangeText={(value) => {
          setEvento({ ...evento, local: value });
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="ID do Organizador"
        value={evento.fk_id_organizador}
        onChangeText={(value) => {
          setEvento({ ...evento, fk_id_organizador: value });
        }}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleEvento} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Evento</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.button} onPress={() => navigation.navigate("Home")}>
          Home
        </Text>
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
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "gray",

    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
