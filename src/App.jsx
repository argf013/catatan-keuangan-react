/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DaftarTransaksi from "./component/DaftarTransaksi";
import "./App.css";

function App() {
  const [saldoAwal, setSaldoAwal] = useState(0);
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const storedSaldo = parseFloat(localStorage.getItem("saldoAwal")) || 0;
    setSaldoAwal(storedSaldo);

    const storedTransaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
    setTransaksi(storedTransaksi);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "transaksi") {
        const updatedTransaksi = JSON.parse(e.newValue) || [];
        setTransaksi(updatedTransaksi);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleTambahPengeluaran = (pengeluaranData) => {
    const tanggal = getCurrentDate();
    const updatedTransaksi = [...transaksi, { ...pengeluaranData, tanggal }];
    setTransaksi(updatedTransaksi);
    localStorage.setItem("transaksi", JSON.stringify(updatedTransaksi));
  };

  const getTotalSaldo = () => {
    const totalPengeluaran = transaksi.reduce(
      (total, item) => total + item.pengeluaran,
      0
    );
    return saldoAwal - totalPengeluaran;
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransaksi = [...transaksi];
    updatedTransaksi.splice(index, 1);
    setTransaksi(updatedTransaksi);
    localStorage.setItem("transaksi", JSON.stringify(updatedTransaksi));
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <DaftarTransaksi
        total={getTotalSaldo()}
        onDeleteTransaction={handleDeleteTransaction}
        onTambahPengeluaran={handleTambahPengeluaran}
      />
    </div>
  );
}

export default App;
