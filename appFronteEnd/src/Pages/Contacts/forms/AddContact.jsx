import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import '../../../commonScss/Form.scss'
import { Contact } from "../../../apis/api.Contact";
import notificationPopup from "../../../helpers/notifications";
// import { Cut } from "../../../apis/api.cut";

const New  = ({}) => {
    const [data,setData] = useState({});
    const navigate = useNavigate();
    

    const title = "New Contact"

    const inputs = [
        {
        id: 2,
        label: "Name",
        type: "text",
        placeholder: "Name",
        },
        {
        id: 3,
        label: "Email",
        type: "email",
        placeholder: "Email",
        },
        {
        id: 4,
        label: "Number",
        type: "number",
        placeholder: "Number",
        },
        {
        id: 5,
        label: "Dob",
        type: "text",
        placeholder : "D/M/Y"
        },
    ];

    const handleSubmit = (e)=>{
        Contact.addContact(data)
        .then(res => {
            if(res.err || !res.data){
                notificationPopup("Name required or Number exists already!!","error")
            }
            else{
                navigate(`/`);
                notificationPopup("Contact Added!!","success")
            }
        })
        .catch(err => {
        })
    }

    const handleChange = (e)=>{
        const name = e.target.name
        const type = e.target.type;
        const value = type == "number"?Number(name == "img"?e.target.files[0]:e.target.value):
        name == "img"?e.target.files[0]:e.target.value

        setData({...data,[name] : value})
    }

    
    return (
        <div className="new">
        <div className="newContainer">
            <div className="top">
                <h1>{title}</h1>
            </div>
            <div className="bottom">  

            <div className="right">
                <form className="formInput">
                {inputs.map((input) => {
                        return (
                            <div className="formInput" key={input.id}>
                                <label>{input.label}</label>
                                <input 
                                type= {input.type}
                                value={data?data[input.label.toLowerCase()] : ""} 
                                name =  {input.label.toLowerCase()} 
                                onChange={handleChange}
                                placeholder={input.placeholder} 
                                />
                            </div>
                        )}
                )}
                </form>
                <button className="button" onClick={handleSubmit}>Send</button>
            </div>
            </div>
        </div>
        </div>
        
    );
};

export default New;
