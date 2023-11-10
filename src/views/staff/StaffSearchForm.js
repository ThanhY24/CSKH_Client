import React from "react";
import axios from "axios";

class StaffSearchForm extends React.Component {
  state = {
    dataSearch: {},
  };
  onChangeFormSearch = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataSearch: {
          ...prevState.dataSearch,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataSearch);
      }
    );
  };
  submitFormSearch = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/v1/staff-search", this.state.dataSearch)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {});
  };
  render() {
    return (
      <form className="col-2 main-content-col fillter">
        <p className="form-title m-0 p-0">
          LỌC KHÁCH HÀNG THEO
          <i className="fa-solid fa-magnifying-glass"></i>
        </p>
        <div className="fillter-gr">
          <label htmlFor="">Mã nhân viên</label>
          <input
            type="text"
            name="staff_id"
            placeholder="Mã nhân viên"
            onChange={this.onChangeFormSearch}
          />
        </div>
        <div className="fillter-gr">
          <label htmlFor="">Tên nhân viên</label>
          <input
            type="text"
            name="staff_name"
            placeholder="Tên nhân viên"
            onChange={this.onChangeFormSearch}
          />
        </div>
        <div className="fillter-gr">
          <label htmlFor="">Địa chỉ</label>
          <input
            type="text"
            name="staff_address"
            placeholder="Địa chỉ"
            onChange={this.onChangeFormSearch}
          />
        </div>
        <div className="fillter-gr">
          <label htmlFor="">Giới tính</label>
          <select name="staff_gender" id="" onChange={this.onChangeFormSearch}>
            <option value="">Chọn</option>
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
          </select>
        </div>
        <p
          className="p_button p-0 m-0 mt-3 fillter-button"
          onClick={this.submitFormSearch}
        >
          Áp Dụng
        </p>
        <p className="p_button p-0 m-0 mt-3 fillter-button bg-danger">
          Xóa Dữ Liệu
        </p>
      </form>
    );
  }
}
export default StaffSearchForm;
