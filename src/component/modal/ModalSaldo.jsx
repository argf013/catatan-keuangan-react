/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import  './ModalSaldo.css'

function ModalSaldo({ onSaveSaldo }) {
  const [saldoAwal, setSaldoAwal] = useState("");
  const [isSaldoSaved, setIsSaldoSaved] = useState(false);

  const handleSimpanSaldo = () => {
    onSaveSaldo(parseFloat(saldoAwal));
    setIsSaldoSaved(true);
    localStorage.setItem("isSaldoSaved", true);
    window.location.reload();
  };

  useEffect(() => {
    const savedStatus = localStorage.getItem("isSaldoSaved");
    if (savedStatus === "true") {
      setIsSaldoSaved(true);
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="saldoAwalModal"
      tabIndex="-1"
      aria-labelledby="saldoAwalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="saldoAwalModalLabel">
             Input Saldo Awal
            </h1>
          </div>
          <div className="modal-body">
            <label htmlFor="saldoAwal" className="form-label">
              Saldo Awal:
            </label>
            <input
              type="number"
              className="form-control"
              id="saldoAwal"
              value={saldoAwal}
              onChange={(e) => setSaldoAwal(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSimpanSaldo}
                data-bs-dismiss="modal"
              >
                Simpan
              </button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSaldo;
