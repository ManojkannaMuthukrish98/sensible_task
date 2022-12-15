import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardHeader from "./Component/DashboardHeader";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./queryClient";
import StockComponent from "./Component/StockComponent";
import QuoteComponent from "./Component/QuoteComponent";

function App() {
  return (
    <div className="App">
      <DashboardHeader />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/stock" element={<StockComponent />} />
          <Route path="/quotes/:symbolName" element={<QuoteComponent />} />
          <Route path="*" element={<Navigate to="/stock" />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
