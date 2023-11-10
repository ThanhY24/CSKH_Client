import React from "react";
class StaffEditForm extends React.Component {
  render() {
    const { dataStaffEdit, closeFormEditStaff, openFormEditStaff } = this.props;
    console.log(dataStaffEdit);
    return (
      <div
        className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
        id="edit-form-container"
      >
        <form className="insert-form">
          <p className="row m-0 p-o w-100 insert-form-title">
            Cập nhật thông tin nhân viên
          </p>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Mã khách hàng
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input type="text" className="insert-form-input" disabled />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Tên khách hàng
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="VD: Nguyễn Văn A"
                    name="cus_name"
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
                    name="cus_birthday"
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
                    name="cus_email"
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
                    name="cus_phone"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Mã số thuế
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="VD: 123456789"
                    name="cus_taxID"
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
                    Địa chỉ nơi ở
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="Nhập địa chỉ nơi ở"
                    name="cus_address"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Địa chỉ giao hàng
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    placeholder="Nhập địa chỉ giao hàng"
                    name="cus_address_ship"
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
                    name="cus_gender"
                    className="insert-form-select"
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
    );
  }
}
export default StaffEditForm;
