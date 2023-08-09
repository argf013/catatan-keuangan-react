/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./DaftarTransaksi.css";

function DaftarTransaksi({ transaksi, total, onDeleteTransaction }) {
  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="title_app">Daftar Transaksi</h2>
        <button className="btn btn-primary" disabled={transaksi.length === 0}>
          Ekspor Data
        </button>{" "}
      </div>
      {transaksi.length === 0 ? (
        <p>Kamu belum memiliki transaksi.</p>
      ) : (
        <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tanggal</th>
              <th scope="col">Pengeluaran</th>
              <th scope="col">Keterangan</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item, index) => (
              <tr key={index}>
                <td>{item.tanggal}</td>
                <td>
                  {item.pengeluaran !== null
                    ? item.pengeluaran.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                    : "N/A"}
                </td>
                <td>{item.keterangan || "Tidak ada keterangan"}</td>
                <td>
                  <a href="" onClick={() => onDeleteTransaction(index)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4 className="title_app">
        Total:{" "}
        <span id="totalSaldo" >
          {total.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </span>
      </h4>
      </>
      )}
      
    </div>
  );
}

export default DaftarTransaksi;
