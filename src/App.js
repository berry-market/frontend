import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./components/StyledComponents.js";
import Layout from "./components/Layout.js";
import "./App.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
