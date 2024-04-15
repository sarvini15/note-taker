import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./reset.css"
import AddCategory from "./pages/AddCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;