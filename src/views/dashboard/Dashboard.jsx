import React, { useEffect, useState } from "react";
import { Page } from "../../layout";
import { Loader } from "../../components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);

  const series = [
    {
      name: "Sales",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
  };

  const series2 = [
    {
      name: "Inflation",
      data: [2.3, 3.1, 4.0, 5.1, 6.2, 7.3, 8.4],
    },
  ];

  const options2 = {
    chart: {
      height: 350,
      type: "line",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
      ],
    },
  };

  const series3 = [
    {
      name: "Marine Sprite",
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: "Striking Calf",
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: "Tank Picture",
      data: [12, 17, 11, 9, 15, 11, 20],
    },
    {
      name: "Bucket Slope",
      data: [9, 7, 5, 8, 6, 9, 4],
    },
    {
      name: "Reborn Kid",
      data: [25, 12, 19, 32, 25, 24, 10],
    },
  ];

  const options3 = {
    chart: {
      height: 350,
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#ff0000",
            },
            {
              from: 51,
              to: 100,
              color: "#ff0000",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <Page>
      <h1 className="text-4xl pb-4 font-semibold text-gray-700">
        Data Analytics From Promed App
      </h1>
      <div className="relative">
        {loading ? (
          <div className="flex justify-center align-baseline pt-40  w-full">
            <Loader width="50px" height="50px" />
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-2xl pb-4 font-semibold text-green-700">
                Depression insights
              </h2>
              <Chart
                options={options}
                series={series}
                type="bar"
                height={500}
              />
            </div>
            <div>
              <h2 className="text-2xl pb-4 font-semibold text-green-700">
                Anxiety insights
              </h2>
              <Chart
                options={options2}
                series={series2}
                type="bar"
                height={500}
              />
            </div>
            <div>
              <h2 className="text-2xl pb-4 font-semibold text-green-700">
                Stress insights
              </h2>
              <Chart
                options={options3}
                series={series3}
                type="bar"
                height={500}
              />
            </div>
          </>
        )}
      </div>
    </Page>
  );
};

export default Dashboard;
