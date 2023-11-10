import React from "react";
class ToolbarCustomer extends React.Component {
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tất cả khách hàng</p>
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
            <p className="p_button" id="btn_add_forminsert">
              <i className="fa-solid fa-plus"></i>Thêm
            </p>
            <p className="p_button">
              <i className="fa-solid fa-file-import"></i>Import
            </p>
            <p className="p_button">
              <i className="fa-solid fa-people-group"></i>Nhóm
            </p>
          </div>
        </div>
      </>
    );
  }
}
export default ToolbarCustomer;
