import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  criarExpedicao,
} from "../api/expedicao.service";

export function NovaExpedicaoPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [capitao, setCapitao] = useState("");
  const [dataInicio, setDataInicio] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const novaExpedicao =
        await criarExpedicao({
          nome,
          capitao,
          dataInicio,
        });

      // navigate(`/expedicoes/${novaExpedicao.id}`);
      navigate(`../`)
    } catch (error) {
      console.error(error);
      alert("Erro ao criar expedição");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-2xl w-full max-w-lg space-y-4"
      >
        <h1 className="text-3xl font-bold">
          Nova Expedição
        </h1>

        <input
          type="text"
          placeholder="Nome da Expedição"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-700"
        />

        <input
          type="text"
          placeholder="Capitão"
          value={capitao}
          onChange={(e) =>
            setCapitao(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-700"
        />

        <input
          type="date"
          value={dataInicio}
          onChange={(e) =>
            setDataInicio(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition"
        >
          {loading
            ? "Criando..."
            : "Criar Expedição"}
        </button>
      </form>
    </div>
  );
}