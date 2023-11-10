import React from "react";
import axios from "axios";
import moment from "moment";
import formatCurrency from "../FormatCurrency";
import "moment-timezone";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { parseISO, format } from "date-fns/locale";
class InsertInvoices extends React.Component {
  state = {
    dataStaff: [],
    dataCustomer: [],
    dataProduct: [],
    dataStaffSelected: [],
    dataCustomerSelected: [],
    dataProductSelected: {
      invoices_item_quantity: 1,
      invoices_item_amount: 0,
      invoices_item_vat: 5,
      products_cost: 0,
      products_id: 0,
      products_name: "Sản phẩm",
    },
    totalAmount: 0,
    dataInvoicesItem: [],
    dataInvoices: {
      invoices_id: null,
      invoices_date: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm"),
      due_date: "",
      invoices_total_amount: 0,
      payment_method: "Chưa có thông tin",
      staff_id: 0,
      cus_id: 0,
      invoices_status: "1",
      invoices_token: "",
      invoices_fkey: "",
      invoices_type: "",
      invoices_original_no: "",
      invoices_log:
        "Hóa đơn được tạo bởi " +
        JSON.parse(localStorage.getItem("dataUser"))["staff_name"] +
        ".",
    },
    dataPattern: "1/001",
    dataSerial: "C23TAA",
  };
  componentDidMount() {
    this.getDataStaff();
    this.getDataCustomer();
    this.getDataProduct();
  }
  // Lấy dữ liệu
  getDataCustomer = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/customers")
      .then((response) => {
        this.setState({
          dataCustomer: response.data,
        });
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
        products_cost: Number(data.products_cost),
        products_id: id,
      };

      this.setState({
        dataProductSelected: updatedDataProductSelected,
      });
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
  onchangeInputInfoInvoices = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      dataInvoices: {
        ...prevState.dataInvoices,
        [name]: value,
      },
    }));
  };
  // Nhấn xác nhận để thêm sản phẩm vào báo giá
  addProductToQuotationItem = () => {
    const data = {
      invoices_item_id: null,
      invoices_item_quantity: 0,
      invoices_item_vat: 0,
      products_id: 0,
      products_cost: 0,
      product_name: "Sản phẩm",
      invoices_item_status: "1",
    };
    //
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/products/" +
          this.state.dataProductSelected.products_id
      )
      .then((response) => {
        data.product_name = response.data.products_name;
        data.invoices_item_quantity =
          this.state.dataProductSelected.invoices_item_quantity;
        data.products_id = this.state.dataProductSelected.products_id;
        data.products_cost = this.state.dataProductSelected.products_cost;
        data.invoices_item_vat =
          this.state.dataProductSelected.invoices_item_vat;
        // Lấy ra trạng thái hiện tại của dataInvoicesItem
        const currentDataInvoicesItem = this.state.dataInvoicesItem;

        // Thêm data vào mảng hiện có
        currentDataInvoicesItem.push(data);

        // Cập nhật trạng thái của dataInvoicesItem
        this.setState({
          dataInvoicesItem: currentDataInvoicesItem,
        });

        this.addToTotalAmount(
          (Number(data.products_cost) *
            Number(data.invoices_item_quantity) *
            Number(data.invoices_item_vat)) /
            100 +
            Number(data.products_cost) * Number(data.invoices_item_quantity)
        );
      });
    //
  };
  addToTotalAmount = (valueToAdd) => {
    this.setState((prevState) => ({
      totalAmount: prevState.totalAmount + valueToAdd,
    }));
  };
  // Thay đổi pattern, serial
  onChangePatternSerial = (event, type) => {
    const value = event.target.value;
    this.setState({ [type]: value }, console.log(this.state.dataPattern));
  };
  // Lưu hóa đơn
  saveInvoices = () => {
    this.setState(
      {
        dataInvoices: {
          ...this.state.dataInvoices,
          invoices_token:
            this.state.dataPattern + ";" + this.state.dataSerial + ";",
        },
      },
      () => {
        const data = {
          dataInvoices: this.state.dataInvoices,
          dataInvoicesItem: this.state.dataInvoicesItem,
        };
        let totalAmount = 0;
        for (const item of data.dataInvoicesItem) {
          const subtotal = item.products_cost * item.invoices_item_quantity;
          const vatAmount = (subtotal * item.invoices_item_vat) / 100;
          totalAmount += subtotal + vatAmount;
        }
        data.dataInvoices.invoices_total_amount = totalAmount;
        data.dataInvoices.cus_id = Number(data.dataInvoices.cus_id);
        data.dataInvoices.staff_id = Number(data.dataInvoices.staff_id);
        axios
          .post("http://127.0.0.1:8000/api/v1/invoices/insert", data)
          .then((response) => {
            toast.success(response.data.message);
            this.removeDataQuotation();
          });
      }
    );
  };
  // XÓa dữ liệu
  removeDataQuotation = () => {
    this.setState({
      dataInvoicesItem: [],
      totalAmount: 0,
    });
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Thêm mới hóa đơn</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <Link
              to={"http://localhost:3000/quotation"}
              className="p_button bg-danger"
            >
              <i className="fa-solid fa-chevron-left"></i>Quay lại
            </Link>
            <p
              className="p_button bg-primary"
              onClick={() => {
                this.saveInvoices();
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
              Thông tin hóa đơn
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
                      Mẫu số
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      value={this.state.dataPattern}
                      onChange={(event) => {
                        this.onChangePatternSerial(event, "dataPattern");
                      }}
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
                      value={this.state.dataInvoices.invoices_date}
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
                        this.onchangeInputInfoInvoices(event);
                      }}
                    >
                      <option value={0}>Chọn nhân viên</option>
                      {this.state.dataStaff.map((item, index) => {
                        return (
                          <option value={item.staff_id} key={index + 1}>
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
                        this.state.dataStaffSelected.staff_phone
                          ? this.state.dataStaffSelected.staff_phone
                          : "Chưa có thông tin"
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
                        this.state.dataStaffSelected.staff_email
                          ? this.state.dataStaffSelected.staff_email
                          : "Chưa có thông tin"
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
                        this.state.dataStaffSelected.staff_address
                          ? this.state.dataStaffSelected.staff_address
                          : "Chưa có thông tin"
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
                      Phương thức thanh toán
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Ký hiệu
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      value={this.state.dataSerial}
                      onChange={(event) => {
                        this.onChangePatternSerial(event, "dataSerial");
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
                      name="due_date"
                      onChange={(event) => {
                        this.onchangeInputInfoInvoices(event);
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
                      className="insert-form-select"
                      id=""
                      onChange={(event) => {
                        this.onChangeSelectCustomer(event);
                        this.onchangeInputInfoInvoices(event);
                      }}
                    >
                      <option value={0}>Chọn khách hàng</option>
                      {this.state.dataCustomer.map((item, index) => {
                        return (
                          <option value={item.cus_id} key={index + 1}>
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
                      value={
                        this.state.dataCustomerSelected.cus_phone
                          ? this.state.dataCustomerSelected.cus_phone
                          : "Chưa có thông tin"
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
                        this.state.dataCustomerSelected.cus_email
                          ? this.state.dataCustomerSelected.cus_email
                          : "Chưa có thông tin"
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
                        this.state.dataCustomerSelected.cus_address
                          ? this.state.dataCustomerSelected.cus_address
                          : "Chưa có thông tin"
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
                        {this.state.dataInvoicesItem.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {item.product_name
                                  ? item.product_name
                                  : "Chưa có thông tin"}
                              </td>
                              <td>{item.invoices_item_quantity}</td>
                              <td>{formatCurrency(item.products_cost)}</td>
                              <td>{item.invoices_item_vat} %</td>
                              <td>
                                {formatCurrency(
                                  (Number(item.products_cost) *
                                    Number(item.invoices_item_vat)) /
                                    100
                                )}
                              </td>
                              <td>
                                {formatCurrency(
                                  (Number(item.products_cost) *
                                    Number(item.invoices_item_quantity) *
                                    Number(item.invoices_item_vat)) /
                                    100 +
                                    Number(item.products_cost) *
                                      Number(item.invoices_item_quantity)
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
                            {formatCurrency(this.state.totalAmount)}
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
                    onClick={() => {
                      this.openSelectProductForm();
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>Chọn Sản Phẩm
                  </p>
                  <p
                    className="p_button bg-secondary mb-2"
                    onClick={this.removeDataQuotation}
                  >
                    <i className="fa-solid fa-rotate-left"></i>Tạo lại
                  </p>
                  <p className="p_button bg-primary mb-2">
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
                          <option value={item.products_id} key={index + 1}>
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
                      name="products_cost"
                      value={
                        this.state.dataProductSelected.products_cost !== ""
                          ? this.state.dataProductSelected.products_cost
                          : "Chưa có thông tin"
                      }
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
                      name="invoices_item_quantity"
                      value={
                        this.state.dataProductSelected
                          .invoices_item_quantity !== ""
                          ? this.state.dataProductSelected
                              .invoices_item_quantity
                          : "Chưa có thông tin"
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
                      name="invoices_item_vat"
                      value={
                        this.state.dataProductSelected.invoices_item_vat !== ""
                          ? this.state.dataProductSelected.invoices_item_vat
                          : "Chưa có thông tin"
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
                      value={
                        this.state.dataProductSelected
                          .invoices_item_quantity !== ""
                          ? this.state.dataProductSelected
                              .invoices_item_quantity *
                            this.state.dataProductSelected.products_cost
                          : "Chưa có thông tin"
                      }
                      disabled
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
                      value={
                        this.state.dataProductSelected.invoices_item_vat
                          ? formatCurrency(
                              Number(
                                this.state.dataProductSelected
                                  .invoices_item_quantity *
                                  this.state.dataProductSelected.products_cost *
                                  (this.state.dataProductSelected
                                    .invoices_item_vat /
                                    100) +
                                  Number(
                                    this.state.dataProductSelected
                                      .products_cost *
                                      this.state.dataProductSelected
                                        .invoices_item_quantity
                                  )
                              )
                            )
                          : "Chưa có thông tin"
                      }
                      disabled
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
                onClick={this.addProductToQuotationItem}
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
export default InsertInvoices;
