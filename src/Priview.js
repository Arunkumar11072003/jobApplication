import { notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Preview.css";

const Priview = (props) => {
     const {name,mail,address,number,imageData,nativeDistrict,nationalities,
            workExperience,university,degree,department,passedOutYear,
            certificates,skills,location,salary,openToRemote,resumeJson,
            experience,linkedInURL,noticePeriod,currentCTC}=props
      const [arr,setArr]=useState([])
      const url="http://localhost:4200/arr"
     



    const navigate=useNavigate()
        const handleBack=()=>{
         navigate("/techSkills")
        }
        const handleSubmit=async()=>{
          const DupliacteUser=arr.find((arr)=>arr.mail===mail ||arr.number===number)
          if(name&&mail&&address&&number&&imageData&&university&&degree&&department&&passedOutYear&&skills&&location&&salary&&openToRemote&&resumeJson&&!DupliacteUser&&nativeDistrict&&nationalities&&noticePeriod&&currentCTC
          ){
            const obj={"id":(arr.length+1).toString(),
              name: name,
              mail: mail,
              address: address,
              number: number,
              imageData:imageData,
              workExperience:workExperience,
              university: university,
              degree: degree,
              department: department,
              passedOutYear: passedOutYear,
              certificates:certificates,
              skills: skills,
              location: location,
              expectedSalary: salary,
              openToRemote: openToRemote,
              resumeJson: resumeJson,
              currentCTC:currentCTC,
              noticePeriod:noticePeriod,
              nationalities:nationalities,
              nativeDistrict:nativeDistrict,
              experience:experience,
            }
              try {
               
                const update = await axios.post(`${url}`, obj)
                success("Thank you for applying")
                navigate("/applications")

              }
              catch (error) {
                console.error("Error submitting data:", error) // Log the error for debugging
            }
          }
          else if(DupliacteUser){
            showError("User already applied")
          }
          else{
            showError("somthing went wrong")
          }
         
        }



        useEffect(() => {
          fletchData();
        }, []);
        const fletchData=async()=>{
           const response=await axios.get(url)
           setArr(response.data)
           
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
        const success = (message) => {
          notification.success({
            message: "successfully",
            description: message,
            placement: "top",
            duration: 3, // Auto-close after 3 seconds
            style: {
              backgroundColor: "#fff2f0", // Light red background
              border: "1px solidrgb(34, 239, 51)",
              color: "green",
            },
          });
        };
  return (
    <div className="preview-container">
        <h1>Preview</h1><br/><br/><br/>
      <p><strong>Name:</strong> {name}</p>       
      <p><strong>Mail:</strong> {mail}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Number:</strong> {number}</p>
      <p><strong>Nationalities:</strong> {nationalities}</p>       
      <p><strong>Native District:</strong> {nativeDistrict}</p>       

      {imageData?.name && <p><strong>Image Name:</strong> {imageData.name}</p>}
      <p><strong>Experience:</strong>{experience}</p>
      <h2>Work Experience:</h2>
      {workExperience && workExperience.length > 0 ? (
        <ul style={{listStyleType:"none"}}>
          {workExperience.map((exp, index) => (
            <li key={index}>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Role:</strong> {exp.role}</p>
              <p><strong>Description:</strong> {exp.description}</p>
              <p><strong>Duration:</strong> {exp.startDate} - {exp.endDate}</p>
            </li>
          ))}
        </ul>
      ) : <p>No work experience added.</p>}
            <p><strong>Current CTC:</strong> {currentCTC}</p>       

         <p><strong>University:</strong> {university}</p>
      <p><strong>Degree:</strong> {degree}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Passed Out Year:</strong> {passedOutYear}</p>
      <h2>Certificates:</h2>
      {certificates && certificates.length > 0 ? (
        <ul style={{listStyleType:"none"}}>
          {certificates.map((cert, index) => <li key={index}>{cert}</li>)}
        </ul>
      ) : <p>No certificates added.</p>}       
  <h2>Skills:</h2>
      {skills && skills.length > 0 ? (
        <ul style={{listStyleType:"none"}}>
          {skills.map((skill, index) => <li key={index}>{skill}</li>)}
        </ul>
      ) : <p>No skills added.</p>}      
       <p><strong>Location:</strong> {location}</p>
      <p><strong>Expected Salary:</strong> {salary}LPA</p>
      <p><strong>Open to Remote Work:</strong> {openToRemote ? "Yes" : "No"}</p>
      <p><strong>notice Period:</strong> {noticePeriod}</p>       

      <h2>Resume:</h2>
      {resumeJson && resumeJson.fileName ? (
        <p>
          <strong>File Name:</strong> {resumeJson.fileName} <br />
          <strong>File Type:</strong> {resumeJson.fileType} <br />
          <strong>File Size:</strong> {resumeJson.fileSize} bytes <br />
          <a href={`data:${resumeJson.fileType};base64,${resumeJson.fileContent}`}>
            Download Resume
          </a>
        </p>
      ) : <p>No resume uploaded.</p>}
<p>
  <strong>LinkedIn URL:</strong> 
  {linkedInURL ? (
    <a href={linkedInURL} target="_blank" rel="noopener noreferrer">{linkedInURL}</a>
  ) : "not uploaded URL"}
</p>
      <div className="preview-buttons">
      <button className="back-button" onClick={handleBack}>Back</button>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  )
}

export default Priview