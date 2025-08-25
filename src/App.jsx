import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LibraryNavbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fines from "./Components/Fines";
import Issues from "./Components/Issues";
import Members from "./Components/Member";
import Books from "./Components/Books";
import { useState } from "react";

function App() {
  // ✅ Role state yaha rakho, taaki Navbar aur Books dono me pass ho
  const [role, setRole] = useState(""); // "admin" ya "user"

  return (
    <div>
      {/* // <BrowserRouter> */}
        <LibraryNavbar role={role} setRole={setRole} />
        <Routes>
          <Route path="/" element={<Books role={role} />} />
          <Route path="/Members" element={<Members />} />
          <Route path="/Fines" element={<Fines />} />
          <Route path="/Issues" element={<Issues />} />
          <Route path="*" element={<h1>Page-Not-Found</h1>} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
