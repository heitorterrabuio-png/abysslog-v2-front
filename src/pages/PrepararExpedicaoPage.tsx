import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { NavioResponse } from "../types/navio";
import axios, { Axios } from "axios";
import {
  atribuirNavio,
} from "../api/expedicao.service";

import {
  listarNavios,
} from "../api/navio.service";

export function PrepararExpedicaoPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [navios, setNavios] = useState<
    NavioResponse[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    carregarNavios();
  }, []);

  async function carregarNavios() {
    try {
      const data = await listarNavios();
      console.log(data);
      // somente navios disponíveis
      const disponiveis = data.filter(
        (navio) =>
          navio.status === "Disponível"
      );

      setNavios(disponiveis);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAtribuirNavio(
    navioId: number
  ) {
    if (!id) return;

    try {
      setLoading(true);

      await atribuirNavio(
        Number(id),
        navioId
      );

      alert("Navio atribuído!");

      navigate("/");
    } catch (error) {
    if (axios.isAxiosError(error)) {
      // Isso vai mostrar a mensagem de erro que você escreveu no Java (ex: "Navio Indisponível")
      alert("Erro: " + error.response?.data.erro); 
    }
    console.error(error);
    } finally {
        setLoading(false);
      }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        Preparar Expedição
      </h1>

      <div className="grid gap-4">
        {navios.map((navio) => (
          <div
            key={navio.id}
            className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
          >
            <h2 className="text-2xl font-bold">
              {navio.nome}
            </h2>

            <div className="mt-2 space-y-1 text-slate-300">
              <p>Tipo: {navio.tipo}</p>

              <p>
                Tripulação:{" "}
                {navio.capacidadeTripulacao}
              </p>

              <p>
                Carga:{" "}
                {navio.capacidadeCarga}
              </p>

              <p>
                Velocidade:{" "}
                {navio.velocidade}
              </p>

              <p>
                Resistência:{" "}
                {navio.resistencia}
              </p>
            </div>

            <button
              disabled={loading}
              onClick={() =>
                handleAtribuirNavio(
                  navio.id
                )
              }
              className="mt-4 w-full p-3 bg-green-600 rounded-xl hover:bg-green-500 transition"
            >
              Atribuir Navio
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}