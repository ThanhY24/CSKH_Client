import React from "react";
import axios from "axios";
class ServicesGroupList extends React.Component {
  state = {
    dataSer_Gr: [],
  };
  // Láy dữ liệu
  componentDidMount() {
    this.getSerGr();
  }
  getSerGr = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/services-group")
      .then((response) => {
        this.setState({
          dataSer_Gr: response.data,
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
              <th scope="col">Tên nhóm dịch vụ</th>
              <th scope="col">Trang thái</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataSer_Gr.map((item, index) => {
              return (
                <tr key={item.ser_gr_id}>
                  <th scope="row">{index + 1}</th>
                  <td className="td_action d-flex">
                    <p className="p_button_table bg-danger">
                      <i className="fa-solid fa-trash"></i>
                    </p>
                    <p className="p_button_table bg-warning">
                      <i className="fa-solid fa-user-pen"></i>
                    </p>
                  </td>
                  <td>{item.ser_gr_name}</td>
                  <td>{item.ser_gr_status === "1" ? "Hoạt động" : "Tạm ẩn"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
export default ServicesGroupList;
