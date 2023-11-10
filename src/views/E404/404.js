import React from "react";
import { Link } from "react-router-dom";
class NotFound extends React.Component {
  render() {
    return (
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-auto col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Có vẻ như bạn lạc đường</h3>

                  <p>trang bạn đang xem không tồn tại!</p>

                  <Link to="/customers" className="link_404 button_404">
                    Về Trang Chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NotFound;
