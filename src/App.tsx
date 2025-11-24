import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/AdminDash/Admin";
import Leafy from "./components/Leafy";
import Nav from "./components/Nav";
export default function App() {
  return(
 <BrowserRouter>
      <Routes>

        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}