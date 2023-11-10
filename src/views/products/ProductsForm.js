import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
class ProductsForm extends React.Component {
  state = {
    dataProductInsert: {
      products_id: null,
      products_name: "",
      products_image: "default",
      products_des: "",
      products_cost: "",
      products_syntax: "",
      products_status: "1",
      products_vat: 5,
      products_duration: "0 Ngày",
      ser_id: 1,
    },
    dataServices: [],
  };
  componentDidMount() {
    this.getServices();
  }
  getServices = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/services")
      .then((response) => {
        this.setState({
          dataServices: response.data,
        });
      })
      .catch();
  };
  // Xử lý sự kiện nhập liệu
  onChangeInputFormInsert = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataProductInsert: {
          ...prevState.dataProductInsert,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataProductInsert);
      }
    );
  };
  // Xử lý sự kiện submit
  onSubmitFormInsert = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/products",
        this.state.dataProductInsert
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Có lỗi: ", error);
      });
  };
  render() {
    const { closeFormInsertProducts } = this.props;
    return (
      <>
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="insert-form-container"
        >
          <form className="insert-form" onSubmit={this.onSubmitFormInsert}>
            <p className="row m-0 p-o w-100 insert-form-title">Thêm sản phẩm</p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mã sản phẩm
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
                      Tên sản phẩm
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: SP001"
                      name="products_name"
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
                      Hình ảnh
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="file"
                      className="insert-form-input"
                      name="products_image"
                      onChange={this.onChangeInputFormInsert}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mô tả
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <textarea
                      type="text"
                      className="insert-form-input"
                      placeholder="Nhập mô tả"
                      name="products_des"
                      onChange={this.onChangeInputFormInsert}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Cú pháp
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: DK SP001 gửi 900"
                      name="products_syntax"
                      onChange={this.onChangeInputFormInsert}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thời hạn
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: 30 Ngày"
                      name="products_duration"
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
                      Trạng thái
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="products_status"
                      className="insert-form-select"
                      onChange={this.onChangeInputFormInsert}
                      id=""
                    >
                      <option value="1">Hoạt động</option>
                      <option value="0">Tạm ẩn</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Giá bán
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: 100000"
                      name="products_cost"
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
                      Thuộc dịch vụ
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="ser_id"
                      className="insert-form-select"
                      onChange={this.onChangeInputFormInsert}
                      id=""
                    >
                      <option value="0">Chọn</option>
                      {this.state.dataServices.map((item, index) => {
                        return (
                          <option value={item.ser_id} key={item.ser_id}>
                            {item.ser_name}
                          </option>
                        );
                      })}
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
                onClick={closeFormInsertProducts}
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default ProductsForm;
