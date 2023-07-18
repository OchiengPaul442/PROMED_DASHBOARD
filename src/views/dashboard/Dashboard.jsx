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
  const [seriesData2, setSeriesData2] = useState([]);
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

  const getAllData2 = async () => {
    const q = await getDocs(collection(db, "ResultHistory"));
    const data = q.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    const filteredData = data.filter((item) => item.id === currentUser.uid);
    setSeriesData2(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      getAllData();
      getAllData2();
    }
  }, [currentUser]);

  // depression
  const seriesDepressionOld = [
    {
      name: "Severity",
      data: seriesData2[0]?.Depression
        ? seriesData2[0]?.Depression.answers
        : [],
    },
  ];

  const seriesDepressionNew = [
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

  // anxiety
  const seriesAnxietyOld = [
    {
      name: "Severity",
      data: seriesData2[0]?.Anxiety ? seriesData2[0]?.Anxiety.answers : [],
    },
  ];

  const seriesAnxietyNew = [
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

  // ptsd
  const seriesPTSDOld = [
    {
      name: "Severity",
      data: seriesData2[0]?.PTSD ? seriesData2[0]?.PTSD.answers : [],
    },
  ];
  const seriesPTSDNew = [
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
              <div
                style={{
                  marginBottom: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <h2 className="text-2xl pb-4 font-semibold text-green-700">
                    Depression insights
                    <span style={{ color: "orange" }}> (New Test Results)</span>
                  </h2>
                  <Chart
                    options={options}
                    series={seriesDepressionNew}
                    type="line"
                    height={300}
                    width={600}
                  />
                </div>
                <div>
                  <h2 className="text-2xl pb-4 font-semibold text-green-700">
                    Depression insights
                    <span style={{ color: "orange" }}> (Old Test Results)</span>
                  </h2>
                  <Chart
                    options={options}
                    series={seriesDepressionOld}
                    type="line"
                    height={300}
                    width={600}
                  />
                </div>
              </div>
            )}
            {seriesData[0]?.Anxiety && (
              <div
                style={{
                  marginBottom: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <h2 className="text-2xl pb-4 font-semibold text-green-700">
                    Anxiety insights{" "}
                    <span style={{ color: "orange" }}> (New Test Results)</span>
                  </h2>
                  <Chart
                    options={options2}
                    series={seriesAnxietyNew}
                    type="line"
                    height={300}
                    width={600}
                  />
                </div>
                <div>
                  <h2 className="text-2xl pb-4 font-semibold text-green-700">
                    Anxiety insights{" "}
                    <span style={{ color: "orange" }}> (Old Test Results)</span>
                  </h2>
                  <Chart
                    options={options2}
                    series={seriesAnxietyOld}
                    type="line"
                    height={300}
                    width={600}
                  />
                </div>
              </div>
            )}
            {seriesData[0]?.PTSD && (
              <div
                style={{
                  marginBottom: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <h2 className="text-2xl pb-4 font-semibold text-green-700">
                    PTSD insights{" "}
                    <span style={{ color: "orange" }}> (New Test Results)</span>
                  </h2>
                  <Chart
                    options={options3}
                    series={seriesPTSDNew}
                    type="area"
                    height={300}
                    width={600}
                  />
                </div>
                <div>
                  <h2 className="text-2xl pb-4 font-semibold text-green-700">
                    PTSD insights{" "}
                    <span style={{ color: "orange" }}> (Old Test Results)</span>
                  </h2>
                  <Chart
                    options={options3}
                    series={seriesPTSDOld}
                    type="area"
                    height={300}
                    width={600}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Page>
  );
};

export default Dashboard;
