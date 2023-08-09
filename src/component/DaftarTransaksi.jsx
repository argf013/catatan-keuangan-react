/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import "./DaftarTransaksi.css";
import ReactToPrint from "react-to-print";
import PrintComponent from "./PrintComponent";
import TransaksiModal from "./modal/TransaksiModal";
import ModalSaldo from "./modal/ModalSaldo";

function DaftarTransaksi({ transaction, total, onDeleteTransaction, onTambahPengeluaran }) {
  const printComponentRef = useRef();
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

  const handleSimpanSaldo = (saldo) => {
    setSaldoAwal(saldo);
    localStorage.setItem("saldoAwal", saldo);
  };

  const handleTambahPengeluaran = (pengeluaranData) => {
    const tanggal = getCurrentDate();
    const updatedTransaksi = [...transaksi, { ...pengeluaranData, tanggal }];
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
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-end mb-3 mt-3">
        <h2 className="title_app">Daftar Transaksi</h2>
        <div>
          <button
            className="btn btn-primary"
            style={{ marginRight: "0.5em" }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Tambah Transaksi
          </button>
          <button
            className="btn btn-primary"
            style={{ marginRight: "0.5em" }}
            data-bs-toggle="modal"
            data-bs-target="#saldoAwalModal"
          >
            Input Saldo Awal
          </button>
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
              {transaction.map((item, index) => (
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

      <TransaksiModal
        onTambahPengeluaran={onTambahPengeluaran}
      />

      <ModalSaldo
      onSaveSaldo={handleSimpanSaldo}
      />
    </div>
  );
}

export default DaftarTransaksi;
