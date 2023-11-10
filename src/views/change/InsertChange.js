import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class InsertChange extends React.Component {
  state = {
    dataInsertChange: {
      change_name: "",
      change_des: "",
      change_start_date: "",
      change_expected_date: "",
      change_ratio: "",
      cus_id: "",
      change_status: "0",
    },
    dataCustomer: [],
    dataCustomerSelected: {},
  };
  componentDidMount() {
    this.getDataCustomer();
  }
  getDataCustomer = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/customers")
      .then((response) => {
        this.setState({
          dataCustomer: response.data,
        });
      })
      .catch();
  };
  onChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataInsertChange: {
          ...prevState.dataInsertChange,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataInsertChange);
      }
    );
  };
  onChangeInputSelectCus = (event) => {
    const { value } = event.target;

    // Tìm thông tin khách hàng tương ứng
    const selectedCustomer = this.state.dataCustomer.find(
      (customer) => customer.cus_id === parseInt(value, 10)
    );
    if (selectedCustomer) {
      // Cập nhật trực tiếp các input khách hàng tương ứng
      this.setState((prevState) => ({
        dataCustomerSelected: {
          ...prevState.dataCustomerSelected,
          cus_address: selectedCustomer.cus_address || "",
          cus_gender: selectedCustomer.cus_gender || "",
          cus_phone: selectedCustomer.cus_phone || "",
          cus_email: selectedCustomer.cus_email || "",
        },
      }));
    }
  };
  onSubmitFormInsert = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/insert-change",
        this.state.dataInsertChange
      )
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "http://localhost:3000/change";
        }, 1000);
      });
  };

  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Cơ hội</p>
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
            onSubmit={this.onSubmitFormInsert}
          >
            <p className="row m-0 p-o w-100 insert-form-title">Thêm cơ hội</p>
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
                      Tên cơ hội
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder=""
                      name="change_name"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ngày bắt đầu
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="date"
                      className="insert-form-input-block"
                      placeholder=""
                      name="change_start_date"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ngày kỳ vọng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="date"
                      className="insert-form-input-block"
                      placeholder=""
                      name="change_expected_date"
                      onChange={this.onChangeInput}
                      required
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
                      name="change_des"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Tỷ lệ thành công
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="number"
                      className="insert-form-input-block"
                      placeholder=""
                      name="change_ratio"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Chọn khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="cus_id"
                      defaultValue={0}
                      className="insert-form-select"
                      id=""
                      onChange={(event) => {
                        this.onChangeInput(event);
                        this.onChangeInputSelectCus(event);
                      }}
                    >
                      <option value="0">Chọn</option>
                      {this.state.dataCustomer.map((item, index) => {
                        return (
                          <option key={index} value={item.cus_id}>
                            {item.cus_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Địa chỉ
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="cus_address"
                      defaultValue={this.state.dataCustomerSelected.cus_address}
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Giới tính
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="cus_gender"
                      defaultValue={this.state.dataCustomerSelected.cus_gender}
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Số điện thoại
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="cus_phone"
                      defaultValue={this.state.dataCustomerSelected.cus_phone}
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Email
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="cus_email"
                      defaultValue={this.state.dataCustomerSelected.cus_email}
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center justify-content-end">
                  <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>

                  <Link
                    to="http://localhost:3000/changes"
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
export default InsertChange;
