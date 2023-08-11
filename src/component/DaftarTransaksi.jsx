/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import "./DaftarTransaksi.css";
import ReactToPrint from "react-to-print";
import PrintComponent from "./PrintComponent";
import TransaksiModal from "./modal/TransaksiModal";
import ModalSaldo from "./modal/ModalSaldo";
import ConfirmationModal from "./alert/ConfirmationAlert";

function DaftarTransaksi({
  transaction,
  total,
  onDeleteTransaction,
  onTambahPengeluaran,
}) {
  const printComponentRef = useRef();
  const [saldoAwal, setSaldoAwal] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const [saldoAwalTersimpan, setSaldoAwalTersimpan] = useState(false);
  const [isSaldoAwalFilled, setIsSaldoAwalFilled] = useState(false);

  useEffect(() => {
    const storedSaldo = parseFloat(localStorage.getItem("saldoAwal")) || 0;
    setSaldoAwal(storedSaldo);

    const isSaldoTersimpan = storedSaldo !== 0;
    setSaldoAwalTersimpan(isSaldoTersimpan);
    setIsSaldoAwalFilled(isSaldoTersimpan);

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

  const handleResetSaldoAwal = () => {
    setSaldoAwal(0);
    localStorage.setItem("saldoAwal", 0);
    setSaldoAwalTersimpan(false);
    setTransaksi([]);
    localStorage.setItem("transaksi", JSON.stringify([]));
    window.location.reload();
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
            data-bs-target="#saldoAwalModal"
            onClick={saldoAwalTersimpan}
            disabled={saldoAwalTersimpan}
          >
            Input Saldo Awal
          </button>
          <button
            className="btn btn-primary"
            style={{ marginRight: "0.5em" }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            disabled={!isSaldoAwalFilled}
          >
            Tambah Transaksi
          </button>

          <ConfirmationModal
            confirmText="Reset Saldo Awal"
            onConfirm={handleResetSaldoAwal}
            denyText="Cancel"
            title="Apakah Anda yakin ingin mereset saldo awal? Ini akan menghapus semua
            data transaksi."
            disabled={!isSaldoAwalFilled}
          />

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
                    <ConfirmationModal
                      confirmText="Delete"
                      onConfirm={() => onDeleteTransaction(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <h4 className="title_app d-flex justify-content-end">
        Total:&ensp;
        <span id="totalSaldo">
          {isSaldoAwalFilled
            ? total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
            : "N/A"}
        </span>
      </h4>

      <TransaksiModal onTambahPengeluaran={onTambahPengeluaran} />

      <ModalSaldo onSaveSaldo={handleSimpanSaldo} />
    </div>
  );
}

export default DaftarTransaksi;
