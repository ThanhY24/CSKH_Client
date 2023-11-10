// css
import "./App.css";
import axios from "axios";
// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//use effect
import { useEffect, useState } from "react";
// Conponent
import NotFound from "./E404/404";
import Header from "./Header";
import Customer from "./customer/Customer";
import Staff from "./staff/Staff";
import Services from "./services/Services";
import Products from "./products/Products";
import StaffLogin from "./StaffLogin";
// Change
// import InsertChange from "./change/InsertChange";
import Change from "./change/Change";
import EditChange from "./change/EditChange";
import ConvertToChange from "./change/ConvertToChange";
// Transaction
import Transaction from "./transaction_result/Transaction";
import TransactionResult from "./transaction_result/TransactionResult";
import InsertTransaction from "./transaction_result/InsertTransaction";
// Invoices
import InsertInvoices from "./invoices/InsertInvoices";
import Invoices from "./invoices/Invoices";
// eInvoices
import EInvoices from "./eInvoices/eInvoices";
import EInvoicesIncreases from "./eInvoices/eInvoicesIncreases";
import EInvoicesReduced from "./eInvoices/eInvoicesReduced";
import EInvoicesAdjustInfomation from "./eInvoices/eInvoicesAdjustInformation";
import EInvoicesReplace from "./eInvoices/eInvoicesReplace";
// Quotation
import InsertQuotation from "./quotation/InsertQuotation";
import QuotationDetail from "./quotation/QuotationDetail";
import Quotation from "./quotation/Quotation";
import InvoicesDetail from "./invoices/InvoicesDetail";
import Reports from "./reports/Reports";
// Dasboard
import DashBoard from "./dasboard/DashBoard";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dataUser"); // Xóa thông tin người dùng
    localStorage.removeItem("token"); // Xóa token khỏi local storage
    axios
      .get("http://127.0.0.1:8000/api/v1/staff-logout")
      .then(console.log("Đăng Xuất"));
    setIsAuthenticated(false); // Cập nhật trạng thái đăng nhập về false
  };

  return (
    <BrowserRouter>
      <div className="App container-fluid w-100 main p-0">
        {/* Hiển thị form đăng nhập khi chưa đăng nhập */}
        {!isAuthenticated && (
          <StaffLogin
            onLoginSuccess={() => {
              setIsAuthenticated(true);
            }}
          />
        )}
        {isAuthenticated && (
          <>
            {/* Header */}
            <Header onLogout={handleLogout} />
            <Routes>
              {/* Customer */}
              <Route path="/customers" element={<Customer />} />
              {/* Staff */}
              <Route path="/staffs" element={<Staff />} />
              {/* Services */}
              <Route path="/services" element={<Services />} />
              {/* Products */}
              <Route path="/products" element={<Products />} />
              {/*  Change */}
              <Route path="/changes" element={<Change />} />
              {/* Invoices */}
              <Route
                path="/invoices/details/:idInvoices"
                element={<InvoicesDetail />}
              />
              <Route path="/invoices/insert" element={<InsertInvoices />} />
              <Route path="/invoices" element={<Invoices />} />
              {/* eInvoices */}
              <Route path="/eInvoices" element={<EInvoices />} />
              <Route
                path="/eInvoices/change-reduced/:fkey"
                element={<EInvoicesReduced />}
              />
              <Route
                path="/eInvoices/change-increases/:fkey"
                element={<EInvoicesIncreases />}
              />
              <Route
                path="/eInvoices/change-information/:fkey"
                element={<EInvoicesAdjustInfomation />}
              />
              <Route
                path="/eInvoices/replace/:fkey"
                element={<EInvoicesReplace />}
              />
              {/* Danh sách báo giá */}
              <Route path="/quotations" element={<Quotation />} />
              {/* Thêm báo giá */}
              <Route path="/quotations/insert" element={<InsertQuotation />} />
              {/* Xem báo giá */}
              <Route
                path="/quotations/details/:idQuo"
                element={<QuotationDetail />}
              />
              {/*  Convert To Change */}
              <Route
                path="/changes/convert/:idStaff/:idCus"
                element={<ConvertToChange />}
              />
              {/* Edit Change */}
              <Route path="/changes/edit/:id" element={<EditChange />} />
              {/* transaction */}
              <Route path="/transactions" element={<Transaction />} />
              {/* insert-transaction */}
              <Route
                path="/transactions/insert"
                element={<InsertTransaction />}
              />
              {/* Edit Change */}
              <Route
                path="/transaction-result"
                element={<TransactionResult />}
              />
              {/* Reports */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/" element={<DashBoard />} />
              {/* Home */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        )}
      </div>
      {/* Loading */}
      <div
        className="container-fluid m-0 w-100 h-100 insert-form-container"
        id="loading-container"
      >
        <div id="loader">
          <div className="cube-folding">
            <span className="leaf1"></span>
            <span className="leaf2"></span>
            <span className="leaf3"></span>
            <span className="leaf4"></span>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}
export default App;
