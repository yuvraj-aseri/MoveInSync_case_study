import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./DatatableFields";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Contact } from "../../../apis/api.Contact";
// import { Cut } from "../../../apis/api.cut";

const Datatable = ({}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()


  const [selectedValue, setSelectedValue] = useState('name'); // Default selection is 'name'

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  
  const handleDelete = (id) => {
    Contact.deleteContactByID(id)
      .then(res => {
        if (res.err) {
        }
        else {
          setData(data.filter((item) => item.id !== id));
        }
      })
      .catch(err => {

      })
  };


  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  };

  useEffect(() => {
    Contact.getContacts()
      .then(res => {
        if (!res.err) {
          setData(res.data)
        } else {
        }
      })
  }, [])

  const getTableData = (data) => {
    // Create a deep copy of the data array to avoid modifying the original array
    return JSON.parse(JSON.stringify(data));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {"Contacts"}
        <div style={{display : "flex",flexDirection : "row",columnGap : '10px',alignItems : 'center'}}>
        <label>Search</label>
        <select id="searchField" value={selectedValue} onChange={handleSelectChange}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
        </select>

        <input
          type="text"
          id="text-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search By Type"
        />
        </div>
        
          
        <Link to={'/new'} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={getTableData(data)}
        columns={userColumns().concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        disableSelectionOnClick={true}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Datatable;