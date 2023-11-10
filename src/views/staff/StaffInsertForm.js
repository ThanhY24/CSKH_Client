import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
class StaffInsertForm extends React.Component {
  state = {
    dataStaffInsert: {
      staff_id: null,
      staff_name: "",
      staff_birthday: "",
      staff_gender: "1",
      staff_phone: "",
      staff_email: "",
      staff_password: "123",
      staff_address: "",
      staff_position: "",
      staff_role: "1",
      staff_status: "1",
    },
  };
  // Tạo sự kiện khi nhấn thay đổi input
  onChangeInputFormInsert = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataStaffInsert: {
          ...prevState.dataStaffInsert,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataStaffInsert);
      }
    );
  };
  // Gửi dữ liệu đi để thêm nhân viên
  submitFormInsert = (event) => {
    event.preventDefault();
    document.getElementById("loading-container").style.display = "flex";
    axios
      .post("http://127.0.0.1:8000/api/v1/staff", this.state.dataStaffInsert)
      .then((response) => {
        toast.success(response.data.message);
        document.getElementById("loading-container").style.display = "none";
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };
  render() {
    const { closeFormInsertStaff } = this.props;
    return (
      <div
        className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
        id="insert-form-container"
      >
        <form className="insert-form" onSubmit={this.submitFormInsert}>
          <p className="row m-0 p-o w-100 insert-form-title">Thêm nhân viên</p>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Mã nhân viên
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
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
                    Tên nhân viên
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="VD: Nguyễn Văn A"
                    name="staff_name"
                    onChange={this.onChangeInputFormInsert}
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
                    Ngày sinh
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="date"
                    className="insert-form-input"
                    name="staff_birthday"
                    onChange={this.onChangeInputFormInsert}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Địa chỉ mail
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="nguyenvana@gmail.com"
                    name="staff_email"
                    onChange={this.onChangeInputFormInsert}
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
                    Số điện thoại
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="VD: 0866747580"
                    name="staff_phone"
                    onChange={this.onChangeInputFormInsert}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Quyền hạn
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <select
                    name="staff_role"
                    className="insert-form-select"
                    onChange={this.onChangeInputFormInsert}
                    id=""
                  >
                    <option value="QTV">Quản trị viên</option>
                    <option value="CSKH">Nhân viên CSKH</option>
                    <option value="KD">Nhân viên kinh doanh</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Địa chỉ nơi ở
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="Nhập địa chỉ nơi ở"
                    name="staff_address"
                    onChange={this.onChangeInputFormInsert}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Chức vụ
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="Nhập chức vụ của nhân viên"
                    name="staff_position"
                    onChange={this.onChangeInputFormInsert}
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
                    Giới tính
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <select
                    name="staff_gender"
                    className="insert-form-select"
                    onChange={this.onChangeInputFormInsert}
                    id=""
                  >
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
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
              onClick={closeFormInsertStaff}
            >
              Đóng
            </p>
            <button
              className="col-auto p_button"
              id="submit_forminsert"
              onClick={closeFormInsertStaff}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default StaffInsertForm;
