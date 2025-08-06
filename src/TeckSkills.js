import { notification, Select } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LZString from "lz-string";
import './TechSkills.css';
import Pako from 'pako';





const { Option } = Select;
const TeckSkills = (props) => {
  const {noticePeriod,setNoticePeriod,skills,setSkills,location,setLocation,salary,setsalary,openToRemote,setOpenToRemote,resumeJson, setResumeJson,linkedInURL,setLinkedInURL}=props
  const [techSkills,setTechSkills]=useState([])
  const [locations,setLocations]=useState([])
  const navigate=useNavigate()
  const [noticePeriods,setNoticePeriods]=useState([])
  const [errors,setErrors]=useState({
    skills:false,
    location:false,
    Esalary:false,
    openToRemote:false,
    resumeJson:false,
  })
  
  const handleFileUpload = ({ target: { files } }) => {
    if (!files.length) return;
  
    const file = files[0];
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
       try {
      const compressedData = Pako.deflate(result, { to: "string" });  // Gzip compression
      const compressedBase64 = btoa(compressedData);  // Convert to Base64 for storage
      const finalCompressed = encodeURIComponent(compressedBase64);  // URL-safe encoding

      // Split into only 2-3 lines (larger chunks)
      const chunkSize = Math.ceil(finalCompressed.length / 3);  // Divide into 3 parts
      const formattedContent = finalCompressed.match(new RegExp(`.{1,${chunkSize}}`, "g")).join("\n");

      setResumeJson({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size      });
    }
    catch (error) {
      console.error("Compression failed:", error);
    }
  };

  reader.readAsText(file);  // Read file as text
};

  const handleNext = () => {
    const newError = {
      skills: skills.length === 0, 
      location: !location,
      Esalary: !salary,
      openToRemote: !openToRemote,
      resumeJson: !resumeJson || !resumeJson.fileName,
    };
  
    setErrors(newError);
  
    const missingFields = Object.keys(newError)
      .filter((field) => newError[field])  // Get fields that have errors
      .map((field) => field === "Esalary" ? "Expected Salary" : field)  // Adjust field names for readability
      .join(", ");
  
    if (missingFields) {
      showError(`All fields are required: ${missingFields}`);
      return;
    }
  
    navigate("/Preview");
  };
  
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
  axios.get("http://localhost:4201/data")
    .then(response => {
      setTechSkills(response.data.techSkills)
      setLocations(response.data.locations)
      setNoticePeriods(response.data.noticePeriods)
    })
    .catch(error => console.error("Error fetching data:", error));
}, []);

const handleError=(field)=>{
  setErrors((prev)=>({...prev,[field]:false}))
}

  return (
    <div className="techskills-container">
        <form className="techskills-form">
        <h1>Tech Skills</h1>


      <label>Select your Skills</label>
      <div style={{border:errors.skills?"2px solid red":"none",
                   boxShadow:errors.skills?"0 0 5px red":"none",
      }}>
    <Select
  mode="multiple"
  className={`techskills-select ${errors.skills ? "select-error" : ""}`}
  placeholder="Select Skills"
  value={skills}
  onChange={setSkills}
  onFocus={()=>handleError("skills")}

>
  {techSkills.map((skill) => (
    <Option key={skill} value={skill}>
      {skill}
    </Option>
  ))}
</Select>
</div>
<label>Select your location</label>
<div style={{border:errors.location?"2px solid red":"none",
                   boxShadow:errors.location?"0 0 5px red":"none",
                  
      }}>
<Select
  placeholder="Select your location"
  className={`techskills-select ${errors.location ? "select-error" : ""}`}
  value={location||undefined}
  onChange={setLocation}
  onFocus={()=>handleError("location")}
>
  {locations.map((loc) => (
    <Option key={loc} value={loc}>
      {loc}
    </Option>
  ))}
</Select> 
</div>   
<label>Expected salary LPA</label>
<input 
className={errors.Esalary ? "input-error" : ""}
type='number'
placeholder='Expected Salary' 
value={salary} 
onChange={(e)=>setsalary(e.target.value)} 
onFocus={()=>handleError("Esalary")}
style={errors.Esalary?{borderColor:"red",boxShadow:"0 0 5px red"}:{}}
/>
<label> Are you open to remote work?</label> 
<div className="techskills-radio" 
style={{border:errors.openToRemote?"2px solid red":"none",
  boxShadow:errors.openToRemote?"0 0 5px red":"none",
}}
>
<label style={{marginLeft:"35px"}}>Yes</label>

<input 
type='radio' 
value="Yes" 
checked={openToRemote==="Yes"} 
onChange={(e)=>setOpenToRemote(e.target.value)}

/>
<label>No</label>
<input 
type='radio' 
value="No" 
checked={openToRemote==="No"} 
onChange={(e)=>setOpenToRemote(e.target.value)}
/>

</div>

<label>Upload your resume here</label>
<input type='file' 
className={errors.resumeJson ? "input-error" : ""}
accept='.pdf,.doc,.docx' 
onChange={handleFileUpload}
onFocus={()=>handleError("resumeJson")}
style={errors.resumeJson?{borderColor:"red",boxShadow:"0 0 5px red"}:{}}/>
<Select
placeholder="Notice Period"
value={noticePeriod||undefined}
onChange={setNoticePeriod}
onFocus={()=>handleError("noticePeriod")}
>
 { noticePeriods.map((days)=>(
 <Option key={days} value={days}>
   {days}
 </Option>
 )

  )}
 

</Select>
<label>LinkedIn URL</label>
<input
className={errors.linkedInURL? "input-error" : ""}

placeholder='URL'
value={linkedInURL}
onChange={(e)=>setLinkedInURL(e.target.value)}

      />
<button 
  className="techskills-btn techskills-back-btn" 
  onClick={(event) => {
    event.preventDefault(); // Prevent page refresh
    navigate("/edicationBackground");
  }}
>
  Back
</button>

<button 
  className="techskills-btn" 
  onClick={(event) => {
    event.preventDefault(); 
    handleNext();
  }}
>
  Next
</button>
</form>

</div>
  )
}

export default TeckSkills