/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './CatatPengeluaran.css'

function CatatPengeluaran({ onTambahPengeluaran }) {
  const [keterangan, setKeterangan] = useState("");
  const [pengeluaran, setPengeluaran] = useState("");

  const handleTambahPengeluaran = () => {
    onTambahPengeluaran({
      keterangan,
      pengeluaran: parseFloat(pengeluaran.replace(/[^\d.-]/g, "")),
    });
    setKeterangan("");
    setPengeluaran("");
  };

  return (
    <form className="card mx-auto p-3 form-card">
      <div className="mb-3">
        <label htmlFor="keteranganPengeluaran" className="form-label">
          Keterangan:
        </label>
        <input
          type="text"
          className="form-control"
          id="keteranganPengeluaran"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="Contoh: Untuk Beli Makan"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pengeluaran" className="form-label">
          Pengeluaran:
        </label>
        <input
          type="number"
          className="form-control"
          id="pengeluaran"
          value={pengeluaran}
          onChange={(e) => setPengeluaran(e.target.value)}
          placeholder="0"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleTambahPengeluaran}
      >
        Tambah
      </button>
    </form>
  );
}

export default CatatPengeluaran;
