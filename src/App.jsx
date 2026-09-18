import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Monitoring from "./Pages/Monitoring";
import AI from "./Pages/AI";
import Alerts from "./Pages/Alerts";
import Analytics from "./Pages/Analytics";
import Reports from "./Pages/Reports";
import AI_assistant from "./Pages/AI_assistant";
import Decision from "./Pages/Decision";
import Knowledge from "./Pages/Knowledge";
import Support from "./Pages/Support";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/monitoring/:diverId"
          element={<Monitoring />}
        />

        <Route
          path="/risk"
          element={<AI />}
        />
        <Route path="/alerts" element={<Alerts />} />
        <Route
  path="/analytics"
  element={<Analytics />}
/>
<Route
  path="/reports"
  element={<Reports />}
/>
<Route path="/assistant" element={<AI_assistant />} />
<Route path="/decision" element={<Decision />} />
<Route path="/knowledge" element={<Knowledge />} />
<Route path="/support" element={<Support />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;