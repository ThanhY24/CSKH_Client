import React from "react";
import "moment-timezone";
import ResultTransaction from "./ResultTransaction";
import Transaction from "./Transaction";
import TypeCustomer from "./TypeCustomer";
import RecentInvoices from "./RecentInvoices";
import CustomerBuyMost from "./CustomerBuyMost";
import StaffSellMost from "./StaffSellMost";
class DashBoard extends React.Component {
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tổng quan</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end"></div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row h-100 p-0 m-0">
            <div className="col-12 main-content-col datatable">
              <div className="row p-0 m-0 datatable-table">
                <div className="row dashboard-item">
                  <div className="col-6">
                    <Transaction />
                  </div>
                  <div className="col-6">
                    <ResultTransaction />
                  </div>
                </div>
                <div className="row dashboard-item" style={{ height: "auto" }}>
                  <div className="col-6">
                    <TypeCustomer />
                  </div>
                  <div className="col-6">
                    <RecentInvoices />
                  </div>
                </div>
                <div className="row dashboard-item" style={{ height: "auto" }}>
                  <div className="col-6">
                    <CustomerBuyMost />
                  </div>
                  <div className="col-6">
                    <StaffSellMost />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default DashBoard;
