import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import "date-fns/locale/en-CA";
import { da } from "date-fns/locale";
import axios from "axios";

class Transaction extends React.Component {
  state = {
    dataSearch: {
      startDate: format(new Date(), "yyyy-MM-dd", { timeZone: "UTC" }),
      endDate: format(new Date(), "yyyy-MM-dd", { timeZone: "UTC" }),
    },
    dataTransaction: {
      labels: [],
      datasets: [
        {
          label: "Thông kê giao dịch",
          data: [],
        },
      ],
    },
    optionTransaction: {},
  };
  componentDidMount() {
    this.getData();
  }

  // Hàm để so sánh ngày tháng
  compareDates(date1, date2) {
    // Chuyển chuỗi ngày tháng sang đối tượng Date
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);

    // Lấy giá trị ngày, tháng, năm của từng đối tượng Date
    const day1 = dateObj1.getDate();
    const month1 = dateObj1.getMonth();
    const year1 = dateObj1.getFullYear();

    const day2 = dateObj2.getDate();
    const month2 = dateObj2.getMonth();
    const year2 = dateObj2.getFullYear();

    // So sánh năm trước
    if (year1 < year2) {
      return -1;
    } else if (year1 > year2) {
      return 1;
    }

    // Nếu năm bằng nhau, thì so sánh tháng
    if (month1 < month2) {
      return -1;
    } else if (month1 > month2) {
      return 1;
    }

    // Nếu tháng bằng nhau, thì so sánh ngày
    if (day1 < day2) {
      return -1;
    } else if (day1 > day2) {
      return 1;
    }

    // Nếu ngày cũng bằng nhau
    return 0;
  }

  getData = () => {
    const dataUserJSON = localStorage.getItem("dataUser");
    const dataUser = JSON.parse(dataUserJSON);
    const staffId = dataUser.staff_id;
    axios
      .get(`http://127.0.0.1:8000/api/v1/dashboard/transaction/${staffId}`)
      .then((response) => {
        const dataTransactionServe = response.data.dataTransaction;
        const dataTransactionNoIDServe = response.data.dataTransactionNoID;

        let dateTransaction;
        let deadLine = 0;
        let task = 0;
        let total = 0;
        let complete = 0;

        dataTransactionServe.forEach((item) => {
          dateTransaction = format(
            new Date(item["transaction_start_date"]),
            "yyyy-MM-dd",
            { timeZone: "UTC" }
          );
          console.log(
            this.compareDates(this.state.dataSearch.startDate, dateTransaction)
          );
          // So sánh ngày bằng cách cộng dồn
          if (
            this.compareDates(
              this.state.dataSearch.startDate,
              dateTransaction
            ) <= 0 &&
            this.compareDates(this.state.dataSearch.endDate, dateTransaction) >=
              0
          ) {
            if (item["transaction_status"] === "2") {
              deadLine++;
            }
            if (item["transaction_status"] === "1") {
              task++;
            }
            if (item["transaction_status"] === "0") {
              complete++;
            }
          }
        });

        dataTransactionNoIDServe.forEach((item) => {
          dateTransaction = format(
            new Date(item["transaction_start_date"]),
            "yyyy-MM-dd",
            { timeZone: "UTC" }
          );

          // So sánh ngày bằng cách cộng dồn
          if (
            this.compareDates(
              this.state.dataSearch.startDate,
              dateTransaction
            ) <= 0 &&
            this.compareDates(this.state.dataSearch.endDate, dateTransaction) >=
              0
          ) {
            total++;
          }
        });

        const labels = [
          "Giao dịch cần làm",
          "Trễ thời hạn",
          "Đã hoàn thành",
          "Giao dịch chung",
        ];
        const dataChart = [task, deadLine, complete, total];
        console.log(dataChart);
        this.setState(
          {
            dataTransaction: {
              ...this.state.dataTransaction,
              labels: labels,
              datasets: [
                {
                  label: "Kết quả giao dịch",
                  data: dataChart,
                  backgroundColor: [
                    "rgba(57, 172, 49, 0.8)",
                    "rgba(236, 66, 67, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
          },
          () => {
            console.log(this.state.dataTransaction);
          }
        );
      });
  };

  // Xem theo ngày
  setDataSearhIsToday = (event) => {
    const currentDate = format(new Date(), "yyyy-MM-dd", { timeZone: "UTC" });
    this.setState({
      dataSearch: {
        startDate: currentDate,
        endDate: currentDate,
      },
    });
    this.removeActiveClass("transaction_dashboard");
    event.target.classList.add("dashboard-filter-date-active");
    this.getData();
  };

  // Xem theo tuần
  setDataSearhIsWeek = (event) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    this.setState({
      dataSearch: {
        startDate: format(startOfWeek, "yyyy-MM-dd", { timeZone: "UTC" }),
        endDate: format(endOfWeek, "yyyy-MM-dd", { timeZone: "UTC" }),
      },
    });
    this.getData();
    this.removeActiveClass("transaction_dashboard");
    event.target.classList.add("dashboard-filter-date-active");
  };

  // Xem theo tháng
  setDataSearhIsMonth = (event) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.setState({
      dataSearch: {
        startDate: format(startOfMonth, "yyyy-MM-dd", { timeZone: "UTC" }),
        endDate: format(endOfMonth, "yyyy-MM-dd", { timeZone: "UTC" }),
      },
    });
    this.removeActiveClass("transaction_dashboard");
    event.target.classList.add("dashboard-filter-date-active");
    this.getData();
  };

  // Xem theo năm
  setDataSearchIsYear = (event) => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    this.setState({
      dataSearch: {
        startDate: format(startOfYear, "yyyy-MM-dd", { timeZone: "UTC" }),
        endDate: format(endOfYear, "yyyy-MM-dd", { timeZone: "UTC" }),
      },
    });
    this.removeActiveClass("transaction_dashboard");
    event.target.classList.add("dashboard-filter-date-active");
    this.getData();
  };

  // Hủy class active
  removeActiveClass = (id) => {
    const resultTransactionDashboard = document.getElementById(id);
    if (resultTransactionDashboard) {
      const dateElements = resultTransactionDashboard.getElementsByClassName(
        "dashboard-filter-date"
      );
      for (const element of dateElements) {
        element.classList.remove("dashboard-filter-date-active");
      }
    }
  };

  // Thay đổi input
  onChangeInputDataSearch = (event) => {
    this.setState((prevState) => {
      return {
        dataSearch: {
          ...prevState.dataSearch,
          [event.target.name]: event.target.value,
        },
      };
    });
  };

  // Xem theo ngày tự chọn
  setDataSearchIsCustom = () => {
    this.removeActiveClass("transaction_dashboard");
    this.getData();
  };

  render() {
    return (
      <>
        <div className="dasboard-item-title d-flex justify-content-between align-items-center pt-1 pb-1 pl-1 border border-black">
          <p className="m-0 dasboard-item-title-p">Giao dịch bàn giao</p>
          <div className="dashboard-filter d-flex " id="transaction_dashboard">
            <p
              className="dashboard-filter-date dashboard-filter-date-active"
              onClick={(event) => {
                this.setDataSearhIsToday(event);
              }}
            >
              Ngày
            </p>
            <p
              className="dashboard-filter-date"
              onClick={(event) => {
                this.setDataSearhIsWeek(event);
              }}
            >
              Tuần
            </p>
            <p
              className="dashboard-filter-date"
              onClick={(event) => {
                this.setDataSearhIsMonth(event);
              }}
            >
              Tháng
            </p>
            <p
              className="dashboard-filter-date"
              onClick={(event) => {
                this.setDataSearchIsYear(event);
              }}
            >
              Năm
            </p>
          </div>
        </div>
        <div className="dashboard-item-content">
          <div className="chart-container">
            <Bar
              data={this.state.dataTransaction}
              options={this.state.optionTransaction}
            />
            <div className="row justify-content-between mt-3 border">
              <p className="dasboard-searchByDate-label ml-4">Từ ngày</p>
              <input
                type="date"
                name="startDate"
                className="col-3 input_dashboard"
                value={this.state.dataSearch.startDate}
                onChange={(event) => {
                  this.onChangeInputDataSearch(event);
                }}
              ></input>
              <p className="dasboard-searchByDate-label">Đến ngày</p>
              <input
                type="date"
                name="endDate"
                value={this.state.dataSearch.endDate}
                onChange={(event) => {
                  this.onChangeInputDataSearch(event);
                }}
                className="col-3 input_dashboard"
              ></input>
              <p
                className="p_button_dasboard col-1"
                onClick={this.setDataSearchIsCustom}
              >
                Xem
              </p>
            </div>
          </div>
        </div>
        <div>
          <pre>{this.state.test}</pre>
        </div>
      </>
    );
  }
}
export default Transaction;
