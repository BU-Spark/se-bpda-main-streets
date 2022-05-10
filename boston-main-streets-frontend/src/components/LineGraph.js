import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineGraph = ({data, labelName, dataName}) => {

    return (
        <Line
            datasetIdKey="data"
            data={{
                labels: (labelName) ? data.map((item) => item[`${labelName}`]) : [],
                datasets: [
                    {
                        id: "data",
                        label: "",
                        data: data.map((item) => item[`${dataName}`])
                    }
                ]
            }}
        />
    )
}

export default LineGraph