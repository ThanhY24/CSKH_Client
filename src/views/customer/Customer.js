import React from "react";
import axios from "axios";
import { parseISO, format } from "date-fns";
import { toast } from "react-toastify";
class Customer extends React.Component {
  state = {
    customers: [],
    formCusomer: {
      cus_id: null,
      cus_name: "",
      cus_birthday: "",
      cus_gender: "1",
      cus_address: "",
      cus_password: "123",
      cus_total_cost: "0",
      cus_address_ship: "",
      cus_email: "",
      cus_phone: "",
      cus_taxID: "",
      cus_status: "1",
    },
    formEditCustomer: {},
    dataSearch: {},
    selectedFile: null,
  };
  componentDidMount() {
    this.getCustomer();
  }
  // XÓa khách hàng
  removeCustomerBtn = (cus_id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khách hàng này?"
    );
    if (confirmDelete) {
      axios
        .get("http://127.0.0.1:8000/api/v1/hide_customers/" + cus_id)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.error("Lỗi rồi: ", error);
        });
    }
    this.getCustomer();
  };
  // Lấy khách hàng
  getCustomer = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/customers")
      .then((response) => {
        document.getElementById("loading-container").style.display = "none";
        this.setState({ customers: response.data });
      })
      .catch((error) => {
        console.log("Lỗi rồi: ", error);
      });
  };
  // Tìm kiếm khách hàng
  searchCustomerHandle = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      dataSearch: {
        ...prevState.dataSearch,
        [name]: value,
      },
    }));
    console.log(this.state.dataSearch);
  };
  searchCustomer = (event) => {
    event.preventDefault();
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/search_customers",
        this.state.dataSearch
      )
      .then((response) => {
        toast.success(response.data.message);
        console.log(this.state.customers);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
    console.log(this.state.dataSearch);
  };
  // Upload file khách hàng
  uploadCustomerHandle = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
    console.log(this.state.selectedFile);
  };
  uploadCustomer = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    axios
      .post("http://127.0.0.1:8000/api/v1/upload_customers", formData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };
  // Nhập khách hàng
  insertCustomerHandle = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formCusomer: {
        ...prevState.formCusomer,
        [name]: value,
      },
    }));
  };

  insertCustomer = (event) => {
    document.getElementById("loading-container").style.display = "flex";
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/v1/customers", this.state.formCusomer)
      .then((response) => {
        document.getElementById("loading-container").style.display = "none";
        toast.success(response.data.message);
        this.closeInsertForm();
        this.getCustomer();
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };
  // Cập nhập khách hàng
  editCustomerHandle = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formEditCustomer: {
        ...prevState.formEditCustomer,
        [name]: value,
      },
    }));
    console.log(this.state);
  };
  editCustomer = (event) => {
    event.preventDefault();
    document.getElementById("loading-container").style.display = "flex";
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/customers/" +
          this.state.formEditCustomer.cus_id,
        this.state.formEditCustomer
      )
      .then((response) => {
        this.closeInsertForm();
        this.getCustomer();
        document.getElementById("loading-container").style.display = "none";
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
    this.closeEditForm();
    console.log(this.state.formEditCustomer);
  };
  // Sự kiện đóng mở form
  showInsertForm = () => {
    document.getElementById("insert-form-container").style.display = "flex";
  };
  closeInsertForm = () => {
    document.getElementById("insert-form-container").style.display = "none";
  };
  // sự kiện đóng mở form chỉnh sửa
  showEditForm = (cus_id) => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get(`http://127.0.0.1:8000/api/v1/customers/${cus_id}`)
      .then((response) => {
        document.getElementById("loading-container").style.display = "none";
        this.setState(
          {
            formEditCustomer: response.data,
          },
          () => {
            console.log(this.state.formEditCustomer);
          }
        );
        console.log(this.state.formEditCustomer);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      });
    document.getElementById("edit-form-container").style.display = "flex";
  };
  closeEditForm = () => {
    document.getElementById("edit-form-container").style.display = "none";
  };
  // Sự kiện mở form import
  showImportForm = () => {
    document.getElementById("import-form-container").style.display = "flex";
  };
  // Sự kiện đóng form import
  closeImportForm = () => {
    document.getElementById("import-form-container").style.display = "none";
  };
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
            <p
              className="p_button"
              id="btn_add_forminsert"
              onClick={this.showInsertForm}
            >
              <i className="fa-solid fa-plus"></i>Thêm
            </p>
            <p className="p_button bg-success" onClick={this.showImportForm}>
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
            <form className="col-2 main-content-col fillter">
              <p className="form-title m-0 p-0">
                LỌC KHÁCH HÀNG THEO
                <i className="fa-solid fa-magnifying-glass"></i>
              </p>
              <div className="fillter-gr">
                <label htmlFor="">Mã khách hàng</label>
                <input
                  type="text"
                  name="cus_id"
                  placeholder="Mã khách hàng"
                  onChange={this.searchCustomerHandle}
                />
              </div>
              <div className="fillter-gr">
                <label htmlFor="">Tên khách hàng</label>
                <input
                  type="text"
                  name="cus_name"
                  placeholder="Tên khách hàng"
                  onChange={this.searchCustomerHandle}
                />
              </div>
              <div className="fillter-gr">
                <label htmlFor="">Địa chỉ</label>
                <input
                  type="text"
                  name="cus_address"
                  placeholder="Địa chỉ"
                  onChange={this.searchCustomerHandle}
                />
              </div>
              <div className="fillter-gr">
                <label htmlFor="">Giới tính</label>
                <select
                  name="cus_gender"
                  id=""
                  onChange={this.searchCustomerHandle}
                >
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
              </div>
              <p
                className="p_button p-0 m-0 mt-3 fillter-button"
                onClick={this.searchCustomer}
              >
                Áp Dụng
              </p>
              <p className="p_button p-0 m-0 mt-3 fillter-button bg-danger">
                Xóa Dữ Liệu
              </p>
            </form>
            <div className="col-10 main-content-col datatable">
              <div className="row p-0 m-0 datatable-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Thao Tác</th>
                      <th scope="col">Họ và Tên</th>
                      <th scope="col">Giới tính</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Địa chỉ mail</th>
                      <th scope="col">Mã số thuế</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Ngày tham gia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.customers.map((item, index) => {
                      return (
                        <tr key={item.cus_id}>
                          <th scope="row">{index + 1}</th>
                          <td className="td_action d-flex">
                            <p
                              className="p_button_table bg-danger"
                              onClick={() =>
                                this.removeCustomerBtn(item.cus_id)
                              }
                            >
                              <i className="fa-solid fa-trash"></i>
                            </p>
                            <p
                              className="p_button_table bg-warning"
                              onClick={() => this.showEditForm(item.cus_id)}
                            >
                              <i className="fa-solid fa-user-pen"></i>
                            </p>
                            <p className="p_button_table bg-info">
                              <i className="fa-solid fa-envelope"></i>
                            </p>
                            <p className="p_button_table">
                              <i className="fa-solid fa-cart-shopping"></i>
                            </p>
                          </td>
                          <td>{item.cus_name}</td>
                          <td>{item.cus_gender === "1" ? "Nam" : "Nữ"}</td>
                          <td>{item.cus_phone}</td>
                          <td>{item.cus_email}</td>
                          <td>
                            {item.cus_taxID === "0"
                              ? "Không có"
                              : item.cus_taxID}
                          </td>
                          <td>{item.cus_address}</td>
                          <td>
                            {format(
                              parseISO(item.created_at),
                              "HH:mm:ss dd/MM/yyyy"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="row p-0 m-0 datatable-footer justify-content-end">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="link">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="link">
                      5
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="insert-form-container"
        >
          <form className="insert-form" onSubmit={this.insertCustomer}>
            <p className="row m-0 p-o w-100 insert-form-title">
              Thêm khách hàng
            </p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mã khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="Mã tự sinh"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Tên khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: Nguyễn Văn A"
                      name="cus_name"
                      onChange={this.insertCustomerHandle}
                      required
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
                      Ngày sinh
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="date"
                      className="insert-form-input"
                      name="cus_birthday"
                      onChange={this.insertCustomerHandle}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Địa chỉ mail
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="nguyenvana@gmail.com"
                      name="cus_email"
                      onChange={this.insertCustomerHandle}
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
                      Số điện thoại
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: 0866747580"
                      name="cus_phone"
                      onChange={this.insertCustomerHandle}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mã số thuế
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: 123456789"
                      name="cus_taxID"
                      onChange={this.insertCustomerHandle}
                      required
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
                      Địa chỉ nơi ở
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="Nhập địa chỉ nơi ở"
                      name="cus_address"
                      onChange={this.insertCustomerHandle}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Địa chỉ giao hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="Nhập địa chỉ giao hàng"
                      name="cus_address_ship"
                      onChange={this.insertCustomerHandle}
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
                      Giới tính
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="cus_gender"
                      className="insert-form-select"
                      id=""
                      onChange={this.insertCustomerHandle}
                    >
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
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
                onClick={this.closeInsertForm}
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        {/* Edit Customer Form */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="edit-form-container"
        >
          <form className="insert-form" onSubmit={this.editCustomer}>
            <p className="row m-0 p-o w-100 insert-form-title">
              Cập nhật thông tin khách hàng
            </p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mã khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      value={this.state.formEditCustomer.cus_id || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Tên khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: Nguyễn Văn A"
                      value={this.state.formEditCustomer.cus_name || ""}
                      name="cus_name"
                      onChange={this.editCustomerHandle}
                      required
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
                      Ngày sinh
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="date"
                      className="insert-form-input"
                      name="cus_birthday"
                      value={this.state.formEditCustomer.cus_birthday || ""}
                      onChange={this.editCustomerHandle}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Địa chỉ mail
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="nguyenvana@gmail.com"
                      name="cus_email"
                      value={this.state.formEditCustomer.cus_email || ""}
                      onChange={this.editCustomerHandle}
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
                      Số điện thoại
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: 0866747580"
                      name="cus_phone"
                      value={this.state.formEditCustomer.cus_phone || ""}
                      onChange={this.editCustomerHandle}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Mã số thuế
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="VD: 123456789"
                      name="cus_taxID"
                      value={this.state.formEditCustomer.cus_taxID || ""}
                      onChange={this.editCustomerHandle}
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
                      Địa chỉ nơi ở
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="Nhập địa chỉ nơi ở"
                      name="cus_address"
                      value={this.state.formEditCustomer.cus_address || ""}
                      onChange={this.editCustomerHandle}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Địa chỉ giao hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      placeholder="Nhập địa chỉ giao hàng"
                      name="cus_address_ship"
                      value={this.state.formEditCustomer.cus_address_ship || ""}
                      onChange={this.editCustomerHandle}
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
                      Giới tính
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="cus_gender"
                      className="insert-form-select"
                      id=""
                      value={this.state.formEditCustomer.cus_gender || "1"}
                      onChange={this.editCustomerHandle}
                    >
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
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
                onClick={this.closeEditForm}
              >
                Đóng
              </p>
              <button className="col-auto p_button" id="submit_forminsert">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        {/* Import File */}
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
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default Customer;
