import axios from "axios";

import "./input.scss";
import { useState, useEffect, useRef } from "react";

export default function Input({ data, bton, handleDataFetch }) {
  const [id, setid] = useState();
  const [Name, setName] = useState();
  const [Age, setAge] = useState();
  const [Gender, setGender] = useState();
  const [Nurse_id, setNurse_id] = useState();

  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const formRef = useRef(null); // Reference for the form

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    handleDataFetch(false);

    try {
      const response = await fetch("http://localhost:5000/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          Name: Name,
          Age: Age,
          Gender: Gender,
          Nurse_id: Nurse_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Form data submitted:", data);
      alert("Patient data submitted");
      setShowForm(false);
      handleDataFetch(true);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleNurseSubmit = async (e) => {
    e.preventDefault();
    handleDataFetch(false);
    try {
      const response = await fetch("http://localhost:5000/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          Name: Name,
          Age: Age,
          Gender: Gender,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Form data submitted:", data);
      alert("Nurse data submitted");
      setShowForm(false);
      handleDataFetch(true);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  return (
    <div className="input">
      <div className="heading">
        <h1>{data}</h1>
        <button onClick={() => setShowForm(!showForm)} className="bton">
          {`Add new ${bton}`}
        </button>
      </div>

      {bton === "Patient"
        ? showForm && (
            <div className="main" ref={formRef}>
              <form className="formm" onSubmit={handlePatientSubmit}>
                <div className="form-group">
                  <label>ID:</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nurse ID:</label>
                  <input
                    type="number"
                    id="nurse_id"
                    name="nurse_id"
                    value={Nurse_id}
                    onChange={(e) => setNurse_id(e.target.value)}
                    className="form-control"
                  />
                </div>

                <button type="submit" className="bton">
                  Submit
                </button>
              </form>
            </div>
          )
        : showForm && (
            <div className="main" ref={formRef}>
              <form className="formm" onSubmit={handleNurseSubmit}>
                <div className="form-group">
                  <label>ID:</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                    className="form-control"
                  />
                </div>

                <button type="submit" className="bton">
                  Submit
                </button>
              </form>
            </div>
          )}
    </div>
  );
}
