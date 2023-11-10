import React from "react";
class FillterCustomer extends React.Component {
  render() {
    return (
      <>
        <form className="col-2 main-content-col fillter">
          <p className="form-title m-0 p-0">LỌC KHÁCH HÀNG</p>
          <div className="fillter-gr">
            <label htmlFor="">Mã khách hàng</label>
            <input type="text" placeholder="Mã khách hàng" />
          </div>
          <div className="fillter-gr">
            <label htmlFor="">Tên khách hàng</label>
            <input type="text" placeholder="Mã khách hàng" />
          </div>
          <div className="fillter-gr">
            <label htmlFor="">Địa chỉ</label>
            <input type="text" placeholder="Mã khách hàng" />
          </div>
          <div className="fillter-gr">
            <label htmlFor="">Giới tính</label>
            <select name="" id="">
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
          </div>
          <div className="fillter-gr">
            <label htmlFor="">Nhóm</label>
            <select name="" id="">
              <option value="nam">Nhóm 1</option>
              <option value="nu">Nhóm 2</option>
            </select>
          </div>
          <p className="p_button p-0 m-0 mt-3 fillter-button">Áp Dụng</p>
          <p className="p_button p-0 m-0 mt-3 fillter-button bg-danger">
            Xóa Dữ Liệu
          </p>
        </form>
      </>
    );
  }
}
export default FillterCustomer;
