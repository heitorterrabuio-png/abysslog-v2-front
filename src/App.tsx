import { Routes, Route } from "react-router-dom";

import { ExpedicoesPage } from "./pages/ExpedicoesPage";
import { ExpedicaoDetalhePage } from "./pages/ExpedicaoDetalhePage";
import { NovaExpedicaoPage } from "./pages/NovaExpedicaoPage";
import { PrepararExpedicaoPage } from "./pages/PrepararExpedicaoPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ExpedicoesPage />} />
      <Route path="/expedicoes/nova" element={<NovaExpedicaoPage />}/>
      <Route
        path="/expedicoes/:id"
        element={<ExpedicaoDetalhePage />}
      />
      <Route
        path="/expedicoes/:id/preparar"
        element={<PrepararExpedicaoPage />}
      />
    </Routes>
    

  );
}

export default App;