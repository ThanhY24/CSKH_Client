import React from "react";
import axios from "axios";
import FormatCurrency from "../FormatCurrency";
import { parseISO, format } from "date-fns";

class RecentInvoices extends React.Component {
  state = {
    dataInvoices: [],
  };
  componentDidMount() {
    this.getInvoice();
  }
  getInvoice = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/invoices/getInvoicesIssued")
      .then((response) => {
        this.setState({
          dataInvoices: response.data.data,
        });
      });
  };
  render() {
    return (
      <>
        <div className="dasboard-item-title d-flex justify-content-between align-items-center pt-1 pb-1 pl-1 border border-black">
          <p className="m-0 dasboard-item-title-p">Đơn hàng gần đây</p>
        </div>
        <div
          className="dashboard-item-content"
          style={{ overflow: "auto", height: "auto" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nhân viên</th>
                <th scope="col">Khác hàng</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Ngày lập</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dataInvoices.map((item, index) => {
                return (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>
                      {item.staff_name !== null ? item.staff_name : "Chưa rõ"}
                    </td>
                    <td>
                      {item.cus_name !== null ? item.cus_name : "Chưa rõ"}
                    </td>
                    <td>
                      {FormatCurrency(Number(item.invoices_total_amount))}
                    </td>
                    <td>
                      {item.created_at !== null && item.created_at !== undefined
                        ? format(
                            parseISO(item.created_at.replace(" ", "T")),
                            "dd/MM/yyyy"
                          )
                        : "Chưa rõ"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default RecentInvoices;
