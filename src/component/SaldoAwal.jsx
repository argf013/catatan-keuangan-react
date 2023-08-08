/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function SaldoAwal({ onSaveSaldo }) {
  const [saldoAwal, setSaldoAwal] = useState('');
  const [isSaldoSaved, setIsSaldoSaved] = useState(false);

  const handleSimpanSaldo = () => {
    onSaveSaldo(parseFloat(saldoAwal));
    setIsSaldoSaved(true);
    localStorage.setItem("isSaldoSaved", true); // Simpan status tombol di localStorage
  };

  const handleResetSaldo = () => {
    setSaldoAwal('');
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
    <div className="container">
      <h2>Saldo Awal</h2>
      <label htmlFor="saldoAwal">Saldo Awal:</label>
      <input
        type="number"
        id="saldoAwal"
        value={saldoAwal}
        onChange={(e) => setSaldoAwal(e.target.value)}
        disabled={isSaldoSaved}
      />
      {isSaldoSaved ? (
        <button onClick={handleResetSaldo}>Reset</button>
      ) : (
        <button onClick={handleSimpanSaldo}>Simpan</button>
      )}
    </div>
  );
}

export default SaldoAwal;
