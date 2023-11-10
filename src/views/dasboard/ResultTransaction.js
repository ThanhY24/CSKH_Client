import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { format } from "date-fns";
import "date-fns/locale/en-CA";
import { da } from "date-fns/locale";

class ResultTransaction extends React.Component {
  state = {
    dataSearch: {
      startDate: format(new Date(), "dd-MM-yyyy"),
      endDate: format(new Date(), "dd-MM-yyyy"),
    },
    dataTransaction: [],
    dataTransactionResult: [],
    dataResultTransaction: {
      labels: [],
      datasets: [
        {
          label: "Kết quả giao dịch",
          data: [],
        },
      ],
    },
    optionResultTransaction: {},
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const dataUserJSON = localStorage.getItem("dataUser");
    if (dataUserJSON) {
      const dataUser = JSON.parse(dataUserJSON);
      const staffId = dataUser.staff_id;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/dashboard/transaction/${staffId}`
        );
        // Khai báo dữ liệu để xử lý
        const { dataTransaction, dataTransactionResult } = response.data;
        let dataTransactionNew = [];
        let dataTransactionResultNew = [];
        let dateTransaction;
        let deadLine = 0;
        const labels = [];
        const data = [];
        // Kiểm tra khoảng thời gian
        dataTransaction.forEach((item) => {
          dateTransaction = format(
            new Date(item["transaction_start_date"]),
            "dd-MM-yyyy"
          );
          if (
            this.state.dataSearch.startDate <= dateTransaction &&
            this.state.dataSearch.endDate >= dateTransaction
          ) {
            dataTransactionNew.push(item);
          }
          if (item.transaction_status === "2") {
            deadLine += 1;
          }
        });
        // Tạo mảng cbi cho đổ dữ liệu vào biểu đồ
        dataTransactionResult.forEach((item) => {
          const {
            transaction_result_name,
            transaction_result_id,
            transaction_result_count,
          } = item;
          dataTransactionResultNew.push({
            transaction_result_name,
            transaction_result_id,
            transaction_result_count: 0,
          });
          // Tạo một đối tượng để lưu trữ số lần xuất hiện của mỗi transaction_result_id
          const resultCountMap = {};

          // Lặp qua dataTransactionNew để tính toán số lần xuất hiện của mỗi transaction_result_id
          dataTransactionNew.forEach((transactionItem) => {
            const transaction_result_id = transactionItem.transaction_result_id;
            if (resultCountMap[transaction_result_id] === undefined) {
              resultCountMap[transaction_result_id] = 1;
            } else {
              resultCountMap[transaction_result_id]++;
            }
          });
          // Cập nhật giá trị transaction_result_count trong dataTransactionResultNew
          dataTransactionResultNew.forEach((resultItem) => {
            const transaction_result_id = resultItem.transaction_result_id;
            if (resultCountMap[transaction_result_id] !== undefined) {
              resultItem.transaction_result_count =
                resultCountMap[transaction_result_id];
            }
          });
        });
        // ĐỔ dữ liệu deadlien vào mảng để đổ lên sơ đồ
        dataTransactionResultNew.push({
          transaction_result_name: "Trễ hạn",
          transaction_result_count: deadLine,
        });
        // Lọc các giá trị rỗng ra khỏi mảng
        dataTransactionResultNew = dataTransactionResultNew.filter((item) => {
          return (
            typeof item.transaction_result_count !== "undefined" &&
            item.transaction_result_count !== 0
          );
        });
        // Đổ dữ liệu
        dataTransactionResultNew.forEach((item) => {
          labels.push(item.transaction_result_name);
          data.push(item.transaction_result_count);
        });
        // Thiết lập dữ liệu cho biểu đồ
        this.setState({
          dataResultTransaction: {
            ...this.state.dataResultTransaction,
            labels: labels,
            datasets: [
              {
                label: "Kết quả giao dịch",
                data: data,
              },
            ],
          },
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giao dịch:", error);
      }
    } else {
      console.log(
        "Không tìm thấy dữ liệu trong localStorage cho khóa 'dataUser'."
      );
    }
  };
  // Xem theo ngày
  setDataSearhIsToday = (event) => {
    this.setState({
      dataSearch: {
        startDate: format(new Date(), "dd-MM-yyyy"),
        endDate: format(new Date(), "dd-MM-yyyy"),
      },
    });
    this.removeActiveClass("result_transaction_dashboard");
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
        startDate: format(startOfWeek, "dd-MM-yyyy"),
        endDate: format(endOfWeek, "dd-MM-yyyy"),
      },
    });
    this.getData();
    this.removeActiveClass("result_transaction_dashboard");
    event.target.classList.add("dashboard-filter-date-active");
  };
  // Xem theo tháng
  setDataSearhIsMonth = (event) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.setState({
      dataSearch: {
        startDate: format(startOfMonth, "dd-MM-yyyy"),
        endDate: format(endOfMonth, "dd-MM-yyyy"),
      },
    });
    this.removeActiveClass("result_transaction_dashboard");
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
        startDate: format(startOfYear, "dd-MM-yyyy"),
        endDate: format(endOfYear, "dd-MM-yyyy"),
      },
    });
    this.removeActiveClass("result_transaction_dashboard");
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
          ...prevState.dataSearch, // Sao chép tất cả các giá trị hiện có
          [event.target.name]: format(
            new Date(event.target.value),
            "dd-MM-yyyy"
          ),
        },
      };
    });
  };
  // Xem theo ngày tự chọn
  setDataSearchIsCustom = () => {
    this.removeActiveClass("result_transaction_dashboard");
    console.log(this.state.dataSearch);
    this.getData();
  };

  render() {
    return (
      <>
        <div className="dasboard-item-title d-flex justify-content-between align-items-center pt-1 pb-1 pl-1 border border-black">
          <p className="m-0 dasboard-item-title-p">Kết quả giao dịch</p>
          <div
            className="dashboard-filter d-flex"
            id="result_transaction_dashboard"
          >
            <p
              className="dashboard-filter-date dashboard-filter-date-active"
              onClick={this.setDataSearhIsToday}
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
              data={this.state.dataResultTransaction}
              options={this.state.optionResultTransaction}
            />
            <div className="row justify-content-between mt-3 border">
              <p className="dasboard-searchByDate-label ml-4">Từ ngày</p>
              <input
                type="date"
                name="startDate"
                className="col-3 input_dashboard"
                onChange={(event) => {
                  this.onChangeInputDataSearch(event);
                }}
              ></input>
              <p className="dasboard-searchByDate-label">Đến ngày</p>
              <input
                type="date"
                name="endDate"
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
      </>
    );
  }
}

export default ResultTransaction;
