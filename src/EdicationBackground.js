import { notification, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './EdicationBackground.css';

const { Option } = Select;

const EdicationBackground = ({university,degree,department,passedOutYear,setCertificates,setPassedOutYear,setDepartment,setUniversity,setDegree,certificates}) => {
    const navigate=useNavigate()
    const [degreeOptions,setDegreeOptions]=useState({})
    const [certificateOptions,setCertificateOptions]=useState([])
    const [degrees,setDegrees]=useState([])
    const [errors,setErrors]=useState({
      university:false,
      degree:false,
      department:false,
      passedOutYear:false,
      

    })
    

      const handleNext=()=>{
        if(university&&degree&&department&&passedOutYear){
        navigate("/techskills")
        }
        else{
          const newError={
            university:!university||university.length<5,
            degree:!degree,
            department:!department,
            passedOutYear:!passedOutYear,
            
          }
          setErrors(newError)
showError("All fields are required")
        }
      }
      const showError = (message) => {
        notification.error({
          message: "Validation Error",
          description: message,
          placement: "top",
          duration: 3, // Auto-close after 3 seconds
          style: {
            backgroundColor: "#fff2f0", // Light red background
            border: "1px solid #ffccc7",
            color: "#cf1322",
          },
        });
      };
      useEffect(() => {
        axios
          .get("http://localhost:4201/education")
          .then((response) => {
            console.log("Full API Response:", response.data); // Debugging log
    
            setDegreeOptions(response.data.degreeOptions);
            setCertificateOptions(response.data.certificateOptions);
            setDegrees(response.data.degrees);
          })
          .catch((error) => console.error(" Error fetching data:", error));
    }, []);
    
    
     const handleErrors=(field)=>{
      setErrors((prev)=>({...prev,[field]:false}))
     } 
     useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "Are you sure you want to leave? Your progress may be lost.";
      };
    
      window.addEventListener("beforeunload", handleBeforeUnload);
    
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);
      
  return (
    <div className="education-container">
      <form className='education-form'>
        <h1>Education Background</h1>

        <label>University</label>
      <input 
      className={errors.university ? "input-error" : ""}
      placeholder='University' 
      value={university} 
      onChange={(e)=>setUniversity(e.target.value)}
      onFocus={()=>handleErrors("university")}
      style={errors?.university?{borderColor:"red", boxShadow:"0 0 5px red"}:{}}
      
      />
      


        <label>Select your degree</label>
        <div
  style={{
    border: errors?.degree ? "1px solid red" : "1px solid #d9d9d9", 
    boxShadow: errors?.degree ? "0 0 5px red" : "none",
    borderRadius: 5,
    }}>  
    <Select
    className={`education-select ${errors.degree ? "select-error" : ""}`}
    placeholder="Select your degree"
    value={degree || undefined}
    onChange={(value) => setDegree(value)}
    onFocus={() => handleErrors("degree")}
    style={{ width: "100%", border: "none" }} 
  >
    {degrees.map((list) => (
      <Option key={list} value={list}>
        {list}
      </Option>
    ))}
  </Select>
</div>
{degree && (
        <>
          <label style={{ marginTop: 10 }}>Select your department</label>
          <div
  style={{
    
    border: errors?.department ? "1px solid red" : "1px solid #d9d9d9",
    boxShadow: errors?.department ? "0 0 5px red" : "none",
    borderRadius: 5,
    }}>  
          <Select
            placeholder="Select Department"
            value={department||undefined}
            onChange={setDepartment}
            onFocus={() => handleErrors("department")}
            style={{ width: "100%" }} 

          >
            {degreeOptions[degree]?.map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
          </div>
        </>
      )}
      <label>Year of passed out</label>
      <input 
  className={errors.passedOutYear ? "input-error" : ""}
  type="number"
  placeholder="Passed out Year"
  value={passedOutYear || ""}
  onChange={(e) => setPassedOutYear(e.target.value)}  // Ensure it takes input as string
  onFocus={() => handleErrors("passedOutYear")}
  style={errors?.passedOutYear ? { borderColor: "red", boxShadow: "0 0 5px red" } : {}}
/>

<label style={{ marginTop: 10 }}>Select your Certificates</label>

      <Select
        mode="multiple" 
        
        placeholder="Select Certificates"
        value={certificates}
        onChange={setCertificates}
      >
        {certificateOptions.map((cert) => (
          <Option key={cert} value={cert}>
            {cert}
          </Option>
        ))}
      </Select>
      
      <button  onClick={()=>{navigate("/workexperience")}}>Back</button>

      <button  onClick={handleNext}>Next</button>
      </form>
      

    </div>
  )
}

export default EdicationBackground