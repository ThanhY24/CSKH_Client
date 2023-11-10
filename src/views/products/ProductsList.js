import React from "react";
import axios from "axios";
import formatCurrency from "../FormatCurrency";
import { parseISO, format } from "date-fns";
class ProductsList extends React.Component {
  state = {
    dataProducts: [],
    dataServices: [],
  };

  componentDidMount() {
    this.getServices();
    this.getProducts();
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
  getProducts = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/products")
      .then((response) => {
        this.setState({
          dataProducts: response.data.data,
        });
        document.getElementById("loading-container").style.display = "none";
      })
      .catch();
  };
  //Lấy dữ liệu chỉnh sửa
  getDataEdit = (product_id) => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/products/" + product_id)
      .then((response) => {
        this.props.onEdit(response.data);
        document.getElementById("loading-container").style.display = "none";
      })
      .catch((error) => {});
  };
  // Nhấn nút xem sản phẩm
  openViewProducts = (product_id) => {
    this.props.onViewProduct(product_id);
  };
  changeInputSearchByServices = (event) => {
    let idServices = event.target.value;
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/products-in-services/" + idServices)
      .then((response) => {
        this.setState({
          dataProducts: response.data.dataProducts,
        });
        document.getElementById("loading-container").style.display = "none";
      });
  };
  render() {
    return (
      <>
        {/* Search Form */}
        <form className="col-2 main-content-col fillter">
          <p className="form-title m-0 p-0">
            LỌC SẢN PHẨM THEO
            <i className="fa-solid fa-magnifying-glass"></i>
          </p>
          <div className="fillter-gr">
            <label htmlFor="">Chọn dịch vụ</label>
            <select
              name="ser_id"
              onChange={(event) => {
                this.changeInputSearchByServices(event);
              }}
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
          <p
            className="p_button p-0 m-0 mt-3 fillter-button bg-danger"
            onClick={() => {
              this.getProducts();
            }}
          >
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
                  <th scope="col">Tên gói cưới</th>
                  <th scope="col">Giá bán</th>
                  <th scope="col">Cú pháp</th>
                  <th scope="col">Thời hạn</th>
                  <th scope="col">Thuộc dịch vụ</th>
                  <th scope="col">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {this.state.dataProducts.map((item, index) => {
                  return (
                    <tr key={item.products_id}>
                      <th scope="row">{index + 1}</th>
                      <td className="td_action d-flex">
                        <p
                          className="p_button_table bg-warning"
                          onClick={() => this.getDataEdit(item.products_id)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </p>
                        <p
                          className="p_button_table bg-success"
                          onClick={() =>
                            this.openViewProducts(item.products_id)
                          }
                        >
                          <i className="fa-solid fa-eye"></i>
                        </p>
                      </td>
                      <td>{item.products_name}</td>
                      <td>{formatCurrency(Number(item.products_cost))}</td>
                      <td>{item.products_syntax}</td>
                      <td>{item.products_duration}</td>
                      <td>{item.ser_name}</td>
                      <td>
                        {format(
                          parseISO(item.created_at),
                          "HH:mm:ss dd/MM/yyy"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
export default ProductsList;
