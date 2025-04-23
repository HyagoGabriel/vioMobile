import { useEffect, useState } from "react";
import api from "../axios/axios";
import {
  StyleSheet,
  Text,
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

  useEffect(() => {
    getEventos();
  },[]);

  async function getEventos() {
    try {
      const response = await api.getEventos();
      console.log(response.data);
      setEventos(response.data.eventos);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar eventos:", error.response.data.error);
    }
  }

  async function abrirModalComIngressos(evento) {
    setEventoSelecionado(evento);
    setModalVisible(true);
    try {
      const response = await api.getIngressosPorEvento(evento.id_evento);
      setIngressos(response.data.ingressos);
    } catch (error) {
      console.log("Erro ao buscar ingressos:", error.response);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Disponíveis</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
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
              <Text>{item.local}</Text>
              <Text>{new Date(item.data_hora).toLocaleString()}</Text>
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
          <Text> Ingresso para : {eventoSelecionado.nome}</Text>
          {ingressos.length === 0 ? (
            <Text> Nenhum ingresso encontrado</Text>
          ) : (
            <FlatList
              data={ingressos}
              keyExtractor={(item) => item.id_ingresso.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text>Tipo: {item.tipo}</Text>
                  <Text>Preço: R$ {item.preco}</Text>
                </View>
              )}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={{ color: "white" }}>Fechar</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventCard: {
    padding: 15,
    backgroundColor: "gray",
    marginBottom: 10,
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  ingressoItem: {
    padding: 10,
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
    borderRadius: 6,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
});
