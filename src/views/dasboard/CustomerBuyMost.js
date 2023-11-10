import React from "react";
import axios from "axios";
import FormatCurrency from "../FormatCurrency";
import { parseISO, format } from "date-fns";

class CustomerBuyMost extends React.Component {
  state = {
    dataInvoices: [],
    dataRankCustomer: [],
  };
  componentDidMount() {
    this.getRank();
  }
  getRank = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/invoices/getInvoicesIssuedNoLimit")
      .then((response) => {
        this.setState(
          {
            dataInvoices: response.data.data,
          },
          () => {
            console.log(this.state.dataInvoices);
            let arrCusIDSet = new Set();
            let arrCusID = [];
            // Gom khách hàng
            this.state.dataInvoices.forEach((item) => {
              if (!arrCusIDSet.has(item.cus_id)) {
                arrCusIDSet.add(item.cus_id);
                arrCusID.push({
                  cus_id: item.cus_id,
                  cus_name: item.cus_name,
                  cus_gender: item.cus_gender,
                  cus_address: item.cus_address,
                  total: 0,
                });
              }
            });

            arrCusID.map((item) => {
              let total = 0;
              this.state.dataInvoices.map((item1) => {
                if (item.cus_id === item1.cus_id) {
                  total += Number(item1.invoices_total_amount);
                }
              });
              item.total = total;
            });
            arrCusID.sort((a, b) => b.total - a.total);
            this.setState({ dataRankCustomer: arrCusID }, () => {
              console.log(this.state.dataRankCustomer);
            });
          }
        );
      });
  };
  render() {
    return (
      <>
        <div className="dasboard-item-title d-flex justify-content-between align-items-center pt-1 pb-1 pl-1 border border-black">
          <p className="m-0 dasboard-item-title-p">Xếp hàng khách hàng</p>
        </div>
        <div
          className="dashboard-item-content"
          style={{ overflow: "auto", height: "auto" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Khách hàng</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Tổng tiền đã mua</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dataRankCustomer.slice(0, 10).map((item, index) => {
                return (
                  <tr
                    className={
                      index + 1 === 1
                        ? "table-primary"
                        : index + 1 === 2
                        ? "table-success"
                        : index + 1 === 3
                        ? "table-warning"
                        : ""
                    }
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{item.cus_name ? item.cus_name : "Chưa rõ"}</td>
                    <td>
                      {item.cus_gender === "1"
                        ? "Nam"
                        : item.cus_gender === 2
                        ? "Nữ"
                        : "Chưa rõ"}
                    </td>
                    <td>{item.cus_address ? item.cus_address : "Chưa rõ"}</td>
                    <td>{FormatCurrency(item.total)}</td>
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
export default CustomerBuyMost;
