import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import moment from "moment";
import "moment-timezone";
import { toast } from "react-toastify";

class Quotatioon extends React.Component {
  state = {
    dataQuotation: [],
    dataCustomer: [],
    idCustomerSearch: 0,
    // Dữ liệu của việc copy báo giá
    dataQuotationCopy: [],
    // Hai cái phía dưới dùng để sao chép báo giá
    dataQuotationItemCopy: [],
    dataQuotationInsert: {
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
  componentDidMount() {
    this.getDataQuotation();
    this.getDataCustomer();
  }
  getDataQuotation = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios.get("http://127.0.0.1:8000/api/v1/quotation").then((response) => {
      this.setState({
        dataQuotation: response.data.dataQuotation,
      });
      document.getElementById("loading-container").style.display = "none";
    });
  };
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
      .catch((error) => {
        console.error("Lỗi rồi: ", error);
      });
  };
  onChangeCustomerSearch = (event) => {
    const value = event.target.value; // Lấy giá trị của select
    axios
      .get("http://127.0.0.1:8000/api/v1/quotation-by-customerID/" + value)
      .then((response) => {
        this.setState({
          dataQuotation: response.data.dataQuotation,
        });
      })
      .catch((error) => {
        console.error("Lỗi rồi: ", error);
      });
  };
  //Đóng Mở form sao chép báo giá
  openFormCopyQuotation = (idQuo) => {
    document.getElementById("loading-container").style.display = "flex";
    document.getElementById("copy-quotation-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/quotation/details/" + idQuo)
      .then((response) => {
        this.setState(
          {
            dataQuotationCopy: response.data.dataQuotation,
            dataQuotationItemCopy: response.data.dataQuotationItem,
          },
          () => {
            document.getElementById("loading-container").style.display = "none";
          }
        );
        const updatedDataQuotationInsert = {
          ...this.state.dataQuotationInsert,
          staff_id: response.data.dataQuotation.staff_id,
          cus_id: response.data.dataQuotation.cus_id,
        };

        this.setState(
          {
            dataQuotationInsert: updatedDataQuotationInsert,
          },
          () => {
            console.log(this.state.dataQuotationInsert);
          }
        );
      });
  };
  closeFormCopyQuotation = () => {
    document.getElementById("copy-quotation-container").style.display = "none";
  };
  // Cập nhật dữ liệu insert khi thay đổi dữ liệu trong input
  onChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataQuotationInsert: {
          ...prevState.dataQuotationInsert,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataQuotationInsert);
      }
    );
  };
  // Xác nhận sao chép báo giá
  submitFormCopyQuotation = (event) => {
    event.preventDefault();

    const dataQuotationItemWithoutId = this.state.dataQuotationItemCopy.map(
      ({ quotation_id, ...rest }) => rest
    );

    const data = {
      dataQuotation: this.state.dataQuotationInsert,
      dataQuotationItem: dataQuotationItemWithoutId,
    };

    document.getElementById("loading-container").style.display = "flex";
    axios
      .post("http://127.0.0.1:8000/api/v1/quotation/insert", data)
      .then((response) => {
        toast.success(response.data.message);
        this.getDataQuotation();
        this.closeFormCopyQuotation();
        document.getElementById("loading-container").style.display = "none";
      });
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Danh sách báo giá</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <Link
              to={"http://localhost:3000/quotations/insert"}
              className="p_button bg-primary"
            >
              <i className="fa-solid fa-plus"></i>Thêm
            </Link>
            <p className="p_button bg-info">
              <i className="fa-solid fa-file-export"></i>Export
            </p>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row h-100 p-0 m-0">
            <form className="col-2 main-content-col fillter">
              <p className="form-title m-0 p-0">
                LỌC BÁO GIÁ THEO
                <i className="fa-solid fa-magnifying-glass"></i>
              </p>

              <div className="fillter-gr">
                <label htmlFor="">Khách hàng</label>
                <select
                  name="cus_id_search"
                  onChange={(event) => {
                    this.onChangeCustomerSearch(event);
                  }}
                >
                  <option value={0}>Chọn khách hàng</option>
                  {this.state.dataCustomer.map((item, index) => {
                    return (
                      <option value={item.cus_id} key={index}>
                        {item.cus_name}
                      </option>
                    );
                  })}
                </select>
              </div>
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
                      <th scope="col"></th>
                      <th scope="col">Nhân viên</th>
                      <th scope="col">Khách hàng</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Ngày hết hạn</th>
                      <th scope="col">Mô tả</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataQuotation.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td className="td_action d-flex">
                            <p
                              className="p_button_table bg-primary"
                              title="Sao chép báo giá"
                              onClick={() =>
                                this.openFormCopyQuotation(item.quotation_id)
                              }
                            >
                              <i className="fa-regular fa-copy"></i>
                            </p>
                            <Link
                              to={
                                "http://localhost:3000/quotations/details/" +
                                item.quotation_id
                              }
                              className="p_button_table bg-success"
                              title="Xem báo giá"
                            >
                              <i className="fa-regular fa-eye"></i>
                            </Link>
                          </td>
                          <td>Báo giá của</td>
                          <td>{item.staff_name}</td>
                          <td>{item.cus_name}</td>
                          <td>
                            {format(
                              parseISO(item.quotation_created_date),
                              "HH:mm:ss dd/MM/yyy"
                            )}
                          </td>
                          <td>
                            {format(
                              parseISO(item.quotation_due_date),
                              "HH:mm:ss dd/MM/yyy"
                            )}
                          </td>
                          <td>
                            {item.quotation_des === ""
                              ? item.quotation_des
                              : "Không có ghi chú"}
                          </td>
                          <td>
                            {item.quotation_status === "0" ? (
                              <p className="p_button p_button_no_margin bg-success">
                                Đã In
                              </p>
                            ) : item.quotation_status === "1" ? (
                              <p className="p_button p_button_no_margin bg-danger">
                                Chưa In
                              </p>
                            ) : item.quotation_status === "2" ? (
                              <p className="p_button p_button_no_margin bg-info">
                                Đã gửi
                              </p>
                            ) : (
                              <p className="p_button p_button_no_margin">
                                Không xác định
                              </p>
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
        {/* <!-- End Main --> */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
          id="copy-quotation-container"
        >
          <form className="insert-form">
            <p className="row m-0 p-o w-100 insert-form-title">
              Sao chép báo giá
            </p>
            <div className="row p-0 w-100 justify-content-between insert-form-gr">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div className="row m-0 p-0 h-100 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Nhân viên
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      name="staff_id"
                      value={
                        this.state.dataQuotationCopy.staff_name
                          ? this.state.dataQuotationCopy.staff_name
                          : ""
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
                      Khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      name="cus_id"
                      value={
                        this.state.dataQuotationCopy.cus_name
                          ? this.state.dataQuotationCopy.cus_name
                          : ""
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
                      Ngày tạo
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input"
                      name="quotation_created_date"
                      value={
                        this.state.dataQuotationInsert.quotation_created_date
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
                      Ngày hết hạn
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="datetime-local"
                      className="insert-form-input"
                      name="quotation_due_date"
                      onChange={(event) => {
                        this.onChangeInput(event);
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
                      Mô tả
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input"
                      name="quotation_des"
                      onChange={(event) => {
                        this.onChangeInput(event);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-0 w-100 justify-content-end insert-form-gr">
              <p className="col-auto p_button bg-secondary">Tạo lại</p>
              <p
                className="col-auto p_button bg-danger"
                id="btn_close_forminsert"
                onClick={this.closeFormCopyQuotation}
              >
                Đóng
              </p>
              <p
                className="col-auto p_button"
                id="submit_forminsert"
                onClick={(event) => {
                  this.submitFormCopyQuotation(event);
                }}
              >
                Xác nhận
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default Quotatioon;
