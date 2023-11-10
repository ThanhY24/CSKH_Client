import React from "react";
// Component
import ServicesGroupForm from "./ServicesGroupForm";
import ServicesGroupList from "./ServicesGroupList";
import ServicesForm from "./ServicesForm";
import ServicesList from "./ServicesList";
// Toast
import { toast } from "react-toastify";
// Axios
import axios from "axios";
// className
class Services extends React.Component {
  state = {
    dataServices: {},
    dataServicesInsert: {},
    dataServicesGroup: {},
    dataServicesGroupInsert: {},
  };
  // Sự kiện nhấn thay đổi
  render() {
    return (
      <>
        <div className="toolbar row justify-content-between">
          <p className="col-2 p-0 m-0 toolbar-title">Tất cả dịch vụ</p>
        </div>
        {/* <!-- Main --> */}
        <div className="container-fluid main-content m-0">
          <div className="row p-0 m-0 justify-content-between">
            <div className="col-auto m-0 services-container">
              <p className="form-title ">Thêm mới nhóm dịch vụ</p>
              {/* Form Ser_Gr */}
              <ServicesGroupForm />
              <p className="form-title  mt-3">Danh sách dịch vụ</p>
              {/* List Ser_Gr */}
              <ServicesGroupList />
            </div>
            <div className="col-auto m-0 services-container">
              <p className="form-title">Thêm mới dịch vụ</p>
              {/* Form Ser */}
              <ServicesForm />
              <p className="form-title mt-3">Danh sách dịch vụ</p>
              {/* List Ser */}
              <ServicesList />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Services;
