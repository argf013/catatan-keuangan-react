/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function CatatPengeluaran({ onTambahPengeluaran }) {
  const [keterangan, setKeterangan] = useState('');
  const [pengeluaran, setPengeluaran] = useState('');

  const handleTambahPengeluaran = () => {
    onTambahPengeluaran({
      keterangan,
      pengeluaran: parseFloat(pengeluaran.replace(/[^\d.-]/g, '')),
    });
    setKeterangan('');
    setPengeluaran('');
  };

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    return formatter.format(value);
  };

  return (
    <div className="container">
      <h2>Catat Pengeluaran</h2>
      <label htmlFor="keteranganPengeluaran">Keterangan:</label>
      <input
        type="text"
        id="keteranganPengeluaran"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
        placeholder="Contoh: Untuk Beli Makan"
      />
      <label htmlFor="pengeluaran">Pengeluaran:</label>
      <input
        type="text"
        id="pengeluaran"
        value={pengeluaran}
        onChange={(e) => setPengeluaran(e.target.value)}
      />
      <button onClick={handleTambahPengeluaran}>Tambah</button>
    </div>
  );
}

export default CatatPengeluaran;

