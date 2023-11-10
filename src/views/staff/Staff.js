import React from "react";
// Component
import StaffDataTable from "./StaffDataTbale";
import StaffSearchForm from "./StaffSearchForm";
import StaffInsertForm from "./StaffInsertForm";
import StaffImportForm from "./StaffImportForm";
// Toast
import { toast } from "react-toastify";
// Axios
import axios from "axios";
// Class
class Staff extends React.Component {
  state = {
    dataStaffEdit: {
      staff_id: null,
      staff_name: "",
      staff_birthday: "",
      staff_gender: "1",
      staff_phone: "",
      staff_email: "",
      staff_password: "123456",
      staff_address: "",
      staff_position: "",
      staff_role: "1",
      staff_status: "1",
    },
  };
  // Nhấn nút chỉnh sửa bên DataStaffTable
  handleEdit = (dataStaffEdit) => {
    this.setState({ dataStaffEdit: dataStaffEdit });
    this.openFormEditStaff();
  };
  // Sự kiện submit formedit
  editFormStaff = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/staff/" +
          this.state.dataStaffEdit.staff_id,
        this.state.dataStaffEdit
      )
      .then((response) => {
        toast.success(response.data.message);
        this.closeFormEditStaff();
      })
      .catch((error) => {
        console.log("Lỗi: ", error);
      });
  };
  onChangeInputFormEdit = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataStaffEdit: {
          ...prevState.dataStaffEdit,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataStaffEdit);
      }
    );
  };

  // Sự kiện form insert
  openFormInsertStaff = () => {
    document.getElementById("insert-form-container").style.display = "flex";
  };
  closeFormInsertStaff = () => {
    document.getElementById("insert-form-container").style.display = "none";
  };
  // Sự kiện form edit
  openFormEditStaff = () => {
    document.getElementById("edit-form-container").style.display = "flex";
  };
  closeFormEditStaff = () => {
    document.getElementById("edit-form-container").style.display = "none";
    this.setState(
      {
        dataStaffEdit: {
          staff_id: null,
          staff_name: "",
          staff_birthday: "",
          staff_gender: "1",
          staff_phone: "",
          staff_email: "",
          staff_password: "123456",
          staff_address: "",
          staff_position: "",
          staff_role: "1",
          staff_status: "1",
        },
      },
      () => {
        console.log(this.state.dataStaffEdit);
      }
    );
  };
  // export
  exportStaff = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/staff-export")
      .then((response) => {
        console.log(123);
      })
      .catch((error) => {
        console.log("Lỗi: ", error);
      });
  };

  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tất cả nhân viên</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <form className="toolbar-search-form" action="">
              <input
                type="text"
                placeholder="Tìm kiếm liên hệ, hoặc khách hàng"
              />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <p
              className="p_button"
              id="btn_add_forminsert"
              onClick={this.openFormInsertStaff}
            >
              <i className="fa-solid fa-plus"></i>Thêm
            </p>
            <p className="p_button bg-success">
              <i className="fa-solid fa-file-import "></i>Import
            </p>
            <p className="p_button bg-info" onClick={this.exportStaff}>
              <i className="fa-solid fa-file-export"></i>Export
            </p>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row h-100 p-0 m-0">
            {/* SearchForm */}
            <StaffSearchForm />
            {/* DataTable */}
            <StaffDataTable onEdit={this.handleEdit} />
          </div>
        </div>
        {/* Insert Form */}
        <StaffInsertForm closeFormInsertStaff={this.closeFormInsertStaff} />
        {/* Edit Customer Form */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="edit-form-container"
        >
          <form className="insert-form" onSubmit={this.editFormStaff}>
            <p className="row m-0 p-o w-100 insert-form-title">
              Chỉnh sửa thông tin nhân viên
            </p>
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
                      value={this.state.dataStaffEdit.staff_id || ""}
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_name || ""}
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_birthday || ""}
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_email || ""}
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_phone || ""}
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_role || ""}
                      id=""
                    >
                      <option value="QQTV">Quản trị viên</option>
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_address || ""}
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_position || ""}
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
                      onChange={this.onChangeInputFormEdit}
                      value={this.state.dataStaffEdit.staff_gender || ""}
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
                onClick={this.closeFormEditStaff}
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        {/* Import File */}
        <StaffImportForm />
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default Staff;
