import React from "react";
// Toast
import { toast } from "react-toastify";
import { parseISO, format } from "date-fns";
// Axios
import axios from "axios";
// Class
class TransactionResult extends React.Component {
  state = {
    dataInsertTransactionResult: {
      transaction_result_id: null,
      transaction_result_name: "",
      transaction_result_status: "1",
    },
    dataTransactionResult: [],
  };
  resetData = () => {
    this.setState({
      dataInsertTransactionResult: {
        transaction_result_id: null,
        transaction_result_name: "",
        transaction_result_status: "1",
      },
    });
  };
  // Danh sách
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/transaction-result")
      .then((response) => {
        this.setState({
          dataTransactionResult: response.data,
        });
      });
  };
  // Thêm
  onChangeInputFormInsert = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      dataInsertTransactionResult: {
        ...prevState.dataInsertTransactionResult,
        [name]: value,
      },
    }));
  };
  submitFormInsert = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/insert-transaction-result",
        this.state.dataInsertTransactionResult
      )
      .then((response) => {
        toast.success(response.data.message);
        this.getData();
        this.resetData();
      });
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tất cả kết quả</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <a
              className="p_button bg-danger"
              id="btn_add_forminsert"
              href="/transaction"
            >
              <i className="fa-solid fa-arrow-left"></i>Quay lại
            </a>
            <a className="p_button bg-success" href="/">
              <i className="fa-solid fa-file-export "></i>Export
            </a>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row p-0 m-0 justify-content-between">
            <div className="col-auto m-0 services-container">
              <p className="form-title ">Danh sách kết quả</p>
              <div className="col-10 main-content-col datatable">
                <div className="row p-0 m-0 datatable-table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Hành động</th>
                        <th scope="col">Tên kết quả</th>
                        <th scope="col">Ngày Tạo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataTransactionResult.map((item, index) => {
                        return (
                          <tr key={item.transaction_result_id}>
                            <th scope="row">{index + 1}</th>
                            <td className="td_action d-flex">
                              <p className="p_button_table bg-danger">
                                <i className="fa-solid fa-trash"></i>
                              </p>
                            </td>
                            <td>{item.transaction_result_name}</td>
                            <td>
                              {format(
                                parseISO(item.created_at),
                                "HH:mm:ss dd/MM/yyy"
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
            <div className="col-auto m-0 services-container">
              <p className="form-title">Thêm mới kết quả</p>
              <form
                action=""
                className="form-services"
                onSubmit={this.submitFormInsert}
              >
                <div className="row p-0 w-100 justify-content-between insert-form-gr">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <div className="row m-0 p-0 h-100 w-100 align-items-center">
                      <div className="col-2 p-0 m-0">
                        <label htmlFor="" className="insert-form-label">
                          Mã
                        </label>
                      </div>
                      <div className="col-10 p-0 m-0">
                        <input
                          type="text"
                          name=""
                          className="insert-form-input"
                          placeholder="Mã tự sinh"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <div className="row m-0 p-0 h-100 w-100 align-items-center">
                      <div className="col-2 p-0 m-0">
                        <label htmlFor="" className="insert-form-label">
                          Tên
                        </label>
                      </div>
                      <div className="col-10 p-0 m-0">
                        <input
                          type="text"
                          name="transaction_result_name"
                          className="insert-form-input"
                          placeholder="Nhập tên kết quả"
                          onChange={this.onChangeInputFormInsert}
                          defaultValue={
                            this.state.dataInsertTransactionResult
                              .transaction_result_id
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p-0 w-100 justify-content-between insert-form-gr">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <div className="row m-0 p-0 h-100 w-100 align-items-center">
                      <div className="col-2 p-0 m-0">
                        <label htmlFor="" className="insert-form-label">
                          Trạng thái
                        </label>
                      </div>
                      <div className="col-10 p-0 m-0">
                        <select
                          name="transaction_result_status"
                          id=""
                          className="insert-form-select"
                          onChange={this.onChangeInputFormInsert}
                          defaultValue={
                            this.state.dataInsertTransactionResult
                              .transaction_result_status
                          }
                        >
                          <option value="1">Hoạt động</option>
                          <option value="0">Tạm ẩn</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
                    <button className="col-auto p_button">Xác nhận</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default TransactionResult;
