/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./PrintComponent.css";

class PrintComponent extends React.Component {
  render() {
    const { transaksi, total } = this.props;
    return (
      <div className="printComponent container">
        <h2 className="title_app text-center mb-3">Daftar Transaksi</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tanggal</th>
              <th scope="col">Pengeluaran</th>
              <th scope="col">Keterangan</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        <h4 className="title_app">
          Total:{" "}
          <span id="totalSaldo">
            {total.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </span>
        </h4>
        <div className="footer">App Designed by Argf</div>
      </div>
    );
  }
}

export default PrintComponent;
