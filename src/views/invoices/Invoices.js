import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import formatCurrency from "../FormatCurrency";

class Invoices extends React.Component {
  state = {
    dataCustomer: [],
    dataInvoices: [],
    dataSearch: {
      cus_id: 0,
      date_start: "",
      date_end: "",
    },
  };
  componentDidMount() {
    this.getDataCustomer();
    this.getDataInvoices();
  }
  getDataCustomer = () => {
    axios.get("http://127.0.0.1:8000/api/v1/customers").then((response) => {
      this.setState({
        dataCustomer: response.data,
      });
    });
  };
  getDataInvoices = () => {
    axios.get("http://127.0.0.1:8000/api/v1/invoices").then((response) => {
      this.setState({
        dataInvoices: response.data.data,
      });
    });
  };
  onChangeInputSearch = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataSearch: {
          ...prevState.dataSearch,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataSearch);
      }
    );
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Danh sách đơn hàng</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <Link
              to={"http://localhost:3000/invoices/insert"}
              className="p_button bg-primary"
              // style={{ fontSize: "40px" }}
            >
              <i className="fa-solid fa-plus"></i>Thêm
            </Link>
            <p className="p_button bg-info">
              <i className="fa-solid fa-file-export"></i>Export
            </p>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row h-100 p-0 m-0">
            <form className="col-2 main-content-col fillter">
              <p className="form-title m-0 p-0">
                LỌC HÓA ĐƠN THEO
                <i className="fa-solid fa-magnifying-glass"></i>
              </p>

              <div className="fillter-gr">
                <label htmlFor="">Khách hàng</label>
                <select
                  name="cus_id"
                  onChange={(event) => {
                    this.onChangeInputSearch(event);
                  }}
                >
                  <option value={0}>Chọn khách hàng</option>
                  {this.state.dataCustomer.map((item, index) => {
                    return (
                      <option value={item.cus_id} key={index}>
                        {item.cus_name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="">Từ ngày</label>
                <input
                  type="date"
                  name="date_start"
                  onChange={(event) => {
                    this.onChangeInputSearch(event);
                  }}
                />
                <label htmlFor="">Đến ngày</label>
                <input
                  type="date"
                  name="date_end"
                  onChange={(event) => {
                    this.onChangeInputSearch(event);
                  }}
                />
              </div>
              <p className="p_button p-0 m-0 mt-3 fillter-button bg-danger">
                Xóa Dữ Liệu
              </p>
            </form>
            <div className="col-10 main-content-col datatable">
              <div className="row p-0 m-0 datatable-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Thao Tác</th>
                      <th scope="col"></th>
                      <th scope="col">Nhân viên</th>
                      <th scope="col">Khách hàng</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Ngày hết hạn</th>
                      <th scope="col">Giá tiền</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataInvoices.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              to={"/invoices/details/" + item.invoices_id}
                              className="p_button_table bg-warning"
                              title="Xem báo giá"
                            >
                              <i className="fa-regular fa-eye"></i>
                            </Link>
                          </td>
                          <td></td>
                          <td>{item.staff_name}</td>
                          <td>{item.cus_name}</td>
                          <td>
                            {format(
                              parseISO(item.invoices_date),
                              "HH:mm:ss dd/MM/yyy"
                            )}
                          </td>
                          <td>
                            {format(
                              parseISO(item.due_date),
                              "HH:mm:ss dd/MM/yyy"
                            )}
                          </td>
                          <td>
                            {formatCurrency(Number(item.invoices_total_amount))}
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="row p-0 m-0 datatable-footer justify-content-end">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="link">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      5
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default Invoices;
