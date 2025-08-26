import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LibraryNavbar from "./Components/Navbar";
import Fines from "./Components/Fines";
import Issues from "./Components/Issues";
import Members from "./Components/Member";
import Books from "./Components/Books";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <>

      <LibraryNavbar />
      {/* <Books /> */}

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/Members" element={<Members />} />
        <Route path="/Fines" element={<Fines />} />
        <Route path="/Issues" element={<Issues />} />
        <Route path="*" element={<h1>Page-Not-Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
