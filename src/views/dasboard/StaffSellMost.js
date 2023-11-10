import React from "react";
import axios from "axios";
import FormatCurrency from "../FormatCurrency";
import { parseISO, format } from "date-fns";

class StaffSellMost extends React.Component {
  state = {
    dataInvoices: [],
    dataRankStaff: [],
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
            let arrStaffIDSet = new Set();
            let arrStaffID = [];
            // Gom khách hàng
            this.state.dataInvoices.forEach((item) => {
              if (!arrStaffIDSet.has(item.staff_id)) {
                arrStaffIDSet.add(item.staff_id);
                arrStaffID.push({
                  staff_id: item.staff_id,
                  staff_name: item.staff_name,
                  staff_gender: item.staff_gender,
                  staff_position: item.staff_position,
                  staff_address: item.staff_address,
                  total: 0,
                });
              }
            });

            arrStaffID.map((item) => {
              let total = 0;
              this.state.dataInvoices.map((item1) => {
                if (item.staff_id === item1.staff_id) {
                  total += Number(item1.invoices_total_amount);
                }
              });
              item.total = total;
            });
            arrStaffID.sort((a, b) => b.total - a.total);
            this.setState({ dataRankStaff: arrStaffID }, () => {
              console.log(this.state.dataRankStaff);
            });
          }
        );
      });
  };
  render() {
    return (
      <>
        <div className="dasboard-item-title d-flex justify-content-between align-items-center pt-1 pb-1 pl-1 border border-black">
          <p className="m-0 dasboard-item-title-p">
            Xếp hạng nhân viên theo doanh thu
          </p>
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
                <th scope="col">Giới tính</th>
                <th scope="col">Chức vụ</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Tổng tiền đã bán</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dataRankStaff.slice(0, 10).map((item, index) => {
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
                    <td>{item.staff_name ? item.staff_name : "Chưa rõ"}</td>
                    <td>
                      {item.staff_gender === "1"
                        ? "Nam"
                        : item.staff_gender === 2
                        ? "Nữ"
                        : "Chưa rõ"}
                    </td>
                    <td>
                      {item.staff_position ? item.staff_position : "Chưa rõ"}
                    </td>
                    <td>
                      {item.staff_address ? item.staff_address : "Chưa rõ"}
                    </td>
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
export default StaffSellMost;
