import React from "react";
// Toast
import { toast } from "react-toastify";
// Axios
import { Link } from "react-router-dom";
import axios from "axios";
import { parseISO, format } from "date-fns";
// Class
class Transaction extends React.Component {
  state = {
    dataCheck: 0,
    dataTransactionResult: [],
    dataTransaction: [],
    dataUpdateStatus: [],
    transaction_result_id: "",
    dataTransfer: {
      staff_id: "",
      transaction_id: "",
    },
    dataStaffTransfer: [],
    dataCopyTranfer: {
      transaction_start_date: "",
      transaction_deadline_date: "",
    },
    transaction_copy_id: "",
  };
  // Lấy dữ liệu
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/transaction/getByID/" +
          JSON.parse(localStorage.getItem("dataUser"))["staff_id"]
      )
      .then((response) => {
        this.setState({
          dataTransaction: response.data.dataTransactionNew,
        });
        document.getElementById("loading-container").style.display = "none";
      });
  };
  // Mở form xác nhận trạng thái
  openFormUpdateStatusTransaction = (id) => {
    console.log(id);
    this.getDataTransactionResult();
    axios
      .get("http://127.0.0.1:8000/api/v1/transaction/" + id)
      .then((response) => {
        this.setState({
          dataUpdateStatus: response.data,
        });
      });
    document.getElementById("edit-form-container").style.display = "flex";
  };
  // Lấy danh sách kết quả
  getDataTransactionResult = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/transaction-result")
      .then((response) => {
        this.setState({
          dataTransactionResult: response.data,
        });
      });
  };
  // Đóng form xác nhận trang thái
  closeFormUpdateStatusTransaction = () => {
    document.getElementById("edit-form-container").style.display = "none";
  };
  // Thay đổi input
  onChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    // Thay đổi dataCopyTranfer khi thay đổi các input
    if (
      name === "transaction_start_date" ||
      name === "transaction_deadline_date"
    ) {
      this.setState(
        (prevState) => ({
          dataCopyTranfer: {
            ...prevState.dataCopyTranfer,
            [name]: value,
          },
        }),
        () => {
          console.log(this.state.dataCopyTranfer);
        }
      );
    }
  };
  // Đổi trạng thái hoàn thành (0 là hoàn thành)
  updateStatusTransaction = (id, event) => {
    event.preventDefault();
    axios
      .get("http://127.0.0.1:8000/api/v1/transaction-complete/" + id, {
        params: {
          transaction_result_id: this.state.transaction_result_id,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        this.getData();
        this.closeFormUpdateStatusTransaction();
      });
  };
  // Sao chép giao dịch
  copyTransaction = (event) => {
    const confirmCopy = window.confirm(
      "Bạn có chắc chắn muốn sao chép giao dịch này?"
    );
    if (confirmCopy) {
      event.preventDefault();
      axios
        .post(
          "http://127.0.0.1:8000/api/v1/transaction-copy/" +
            this.state.transaction_copy_id,
          this.state.dataCopyTranfer
        )
        .then((response) => {
          toast.success(response.data.message);
          this.closeFormCopy();
          this.getData();
        });
    }
  };
  openFormCopy = (id) => {
    this.setState(
      {
        transaction_copy_id: id,
      },
      () => {
        console.log(this.state.transaction_copy_id);
      }
    );
    document.getElementById("copy-form-container").style.display = "flex";
  };
  closeFormCopy = () => {
    document.getElementById("copy-form-container").style.display = "none";
    console.log(this.state.dataTransfer);
  };
  // Transfer
  openFormTransfer = (transaction_id) => {
    axios.get("http://127.0.0.1:8000/api/v1/staff").then((response) => {
      this.setState({
        dataStaffTransfer: response.data,
      });
      this.setState({
        dataTransfer: {
          ...this.state.dataTransfer,
          transaction_id: transaction_id,
        },
      });
    });

    document.getElementById("transfer-form-container").style.display = "flex";
  };
  closeFormTransfer = () => {
    document.getElementById("transfer-form-container").style.display = "none";
    console.log(this.state.dataTransfer);
  };
  onChangeInputTransfer = (event) => {
    const { name, value } = event.target;
    this.setState({
      dataTransfer: { ...this.state.dataTransfer, [name]: value },
    });
  };
  submitFormTransfer = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/transaction-transfer",
        this.state.dataTransfer
      )
      .then((response) => {
        toast.success(response.data.data);
        this.getData();
        this.closeFormTransfer();
      });
  };
  deleteTransaction = ($id) => {
    axios
      .get("http://127.0.0.1:8000/api/v1/transaction-delete/" + $id)
      .then((response) => {
        console.log("http://127.0.0.1:8000/api/v1/transaction-delete/" + $id);
        toast.success(response.data.message);
        this.getData();
      });
  };

  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tất cả giao dịch</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <Link
              className="p_button"
              id="btn_add_forminsert"
              to={"/transactions/insert"}
            >
              <i className="fa-solid fa-plus"></i>Thêm Giao Dịch
            </Link>
            <Link className="p_button bg-success" to="/transaction-result">
              <i className="fa-solid fa-plus"></i>Thêm Kết Quả
            </Link>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row h-100 p-0 m-0">
            <div className="col-12 main-content-col datatable">
              <div className="row p-0 m-0 datatable-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Thao Tác</th>
                      <th scope="col">Tên giao dịch</th>
                      <th scope="col">Ghi chú</th>
                      <th scope="col">Người thực hiện</th>
                      <th scope="col">Khách hàng</th>
                      <th scope="col">Số điện thoại KH</th>
                      <th scope="col">Email KH</th>
                      <th scope="col">Ngày mở</th>
                      <th scope="col">Thời hạn</th>
                      <th scope="col">Ngày hoàn thành</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataTransaction.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td className="td_action d-flex">
                            <p
                              className="p_button_table bg-danger"
                              title="Xóa bỏ giao dịch"
                              onClick={() => {
                                this.deleteTransaction(item.transaction_id);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </p>

                            {item.transaction_status === "1" && (
                              <>
                                <p
                                  className="p_button_table bg-success"
                                  title="Đánh dấu là hoàn thành"
                                  onClick={() => {
                                    this.openFormUpdateStatusTransaction(
                                      item.transaction_id
                                    );
                                  }}
                                >
                                  <i className="fa-solid fa-check-double"></i>
                                </p>

                                <Link
                                  className="p_button_table bg-info"
                                  to={
                                    "http://127.0.0.1:8000/call/" + item.cus_id
                                  }
                                  target="_blank"
                                >
                                  <i className="fa-solid fa-phone"></i>
                                </Link>
                                <p
                                  className="p_button_table bg-warning"
                                  title="Chuyển giao cho người khác"
                                  onClick={(event) => {
                                    this.openFormTransfer(item.transaction_id);
                                  }}
                                >
                                  <i className="fa-solid fa-right-left"></i>
                                </p>
                              </>
                            )}
                            <p
                              className="p_button_table bg-primary"
                              title="Sao chép giao dịch"
                              onClick={() => {
                                this.openFormCopy(item.transaction_id);
                              }}
                            >
                              <i className="fa-regular fa-copy"></i>
                            </p>
                            {item.transaction_status === "0" ? (
                              <Link
                                to={`/changes/convert/${item.staff_id}/${item.cus_id}`}
                                className="p_button_table bg-info"
                                title="Chuyển sang cơ hội"
                              >
                                <i className="fa-solid fa-shuffle"></i>
                              </Link>
                            ) : null}
                          </td>
                          <td>{item.transaction_name}</td>
                          <td>
                            {item.transaction_note === null
                              ? ""
                              : item.transaction_note
                                  .split(",")
                                  .map((note, index) => (
                                    <div key={index}>{note}</div>
                                  ))}
                          </td>
                          <td>{item.staff_name}</td>
                          <td>{item.cus_name}</td>
                          <td>{item.cus_phone}</td>
                          <td>{item.cus_email}</td>
                          <td>
                            {format(
                              parseISO(item.transaction_start_date),
                              "HH:mm:ss dd/MM/yyy"
                            )}
                            {/* {item.transaction_start_date} */}
                          </td>
                          <td>
                            {format(
                              parseISO(item.transaction_deadline_date),
                              "HH:mm:ss dd/MM/yyy"
                            )}
                            {/* {item.transaction_deadline_date} */}
                          </td>
                          <td>
                            {item.transaction_status === "1" ? (
                              <p className="p_button p_button_no_margin bg-warning">
                                Chưa hoàn thành
                              </p>
                            ) : item.transaction_status === "0" ? (
                              <div>
                                {format(
                                  parseISO(item.transaction_completion_date),
                                  "HH:mm:ss dd/MM/yyyy"
                                )}
                                <br />
                                <p className="p_button p_button_no_margin">
                                  {item.transaction_result_name}
                                </p>
                              </div>
                            ) : (
                              <p className="p_button p_button_no_margin bg-danger">
                                Đã trễ hạn
                              </p>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Main -->  */}
        {/* edit transaction */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="edit-form-container"
        >
          <form
            className="insert-form"
            onSubmit={(event) => {
              this.updateStatusTransaction(
                this.state.dataUpdateStatus.transaction_id,
                event
              );
            }}
          >
            <p className="row m-0 p-o w-100 insert-form-title">Điền kết quả</p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Kết quả của
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      value={this.state.dataUpdateStatus.transaction_name}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Nhập kết quả
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="transaction_result_id"
                      className="insert-form-select"
                      onChange={this.onChangeInput}
                      id=""
                    >
                      <option value={0}>Chọn kết quả</option>
                      {this.state.dataTransactionResult.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item.transaction_result_id}
                          >
                            {item.transaction_result_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-0 w-100 justify-content-end insert-form-gr">
              <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
              <p
                className="col-auto p_button bg-danger"
                id="btn_close_forminsert"
                onClick={this.closeFormUpdateStatusTransaction}
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        {/* Chuyển giao */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="transfer-form-container"
        >
          <form className="insert-form" onSubmit={this.submitFormTransfer}>
            <p className="row m-0 p-o w-100 insert-form-title">Chuyển giao</p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Giao dịch hiện tại
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      value={this.state.dataUpdateStatus.transaction_name}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Nhân viên chuyển giao
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="staff_id"
                      className="insert-form-select"
                      onChange={this.onChangeInputTransfer}
                      id=""
                    >
                      <option value={0}>Chọn nhân viên</option>
                      {this.state.dataStaffTransfer.map((item, index) => {
                        return (
                          <option key={index} value={item.staff_id}>
                            {item.staff_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-0 w-100 justify-content-end insert-form-gr">
              <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
              <p
                className="col-auto p_button bg-danger"
                id="btn_close_forminsert"
                onClick={this.closeFormTransfer}
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        {/* copy */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="copy-form-container"
        >
          <form
            className="insert-form"
            onSubmit={(event) => {
              this.copyTransaction(event);
            }}
          >
            <p className="row m-0 p-o w-100 insert-form-title">Sao chép</p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thời gian bắt đầu
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input"
                      name="transaction_start_date"
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Hạn hoàn thành
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input"
                      name="transaction_deadline_date"
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-0 w-100 justify-content-end insert-form-gr">
              <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
              <p
                className="col-auto p_button bg-danger"
                id="btn_close_forminsert"
                onClick={this.closeFormCopy}
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default Transaction;
