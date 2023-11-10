import React from "react";
import axios from "axios";
class ServicesList extends React.Component {
  state = {
    dataSer: [],
  };
  // Láy dữ liệu
  componentDidMount() {
    this.getSerGr();
  }
  getSerGr = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios.get("http://127.0.0.1:8000/api/v1/services").then((response) => {
      this.setState({
        dataSer: response.data,
      });
      document.getElementById("loading-container").style.display = "none";
    });
  };
  render() {
    return (
      <>
        <table className="table service-table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Thao tác</th>
              <th scope="col">Tên dịch vụ</th>
              <th scope="col">Tên nhóm dịch vụ</th>
              <th scope="col">Trang thái</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataSer.map((item, index) => {
              return (
                <tr key={item.ser_id}>
                  <th scope="row">{index + 1}</th>
                  <td className="td_action d-flex">
                    <p className="p_button_table bg-danger">
                      <i className="fa-solid fa-trash"></i>
                    </p>
                    <p className="p_button_table bg-warning">
                      <i className="fa-solid fa-user-pen"></i>
                    </p>
                  </td>
                  <td>{item.ser_name}</td>
                  <td>{item.ser_gr_name}</td>
                  <td>{item.ser_status === "1" ? "Hoạt động" : "Tạm ẩn"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
export default ServicesList;
