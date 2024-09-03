import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editnurse.scss";

export default function EditNurse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Name, setName] = useState();
  const [Age, setAge] = useState();
  const [Gender, setGender] = useState();

  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/nurse/${id}`);
        const result = await response.json();
        console.log(result);
        setName(result.name);
        setAge(result.age);
        setGender(result.gender);
      } catch (error) {
        console.error("Error fetching nurse data:", error);
      }
    };

    fetchNurseData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/edit_nurse/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: Name, Age: Age, Gender: Gender }),
      });

      if (response.ok) {
        alert("Nurse data updated successfully");
        navigate("/"); // Redirect back to the table view
      } else {
        console.error("Failed to update nurse data");
      }
    } catch (error) {
      console.error("Error updating nurse data:", error);
    }
  };

  return (
    <div className="main">
      <form className="formm" onSubmit={handleSubmit}>
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
          Update
        </button>
      </form>
    </div>
  );
}
