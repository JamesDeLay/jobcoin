import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import styled from "styled-components";

const AppContainer = styled.div`
background: #F5FAFA;
min-height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
