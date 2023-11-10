import React from "react";
import ReactToPrint from "react-to-print";
import formatCurrency from "../FormatCurrency";
import axios from "axios";
import logo from "../../assets/images/logo/logom.png";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";

const closeQuotation = () => {
  document.getElementById("show-quotation-container").style.display = "none";
};
// Cập nhật trạng thái khi in
const QuotationPrint = ({ dataQuotation, dataQuotationItem, totalAmount }) => {
  const sendMail = () => {
    document.getElementById("loading-container").style.display = "flex";
    document.getElementById("sendMail").innerHTML =
      '<i className="fa-solid fa-spinner fa-spin"></i>';
    const printDiv = document.getElementById("print");
    if (printDiv) {
      domtoimage
        .toJpeg(printDiv)
        .then((dataUrl) => {
          console.log(dataUrl);
          dataUrl = dataUrl.split(",")[1];
          axios
            .post(
              "http://127.0.0.1:8000/api/v1/quotation/sendmail/" +
                dataQuotation["quotation_id"],
              {
                image: dataUrl,
              }
            )
            .then((response) => {
              console.log("Gửi thành công:", response.data);
              document.getElementById("sendMail").innerHTML =
                '<i className="fa-solid fa-check fa-shake"></i>';
              toast.success("Gửi Mail thành công");
              document.getElementById("loading-container").style.display =
                "none";
            })
            .catch((error) => {
              toast.warn("Lỗi khi gửi mail");
              document.getElementById("loading-container").style.display =
                "none";
              console.error("Lỗi khi gửi lên máy chủ:", error);
            });
        })
        .catch((error) => {
          console.error("Lỗi khi chuyển đổi thành hình ảnh:", error);
        });
    }
  };

  const updateStatus = () => {
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/quotation/print/" +
          dataQuotation.quotation_id
      )
      .then((response) => {
        toast.success(response.data.message);
      });
    console.log(dataQuotation.quotation_id);
  };
  return (
    <>
      <div
        className="container-fluid m-0 w-100 h-100 insert-form-container"
        id="show-quotation-container"
      >
        <div className="print-button d-flex justify-content-end">
          <p
            className="p_button bg-danger print-button-item"
            onClick={closeQuotation}
          >
            Đóng
          </p>
          <ReactToPrint
            trigger={() => (
              <p className="p_button bg-success print-button-item">
                <i className="fa-solid fa-print"></i>In
              </p>
            )}
            content={() => document.getElementById("print-container")}
            onBeforeGetContent={() => updateStatus()}
          />
          <p
            className="p_button bg-primary print-button-item"
            style={{ width: "150px;" }}
            id="sendMail"
            onClick={sendMail}
          >
            <i className="fa-solid fa-envelope"></i>Gửi Mail
          </p>
        </div>
        <div className="print-container" id="print-container">
          <div className="print" id="print">
            <div className="row print-header d-flex">
              <div className="col-6 print-header-logo">
                <img src={logo} />
              </div>
              <div className="col-6 print-header-info">
                <div className="row w-100 header-info-item1">
                  TRUNG TÂM KINH DOANH VNPT CẦN THƠ - VNPT VINAPHONE
                </div>
                <div className="row w-100 header-info-item2">
                  Địa chỉ: Số 02 Nguyễn Trãi, P. Tân An, Q.Ninh Kiều, TP. Cần
                  Thơ
                </div>
                <div className="row w-100 header-info-item3">
                  Holine: 0888.517.507
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center print-title">
              <p className="m-0">BẢNG BÁO GIÁ DỊCH VỤ CỦA VNPT</p>
            </div>
            <div className="row d-flex justify-content-center print-des">
              <p className="m-0">
                Kính gửi: Quý khách hàng {dataQuotation.cus_name}
              </p>
            </div>
            <div className="row d-flex print-des-2">
              <p className="m-0">
                Trung tâm kinh doanh VNPT Cần Thơ xin báo giá dịch vụ, chi tiết
                như sau :
              </p>
            </div>
            <div className="row d-flex print-table">
              <table className="table print-table-table">
                <thead>
                  <tr className="table-quotation-tr table-quotation-tr-header">
                    <th scope="col">STT</th> <th scope="col">Sản phẩm</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">VAT(%)</th>
                    <th scope="col">Phí VAT</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {dataQuotationItem.map((item, index) => {
                    return (
                      <tr className="table-quotation-tr" key={index}>
                        <td>{index + 1}</td>
                        <td>{item.products_name}</td>
                        <td>
                          {formatCurrency(Number(item.quotation_products_cost))}
                        </td>
                        <td>{item.quotation_item_vat}%</td>
                        <td>
                          {formatCurrency(
                            (item.quotation_item_vat *
                              item.quotation_products_cost) /
                              100
                          )}
                        </td>
                        <td>
                          {formatCurrency(
                            (item.quotation_item_vat *
                              item.quotation_products_cost) /
                              100 +
                              Number(item.quotation_products_cost)
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="table-quotation-tr">
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">{formatCurrency(Number(totalAmount))}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="print-des">
              <p className="row p-0 m-0">
                Báo giá chỉ có hiệu lực đến hết ngày:{" "}
                {/* {format(
                  parseISO(dataQuotation.quotation_due_date),
                  "dd/MM/yyy"
                )} */}
                {dataQuotation.quotation_due_date}
              </p>
            </div>
            <div className="print-des">
              <p className="row p-0 m-0">
                Ghi chú:{" "}
                {dataQuotation.quotation_des === null
                  ? "Không có ghi chú"
                  : dataQuotation.quotation_des}
              </p>
            </div>
            <div className="print-footer">
              <p className="row p-0 m-0">
                Mọi thông tin chi tiết, xin vui lòng liên hệ:
              </p>
              <p className="row p-0 m-0">
                {dataQuotation.staff_name} - {dataQuotation.staff_position}
              </p>
              <p className="row p-0 m-0">
                SĐT: {dataQuotation.staff_phone} - Email:{" "}
                {dataQuotation.staff_email}
              </p>
            </div>
            <div className="space"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuotationPrint;
