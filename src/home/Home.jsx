import "./home.scss";
import Navbar from "../navbar/Navbar";
import Input from "../input/Input";
import Table from "../table/Table";
import { useState } from "react";

export default function Home() {
  const [isNurse, setisNurse] = useState(true);
  const [fetchData, setFetchData] = useState(false);

  function handleClick() {
    setisNurse(!isNurse);
  }

  function handleDataFetch(val) {
    setFetchData(val);
  }

  return (
    <div className="home">
      <Navbar />
      <Input
        data={isNurse ? "Nurse's Data" : "Patients Data"}
        bton={isNurse ? "Nurse " : "Patient"}
        handleDataFetch={handleDataFetch}
      />
      <Table
        isNurse={isNurse}
        fetchData={fetchData}
        handleDataFetch={handleDataFetch}
      />

      {isNurse ? (
        <button className="change" onClick={() => handleClick()}>
          Switch to Patients Data
        </button>
      ) : (
        <button className="change" onClick={() => handleClick()}>
          Switch to Nurse Data
        </button>
      )}
    </div>
  );
}
