import axios from "axios";

export const api = axios.create({
  baseURL: "https://master-movies-api-1eb9305b8fb8.herokuapp.com"
});
