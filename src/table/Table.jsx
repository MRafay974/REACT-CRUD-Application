import "./table.scss";
import { NurseColumns, PatientColumns } from "../tablesource";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Table({ isNurse, fetchData, handleDataFetch }) {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = isNurse
          ? "http://localhost:5000/nurse"
          : "http://localhost:5000/get_patient";
        const response = await fetch(endpoint);

        const result = await response.json();
        setData(result); // Set the fetched data in state
        handleDataFetch(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isNurse, fetchData]);

  const handleDelete = async (id) => {
    const endpoint = isNurse
      ? `http://localhost:5000/delete_nurse/${id}`
      : `http://localhost:5000/delete_patient/${id}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        setData(Data.filter((item) => item.id !== id)); // Remove the deleted row from the state
        alert(`${isNurse ? "Nurse" : "Patient"} record deleted successfully`);
        console.log(fetchData);
      } else {
        console.error("Failed to delete the record");
      }
    } catch (error) {
      console.error("Error deleting the record:", error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="Edit" onClick={() => handleEdit(params.row.id)}>
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const handleEdit = (id) => {
    const route = isNurse ? `/edit_nurse/${id}` : `/edit_patient/${id}`;
    navigate(route);
  };

  return (
    <div className="table">
      <DataGrid
        className="datagrid"
        rows={Data}
        columns={
          isNurse
            ? NurseColumns.concat(actionColumn)
            : PatientColumns.concat(actionColumn)
        }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[9, 10]}
        checkboxSelection
      />
    </div>
  );
}
