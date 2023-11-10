import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import formatCurrency from "../FormatCurrency";

class Change extends React.Component {
  state = {
    dataChange: [],
  };
  componentDidMount() {
    this.getDataChange();
  }
  getDataChange = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios.get("http://127.0.0.1:8000/api/v1/change").then((response) => {
      this.setState({
        dataChange: response.data,
      });
      document.getElementById("loading-container").style.display = "none";
    });
  };
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tất cả cơ hội</p>
          <div className="col-5 p-0 m-0 d-flex justify-content-end">
            <p className="p_button bg-success">
              <i className="fa-solid fa-file-import "></i>Import
            </p>
            <p className="p_button bg-info">
              <i className="fa-solid fa-file-export"></i>Export
            </p>
          </div>
        </div>
        {/* <!-- Main --> */}
        <div
          className="container-fluid p-0 m-0 w-100 h-100 insert-form-block"
          id="insert-form-container"
        >
          <div className="col main-content-col datatable">
            <div className="row p-0 m-0 datatable-table ">
              <table className="table datatable-change">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Thao tác</th>
                    <th scope="col">Khách hàng</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Sản Phẩm</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Tỷ lệ thành công</th>
                    <th scope="col">Ngày bắt đầu</th>
                    <th scope="col">Ngày kỳ vọng</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataChange.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="td_action d-flex">
                          <Link
                            to={`/changes/edit/${item.change_id}`}
                            className="p_button_table bg-warning"
                          >
                            <i className="fa-solid fa-user-pen"></i>
                          </Link>
                        </td>
                        <td>{item.cus_name}</td>
                        <td>{item.cus_phone}</td>
                        <td>{item.cus_email}</td>
                        <td>{item.cus_address}</td>
                        <td>{item.products_name}</td>
                        <td>{item.change_des}</td>
                        <td>{item.change_ratio}%</td>
                        <td>{item.change_start_date}</td>
                        <td>{item.change_expected_date}</td>
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
        {/* <!-- End Main --> */}
      </>
    );
  }
}
export default Change;
