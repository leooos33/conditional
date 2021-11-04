import { ToastContainer } from "react-toastify";

export const TransactionAlertContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={60000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
