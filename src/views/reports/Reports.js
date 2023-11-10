import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import moment from "moment";
import "moment-timezone";
import { toast } from "react-toastify";
import { el } from "date-fns/locale";

class Reports extends React.Component {
  state = {
    // Lấy thông tin
    dataStaff: [],
    startDate: "",
    endDate: "",
    staff_id: null,
  };
  componentDidMount() {
    this.getDataStaffAndCustomer();
  }
  // Lấy danh sách nhân viên và khách hàng
  getDataStaffAndCustomer = () => {
    axios.get("http://127.0.0.1:8000/api/v1/staff").then((response) => {
      this.setState({
        dataStaff: response.data,
      });
    });
  };
  onChangeSelect = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  onSubmitReportFormRevenue = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Xuất báo cáo</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end"></div>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row h-100 p-0 m-0">
            <form className="col-3 main-content-col fillter">
              <p className="form-title m-0 p-0">DANH SÁCH</p>
              <div className="row m-0 p-0">
                <div className="fillter-gr">
                  <a
                    href="http://127.0.0.1:8000/api/v1/staff/export"
                    download={true}
                    style={{ color: "black" }}
                  >
                    Danh sách sách nhân viên
                    <i className="fa-solid fa-file-arrow-down ml-2 text-primary"></i>
                  </a>
                </div>
                <div className="fillter-gr">
                  <a
                    href="http://127.0.0.1:8000/api/v1/customers/export"
                    download={true}
                    style={{ color: "black" }}
                  >
                    Danh sách sách khách hàng
                    <i className="fa-solid fa-file-arrow-down ml-2 text-primary"></i>
                  </a>
                </div>
                <div className="fillter-gr">
                  <a
                    href="http://127.0.0.1:8000/api/v1/products/export"
                    download={true}
                    style={{ color: "black" }}
                  >
                    Danh sách sách sản phẩm
                    <i className="fa-solid fa-file-arrow-down ml-2 text-primary"></i>
                  </a>
                </div>
                <div className="fillter-gr">
                  <a
                    href="http://127.0.0.1:8000/api/v1/transaction/export"
                    download={true}
                    style={{ color: "black" }}
                  >
                    Danh sách sách giao dịch
                    <i className="fa-solid fa-file-arrow-down ml-2 text-primary"></i>
                  </a>
                </div>
                <div className="fillter-gr">
                  <a
                    href="http://127.0.0.1:8000/api/v1/services/export"
                    download={true}
                    style={{ color: "black" }}
                  >
                    Danh sách sách nhóm dịch vụ và dịch vụ
                    <i className="fa-solid fa-file-arrow-down ml-2 text-primary"></i>
                  </a>
                </div>
              </div>
            </form>
            <form
              className="col-4 main-content-col fillter"
              onSubmit={(event) => {
                this.onSubmitReportFormRevenue(event);
              }}
            >
              <p className="form-title m-0 p-0">BÁO CÁO DOANH THU</p>
              <div className="row m-0 p-0">
                <div className="fillter-gr">
                  <label htmlFor="">Từ ngày</label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={(event) => {
                      this.onChangeSelect(event);
                    }}
                  />
                </div>
                <div className="fillter-gr">
                  <label htmlFor="">Đến ngày</label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={(event) => {
                      this.onChangeSelect(event);
                    }}
                  />
                </div>
                <div
                  className="fillter-gr fillter-gr-report"
                  id="withStaffInput"
                >
                  <label htmlFor="">Chọn nhân viên</label>
                  <select
                    name="staff_id"
                    id="staff_id"
                    onChange={(event) => {
                      this.onChangeSelect(event);
                    }}
                  >
                    {this.state.dataStaff.map((item, index) => {
                      return (
                        <option key={index} value={item.staff_id}>
                          {item.staff_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p
                  className="p_button p-0 m-0 mt-3 mr-2 bg-danger"
                  style={{ width: "50px" }}
                >
                  Xóa
                </p>
                <p
                  className="p_button p-0 m-0 mt-3 bg-success"
                  style={{ width: "100px" }}
                >
                  Hôm nay
                </p>
                <button
                  className="p_button p-0 m-0 mt-3 ml-2 bg-primary"
                  style={{ border: "none", outline: "none" }}
                >
                  Tải Về
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default Reports;
