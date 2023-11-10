import React from "react";
import { NavLink } from "react-router-dom";
import avatar from "../assets/images/avatar/av1.png";
class Header extends React.Component {
  render() {
    // Mở menu
    const openMenuUser = () => {
      document.getElementById("menu-user").style.display = "flex";
    };
    const closeMenuUser = () => {
      document.getElementById("menu-user").style.display = "none";
    };
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    return (
      <div className="header">
        <div className="row header-top justify-content-between">
          <div className="col-3 header-logo header-item">
            <div className="icon-logo m-0">
              <p className="icon-logo-text">VNPT ConnectiveCARE</p>
            </div>
          </div>
          <div className="col-5 h header-item">
            <form
              action=""
              className="row w-100 header-search-form justify-content-center"
            >
              <input
                type="text"
                placeholder="Tìm kiếm liên hệ, hoặc khách hàng"
                id="header-search-input"
              />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div className="col-3 header-icon header-item  justify-content-end">
            <p className="header-icon-item" title="Tổng đài hỗ trợ sự cố">
              <i className="fa-solid fa-headset"></i>
            </p>
            <p className="header-icon-item" title="Thông báo">
              <i className="fa-regular fa-bell"></i>
            </p>
            <p className="header-icon-item" title="Thông báo">
              <i className="fa-regular fa-calendar"></i>
            </p>
            <p className="header-icon-item" title="Thông báo">
              <i className="fa-solid fa-calculator"></i>
            </p>
            <p className="header-icon-item" onClick={openMenuUser}>
              <img src={avatar} alt="" className="header-item-end" />
            </p>
            <div
              className="menu-user"
              id="menu-user"
              onMouseLeave={closeMenuUser}
            >
              <img
                src={avatar}
                className="menu-user-avt"
                alt="Quay về trang chủ"
              />
              <p className="menu-user-name">{dataUser.staff_name}</p>
              <p className="menu-user-gmail">{dataUser.staff_email}</p>
              <a href="/" className="menu-user-item">
                <i className="fa-solid fa-key"></i> Đổi mật khẩu
              </a>
              <a href="/" className="menu-user-item">
                <i className="fa-solid fa-gear"></i> Thiết lập tài khoản
              </a>
              <p
                href="/"
                className="menu-user-item-logout"
                onClick={this.props.onLogout}
              >
                Đăng xuất
              </p>
            </div>
            {/* <p className="header-icon-item">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </p> */}
          </div>
        </div>
        <div className="row header-bottom justify-content-start">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item ">
              <i className="fa-solid fa-gauge-high"></i>Tổng Quan
            </div>
          </NavLink>
          <NavLink
            to={"/customers"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-users"></i>Khách Hàng
            </div>
          </NavLink>
          <NavLink
            to={"/staffs"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-users-line"></i>Nhân Viên
            </div>
          </NavLink>
          <NavLink
            to={"/products"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-box"></i>Sản Phẩm
            </div>
          </NavLink>
          <NavLink
            to={"/quotations"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-receipt"></i>Báo Giá
            </div>
          </NavLink>
          <NavLink
            to={"/invoices"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-money-bill-1-wave"></i>Đơn Hàng
            </div>
          </NavLink>
          <NavLink
            to={"/eInvoices"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-file-invoice"></i>Hóa Đơn
            </div>
          </NavLink>
          <NavLink
            to={"/transactions"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-clipboard-check"></i>Giao Dịch
            </div>
          </NavLink>
          <NavLink
            to={"/changes"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-address-book"></i>Cơ Hội
            </div>
          </NavLink>
          <NavLink
            to={"/reports"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-chart-simple"></i>Báo Cáo/Thống Kê
            </div>
          </NavLink>
          <NavLink
            to={"/services"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "header-bottom-item_focus" : ""
            }
          >
            <div className="header-bottom-item">
              <i className="fa-solid fa-rectangle-list"></i>Dịch Vụ
            </div>
          </NavLink>
        </div>
      </div>
    );
  }
}
export default Header;
