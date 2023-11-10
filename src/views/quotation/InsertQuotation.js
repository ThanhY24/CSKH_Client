import React from "react";
import axios from "axios";
import moment from "moment";
import formatCurrency from "../FormatCurrency";
import "moment-timezone";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class InsertQuotation extends React.Component {
  state = {
    dataCustomer: [],
    dataStaff: [],
    dataProduct: [],
    // Dùng để hiển thị dữ liệu và lưu và danh sách sản phẩm trong báo giá
    dataProductSelected: {
      quotation_item_quantity: 1,
      quotation_item_vat: 10,
      products_cost: 0,
      products_id: "",
      products_name: "Sản phẩm",
      quotation_item_status: "1",
    },
    dataQuotationItemAmount: 0,
    // Danh sách sản phẩm trong báo giá
    dataQuotationItem: [],
    //
    selectedCustomerId: 0,
    dataCustomerSelected: [],
    selectedStaffId: 0,
    dataStaffSelected: [],
    //
    dataQuotation: {
      quotation_id: null,
      quotation_created_date: moment()
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY-MM-DDTHH:mm"),
      quotation_due_date: "",
      quotation_des: "",
      staff_id: "",
      cus_id: "",
      quotation_status: "1",
    },
  };
  //
  // Laod website
  componentDidMount() {
    this.getDataCustomer();
    this.getDataStaff();
    this.getDataProduct();
    setInterval(() => {
      this.setState((prevState) => ({
        dataInvoices: {
          ...prevState.dataInvoices,
          invoices_date: moment()
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DDTHH:mm"),
        },
      }));
    }, 1000);
  }
  // Lấy dữ liệu
  getDataCustomer = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/customers")
      .then((response) => {
        this.setState({
          dataCustomer: response.data,
        });
        document.getElementById("loading-container").style.display = "none";
      })
      .catch();
  };
  getDataStaff = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/staff")
      .then((response) => {
        this.setState({
          dataStaff: response.data,
        });
      })
      .catch();
  };
  getDataProduct = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/products")
      .then((response) => {
        this.setState({
          dataProduct: response.data.data,
        });
      })
      .catch();
  };
  // Đóng mở form chọn sản phẩm
  openSelectProductForm = () => {
    document.getElementById("select-product-container").style.display = "flex";
  };
  closeSelectProductForm = () => {
    document.getElementById("select-product-container").style.display = "none";
  };
  // Thay đổi select nhân viên và khách hàng
  onChangeSelectCustomer = (event) => {
    const id = parseInt(event.target.value);
    const data = this.state.dataCustomer.find((cus) => cus.cus_id === id);
    this.setState({
      dataCustomerSelected: data ? data : null,
    });
  };
  onChangeSelectStaff = (event) => {
    const id = parseInt(event.target.value);
    const data = this.state.dataStaff.find((staff) => staff.staff_id === id);
    this.setState({
      dataStaffSelected: data ? data : null,
    });
  };
  // Xử lý chọn sản phẩm khác để điền thông tin
  onChangeSelectProduct = (event) => {
    const id = parseInt(event.target.value);
    const data = this.state.dataProduct.find(
      (product) => product.products_id === id
    );
    if (data) {
      const updatedDataProductSelected = {
        ...this.state.dataProductSelected,
        products_cost: data.products_cost,
        products_id: id,
      };

      this.setState(
        {
          dataProductSelected: updatedDataProductSelected,
        },
        () => {
          console.log(this.state.dataProductSelected);
        }
      );
    }
  };
  // Xử lý sự kiện khi thay đổi input của form chọn sản phẩm
  onChangeInputSelectProduct = (event) => {
    const { name, value } = event.target;

    // Kiểm tra nếu trường name là "quation_item_quantity" hoặc "quation_item_vat"
    const parsedValue =
      name === "quation_item_quantity" || name === "quation_item_vat"
        ? parseInt(value)
        : value;

    this.setState((prevState) => ({
      dataProductSelected: {
        ...prevState.dataProductSelected,
        [name]: parsedValue,
      },
    }));
  };
  // Nhấn xác nhận để thêm sản phẩm  vào giá
  addProductToQuotationItem = async () => {
    document.getElementById("loading-container").style.display = "flex";
    const { dataProductSelected, dataQuotationItem, dataQuotationItemAmount } =
      this.state;

    if (dataProductSelected.products_id !== "") {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/products/" +
            dataProductSelected.products_id
        );

        const updatedDataProductSelected = {
          ...dataProductSelected,
          products_name: response.data.products_name,
          quotation_products_cost: response.data.products_cost,
        };

        const newQuotationItem = {
          ...updatedDataProductSelected,
        };

        const newQuotationItemAmount =
          dataQuotationItemAmount +
          dataProductSelected.quotation_item_quantity *
            dataProductSelected.quotation_products_cost *
            (dataProductSelected.quotation_item_vat / 100) +
          Number(
            dataProductSelected.quotation_products_cost *
              dataProductSelected.quotation_item_quantity
          );

        this.setState(
          {
            dataQuotationItem: [...dataQuotationItem, newQuotationItem],
            dataQuotationItemAmount: newQuotationItemAmount, // Cập nhật giá tiền mới
          },
          () => {
            this.closeSelectProductForm();
          }
        );
        document.getElementById("loading-container").style.display = "none";
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
  };
  // Xóa dữu liệu
  removeDataQuotation = () => {
    this.setState({
      dataQuotationItem: [],
      dataQuotationItemAmount: 0,
    });
  };
  onChangeInputInfoQuotation = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      dataQuotation: {
        ...prevState.dataQuotation,
        [name]: value,
      },
    }));
  };
  // Nút save báo giá
  saveQuotation = (event) => {
    document.getElementById("loading-container").style.display = "flex";
    document.getElementById("save_quotation").innerHTML =
      '<i className="fa-solid fa-circle-notch fa-spin"></i>';
    event.preventDefault();
    const data = {
      dataQuotation: this.state.dataQuotation,
      dataQuotationItem: this.state.dataQuotationItem,
    };
    axios
      .post("http://127.0.0.1:8000/api/v1/quotation/insert", data)
      .then((response) => {
        toast.success(response.data.message);
        document.getElementById("save_quotation").innerHTML =
          '<i className="fa-solid fa-check fa-bounce"></i>';
        setTimeout(function () {
          document.getElementById("save_quotation").innerHTML =
            '<i className="fa-solid fa-floppy-disk"></i>Lưu';
        }, 1000);
      });
    document.getElementById("loading-container").style.display = "none";
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Thêm mới báo giá</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <Link
              to={"http://localhost:3000/quotations"}
              className="p_button bg-danger"
            >
              <i className="fa-solid fa-chevron-left"></i>Quay lại
            </Link>
            <p
              className="p_button bg-primary"
              id="save_quotation"
              onClick={(event) => {
                this.saveQuotation(event);
              }}
            >
              <i className="fa-solid fa-floppy-disk"></i>Lưu
            </p>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div
          className="container-fluid p-0 m-0 w-100 insert-form-block insert-form-fixed-scroll"
          id="insert-form-container"
        >
          <form action="" className="insert-form">
            <p className="row m-0 p-o w-100 insert-form-title">
              Thông tin báo giá
            </p>
            <div className="row p-0 w-100 justify-content-between">
              <div className="col-6">
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mã
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Mã tự sinh"
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ngày tạo
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input-block"
                      placeholder=""
                      value={this.state.dataQuotation.quotation_created_date}
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thuộc nhân viên
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="staff_id"
                      className="insert-form-select"
                      onChange={(event) => {
                        this.onChangeSelectStaff(event);
                        this.onChangeInputInfoQuotation(event);
                      }}
                    >
                      <option value={0}>Chọn nhân viên</option>
                      {this.state.dataStaff.map((item, index) => {
                        return (
                          <option key={index} value={item.staff_id}>
                            {item.staff_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      SĐT Nhân viên
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="transaction_note"
                      value={
                        this.state.dataStaffSelected
                          ? this.state.dataStaffSelected.staff_phone
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Email Nhân viên
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="transaction_note"
                      value={
                        this.state.dataStaffSelected
                          ? this.state.dataStaffSelected.staff_email
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Đ/C Nhân viên
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="transaction_note"
                      value={
                        this.state.dataStaffSelected
                          ? this.state.dataStaffSelected.staff_address
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ghi chú
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      name="quotation_des"
                      value={this.state.dataQuotation.quotation_des}
                      onChange={(event) => {
                        this.onChangeInputInfoQuotation(event);
                      }}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ngày hết hạn
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input-block"
                      placeholder=""
                      name="quotation_due_date"
                      onChange={(event) => {
                        this.onChangeInputInfoQuotation(event);
                      }}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thuộc khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="cus_id"
                      defaultValue={0}
                      onChange={(event) => {
                        this.onChangeSelectCustomer(event);
                        this.onChangeInputInfoQuotation(event);
                      }}
                      className="insert-form-select"
                      id=""
                    >
                      <option value={0}>Chọn khách hàng</option>
                      {this.state.dataCustomer.map((item, index) => {
                        return (
                          <option key={index} value={item.cus_id}>
                            {item.cus_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      SĐT Khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="transaction_note"
                      value={
                        this.state.dataCustomerSelected
                          ? this.state.dataCustomerSelected.cus_phone
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Email Khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="transaction_note"
                      value={
                        this.state.dataCustomerSelected
                          ? this.state.dataCustomerSelected.cus_email
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Đ/C Khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="transaction_note"
                      value={
                        this.state.dataCustomerSelected
                          ? this.state.dataCustomerSelected.cus_address
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form action="" className="insert-form">
            <p className="row m-0 p-o w-100 insert-form-title">
              Thông tin sản phẩm
            </p>
            <div className="row h-100 p-0 m-0">
              <div className="col-10 p-0">
                <div className="col-12 main-content-col datatable d-flex justify-content-center h300 border-none">
                  <div className="row p-0 m-0 datatable-table table-invoices mt-2">
                    <table className="table table-invoices-table h300">
                      <thead>
                        <tr className="table-tr-invoices">
                          <th scope="col">STT</th>
                          <th scope="col">Sản phẩm</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Giá tiền</th>
                          <th scope="col">VAT(%)</th>
                          <th scope="col">Phí VAT</th>
                          <th scope="col">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataQuotationItem.map((item, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{item.products_name}</td>
                              <td>{item.quotation_item_quantity}</td>
                              <td>
                                {formatCurrency(
                                  Number(item.quotation_products_cost)
                                )}
                              </td>
                              <td>{item.quotation_item_vat} %</td>
                              <td>
                                {formatCurrency(
                                  Number(
                                    (item.quotation_item_vat / 100) *
                                      item.quotation_products_cost
                                  )
                                )}
                              </td>
                              <td>
                                {formatCurrency(
                                  Number(item.quotation_products_cost) *
                                    Number(item.quotation_item_quantity) *
                                    Number(item.quotation_item_vat / 100) +
                                    Number(item.quotation_products_cost) *
                                      Number(item.quotation_item_quantity)
                                )}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col">Tổng tiền</th>
                          <th scope="col">
                            {formatCurrency(
                              Number(this.state.dataQuotationItemAmount)
                            )}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="col-12 p-0 m-0 d-flex flex-wrap justify-content-end mt-2">
                  <p
                    className="p_button bg-success mb-2"
                    onClick={this.openSelectProductForm}
                  >
                    <i className="fa-solid fa-plus"></i>Chọn Sản Phẩm
                  </p>
                  <p
                    className="p_button bg-secondary mb-2"
                    onClick={this.removeDataQuotation}
                  >
                    <i className="fa-solid fa-rotate-left"></i>Tạo lại
                  </p>
                  <p
                    className="p_button bg-primary mb-2"
                    onClick={(event) => {
                      this.saveQuotation(event);
                    }}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>Lưu
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Select Product */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="select-product-container"
        >
          <form className="insert-form">
            <p className="row m-0 p-o w-100 insert-form-title">Chọn sản phẩm</p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Sản phẩm
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      className="insert-form-select"
                      id=""
                      onChange={(event) => {
                        this.onChangeSelectProduct(event);
                      }}
                    >
                      <option value="0">Chọn sản phẩm</option>
                      {this.state.dataProduct.map((item, index) => {
                        return (
                          <option key={index} value={item.products_id}>
                            {item.products_name}
                          </option>
                        );
                      })}
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
                      type="number"
                      className="insert-form-input"
                      name="quotation_products_cost"
                      value={
                        this.state.dataProductSelected.products_cost
                          ? this.state.dataProductSelected.products_cost
                          : 0
                      }
                      onChange={(event) => {
                        this.onChangeInputSelectProduct(event);
                      }}
                      disabled
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
                      Số lượng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="number"
                      className="insert-form-input"
                      name="quotation_item_quantity"
                      value={
                        this.state.dataProductSelected.quotation_item_quantity
                          ? this.state.dataProductSelected
                              .quotation_item_quantity
                          : 1
                      }
                      onChange={(event) => {
                        this.onChangeInputSelectProduct(event);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Thuế VAT(%)
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="number"
                      className="insert-form-input"
                      name="quotation_item_vat"
                      value={
                        this.state.dataProductSelected.quotation_item_vat
                          ? this.state.dataProductSelected.quotation_item_vat
                          : 10
                      }
                      onChange={(event) => {
                        this.onChangeInputSelectProduct(event);
                      }}
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
                      Thành Tiền
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      name="cus_phone"
                      disabled
                      value={
                        this.state.dataProductSelected.products_cost
                          ? formatCurrency(
                              Number(
                                Number(
                                  this.state.dataProductSelected.products_cost
                                ) *
                                  Number(
                                    this.state.dataProductSelected
                                      .quotation_item_quantity
                                  )
                              )
                            )
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Tổng Tiền
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      disabled
                      value={
                        this.state.dataProductSelected.quotation_item_vat
                          ? formatCurrency(
                              Number(
                                this.state.dataProductSelected
                                  .quotation_item_quantity *
                                  this.state.dataProductSelected.products_cost *
                                  (this.state.dataProductSelected
                                    .quotation_item_vat /
                                    100) +
                                  Number(
                                    this.state.dataProductSelected
                                      .products_cost *
                                      this.state.dataProductSelected
                                        .quotation_item_quantity
                                  )
                              )
                            )
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-0 w-100 justify-content-end insert-form-gr">
              <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
              <p
                className="col-auto p_button bg-danger"
                id="btn_close_forminsert"
                onClick={this.closeSelectProductForm}
              >
                Đóng
              </p>
              <p
                className="col-auto p_button"
                id="submit_forminsert"
                onClick={(event) => {
                  this.addProductToQuotationItem(event);
                }}
              >
                Xác nhận
              </p>
            </div>
          </form>
        </div>
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default InsertQuotation;
