/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import "./DaftarTransaksi.css";
import ReactToPrint from "react-to-print";
import PrintComponent from "./PrintComponent";

function DaftarTransaksi({ transaksi, total, onDeleteTransaction }) {
  const printComponentRef = useRef();

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-end mb-3 mt-3">
  <h2 className="title_app">Daftar Transaksi</h2>
  <div>
    <button className="btn btn-primary" style={{marginRight: '0.5em'}}>Tambah Data</button>
    <ReactToPrint
      trigger={() => (
        <button className="btn btn-primary">Ekspor Data</button>
      )}
      content={() => printComponentRef.current}
    />
  </div>
  <div style={{ display: "none" }}>
    <PrintComponent
      ref={printComponentRef}
      transaksi={transaksi}
      total={total}
    />
  </div>
</div>

      {transaksi.length === 0 ? (
        <div className="text-center mt-5">
        <h2 className="title_app">Kamu belum memiliki transaksi.</h2>
        <p>Ayo mulai mencatat pengeluaran Anda.</p>
        </div>
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
        
          <h4 className="title_app d-flex justify-content-end">
            Total:&ensp;
            <span id="totalSaldo">
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
