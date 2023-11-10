import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatCurrency from "../FormatCurrency";
import moment from "moment";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import { toast } from "react-toastify";

const InvoicesDetail = () => {
  const { idInvoices } = useParams();
  const [dataInvoices, setDataInvoices] = useState([]);
  const [dataInvoicesItem, setDataInvoicesItem] = useState([]);

  useEffect(() => {
    getDataInvoices(idInvoices);
  }, [idInvoices]);

  const getDataInvoices = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/invoices/details/" + idInvoices)
      .then((response) => {
        setDataInvoices(response.data.dataInvoices);
        setDataInvoicesItem(response.data.dataInvoicesItem);
      });
  };

  const invoiceDate = moment(dataInvoices.invoices_date).format("DD/MM/YYYY");
  const valueQr = `Mã đơn hàng: ${dataInvoices.invoices_id}\nNgày tạo: ${invoiceDate}\nTổng tiền: ${dataInvoices.invoices_total_amount}\nKhách hàng: ${dataInvoices.cus_name}\nNhân viên: ${dataInvoices.staff_name}`;
  //   Tải lại dữ liệu
  const reload = () => {
    getDataInvoices(idInvoices);
  };
  const import_EInvocies = (idInvoices) => {
    document.getElementById("loading").innerHTML =
      '<i className="fa-solid fa-spinner fa-spin"></i>';
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/eInvoices/create/" + idInvoices)
      .then((response) => {
        toast.success(response.data.message);
        document.getElementById("loading").innerHTML =
          '<i className="fa-solid fa-check fa-shake"></i>';
        setTimeout(function () {
          document.getElementById("loading").innerHTML =
            '<i className="fa-solid fa-check"></i>Đã Xuất';
        }, 500);
        document.getElementById("loading-container").style.display = "none";
        setTimeout(function () {
          window.location.href = "http://localhost:3000/eInvoices";
        }, 1000);
      });
  };
  return (
    <>
      <div className="toolbar row justify-content-between">
        <p className="col-2 p-0 m-0 toolbar-title">Xem đơn hàng</p>
        <div className="col-5 p-0 m-0 d-flex justify-content-end">
          <Link
            to={"http://localhost:3000/invoices"}
            className="p_button bg-danger"
          >
            <i className="fa-solid fa-chevron-left"></i>Quay lại
          </Link>
          <p
            className="p_button bg-primary"
            id="loading"
            onClick={() => import_EInvocies(dataInvoices.invoices_id)}
          >
            <i className="fa-solid fa-file-export"></i>Xuất hóa đơn
          </p>
        </div>
      </div>
      {/* <!-- Main --> */}
      <div
        className="container-fluid p-0 m-0 w-100 insert-form-block insert-form-fixed-scroll"
        id="insert-form-container"
      >
        <form action="" className="insert-form">
          <p className="row m-0 p-o w-100 insert-form-title">Xem đơn hàng</p>
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
                    value={dataInvoices.invoices_id}
                    disabled
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
                    value={dataInvoices.invoices_date}
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
                    disabled
                  >
                    <option value={0}>{dataInvoices.staff_name}</option>
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
                    value={dataInvoices.staff_phone}
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
                    value={dataInvoices.staff_email}
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
                    value={dataInvoices.staff_address}
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Token
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    placeholder="Chưa có thông tin"
                    name="transaction_note"
                    value={dataInvoices.invoices_token}
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
                    name="quotation_des"
                    value={dataInvoices.payment_method}
                    disabled
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
                    name="quotation_due_date"
                    value={dataInvoices.due_date}
                    disabled
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
                    defaultValue={0}
                    className="insert-form-select"
                    id=""
                    disabled
                  >
                    <option value={0}>{dataInvoices.cus_name}</option>
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
                    name="transaction_note"
                    value={dataInvoices.cus_phone}
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
                    value={dataInvoices.cus_email}
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
                    value={dataInvoices.cus_address}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <form action="" className="insert-form" id="quotation-item">
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
                        <th scope="col">STT</th> <th scope="col">Sản phẩm</th>
                        <th scope="col">Đơn Vị Tính</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">VAT(%)</th>
                        <th scope="col">Phí VAT</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                      {dataInvoicesItem.map((item, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.products_name}</td>
                            <td>{item.products_duration}</td>
                            <td>{item.invoices_item_quantity}</td>
                            <td>
                              {formatCurrency(Number(item.products_cost))}
                            </td>
                            <td>{item.invoices_item_vat} %</td>
                            <td>
                              {formatCurrency(
                                Number(
                                  (item.invoices_item_vat / 100) *
                                    item.products_cost
                                )
                              )}
                            </td>
                            <td>
                              {formatCurrency(
                                Number(
                                  (item.invoices_item_vat / 100) *
                                    item.products_cost +
                                    Number(
                                      item.products_cost *
                                        item.invoices_item_quantity
                                    )
                                )
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
                        <th scope="col"></th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">
                          {formatCurrency(
                            Number(dataInvoices.invoices_total_amount)
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="col-12 p-0 m-0 d-flex flex-wrap justify-content-center mt-2">
                <p className="p_button bg-secondary mb-2" onClick={reload}>
                  <i className="fa-solid fa-rotate-left"></i>Tải lại
                </p>
                <Link
                  to={"http://localhost:3000/invoices"}
                  className="p_button bg-danger"
                >
                  <i className="fa-solid fa-chevron-left"></i>Quay lại
                </Link>
                <QRCode
                  value={valueQr}
                  // style={{ width: "100px", height: "100px" }}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default InvoicesDetail;
