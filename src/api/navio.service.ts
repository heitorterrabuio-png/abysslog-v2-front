import { api } from "./axios";
import type { NavioResponse } from "../types/navio";

export async function listarNavios() {
  const response =
    await api.get<NavioResponse[]>("/navios");

  return response.data;
}