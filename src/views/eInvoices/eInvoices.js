import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formattedNumber from "../FormatCurrency";
import Loading from "../Loading";
import { parseISO, format } from "date-fns";
import ReactToPrint from "react-to-print";
import { el } from "date-fns/locale";

class eInvoices extends React.Component {
  state = {
    dataGetEInvoices: {
      pattern: "1/001",
      serial: "C23TAA",
      from: this.getCurrentDate(),
      to: this.getCurrentDate(),
    },
    invNo: "",
    token: "",
    dataEInvoices: [],
    dataInvoices: [], // Hóa đơn đc lưu trong csdl
    dataViewInvByFkey: "",
    fkey: "",
    eInvociesLog: "",
  };
  Loading = new Loading();
  componentDidMount() {
    this.setState({});
    this.getListInvByDate();
  }
  getListInvByDate = () => {
    this.openLoadingTable();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/getListInvByDate",
        this.state.dataGetEInvoices
      )
      .then((response) => {
        this.setState(
          {
            dataEInvoices: response.data.dataListInv,
            dataInvoices: response.data.dataInvCSDL,
          },
          this.closeLoadingTable()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Lấy giao diện hóa đơn
  getViewInvByToken = (invNo) => {
    this.setState(
      {
        invNo: invNo,
      },
      () => {
        let token =
          this.state.dataGetEInvoices.pattern +
          ";" +
          this.state.dataGetEInvoices.serial +
          ";" +
          this.state.invNo;
        this.Loading.openLoading();
        this.setState({
          token: token,
        });
        console.log(token);
        let dataSendAPI = { token: token };
        document.getElementById("view-inv-buttton").style.display = "none";
        axios
          .post(
            "http://127.0.0.1:8000/api/v1/eInvoices/getInvViewByToken",
            dataSendAPI
          )
          .then((response) => {
            this.setState(
              {
                dataViewInvByFkey: response.data.dataViewInv,
                fkey: response.data.fkey,
              },
              () => {
                console.log(this.state.fkey);
                document.getElementById("view-inv-container").innerHTML =
                  this.state.dataViewInvByFkey;
                document.getElementById("view-inv-buttton").style.display =
                  "flex";
                this.Loading.closeLoading();
                this.openViewInv();
              }
            );
          });
      }
    );
  };
  // Model hóa đơn
  openViewInv = () => {
    document.getElementById("show-inv-container").style.display = "block";
  };
  closeViewInv = () => {
    document.getElementById("show-inv-container").style.display = "none";
    this.setState({
      dataViewInvByFkey: "",
    });
  };
  openLoadingTable = () => {
    document.getElementById("loading-container-table").style.display = "flex";
  };
  closeLoadingTable = () => {
    document.getElementById("loading-container-table").style.display = "none";
  };
  // Thay đổi input tìm kiếm
  onChangeInput = (event) => {
    const { name, value } = event.target;
    const { dataGetEInvoices } = this.state;
    let newValue = format(parseISO(value), "dd/MM/yyy")
      ? format(parseISO(value), "dd/MM/yyy")
      : value;
    this.setState({
      dataGetEInvoices: {
        ...dataGetEInvoices,
        [name]: newValue,
      },
    });
  };
  // Chuyển đổi ngày tháng năm để điền từ state vào input
  convertDateToInputFormat(dateString) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateString; // Trả về nguyên gốc nếu không thành công
  }
  // Lấy ngày hiện tại
  getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }
  resetDateToToDay = () => {
    const currentDate = this.getCurrentDate();
    this.setState(
      (prevState) => ({
        dataGetEInvoices: {
          ...prevState.dataGetEInvoices,
          from: currentDate,
          to: currentDate,
        },
      }),
      () => {
        document.getElementById("fromDateGetInvByDate").value =
          this.convertDateToInputFormat(this.getCurrentDate());
        document.getElementById("toDateGetInvByDate").value =
          this.convertDateToInputFormat(this.getCurrentDate());
        this.getListInvByDate();
      }
    );
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Danh sách hóa đơn</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
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
                <label htmlFor="">Ký Hiệu</label>
                <input
                  name="serial"
                  placeholder="Nhập ký hiệu"
                  defaultValue={this.state.dataGetEInvoices.pattern}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
                <label htmlFor="">Mẫu số</label>
                <input
                  name="pattern"
                  placeholder="Nhập mẫu số"
                  defaultValue={this.state.dataGetEInvoices.serial}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
                <label htmlFor="">Từ ngày</label>
                <input
                  type="date"
                  id="fromDateGetInvByDate"
                  name="from"
                  defaultValue={this.convertDateToInputFormat(
                    this.state.dataGetEInvoices.from
                  )}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
                <label htmlFor="">Đến ngày</label>
                <input
                  type="date"
                  id="toDateGetInvByDate"
                  name="to"
                  defaultValue={this.convertDateToInputFormat(
                    this.state.dataGetEInvoices.to
                  )}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
              </div>
              <p
                className="p_button p-0 m-0 mt-3 fillter-button bg-primary"
                onClick={() => {
                  this.getListInvByDate();
                }}
              >
                Tìm Kiếm
              </p>
              <p
                className="p_button p-0 m-0 mt-3 fillter-button bg-success"
                onClick={() => {
                  this.resetDateToToDay();
                }}
              >
                Hôm Nay
              </p>
            </form>
            <div className="col-10 main-content-col datatable">
              <div className="row p-0 m-0 datatable-table">
                <div
                  className="container-fluid m-0 w-100 h-100 insert-form-container"
                  id="loading-container-table"
                >
                  <div id="loader" style={{ top: "unset", left: "unset" }}>
                    <div className="cube-folding">
                      <span className="leaf1"></span>
                      <span className="leaf2"></span>
                      <span className="leaf3"></span>
                      <span className="leaf4"></span>
                    </div>
                  </div>
                  <p className="loading-container-table-p">Đang Đợi VNPT</p>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Thao Tác</th>
                      <th scope="col">Số Hóa Đơn</th>
                      <th scope="col">Tên khách hàng</th>
                      <th scope="col">Ngày lập</th>
                      <th scope="col">Hình thức thanh toán</th>
                      <th scope="col">Tổng tiền chưa thuế</th>
                      <th scope="col">Tổng tiền thuế</th>
                      <th scope="col">Tổng tiền sau thuế</th>
                      <th scope="col">Loại hóa đơn</th>
                      <th scope="col">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataEInvoices.length > 0 ? (
                      this.state.dataEInvoices.map((item, index) => {
                        if (item !== false) {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <p
                                  className="p_button_table bg-warning"
                                  title="Xem hóa đơn"
                                  onClick={() => {
                                    this.getViewInvByToken(
                                      item.DLHDon?.TTChung?.SHDon
                                    );
                                  }}
                                  id="icon-open-view"
                                >
                                  <i className="fa-regular fa-eye"></i>
                                </p>
                              </td>
                              <td>
                                {String(item.DLHDon?.TTChung?.SHDon).padStart(
                                  8,
                                  "0"
                                )}
                              </td>
                              <td>{item.DLHDon?.NDHDon.NMua.Ten}</td>
                              <td>{item.DLHDon?.TTChung?.NLap}</td>
                              <td>Tiền Mặt</td>
                              <td>
                                {formattedNumber(
                                  Number(item.DLHDon?.NDHDon.TToan.TgTCThue)
                                )}
                              </td>
                              <td>
                                {formattedNumber(
                                  Number(item.DLHDon?.NDHDon.TToan.TgTThue)
                                )}
                              </td>
                              <td>
                                {formattedNumber(
                                  Number(item.DLHDon?.NDHDon.TToan.TgTTTBSo)
                                )}
                              </td>
                              <td>
                                {this.state.dataInvoices.map((item1) => {
                                  let token1 =
                                    this.state.dataGetEInvoices.pattern +
                                    ";" +
                                    this.state.dataGetEInvoices.serial +
                                    ";" +
                                    item.DLHDon?.TTChung?.SHDon;
                                  if (item1.invoices_token === token1) {
                                    if (item1.invoices_type === "2") {
                                      return "Điều chỉnh tăng";
                                    }
                                    if (item1.invoices_type === "3") {
                                      return "Điều chỉnh giảm";
                                    }
                                    if (item1.invoices_type === "4") {
                                      return "Điều chỉnh thông tin";
                                    }
                                    if (item1.invoices_type === "5") {
                                      return "Thay thế";
                                    }
                                    if (
                                      item1.invoices_type === "" ||
                                      item1.invoices_type === null ||
                                      item1.invoices_type === undefined
                                    ) {
                                      return "Hóa đơn gốc";
                                    }
                                  }
                                })}
                              </td>
                              <td>
                                {this.state.dataInvoices.map((item1) => {
                                  let token1 =
                                    this.state.dataGetEInvoices.pattern +
                                    ";" +
                                    this.state.dataGetEInvoices.serial +
                                    ";" +
                                    item.DLHDon?.TTChung?.SHDon;
                                  if (item1.invoices_token === token1) {
                                    if (
                                      item1.invoices_type === "2" ||
                                      item1.invoices_type === "3" ||
                                      item1.invoices_type === "4"
                                    ) {
                                      return (
                                        "Điều chỉnh hóa đơn số " +
                                        item1.invoices_original_no
                                      );
                                    }
                                    if (item1.invoices_type === "5") {
                                      return (
                                        "Thay thế hóa đơn số " +
                                        item1.invoices_original_no
                                      );
                                    }
                                  }
                                })}
                              </td>
                            </tr>
                          );
                        }
                      })
                    ) : (
                      <p className="ml-2 mt-2" style={{ fontSize: "16px" }}>
                        Không có dữ liệu
                      </p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Main --> */}
        <div
          className="container-fluid m-0 w-100 h-100 insert-form-container"
          id="show-inv-container"
        >
          <div className="print-button d-flex flex-column justify-content-end">
            <Link
              className="p_button bg-primary inv-view-button-item"
              to={
                "change-information/" +
                this.state.fkey +
                "?pattern=" +
                this.state.dataGetEInvoices.pattern +
                "&serial=" +
                this.state.dataGetEInvoices.serial +
                "&no=" +
                this.state.invNo
              }
            >
              Điều Chỉnh Thông Tin
            </Link>
            <Link
              className="p_button bg-primary inv-view-button-item"
              to={
                "change-increases/" +
                this.state.fkey +
                "?pattern=" +
                this.state.dataGetEInvoices.pattern +
                "&serial=" +
                this.state.dataGetEInvoices.serial +
                "&no=" +
                this.state.invNo
              }
            >
              Điều Chỉnh Tăng
            </Link>
            <Link
              className="p_button bg-primary inv-view-button-item"
              to={
                "change-reduced/" +
                this.state.fkey +
                "?pattern=" +
                this.state.dataGetEInvoices.pattern +
                "&serial=" +
                this.state.dataGetEInvoices.serial +
                "&no=" +
                this.state.invNo
              }
            >
              Điều Chỉnh Giảm
            </Link>
            <Link
              className="p_button bg-primary inv-view-button-item"
              to={
                "replace/" +
                this.state.fkey +
                "?pattern=" +
                this.state.dataGetEInvoices.pattern +
                "&serial=" +
                this.state.dataGetEInvoices.serial +
                "&no=" +
                this.state.invNo
              }
            >
              Thay thế hóa đơn
            </Link>
            <ReactToPrint
              trigger={() => (
                <p className="p_button bg-success inv-view-button-item">
                  <i className="fa-solid fa-print"></i>In
                </p>
              )}
              content={() => document.getElementById("printView")}
            />
            <p
              className="p_button bg-danger inv-view-button-item"
              id="view-inv-buttton"
              onClick={() => {
                this.closeViewInv();
              }}
            >
              Đóng
            </p>
          </div>
          <div className="view-inv-container" id="view-inv-container"></div>
        </div>
      </>
    );
  }
}
export default eInvoices;
