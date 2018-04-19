import React from "react";
import { render } from "react-dom";
import AppFrame from "./app/AppFrame";
import Dashboard from "react-dazzle";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { BarChart, Bar } from "recharts";
//import Victory from './Victory';
import { compose } from "redux";
import { connect } from "react-redux";

const AxisLabel = ({
  axisType,
  x = 0,
  y = 0,
  width,
  height,
  stroke,
  children
}) => {
  const isVert = axisType === "yAxis";
  const cx = isVert ? x + 20 : x + width / 2;
  const cy = isVert ? height / 2 + y : y + height;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text
      x={cx}
      y={cy}
      transform={`rotate(${rot})`}
      textAnchor="middle"
      stroke={stroke}
    >
      {children}
    </text>
  );
};

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 }
];

class RechartsComp extends React.Component {
  render() {
    console.log("Props within Recharts:");
    console.log(this.props);
    if (this.props.charts.chartType == "line") {
      return (
        <AppFrame>
          <h3>{this.props.charts.title}</h3>
          <LineChart width={400} height={400} data={this.props.charts.data}>
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
            <XAxis
              dataKey="x"
              label={
                <AxisLabel axisType="xAxis" width={400} height={400}>
                  {this.props.charts.xaxisLabel}
                </AxisLabel>
              }
            />
            <YAxis
              label={
                <AxisLabel axisType="yAxis" width={400} height={400}>
                  {this.props.charts.yaxisLabel}
                </AxisLabel>
              }
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
          </LineChart>
        </AppFrame>
      );
    }
    if (this.props.charts.chartType == "pie") {
      return (
        <AppFrame>
          <h3>{this.props.charts.title}</h3>
          <PieChart width={800} height={400}>
            <Pie
              data={this.props.charts.data}
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </AppFrame>
      );
    }

    if (this.props.charts.chartType == "bar") {
      return (
        <AppFrame>
          <h3>{this.props.charts.title}</h3>
          <BarChart
            width={600}
            height={300}
            data={this.props.charts.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="x"
              label={
                <AxisLabel axisType="xAxis" width={600} height={300}>
                  {this.props.charts.xaxisLabel}
                </AxisLabel>
              }
            />
            <YAxis
              dataKey="y"
              label={
                <AxisLabel axisType="yAxis" width={600} height={300}>
                  {this.props.charts.yaxisLabel}
                </AxisLabel>
              }
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="y" fill="#8884d8" />
          </BarChart>
        </AppFrame>
      );
    }
    // return(
    //  <AppFrame >
    //  <LineChart width={400} height={400} data={this.props.charts.data}>
    //    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    //    <XAxis dataKey="name"/>
    //    <YAxis/>
    //    <CartesianGrid strokeDasharray="3 3"/>
    //    <Tooltip/>
    //    <Legend />

    //    </LineChart>

    //     <PieChart width={800} height={400}>
    //     <Pie data={this.props.charts.data02} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
    //     </PieChart>

    //   </AppFrame>
    // );
  }
}

// const mapStateToProps = state => {
//     return {charts : state.val}
// }

// const mapDispatchToProps = dispatch => {}

// const Recharts = connect(
//     mapStateToProps,
// )(RechartsComp)

export default RechartsComp;
