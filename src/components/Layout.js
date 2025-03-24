import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Layout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      {/* Cabeçalho */}
      <View style={style.header}>
      <TouchableOpacity
          onPress={() => {
            console.log("Botão Clicado");
          }}
        >
          <Icon name="person" size={30} color="fff" />
        </TouchableOpacity>
      </View>
      {/* Body */}
      {/* conteudo principal */}
      <View style={style.container}>{children}</View>
      {/* Footer */}
      <View style={style.header}></View>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: "blue",
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
