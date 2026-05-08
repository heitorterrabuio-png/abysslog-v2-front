import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { buscarExpedicao } from "../api/expedicao.service";
import type { ExpedicaoResponse } from "../types/expedicao";

export function ExpedicaoDetalhePage() {
  const { id } = useParams();
  const [expedicao, setExpedicao] =
    useState<ExpedicaoResponse | null>(null);

  useEffect(() => {
    carregarExpedicao();
  }, []);

  async function carregarExpedicao() {
    if (!id) return;

    const data = await buscarExpedicao(Number(id));

    setExpedicao(data);
  }

  if (!expedicao) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        {expedicao.nome}
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl space-y-4">
        <p>
          <strong>Capitão:</strong>{" "}
          {expedicao.capitao}
        </p>

        <p>
          <strong>Navio:</strong>{" "}
          {expedicao.nomeNavio}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {expedicao.status}
        </p>

        <p>
          <strong>Data:</strong>{" "}
          {expedicao.dataInicio}
        </p>
      </div>
    </div>
  );
}