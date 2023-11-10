import React from "react";
import axios from "axios";
import { parseISO, format } from "date-fns";
import formatCurrency from "../FormatCurrency";
import ProductsForm from "./ProductsForm";
import ProductsList from "./ProductsList";
import { toast } from "react-toastify";

class Products extends React.Component {
  state = {
    dataServices: [],
    dataProductsEdit: {
      products_id: "",
      products_name: "",
      products_image: "default",
      products_des: "",
      products_cost: "",
      products_syntax: "",
      products_status: "1",
      products_duration: "0 Ngày",
      ser_id: 1,
    },
    dataViewProduct: [],
  };
  componentDidMount() {
    this.getServices();
  }
  getServices = () => {
    console.log(123);
    axios
      .get("http://127.0.0.1:8000/api/v1/services")
      .then((response) => {
        this.setState(
          {
            dataServices: response.data,
          },
          () => {
            console.log(this.state.dataServices);
          }
        );
      })
      .catch();
  };
  //
  handleEdit = (dataProductsEdit) => {
    this.setState({ dataProductsEdit: dataProductsEdit });
    this.openFormEditProducts();
  };
  // Xử lý đóng mở form
  openFormInsertProducts = () => {
    document.getElementById("insert-form-container").style.display = "flex";
  };
  closeFormInsertProducts = () => {
    document.getElementById("insert-form-container").style.display = "none";
  };
  // Xử lý đóng mở form edit
  openFormEditProducts = () => {
    document.getElementById("edit-form-container").style.display = "flex";
  };
  closeFormEditProducts = () => {
    document.getElementById("edit-form-container").style.display = "none";
  };
  // Sự kiện thay đổi dữ liệu form edit
  onChangeInputFormEdit = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataProductsEdit: {
          ...prevState.dataProductsEdit,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataProductsEdit);
      }
    );
  };
  // Sự kiện submit form edit
  onSubmitFormEdit = (event) => {
    document.getElementById("loading-container").style.display = "flex";
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/products/" +
          this.state.dataProductsEdit.products_id,
        this.state.dataProductsEdit
      )
      .then((response) => {
        toast.success(response.data.message);
        this.setState({
          dataProductsEdit: {
            products_id: "",
            products_name: "",
            products_image: "default",
            products_des: "",
            products_cost: "",
            products_syntax: "",
            products_status: "1",
            products_duration: "0 Ngày",
            ser_id: 1,
          },
        });
        document.getElementById("loading-container").style.display = "none";
        this.componentDidMount();
      });
  };
  // Xử lý sự kiện đóng mở page xem sản phẩm
  openViewProducts = () => {
    document.getElementById("view-product-container").style.display = "flex";
  };
  closeViewProducts = () => {
    document.getElementById("view-product-container").style.display = "none";
  };
  handleViewProduct = (product_id) => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/products/" + product_id)
      .then((response) => {
        document.getElementById("loading-container").style.display = "none";
        this.setState(
          {
            dataViewProduct: response.data,
          },
          () => {
            this.openViewProducts();
          }
        );
      });

    this.openViewProducts();
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tất cả sản phẩm</p>
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
              onClick={this.openFormInsertProducts}
            >
              <i className="fa-solid fa-plus"></i>Thêm
            </p>
            <p className="p_button bg-success">
              <i className="fa-solid fa-file-import "></i>Import
            </p>
            <p className="p_button bg-info">
              <i className="fa-solid fa-file-export"></i>Export
            </p>
            <p className="p_button bg-warning">
              <i className="fa-solid fa-people-group"></i>Nhóm
            </p>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row h-100 p-0 m-0">
            {/* ListProduct */}
            <ProductsList
              openFormEditProducts={this.openFormEditProducts}
              onEdit={this.handleEdit}
              openViewProducts={this.openViewProducts}
              onViewProduct={this.handleViewProduct}
            />
          </div>
        </div>

        {/* Insert Form */}
        <ProductsForm closeFormInsertProducts={this.closeFormInsertProducts} />
        {/* Edit Customer Form */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="edit-form-container"
        >
          <form className="insert-form" onSubmit={this.onSubmitFormEdit}>
            <p className="row m-0 p-o w-100 insert-form-title">
              Cập nhật sản phẩm
            </p>
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
                      value={this.state.dataProductsEdit.products_id || ""}
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
                      value={this.state.dataProductsEdit.products_name || ""}
                      onChange={this.onChangeInputFormEdit}
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
                      onChange={this.onChangeInputFormEdit}
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
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="Nhập mô tả"
                      name="products_des"
                      value={this.state.dataProductsEdit.products_des || ""}
                      onChange={this.onChangeInputFormEdit}
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
                      Cú pháp
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: DK SP001 gửi 900"
                      name="products_syntax"
                      value={this.state.dataProductsEdit.products_syntax || ""}
                      onChange={this.onChangeInputFormEdit}
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
                      onChange={this.onChangeInputFormEdit}
                      value={
                        this.state.dataProductsEdit.products_duration || ""
                      }
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
                      value={this.state.dataProductsEdit.products_status || ""}
                      onChange={this.onChangeInputFormEdit}
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
                      value={this.state.dataProductsEdit.products_cost || ""}
                      onChange={this.onChangeInputFormEdit}
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
                      value={this.state.dataProductsEdit.ser_id || ""}
                      onChange={this.onChangeInputFormEdit}
                      id=""
                    >
                      <option value="0">Chọn</option>
                      {this.state.dataServices.map((item, index) => {
                        return (
                          <option value={item.ser_id} key={index}>
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
                onClick={this.closeFormEditProducts}
              >
                Đóng
              </p>
              <button
                className="col-auto p_button"
                id="submit_forminsert"
                onClick={this.closeFormEditProducts}
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        {/* Import File */}
        {/* <div
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
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div> */}
        {/* View Product */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="view-product-container"
        >
          <form
            className="insert-form"
            onSubmit={this.onSubmitFormEdit}
            style={{ overflow: "auto" }}
          >
            <p className="row m-0 p-o w-100 insert-form-title">
              Thông tin sản phẩm
            </p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-auto p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Tên sản phẩm: {this.state.dataViewProduct.products_name}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row p-0 w-100 justify-content-between insert-form-gr"
              style={{ maxHeight: "200px", overflow: "auto" }}
            >
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-auto p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mô tả: {this.state.dataViewProduct.products_des}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row p-0 w-100 justify-content-between insert-form-gr"
              style={{ height: "auto" }}
            >
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-auto p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Giá bán:{" "}
                      {formatCurrency(
                        Number(this.state.dataViewProduct.products_cost)
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row p-0 w-100 justify-content-between insert-form-gr"
              style={{ height: "auto" }}
            >
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-auto p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Cú pháp: {this.state.dataViewProduct.products_syntax}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row p-0 w-100 justify-content-between insert-form-gr"
              style={{ height: "auto" }}
            >
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-auto p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thời hạn: {this.state.dataViewProduct.products_duration}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row p-0 w-100 justify-content-between insert-form-gr"
              style={{ height: "auto" }}
            >
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-auto p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ngày tạo:{" "}
                      {this.state.dataViewProduct.created_at
                        ? format(
                            parseISO(this.state.dataViewProduct.created_at),
                            "HH:mm:ss dd/MM/yyyy"
                          )
                        : "Không có dữ liệu"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-auto p-0 m-0">
                    <img src="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-0 w-100 justify-content-end insert-form-gr">
              <p
                className="col-auto p_button bg-danger"
                id="btn_close_forminsert"
                onClick={this.closeViewProducts}
              >
                Đóng
              </p>
            </div>
          </form>
        </div>
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default Products;
