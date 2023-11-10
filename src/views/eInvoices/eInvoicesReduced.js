import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import formatCurrency from "../FormatCurrency";
import axios from "axios";
import { toast } from "react-toastify";
// import { parseISO, format } from "date-fns/locale";
const EInvoicesIncreases = () => {
  const { fkey } = useParams();
  const [searchParams] = useSearchParams();
  // Lấy pattern=?
  const pattern = searchParams.get("pattern");
  const serial = searchParams.get("serial");
  const no = searchParams.get("no");
  const [DataInvLoad, setDataInvLoad] = useState([]);
  const [Type, setType] = useState([]);
  const [DataInvProducts, setDataInvProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    DGia: "0",
    DVTinh: "30 Ngày",
    MHHDVu: "10",
    SLuong: "1",
    STCKhau: [],
    STT: "",
    TChat: "1",
    THHDVu: "",
    TLCKhau: [],
    TSuat: "5%",
    TTKhac: {
      TTin: [
        { DLieu: "0", KDLieu: "numeric", TTruong: "Amount" },
        { DLieu: "13500", KDLieu: "numeric", TTruong: "VATAmount" },
      ],
    },
    ThTien: "",
  });
  useEffect(() => {
    setType(3); //3 là điều chỉnh giảm
    getDataInvByFkeyAndPattern();
  }, [fkey]);
  let total = 0;
  const getDataInvByFkeyAndPattern = async () => {
    document.getElementById("loading-container").style.display = "flex";
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/eInvoices/getDataByFkey/${fkey}?pattern=${pattern}`
      );
      const dataInv = response.data.dataInv;
      setDataInvLoad(dataInv);
      const dataInvProducts = dataInv?.DLHDon?.NDHDon?.DSHHDVu?.HHDVu;
      if (dataInvProducts) {
        setDataInvProducts(dataInvProducts);
        console.log(DataInvLoad);
        console.log(DataInvProducts);
        document.getElementById("loading-container").style.display = "none";
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Chỉ đc nhập số
  const handleKeyDown = (event) => {
    const charCode = event.which || event.keyCode;
    // Bỏ qua ngăn chặn nếu là nút xóa
    if (charCode !== 8 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };
  const onChangeInputDataProduct = (event, index) => {
    const { name, value } = event.target;
    const updatedDataInvProducts = [...DataInvProducts];
    if (name === "DGia" && value >= 0) {
      updatedDataInvProducts[index] = {
        ...updatedDataInvProducts[index],
        [name]: value * -1,
      };
    } else {
      updatedDataInvProducts[index] = {
        ...updatedDataInvProducts[index],
        [name]: value,
      };
    }

    let VATAmount =
      (updatedDataInvProducts[index].DGia *
        parseFloat(updatedDataInvProducts[index].TSuat.replace("%", "")) *
        updatedDataInvProducts[index].SLuong) /
      100;
    let ThTien =
      updatedDataInvProducts[index].DGia * updatedDataInvProducts[index].SLuong;
    updatedDataInvProducts[index].TTKhac.TTin[1].DLieu = VATAmount;
    updatedDataInvProducts[index].ThTien = ThTien;
    updatedDataInvProducts[index].TTKhac.TTin[0].DLieu = VATAmount + ThTien;
    setDataInvProducts(updatedDataInvProducts);
  }; // Xóa phần tử trong danh sách sản phẩm
  const deleteItem = (index) => {
    if (index >= 0 && index < DataInvProducts.length) {
      const updatedDataInvProducts = [...DataInvProducts];
      updatedDataInvProducts.splice(index, 1);
      if (setDataInvProducts(updatedDataInvProducts)) {
        console.log(DataInvProducts);
      }
    }
  };
  // Thêm một phần tử trong danh sách sản phẩm
  const addNewProduct = () => {
    const updatedDataInvProducts = [...DataInvProducts];
    updatedDataInvProducts.push(newProduct);
    if (setDataInvProducts(updatedDataInvProducts)) {
      console.log(DataInvProducts);
    }
  };
  // Lưu điều chỉnh báo giá
  const saveChangeEInvoices = () => {
    document.getElementById("loading-container").style.display = "flex";
    let newInvNo = Number(no) + 1;
    const data = {
      dataEInv: DataInvLoad,
      dataEInvProducts: DataInvProducts,
      pattern: pattern,
      fkey: fkey,
      type: Type,
      serial: serial,
      no: newInvNo,
      staff_name: JSON.parse(localStorage.getItem("dataUser"))["staff_name"],
    };
    axios
      .post("http://127.0.0.1:8000/api/v1/eInvoices/changeEInvoices", data)
      .then((response) => {
        toast.success(response.data.message);
        document.getElementById("loading-container").style.display = "none";
      })
      .catch((error) => {
        toast.warn("Hóa đơn không thể điều chỉnh");
        document.getElementById("loading-container").style.display = "none";
      });
  };
  return (
    <>
      <div className="toolbar row justify-content-between">
        <p className="col-2 p-0 m-0 toolbar-title">
          <Link to={"http://localhost:3000/eInvoices/"}>Hóa đơn</Link> / Điều
          chỉnh giảm
        </p>
        <div className="col-5 p-0 m-0 d-flex justify-content-end">
          <Link
            to={"http://localhost:3000/eInvoices"}
            className="p_button bg-danger"
          >
            <i className="fa-solid fa-chevron-left"></i>Quay lại
          </Link>
          <p
            className="p_button bg-primary"
            onClick={() => {
              saveChangeEInvoices();
            }}
          >
            <i className="fa-solid fa-floppy-disk"></i>Lưu
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
            Thông tin hóa đơn
          </p>
          <div className="row p-0 w-100 justify-content-between">
            <div className="col-6">
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Người bán
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NBan?.Ten ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Mã số thuế
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NBan?.MST ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Địa chỉ
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    name="transaction_staff"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NBan?.DChi ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Số điện thoại
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    name="transaction_note"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NBan?.SDThoai ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Tiền tệ
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    name="transaction_note"
                    value={
                      DataInvLoad?.DLHDon?.TTChung?.DVTTe || "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Người mua
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    name="due_date"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NMua?.Ten ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Mã số thuế
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    name="transaction_cus"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NMua?.MST ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Địa chỉ
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NMua?.DChi ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Số điện thoại
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    name="transaction_note"
                    value={
                      DataInvLoad?.DLHDon?.NDHDon?.NMua?.SDThoai ||
                      "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
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
                    name="transaction_note"
                    value={
                      DataInvLoad?.DLHDon?.TTChung?.HTTToan === "TM"
                        ? "Tiền Mặt"
                        : "Chưa có thông tin"
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <form action="" className="insert-form">
          <p className="row m-0 p-o w-100 insert-form-title">
            Thông tin sản phẩm
          </p>
          <div className="row h-100 p-0 m-0">
            <div className="w-100 p-0">
              <div className="col-auto main-content-col datatable d-flex justify-content-center h300 border-none">
                <div className="row p-0 m-0 datatable-table table-invoices mt-2">
                  <table className="table table-invoices-table h300">
                    <thead>
                      <tr className="table-tr-invoices">
                        <th scope="col">STT</th>
                        <th></th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn vị tính</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">VAT(%)</th>
                        <th scope="col">Phí VAT</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DataInvProducts.length > 0 &&
                        DataInvProducts.map((item, index) => {
                          total +=
                            (item.DGia *
                              parseFloat(item.TSuat.replace("%", "")) *
                              item.SLuong) /
                              100 +
                            Number(item.DGia);
                          return (
                            <tr key={index} className="eInvoice-table-tr">
                              <td
                                style={{
                                  width: "50px",
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td>
                                <p
                                  className="p_button_text_color text-danger p-0 m-0"
                                  title="Xóa dòng này"
                                  onClick={() => {
                                    deleteItem(index);
                                  }}
                                >
                                  <i class="fa-solid fa-xmark"></i>
                                </p>
                              </td>
                              <td style={{ width: "300px" }}>
                                <input
                                  className="input-table-eInvoices"
                                  value={item.THHDVu}
                                  onChange={(event) => {
                                    onChangeInputDataProduct(event, index);
                                  }}
                                  name="THHDVu"
                                />
                              </td>
                              <td>
                                <input
                                  className="input-table-eInvoices"
                                  value={item.SLuong}
                                  onKeyDown={(event) => {
                                    handleKeyDown(event);
                                  }}
                                  onChange={(event) => {
                                    onChangeInputDataProduct(event, index);
                                  }}
                                  name="SLuong"
                                />
                              </td>
                              <td>
                                <input
                                  className="input-table-eInvoices"
                                  value={item.DVTinh}
                                  onChange={(event) => {
                                    onChangeInputDataProduct(event, index);
                                  }}
                                  name="DVTinh"
                                />
                              </td>
                              <td>
                                <input
                                  className="input-table-eInvoices"
                                  value={item.DGia}
                                  onChange={(event) => {
                                    onChangeInputDataProduct(event, index);
                                  }}
                                  onKeyDown={(event) => {
                                    handleKeyDown(event);
                                  }}
                                  name="DGia"
                                />
                              </td>
                              <td>
                                <input
                                  className="input-table-eInvoices"
                                  value={item.TSuat}
                                  onChange={(event) => {
                                    onChangeInputDataProduct(event, index);
                                  }}
                                  name="TSuat"
                                />
                              </td>
                              <td>
                                {formatCurrency(
                                  (item.DGia *
                                    parseFloat(item.TSuat.replace("%", "")) *
                                    item.SLuong) /
                                    100
                                )}
                              </td>
                              <td>{formatCurrency(Number(item.ThTien))}</td>
                              <td>
                                {formatCurrency(
                                  (item.DGia *
                                    parseFloat(item.TSuat.replace("%", "")) *
                                    item.SLuong) /
                                    100 +
                                    Number(item.DGia)
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">
                          <p
                            className="p_button_text_color text-success p-0 m-0"
                            title="Thêm một dòng"
                            onClick={() => {
                              addNewProduct();
                            }}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </p>
                        </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">{formatCurrency(total)}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Select Product */}
      <div
        className="container-fluid p-0 m-0 w-100 h-100 insert-form-container"
        id="select-product-container"
      >
        <form className="insert-form">
          <p className="row m-0 p-o w-100 insert-form-title">Chọn sản phẩm</p>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Sản phẩm
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <select
                    className="insert-form-select"
                    id=""
                    onChange={(event) => {
                      this.onChangeSelectProduct(event);
                    }}
                  >
                    <option value="0">Chọn sản phẩm</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Giá bán
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="number"
                    className="insert-form-input"
                    name="products_cost"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Số lượng
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="number"
                    className="insert-form-input"
                    name="invoices_item_quantity"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Thuế VAT(%)
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="number"
                    className="insert-form-input"
                    name="invoices_item_vat"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row p-0 w-100 justify-content-between insert-form-gr">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Thành Tiền
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input"
                    name="cus_phone"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <div className="row m-0 p-0 h-100 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Tổng Tiền
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input type="text" className="insert-form-input" disabled />
                </div>
              </div>
            </div>
          </div>

          <div className="row p-0 w-100 justify-content-end insert-form-gr">
            <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
            <p
              className="col-auto p_button bg-danger"
              id="btn_close_forminsert"
            >
              Đóng
            </p>
            <p className="col-auto p_button" id="submit_forminsert">
              Xác nhận
            </p>
          </div>
        </form>
      </div>
      {/* <!-- End Main --> */}
    </>
  );
};
export default EInvoicesIncreases;
