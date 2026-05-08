import { useEffect, useState } from "react";
import { listarExpedicoes } from "../api/expedicao.service";
import type { ExpedicaoResponse } from "../types/expedicao";
import { useNavigate } from "react-router-dom";

export function ExpedicoesPage() {
    const [expedicoes, setExpedicoes] = useState<ExpedicaoResponse[]>([]);

    useEffect(() => {
        carregarExpedicoes();
    }, []);

    async function carregarExpedicoes() {
        const data = await listarExpedicoes();
        setExpedicoes(data);
    }

    const navigate = useNavigate();
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                AbyssLog Expeditions
            </h1>

            <button
                onClick={() => navigate("/expedicoes/nova")}
                className="mb-6 px-4 py-2 bg-green-600 rounded-xl hover:bg-green-500 transition"
                >
                Nova Expedição
            </button>
            <div className="grid gap-4">
                {expedicoes.map((exp) => (
                    <div
                        key={exp.id}
                        className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <h2 className="text-xl font-semibold">{exp.nome}</h2>
                        <p>Capitão: {exp.capitao}</p>
                        <p>Navio: {exp.nomeNavio}</p>
                        <p>Status: {exp.status}</p>

                        {/* Se o status for Planejada, mostra o botão de Detalhes */}
                        {exp.status === "Planejada" ? (
                        <button
                            onClick={() =>
                            navigate(`/expedicoes/${exp.id}/preparar`)
                            }
                            className="mt-4 w-full p-2 bg-yellow-600 rounded-lg hover:bg-yellow-500 transition"
                        >
                            Preparar Expedição
                        </button>
                        ) : (
                        <button
                            onClick={() =>
                            navigate(`/expedicoes/${exp.id}`)
                            }
                            className="mt-4 w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                        >
                            Detalhes
                        </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}