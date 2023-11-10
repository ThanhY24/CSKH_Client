import React from "react";
class StaffImportForm extends React.Component {
  render() {
    return (
      <div
        className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
        id="import-form-container"
      >
        <form className="insert-form">
          <p className="row m-0 p-o w-100 insert-form-title">
            Import dữ liệu khách hàng
          </p>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Chọn File Excel
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="file"
                    className="insert-form-input"
                    name="cus_name"
                    onChange={this.uploadCustomerHandle}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <a href="a">Tải về mẫu file excel</a>
              </div>
            </div>
          </div>
          <div className="row p-0 w-100 justify-content-end insert-form-gr">
            <p
              className="col-auto p_button bg-danger"
              id="btn_close_forminsert"
              onClick={this.closeImportForm}
            >
              Đóng
            </p>
            <button
              className="col-auto p_button"
              id="submit_forminsert"
              onClick={this.uploadCustomer}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default StaffImportForm;
