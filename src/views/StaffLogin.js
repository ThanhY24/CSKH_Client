import React from "react";
import axios from "axios";
import image1 from "../assets/images/login/customer2.jpg";
import { toast } from "react-toastify";
class StaffLogin extends React.Component {
  state = {
    dataLogin: {
      staff_email: "",
      staff_password: "",
    },
  };
  changeInputLogin = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        dataLogin: {
          ...prevState.dataLogin,
          [name]: value,
        },
      }),
      () => {
        console.log(this.state.dataLogin);
      }
    );
  };
  submitFormLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/v1/staff-login", this.state.dataLogin)
      .then((response) => {
        if (response.data.success) {
          // Callback với App
          this.props.onLoginSuccess();
          localStorage.setItem(
            "dataUser",
            JSON.stringify(response.data.dataUser)
          );
          localStorage.setItem("token", response.data.token);
          console.log(localStorage.getItem("token"));
        } else {
          toast.error(response.data.message);
        }
      })
      .catch();
  };
  render() {
    return (
      <div className="login-container">
        <div className="login-form-container">
          <div className="image">
            <img src={image1} alt="" />
          </div>
          <form
            action=""
            className="login-form"
            onSubmit={this.submitFormLogin}
          >
            <p className="form-item-header">CRM LOGIN</p>
            <div className="form-item">
              <div className="form-item-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="form-item-input">
                <input
                  type="text"
                  placeholder="Email"
                  name="staff_email"
                  onChange={this.changeInputLogin}
                  id="off-boxshadow-input"
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-item-icon">
                <i className="fa-solid fa-lock"></i>
              </div>
              <div className="form-item-input">
                <input
                  type="password"
                  placeholder="Password"
                  name="staff_password"
                  onChange={this.changeInputLogin}
                  id="off-boxshadow-input"
                />
              </div>
            </div>
            <div className="form-item-link">
              <a href="/">Forgot password?</a>
            </div>
            <div className="form-item-button">
              <button>LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default StaffLogin;
