import { useEffect, useState } from "react";
import api from "../services/axios";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";

export default function Eventos({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [ingressos, setIngressos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novoIngresso, setNovoIngresso] = useState({ tipo: "", preco: "" });

  useEffect(() => {
    getEventos();
  }, []);

  async function getEventos() {
    try {
      const response = await api.getEventos("/eventos");
      console.log(response.data); // Verificar a estrutura dos dados
      setEventos(response.data.eventos);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar eventos:", error.response ? error.response.data.error : error);
    }
  }

  async function abrirModalComIngressos(evento) {
    setEventoSelecionado(evento);
    setModalVisible(true);

    try {
      const response = await api.getIngressosPorEvento(evento.id_evento);
      setIngressos(response.data.ingressos);
    } catch (error) {
      console.log("Erro ao buscar ingressos", error.response ? error.response.data.error : error);
    }
  }

  async function criarIngresso() {
    try {
      // Garantir que o preço seja numérico válido
      const precoNumerico = parseFloat(novoIngresso.preco);
      if (isNaN(precoNumerico)) {
        Alert.alert("Erro", "Por favor, insira um preço válido.");
        return;
      }

      const response = await api.createIngresso({
        tipo: novoIngresso.tipo,
        preco: precoNumerico.toString(), // Garantir que preço seja uma string
        fk_id_evento: eventoSelecionado.id_evento,
      });
      Alert.alert(response.data.message);

      // Atualiza lista de ingressos
      const responseAtualizado = await api.getIngressosPorEvento(eventoSelecionado.id_evento);
      setIngressos(responseAtualizado.data.ingressos);

      // Limpa e esconde o formulário
      setNovoIngresso({ tipo: "", preco: "" });
      setMostrarForm(false);
    } catch (error) {
      console.log("Erro ao criar ingresso", error.response ? error.response.data.error : error);
      Alert.alert("Erro", error.response ? error.response.data.error : error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CadastroEventoScreen");
        }}
      >
        <Text>Criar novo evento</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Eventos Disponíveis</Text>
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id_evento.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.eventCard}
              onPress={() => {
                abrirModalComIngressos(item);
              }}
            >
              <Text style={styles.eventName}>{item.nome}</Text>
              <Text style={styles.eventLocal}>{item.local}</Text>
              <Text style={styles.eventDate}>
                {new Date(item.data_hora).toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Ingressos para: {eventoSelecionado.nome}
          </Text>
          {ingressos.length === 0 ? (
            <Text style={styles.modalEmptyText}>
              Nenhum ingresso encontrado
            </Text>
          ) : (
            <FlatList
              data={ingressos}
              keyExtractor={(item) => item.id_ingresso.toString()}
              renderItem={({ item }) => (
                <View style={styles.ingressoItem}>
                  <Text style={styles.ingressoTipo}>Tipo: {item.tipo}</Text>
                  <Text style={styles.ingressoPreco}>Preço: {item.preco}</Text>
                </View>
              )}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: "black" }]}
            onPress={() => setMostrarForm(!mostrarForm)}
          >
            <Text style={{ color: "white" }}>
              {mostrarForm ? "Cancelar" : "Criar novo ingresso"}
            </Text>
          </TouchableOpacity>

          {mostrarForm && (
            <View style={{ marginTop: 20 }}>
              <Text>Tipo do ingresso:</Text>
              <TextInput
                value={novoIngresso.tipo}
                onChangeText={(text) =>
                  setNovoIngresso({ ...novoIngresso, tipo: text })
                }
                style={styles.input}
                placeholder="Ex: VIP, Meia, Inteira..."
              />
              <Text>Preço:</Text>
              <TextInput
                value={novoIngresso.preco}
                onChangeText={(text) =>
                  setNovoIngresso({ ...novoIngresso, preco: text })
                }
                keyboardType="numeric"
                style={styles.input}
                placeholder="Ex: 40.00"
              />
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: "black" }]}
                onPress={criarIngresso}
              >
                <Text style={{ color: "white" }}>Salvar ingresso</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  eventCard: {
    padding: 15,
    backgroundColor: "lightgray",
    marginBottom: 10,
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  eventLocal: {
    color: "gray",
  },
  eventDate: {
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "gray",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
  },
  modalEmptyText: {
    color: "black",
  },
  ingressoItem: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 6,
  },
  ingressoTipo: {
    color: "black",
  },
  ingressoPreco: {
    color: "gray",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  closeButtonText: {
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
});
