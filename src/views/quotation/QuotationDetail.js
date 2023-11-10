import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import formatCurrency from "../FormatCurrency";
import { Link } from "react-router-dom";
import QuotationPrint from "./QuotationPrint";
import { toast } from "react-toastify";

const QuotationDetail = () => {
  const { idQuo } = useParams();
  const [dataQuotation, setdataQuotation] = useState([]);
  const [dataQuotationItem, setdataQuotationItem] = useState([]);

  useEffect(() => {
    getDataQuotation(idQuo);
  }, [idQuo]);

  const getDataQuotation = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/quotation/details/" + idQuo)
      .then((response) => {
        setdataQuotation(response.data.dataQuotation);
        setdataQuotationItem(response.data.dataQuotationItem);
        document.getElementById("loading-container").style.display = "none";
      });
  };

  let totalAmount = 0;

  //   Tải lại dữ liệu
  const reload = () => {
    getDataQuotation(idQuo);
  };

  // Hiện form xem trước Quotation
  const showQuotation = () => {
    document.getElementById("show-quotation-container").style.display = "flex";
  };
  // Gửi mail báo giá
  return (
    <>
      <div className="toolbar row justify-content-between">
        <p className="col-2 p-0 m-0 toolbar-title" onClick={showQuotation}>
          Xem báo giá
        </p>
        <div className="col-5 p-0 m-0 d-flex justify-content-end">
          <Link
            to={"http://localhost:3000/quotations"}
            className="p_button bg-danger"
          >
            <i className="fa-solid fa-chevron-left"></i>Quay lại
          </Link>
          <p className="p_button bg-primary" onClick={showQuotation}>
            <i class="fa-regular fa-eye"></i>Xem trước
          </p>
        </div>
      </div>
      {/* <!-- Main --> */}
      <div
        className="container-fluid p-0 m-0 w-100 insert-form-block insert-form-fixed-scroll"
        id="insert-form-container"
      >
        <form action="" className="insert-form">
          <p className="row m-0 p-o w-100 insert-form-title">
            Thông tin báo giá
          </p>
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
                    value={dataQuotation.quotation_id}
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
                    value={dataQuotation.quotation_created_date}
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
                    <option value={0}>{dataQuotation.staff_name}</option>
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
                    value={dataQuotation.staff_phone}
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
                    value={dataQuotation.staff_email}
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
                    value={dataQuotation.staff_address}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Ghi chú
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    name="quotation_des"
                    value={dataQuotation.quotation_des}
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
                    value={dataQuotation.quotation_due_date}
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
                    <option value={0}>{dataQuotation.cus_name}</option>
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
                    value={dataQuotation.cus_phone}
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
                    value={dataQuotation.cus_email}
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
                    value={dataQuotation.cus_address}
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
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">VAT(%)</th>
                        <th scope="col">Phí VAT</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                      {dataQuotationItem.map((item, index) => {
                        totalAmount += Number(
                          (item.quotation_item_vat / 100) *
                            item.quotation_products_cost +
                            Number(
                              item.quotation_products_cost *
                                item.quotation_item_quantity
                            )
                        );
                        return (
                          <tr>
                            <td scope="row">{index + 1}</td>
                            <td>{item.products_name}</td>
                            <td>{item.quotation_item_quantity}</td>
                            <td>
                              {formatCurrency(
                                Number(item.quotation_products_cost)
                              )}
                            </td>
                            <td>{item.quotation_item_vat} %</td>
                            <td>
                              {formatCurrency(
                                Number(
                                  (item.quotation_item_vat / 100) *
                                    item.quotation_products_cost
                                )
                              )}
                            </td>
                            <td>
                              {formatCurrency(
                                Number(
                                  (item.quotation_item_vat / 100) *
                                    item.quotation_products_cost +
                                    Number(
                                      item.quotation_products_cost *
                                        item.quotation_item_quantity
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
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">
                          {formatCurrency(Number(totalAmount))}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="col-12 p-0 m-0 d-flex flex-wrap justify-content-end mt-2">
                <p className="p_button bg-primary mb-2" onClick={showQuotation}>
                  <i class="fa-regular fa-eye"></i>Xem trước
                </p>
                <p className="p_button bg-secondary mb-2" onClick={reload}>
                  <i className="fa-solid fa-rotate-left"></i>Tải lại
                </p>
                <Link
                  to={"http://localhost:3000/quotation"}
                  className="p_button bg-danger"
                >
                  <i className="fa-solid fa-chevron-left"></i>Quay lại
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* In báo giá */}
      <QuotationPrint
        dataQuotation={dataQuotation}
        dataQuotationItem={dataQuotationItem}
        totalAmount={totalAmount}
      />
    </>
  );
};
export default QuotationDetail;
