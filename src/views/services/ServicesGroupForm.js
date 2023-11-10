import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
class ServicesGroupForm extends React.Component {
  state = {
    dataInsertSer_Gr: {
      ser_gr_id: null,
      ser_gr_name: "",
      ser_gr_status: "1",
    },
  };
  // Sự kiện khi nhập liệu
  onChangeInputFormInsert = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      dataInsertSer_Gr: {
        ...prevState.dataInsertSer_Gr,
        [name]: value,
      },
    }));
  };
  submitFormInsert = (event) => {
    event.preventDefault();
    document.getElementById("loading-container").style.display = "flex";
    if (this.state.dataInsertSer_Gr.ser_gr_name !== "") {
      axios
        .post(
          "http://127.0.0.1:8000/api/v1/services-group",
          this.state.dataInsertSer_Gr
        )
        .then((response) => {
          toast.success(response.data.message);
          document.getElementById("loading-container").style.display = "none";
        })
        .catch();
    } else {
      toast.warning("Chưa nhập đủ thông tin");
    }
  };
  render() {
    return (
      <>
        <form action="" className="" onSubmit={this.submitFormInsert}>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Tên nhóm
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    name="ser_gr_name"
                    className="insert-form-input"
                    placeholder="Nhập tên nhóm dịch vụ"
                    onChange={this.onChangeInputFormInsert}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Trạng thái
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <select
                    name="ser_gr_id"
                    id=""
                    className="insert-form-select"
                    onChange={this.onChangeInputFormInsert}
                  >
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm ẩn</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center"></div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
              <button className="col-auto p_button">Xác nhận</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}
export default ServicesGroupForm;
