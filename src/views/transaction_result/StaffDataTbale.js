import axios from "axios";
import React from "react";
import { parseISO, format } from "date-fns";
// Toast
import { toast } from "react-toastify";
class StaffDataTable extends React.Component {
  // Lấy dữ liệu nhân viên
  state = {
    dataStaff: [],
  };
  // Nhấn nút chỉnh sửa
  getDataEdit = (cus_id) => {
    axios
      .get("http://127.0.0.1:8000/api/v1/staff/" + cus_id)
      .then((response) => {
        this.props.onEdit(response.data.data);
      })
      .catch((error) => {});
  };
  // Lấy dữ liệu
  componentDidMount() {
    this.getStaff();
  }
  getStaff = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/staff")
      .then((response) => {
        this.setState({ dataStaff: response.data });
      })
      .catch((error) => {
        console.log("Lỗi rồi: ", error);
      });
  };
  // Sự kiện nhấn nút xóa khách hàng
  onClickButtonRemove(staff_id) {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khách hàng này?"
    );
    if (confirmDelete) {
      axios
        .get("http://127.0.0.1:8000/api/v1/hide_staff/" + staff_id)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.success(error.data.message);
        });
    }
  }
  render() {
    return (
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
                <th scope="col">Chức Vụ</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dataStaff.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="td_action d-flex">
                      <p
                        className="p_button_table bg-danger"
                        onClick={() => {
                          this.onClickButtonRemove(item.staff_id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </p>
                      <p
                        className="p_button_table bg-warning"
                        onClick={() => this.getDataEdit(item.staff_id)}
                      >
                        <i className="fa-solid fa-user-pen"></i>
                      </p>
                      <p className="p_button_table bg-info">
                        <i className="fa-solid fa-envelope"></i>
                      </p>
                    </td>
                    <td>{item.staff_name}</td>
                    <td>{item.staff_gender === "1" ? "Nam" : "Nữ"}</td>
                    <td>{item.staff_phone}</td>
                    <td>{item.staff_email}</td>
                    <td>{item.staff_position}</td>
                    <td>{item.staff_address}</td>
                    <td>
                      {format(parseISO(item.created_at), "HH:mm:ss dd/MM/yyy")}
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
    );
  }
}
export default StaffDataTable;
