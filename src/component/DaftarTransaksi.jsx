/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

function DaftarTransaksi({ transaksi, total }) {
  return (
    <div className="container">
      <h2>Daftar Transaksi</h2>
      <ul id="daftarTransaksi">
        {transaksi.map((item, index) => (
          <li key={index}>
            {`${item.tanggal} - Pengeluaran: ${item.keterangan} (${item.pengeluaran.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })})`}
          </li>
        ))}
      </ul>
      <p>
        Total: <span id="totalSaldo">{total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
      </p>
    </div>
  );
}

export default DaftarTransaksi;

