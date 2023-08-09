/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

function SaldoAwal({ onSaveSaldo }) {
  const [saldoAwal, setSaldoAwal] = useState("");
  const [isSaldoSaved, setIsSaldoSaved] = useState(false);

  const handleSimpanSaldo = () => {
    onSaveSaldo(parseFloat(saldoAwal));
    setIsSaldoSaved(true);
    localStorage.setItem("isSaldoSaved", true); // Simpan status tombol di localStorage
  };

  const handleResetSaldo = () => {
    setSaldoAwal("");
    setIsSaldoSaved(false);
    localStorage.removeItem("saldoAwal");
    localStorage.removeItem("transaksi");
    localStorage.removeItem("isSaldoSaved"); // Hapus status tombol dari localStorage
  };

  useEffect(() => {
    const savedStatus = localStorage.getItem("isSaldoSaved");
    if (savedStatus === "true") {
      setIsSaldoSaved(true);
    }
  }, []);

  return (
    <form className="card form-card mx-auto p-3 mb-3">
      <div className="mb-3">
        <label htmlFor="saldoAwal" className="form-label">
          Saldo Awal:
        </label>
        <input
          type="number"
          className="form-control"
          id="saldoAwal"
          value={saldoAwal}
          onChange={(e) => setSaldoAwal(e.target.value)}
          disabled={isSaldoSaved}
          placeholder={isSaldoSaved ? "Disabled" : "0"}
        />
      </div>
      {isSaldoSaved ? (
        <button className="btn btn-secondary" onClick={handleResetSaldo}>
          Reset
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleSimpanSaldo}>
          Simpan
        </button>
      )}
    </form>
  );
}

export default SaldoAwal;
