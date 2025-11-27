import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/AdminDash/Admin";
import Leafy from "./components/Leafy";
import Nav from "./components/Nav";
import StatusA from "./components/AdminDash/Status";
import Alert from "./components/AdminDash/Alert";
export default function App() {
  return(
 <BrowserRouter>
      <Routes>
 <Route path="/" element={<StatusA/>}/>
        <Route path="/admin" element={<Admin/>}/>
          <Route path="/alert" element={<Alert/>}/>
      </Routes>
    </BrowserRouter>
  );
}