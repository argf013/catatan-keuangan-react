/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Swal from "sweetalert2";

function ConfirmationModal({
  title,
  confirmText,
  denyText,
  onConfirm,
  onDeny,
  disabled
}) {
  const showConfirmationModal = () => {
    Swal.fire({
      title: title || "Are you sure?",
      showDenyButton: true,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText || "Confirm",
      denyButtonText: denyText || "Deny",
    }).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm) {
          onConfirm();
        }
      } else if (result.isDenied) {
        if (onDeny) {
          onDeny();
        }
      }
    });
  };

  return (
    <button
      className="btn btn-primary"
      style={{ marginRight: "0.5em" }}
      onClick={showConfirmationModal}
      disabled={disabled}
    >
      {confirmText || "Confirm"}
    </button>
  );
}

export default ConfirmationModal;
