import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
class ServicesForm extends React.Component {
  state = {
    dataInsertSer: {
      ser_id: "0",
      ser_name: "",
      ser_status: "1",
      ser_gr_id: "",
    },
    dataSerGr: [],
  };
  // Laod dữ liệu
  componentDidMount() {
    this.getSerGr();
  }
  // Láy nhóm dịch vụ
  getSerGr = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/services-group")
      .then((response) => {
        this.setState({
          dataSerGr: response.data,
        });
        document.getElementById("loading-container").style.display = "none";
      })
      .catch();
  };
  // Xử lý nhập liệu
  onChangeInputFormInsert = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      dataInsertSer: {
        ...prevState.dataInsertSer,
        [name]: value,
      },
    }));
  };
  // SubmitForm
  submitFormInsert = (event) => {
    event.preventDefault();
    document.getElementById("loading-container").style.display = "flex";
    if (
      this.state.dataInsertSer.ser_id !== "" &&
      this.state.dataInsertSer.ser_name !== "" &&
      this.state.dataInsertSer.ser_status !== "" &&
      this.state.dataInsertSer.ser_gr_id !== ""
    ) {
      axios
        .post("http://127.0.0.1:8000/api/v1/services", this.state.dataInsertSer)
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message);
            document.getElementById("loading-container").style.display = "none";
          } else {
            toast.error(response.data.message);
            document.getElementById("loading-container").style.display = "none";
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Lỗi Serever");
        });
    } else {
      toast.warning("Chưa nhập đủ thông tin");
    }
  };
  render() {
    return (
      <>
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
                    Tên
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    name="ser_name"
                    className="insert-form-input"
                    placeholder="Dịch vụ"
                    onChange={this.onChangeInputFormInsert}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Thuộc nhóm
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <select
                    name="ser_gr_id"
                    id=""
                    onChange={this.onChangeInputFormInsert}
                    className="insert-form-select"
                  >
                    <option value="0">Chọn</option>
                    {this.state.dataSerGr.map((item, index) => {
                      return (
                        <option value={item.ser_gr_id} key={item.ser_gr_id}>
                          {item.ser_gr_name}
                        </option>
                      );
                    })}
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
                    Trạng thái
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <select
                    name="ser_status"
                    onChange={this.onChangeInputFormInsert}
                    id=""
                    className="insert-form-select"
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
      </>
    );
  }
}
export default ServicesForm;
