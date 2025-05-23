import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.72:5000/api/v1/",
  headers: {
    accept: "application/json",
  },
});

const sheets = {
  postLogin: (user) => api.post("login/", user),
  postCadastro: (user) => api.post("user/", user),
  postEvento: (evento) => api.post("evento/", evento),
  postIngresso: (ingresso) => api.post("ing/", ingresso),
  postOrganizador: (organizador) => api.post("org/", organizador),
  getEventos: () => api.get("evento/"),
  getIngressosPorEvento: (idEvento) => api.get(`ingresso/evento/${idEvento}`),
  createIngresso: (dados) => api.post("/ingresso", dados),
};

export default sheets