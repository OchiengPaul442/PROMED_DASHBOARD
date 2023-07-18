import React, { useEffect, useState } from "react";
import { Page } from "../../layout";
import { Loader } from "../../components";
import Chart from "react-apexcharts";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [seriesData, setSeriesData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });
  }, []);

  const getAllData = async () => {
    const q = await getDocs(collection(db, "Results"));
    const data = q.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    const filteredData = data.filter((item) => item.id === currentUser.uid);
    setSeriesData(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      getAllData();
    }
  }, [currentUser]);

  const series = [
    {
      name: "Severity",
      data: seriesData[0]?.Depression ? seriesData[0]?.Depression.answers : [],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    },
  };

  const series2 = [
    {
      name: "Severity",
      data: seriesData[0]?.Anxiety ? seriesData[0]?.Anxiety.answers : [],
    },
  ];

  const options2 = {
    chart: {
      height: 350,
      type: "line",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
    },
  };

  const series3 = [
    {
      name: "Severity",
      data: seriesData[0]?.PTSD ? seriesData[0]?.PTSD.answers : [],
    },
  ];

  const options3 = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q5",
        "Q6",
        "Q7",
        "Q8",
        "Q9",
        "Q10",
        "Q11",
        "Q12",
        "Q13",
        "Q14",
        "Q15",
        "Q16",
        "Q17",
        "Q18",
        "Q19",
        "Q20",
      ],
    },
  };

  return (
    <Page>
      <h1 className="text-4xl pb-4 font-semibold text-gray-700">
        Data Analytics From Promed App
      </h1>
      <div className="relative">
        {loading ? (
          <div className="flex justify-center align-baseline pt-40 w-full">
            <Loader width="50px" height="50px" />
          </div>
        ) : (
          <>
            {seriesData[0]?.Depression && (
              <div>
                <h2 className="text-2xl pb-4 font-semibold text-green-700">
                  Depression insights
                </h2>
                <Chart
                  options={options}
                  series={series}
                  type="line"
                  height={500}
                />
              </div>
            )}
            {seriesData[0]?.Anxiety && (
              <div>
                <h2 className="text-2xl pb-4 font-semibold text-green-700">
                  Anxiety insights
                </h2>
                <Chart
                  options={options2}
                  series={series2}
                  type="line"
                  height={500}
                />
              </div>
            )}
            {seriesData[0]?.PTSD && (
              <div>
                <h2 className="text-2xl pb-4 font-semibold text-green-700">
                  PTSD insights
                </h2>
                <Chart
                  options={options3}
                  series={series3}
                  type="area"
                  height={500}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Page>
  );
};

export default Dashboard;
