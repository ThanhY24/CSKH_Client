import React from "react";
class ListCustomer extends React.Component {
  render() {
    return (
      <>
        <div className="col-10 main-content-col datatable">
          <div className="row p-0 m-0 datatable-table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ và Tên</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Địa chỉ mail</th>
                  <th scope="col">Tổng tiền mua hàng</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Hạn mức</th>
                  <th scope="col">Ngày tham gia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Lê Thành Ý</td>
                  <td>Nam</td>
                  <td>0866747580</td>
                  <td>lethanhy9999@gmail.com</td>
                  <td>10.000.000đ</td>
                  <td>Anh Khánh, Ninh Kiều, Cần Thơ</td>
                  <td>20.000.000đ</td>
                  <td>08/08/2023</td>
                </tr>
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
              <li className="page-item active">
                <a className="page-link" href="link">
                  5
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
export default ListCustomer;
