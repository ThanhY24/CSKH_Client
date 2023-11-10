import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ConvertToChange = () => {
  const [dataInsertChange, setDataInsertChange] = useState({
    change_des: "",
    change_start_date: "",
    change_expected_date: "",
    change_ratio: "",
    cus_id: "",
    staff_id: "",
    products_id: "",
    change_status: "0",
  });

  const [dataCustomer, setDataCustomer] = useState([]);
  const [dataStaff, setDataStaff] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataCustomerSelected, setDataCustomerSelected] = useState({
    cus_address: "",
    cus_gender: "",
    cus_phone: "",
    cus_email: "",
  });

  const { idStaff, idCus } = useParams(); // Nhận các giá trị từ đường dẫn URL

  useEffect(() => {
    getDataCustomer(idCus);
    getDataStaff(idStaff);
    getDataProduct();
    setDataInsertChange((prevState) => ({
      ...prevState,
      staff_id: idStaff,
      cus_id: idCus,
    }));
  }, [idStaff, idCus]);
  useEffect(() => {
    if (dataCustomer) {
      setDataCustomerSelected({
        cus_address: dataCustomer.cus_address || "",
        cus_gender: dataCustomer.cus_gender || "",
        cus_phone: dataCustomer.cus_phone || "",
        cus_email: dataCustomer.cus_email || "",
        cus_name: dataCustomer.cus_name || "",
      });
    }
  }, [dataCustomer]);

  const getDataCustomer = (idCus) => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/customers/" + idCus)
      .then((response) => {
        setDataCustomer(response.data);
        document.getElementById("loading-container").style.display = "none";
      })
      .catch();
  };
  const getDataStaff = (idStaff) => {
    axios
      .get("http://127.0.0.1:8000/api/v1/staff/" + idStaff)
      .then((response) => {
        setDataStaff(response.data.data);
      });
  };
  const getDataProduct = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/products/")
      .then((response) => {
        setDataProduct(response.data.data);
      })
      .catch((error) => {
        console.log("Lỗi: " + error);
      });
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setDataInsertChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitFormInsert = (event) => {
    event.preventDefault();
    document.getElementById("loading-container").style.display = "flex";
    axios
      .post("http://127.0.0.1:8000/api/v1/insert-change", dataInsertChange)
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "http://localhost:3000/changes";
        }, 1000);
        document.getElementById("loading-container").style.display = "none";
      });
  };

  return (
    <>
      <div className="toolbar row justify-content-between">
        <p className="col-2 p-0 m-0 toolbar-title">Cơ hội</p>
        <div className="col-5 p-0 m-0 d-flex justify-content-end">
          <p className="p_button bg-success">
            <i className="fa-solid fa-file-import "></i>Import
          </p>
        </div>
      </div>
      {/* <!-- Main --> */}
      <div
        className="container-fluid p-0 m-0 w-100 h-100 insert-form-block"
        id="insert-form-container"
      >
        <form action="" className="insert-form" onSubmit={onSubmitFormInsert}>
          <p className="row m-0 p-o w-100 insert-form-title">Thêm cơ hội</p>
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
                    placeholder="Mã tự sinh"
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Ngày bắt đầu
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="date"
                    className="insert-form-input-block"
                    placeholder=""
                    name="change_start_date"
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Ngày kỳ vọng
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="date"
                    className="insert-form-input-block"
                    placeholder=""
                    name="change_expected_date"
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Mô tả
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    placeholder=""
                    name="change_des"
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Tỷ lệ thành công
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="number"
                    className="insert-form-input-block"
                    placeholder=""
                    name="change_ratio"
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Sản phẩm
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <select
                    name="products_id"
                    className="insert-form-select"
                    onChange={onChangeInput}
                    id=""
                  >
                    <option value={0}>Chọn sản phẩm</option>
                    {dataProduct.map((item, index) => {
                      return (
                        <option key={index} value={item.products_id}>
                          {item.products_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Khách hàng
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    placeholder="Chưa có thông tin"
                    name="cus_address"
                    defaultValue={dataCustomerSelected.cus_name}
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
                    placeholder="Chưa có thông tin"
                    name="cus_address"
                    defaultValue={dataCustomerSelected.cus_address}
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
                    placeholder="Chưa có thông tin"
                    name="cus_phone"
                    defaultValue={dataCustomerSelected.cus_phone}
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Nhân viên
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    defaultValue={dataStaff.staff_name}
                    disabled
                  />
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
                    defaultValue={dataStaff.staff_phone}
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                <div className="col-2 p-0 m-0">
                  <label htmlFor="" className="insert-form-label">
                    Email nhân viên
                  </label>
                </div>
                <div className="col-10 p-0 m-0">
                  <input
                    type="text"
                    className="insert-form-input-block"
                    defaultValue={dataStaff.staff_email}
                    disabled
                  />
                </div>
              </div>
              <div className="row m-0 p-0 mt-3 w-100 align-items-center justify-content-end">
                <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
                <a
                  href="http://localhost:3000/change"
                  className="col-auto p_button bg-danger"
                  id="btn_close_forminsert"
                >
                  Quay Lại
                </a>
                <button className="col-auto p_button">Xác nhận</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* <!-- End Main --> */}
    </>
  );
};
export default ConvertToChange;
