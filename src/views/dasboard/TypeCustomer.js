import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import axios from "axios";

class TypeCustomer extends React.Component {
  state = {
    dataCusNormal: [],
    dataCusChange: [],
    dataChart: [],
    dataTypeCustomer: {
      labels: ["Khách hàng cơ hội", "Khách hàng bình thường"],
      datasets: [
        {
          data: [30, 25],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: ["#FF6384", "#FFCE56"],
          borderWidth: 1,
        },
      ],
    },
    optionTypeCustomer: {},
  };
  componentDidMount() {
    this.getCustomer();
  }
  getCustomer = () => {
    axios.get("http://127.0.0.1:8000/api/v1/customers").then((response1) => {
      this.setState(
        {
          dataCusNormal: response1.data.length,
        },
        () => {
          axios.get("http://127.0.0.1:8000/api/v1/change").then((response2) => {
            const groupedData = {};
            response2.data.forEach((item) => {
              const key = item.cus_id;
              if (!groupedData[key]) {
                groupedData[key] = {
                  cus_id: key,
                };
              }
            });
            const groupedArray = Object.values(groupedData);

            this.setState(
              {
                dataCusChange: groupedArray.length,
              },
              () => {
                const newData = [
                  this.state.dataCusChange,
                  this.state.dataCusNormal - this.state.dataCusChange,
                ];
                this.setState(
                  (prevState) => ({
                    dataTypeCustomer: {
                      ...prevState.dataTypeCustomer,
                      datasets: [
                        {
                          data: newData,
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                          ],
                          borderColor: ["#FF6384", "#FFCE56"],
                          borderWidth: 1,
                        },
                      ],
                    },
                  }),
                  () => {
                    console.log(this.state.dataTypeCustomer);
                  }
                );
              }
            );
          });
        }
      );
    });
  };

  render() {
    return (
      <>
        <div className="dasboard-item-title d-flex justify-content-between align-items-center pt-1 pb-1 pl-1 border border-black">
          <p className="m-0 dasboard-item-title-p">Tỷ lệ khách hàng</p>
        </div>
        <div className="dashboard-item-content">
          <div className="chart-container">
            <Pie
              data={this.state.dataTypeCustomer}
              options={this.state.optionTypeCustomer}
              style={{ margin: "0 auto" }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default TypeCustomer;
