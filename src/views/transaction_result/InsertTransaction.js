import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class InsertTransaction extends React.Component {
  state = {
    dataInsertTransaction: {
      transaction_id: null,
      transaction_name: "",
      transaction_des: "",
      transaction_evaluation: "",
      transaction_note: "",
      transaction_start_date: "",
      transaction_deadline_date: "",
      transaction_completion_date: "",
      transaction_result_id: "0",
      staff_id: "",
      cus_id: "0",
      change_id: "0",
      transaction_status: "1",
    },
    dataCustomer: [],
    dataStaff: [],
    dataChange: [],
    sendMail: "0",
  };
  // Lấy khách hàng và nhân viên và cơ hội
  componentDidMount() {
    this.getCustomer();
    this.getStaff();
    this.getChange();
  }
  getCustomer = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/customers")
      .then((response) => {
        this.setState({ dataCustomer: response.data });
      })
      .catch((error) => {
        console.log("Lỗi rồi: ", error);
      });
  };
  getStaff = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/staff")
      .then((response) => {
        this.setState({ dataStaff: response.data });
      })
      .catch((error) => {
        console.log("Lỗi rồi: ", error);
      });
  };
  getChange = () => {
    axios.get("http://127.0.0.1:8000/api/v1/change").then((response) => {
      this.setState({
        dataChange: response.data,
      });
    });
  };
  // Thay đổi input
  onChangeInputFormInsert = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataInsertTransaction: {
          ...prevState.dataInsertTransaction,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataInsertTransaction);
      }
    );
  };
  onCheckSendMail = (event) => {
    const { checked } = event.target;

    // Nếu checkbox được chọn, thay đổi giá trị sendMail thành "1", ngược lại thành "0"
    this.setState({
      sendMail: checked ? "1" : "0",
    });
  };
  // submit form
  submitFormInsert = (event) => {
    if (this.state.dataInsertTransaction.transaction_start_date === "") {
      const currentDateTime = new Date().toISOString().slice(0, 16);
      this.setState((prevState) => ({
        dataInsertTransaction: {
          ...prevState.dataInsertTransaction,
          transaction_start_date: currentDateTime,
        },
      }));
    }
    event.preventDefault();
    const data = {
      sendMail: this.state.sendMail,
      dataInsertTransaction: this.state.dataInsertTransaction,
    };
    console.log(data);
    axios
      .post("http://127.0.0.1:8000/api/v1/insert-transaction", data)
      .then((response) => {
        toast.success(response.data.message);
      });
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">
            Giao dịch với khách hàng
          </p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <p className="p_button bg-success">
              <i className="fa-solid fa-file-import "></i>Import
            </p>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-block"
          id="insert-form-container"
        >
          <form
            action=""
            className="insert-form"
            onSubmit={this.submitFormInsert}
          >
            <p className="row m-0 p-o w-100 insert-form-title">
              Thêm giao dịch
            </p>
            <div className="row p-0 w-100 justify-content-between">
              <div className="col-6">
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mã
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Mã tự sinh"
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Tên giao dịch
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder=""
                      name="transaction_name"
                      onChange={this.onChangeInputFormInsert}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mô tả
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder=""
                      name="transaction_des"
                      onChange={this.onChangeInputFormInsert}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ghi chú
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder=""
                      name="transaction_note"
                      onChange={this.onChangeInputFormInsert}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thời gian bắt đầu
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input-block"
                      placeholder=""
                      name="transaction_start_date"
                      // value={new Date().toISOString().slice(0, 16)}
                      onChange={this.onChangeInputFormInsert}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Hạn hoàn thành
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input-block"
                      placeholder=""
                      name="transaction_deadline_date"
                      onChange={this.onChangeInputFormInsert}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Người thực hiện
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="staff_id"
                      defaultValue={0}
                      className="insert-form-select"
                      onChange={this.onChangeInputFormInsert}
                      id=""
                    >
                      <option value={0}>Chọn nhân viên</option>
                      {this.state.dataStaff.map((item, index) => {
                        return (
                          <option key={index} value={item.staff_id}>
                            {item.staff_name} - {item.staff_position} -
                            {" SĐT: "}
                            {item.staff_phone}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="cus_id"
                      value={this.state.dataInsertTransaction.cus_id}
                      className="insert-form-select"
                      onChange={this.onChangeInputFormInsert}
                      id=""
                      disabled={
                        this.state.dataInsertTransaction.change_id !== "0"
                      }
                    >
                      <option value="0">Chọn khách hàng</option>
                      {this.state.dataCustomer.map((item, index) => {
                        return (
                          <option key={index} value={item.cus_id}>
                            {item.cus_name} -{" SĐT: "}
                            {item.cus_phone}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thuộc cơ hội
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="change_id"
                      value={this.state.dataInsertTransaction.change_id}
                      className="insert-form-select"
                      onChange={this.onChangeInputFormInsert}
                      id=""
                      disabled={
                        this.state.dataInsertTransaction.customer_id !== "0"
                      }
                    >
                      <option value="0">Chọn cơ hội</option>
                      {this.state.dataChange.map((item, index) => {
                        return (
                          <option key={index} value={item.change_id}>
                            {item.change_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Gửi mail giao việc
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="checkbox"
                      className="insert-form-input-checkbox"
                      placeholder=""
                      name="sendMail"
                      onChange={this.onCheckSendMail}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center justify-content-end">
                  <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
                  <Link
                    to="http://localhost:3000/transactions"
                    className="col-auto p_button bg-danger"
                    id="btn_close_forminsert"
                  >
                    Quay Lại
                  </Link>
                  <button className="col-auto p_button">Xác nhận</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default InsertTransaction;
