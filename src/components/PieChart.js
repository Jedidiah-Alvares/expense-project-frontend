import React, { Component } from "react";
import Chart from "react-apexcharts";

// To display the donut chart
class PieChart extends Component {
  constructor(props) {
    super(props);

    // Set the value for the donut chart
    this.state = {
      series: [],
      options: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  color: "#373d3f",
                },
                value: {
                  formatter: function (val) {
                    return Number(val).toLocaleString("en-IN");
                  },
                },
                total: {
                  show: true,
                  label: "Total Expense",
                  fontSize: "100%",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "bold",
                  color: "#373d3f",
                  formatter: function (w) {
                    return w.globals.seriesTotals
                      .reduce((a, b) => {
                        return a + b;
                      }, 0)
                      .toLocaleString("en-IN");
                  },
                },
              },
            },
          },
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100%",
              },
            },
          },
        ],
        legend: {
          show: true,
          position: "top",
          fontSize: "15%",
          fontWeight: 600,
        },
      },
    };
  }

  // get and update state from props
  static getDerivedStateFromProps(props, state) {
    return {
      series: props.expenses,
      options: { ...state.options, labels: props.categories },
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="donut"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PieChart;
/**
 *  num.toLocaleString("en-IN")
 */
