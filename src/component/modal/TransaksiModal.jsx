/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../CatatPengeluaran.css";

function TransaksiModal({ onTambahPengeluaran }) {
  const [keterangan, setKeterangan] = useState("");
  const [pengeluaran, setPengeluaran] = useState("");

  const handleTambahPengeluaran = () => {
    onTambahPengeluaran({
      keterangan,
      pengeluaran: parseFloat(pengeluaran.replace(/[^\d.-]/g, "")),
    });
    window.location.reload();
    setKeterangan("");
    setPengeluaran("");
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Tambah Data Transaksi
            </h1>
          </div>
          <div className="modal-body">
            <form className="">
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
              
            </form>
          </div>
          <div className="modal-footer">
          <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleTambahPengeluaran();
                  document
                    .getElementById("exampleModal")
                    .classList.remove("show");
                  document.body.classList.remove("modal-open");
                  document.body.style.paddingRight = "";
                }}
                data-bs-dismiss="modal"
              >
                Tambah
              </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransaksiModal;
