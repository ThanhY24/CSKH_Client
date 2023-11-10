import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";

function EditChange() {
  const [dataInsertChange, setDataInsertChange] = useState({
    change_id: "",
    change_des: "",
    change_start_date: "",
    change_expected_date: "",
    change_ratio: "",
    cus_id: "",
    change_status: "0",
  });

  const [dataCustomer, setDataCustomer] = useState([]);
  const [dataCustomerSelected, setDataCustomerSelected] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getDataCustomer();
    getDataChange(id);
  }, [id]);

  const getDataCustomer = () => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get("http://127.0.0.1:8000/api/v1/customers")
      .then((response) => {
        setDataCustomer(response.data);
        document.getElementById("loading-container").style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  };

  const getDataChange = (id) => {
    document.getElementById("loading-container").style.display = "flex";
    axios
      .get(`http://127.0.0.1:8000/api/v1/edit-change/${id}`)
      .then((response) => {
        setDataInsertChange(response.data);
        document.getElementById("loading-container").style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching change data:", error);
      });
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setDataInsertChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeInputSelectCus = (event) => {
    const { value } = event.target;
    const selectedCustomer = dataCustomer.find(
      (customer) => customer.cus_id === parseInt(value, 10)
    );
    if (selectedCustomer) {
      setDataCustomerSelected({
        cus_address: selectedCustomer.cus_address || "",
        cus_gender: selectedCustomer.cus_gender || "",
        cus_phone: selectedCustomer.cus_phone || "",
        cus_email: selectedCustomer.cus_email || "",
      });
    }
  };

  const onSubmitFormInsert = (event) => {
    event.preventDefault();
    document.getElementById("loading-container").style.display = "flex";
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/edit-change/" +
          dataInsertChange.change_id,
        dataInsertChange
      )
      .then((response) => {
        toast.success(response.data.message);
        // Đợi trong 2 giây trước khi chuyển hướng
        setTimeout(() => {
          window.location.href = "http://localhost:3000/changes";
        }, 1000);
        document.getElementById("loading-container").style.display = "none";
      })
      .catch((error) => {
        console.error("Error inserting change:", error);
      });
  };
  return (
    <>
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
            <p className="row m-0 p-o w-100 insert-form-title">
              Chỉnh sửa cơ hội
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
                      placeholder="Mã tự sinh"
                      defaultValue={dataInsertChange.change_id || ""}
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
                      defaultValue={dataInsertChange.change_start_date || ""}
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
                      defaultValue={dataInsertChange.change_expected_date || ""}
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
                      defaultValue={dataInsertChange.change_des || ""}
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
                      defaultValue={dataInsertChange.change_ratio || ""}
                      onChange={onChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row m-0 p-0 mt-3 w-100 align-items-center">
                  <div className="col-2 p-0 m-0">
                    <label htmlFor="" className="insert-form-label">
                      Chọn khách hàng
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <select
                      name="cus_id"
                      className="insert-form-select"
                      id=""
                      value={dataInsertChange.cus_id || ""}
                      onChange={(event) => {
                        onChangeInput(event);
                        onChangeInputSelectCus(event);
                      }}
                    >
                      <option value="0">Chọn</option>
                      {dataCustomer.map((item, index) => {
                        return (
                          <option key={index} value={item.cus_id}>
                            {item.cus_name}
                          </option>
                        );
                      })}
                    </select>
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
                      Giới tính
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="cus_gender"
                      defaultValue={dataCustomerSelected.cus_gender}
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
                      Email
                    </label>
                  </div>
                  <div className="col-10 p-0 m-0">
                    <input
                      type="text"
                      className="insert-form-input-block"
                      placeholder="Chưa có thông tin"
                      name="cus_email"
                      defaultValue={dataCustomerSelected.cus_email}
                      disabled
                    />
                  </div>
                </div>
                <div className="row m-0 p-0 mt-3 w-100 align-items-center justify-content-end">
                  <p className="col-auto p_button bg-danger">Xóa dữ liệu</p>
                  <Link
                    to={`/changes`}
                    className="col-auto p_button bg-danger"
                    id="btn_close_forminsert"
                  >
                    Quay Lại
                  </Link>
                  <button className="col-auto p_button">Xác nhận</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* <!-- End Main --> */}
      </>
    </>
  );
}
export default EditChange;
