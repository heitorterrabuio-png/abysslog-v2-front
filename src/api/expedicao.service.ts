import { api } from "./axios";
import type { ExpedicaoResponse } from "../types/expedicao";
import type { EventoRequest } from "../types/evento";
import axios from "axios";

export async function listarExpedicoes() {
  const response = await api.get<ExpedicaoResponse[]>("/v1/expedicoes");

  return response.data;
}

export async function buscarExpedicao(id: number) {
  try {
    const response = await api.get(
      `/v1/expedicoes/${id}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }

    throw error;
  }
}

export async function iniciarExpedicao(id: number) {
  await api.post(`/v1/expedicoes/${id}/iniciar`);
}

export async function pausarExpedicao(id: number) {
  await api.post(`/v1/expedicoes/${id}/pausar`);
}

export async function finalizarExpedicao(id: number) {
  await api.post(`/v1/expedicoes/${id}/finalizar`);
}

export async function registrarEvento(
  id: number,
  evento: EventoRequest
) {
  const response = await api.post(
    `/v1/expedicoes/${id}/registrar-evento`,
    evento
  );

  return response.data;
}

export interface CriarExpedicaoRequest {
  nome: string;
  capitao: string;
  dataInicio: string;
  idNavio?: number;
}

export async function criarExpedicao(
  data: CriarExpedicaoRequest
) {
  const response = await api.post(
    "/v1/expedicoes/registrar",
    data
  );

  return response.data;
}

export async function atribuirNavio(
  idExpedicao: number,
  idNavio: number
) {
  await api.post(
    `/v1/expedicoes/${idExpedicao}/atribuir-navio/${idNavio}`
  );
}