import "./styles.css";
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { TampilStok } from "./pages/index";

export default function App() {
  return (
    <Box sx={container}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" /> */}
          <Route path="/" element={<TampilStok />} />
          <Route path="/stok" element={<TampilStok />} />
          <Route path="/stok/:id" element={<TampilStok />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#9FC9F3",
  minHeight: "100vh"
};
