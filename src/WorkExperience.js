import React, { useEffect, useState } from "react";
import { DatePicker, Button, Input, notification, Select } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const WorkExperience = (props) => {
  const {setCurrentCTC, currentCTC,experience, setExperience, workExperience = [], setWorkExperience } = props;
  
  const [add, setAdd] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [roles, setRoles] = useState([])

  const navigate = useNavigate();

  // Error state for validation
  const [error, setError] = useState({
    companyName: false,
    role: false,
    description: false,
    startDate: false,
    endDate: false,
    currentCTC:false,
    experience:false
  });

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:4201/data");
        const fetchedRoles = Array.isArray(response.data.techSkills) ? response.data.techSkills : [];
        setRoles(fetchedRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setRoles([]); // Fallback if error occurs
      }
    };

    fetchRoles();
  }, []);

  // Function to show error notifications
  const showError = (message) => {
    notification.error({
      message: "Validation Error",
      description: message,
      placement: "top",
      duration: 3,
      style: { backgroundColor: "#fff2f0", border: "1px solid #ffccc7", color: "#cf1322" },
    });
  };

  // Function to show success notifications
  const showSuccess = (message) => {
    notification.success({
      message: "Successfully",
      description: message,
      placement: "top",
      duration: 3,
      style: { backgroundColor: "#f6ffed", border: "1px solid #b7eb8f", color: "green" },
    });
  };

  // Handle experience input change
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!companyName.trim() || !role.trim() || !description.trim() || !startDate || !endDate) {
      setError({
        companyName: !companyName,
        role: !role,
        description: !description,
        startDate: !startDate,
        endDate: !endDate || endDate.isBefore(startDate),
        experience:!experience,
        currentCTC:!currentCTC

      });
      showError("All fields are required");
      return;
    }

    if (endDate.isBefore(startDate)) {
      setError((prev) => ({ ...prev, endDate: true }));
      showError("End date cannot be before start date");
      return;
    }

    const newEntry = {
      company: companyName,
      role,
      description,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };

    setWorkExperience((prev) => [...prev, newEntry]);

    // Reset form fields
    setCompanyName("");
    setRole("");
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    setAdd(false);
    showSuccess("Successfully saved");
  };

  const handleNext=()=>{
    if(experience&&currentCTC){
      navigate("/edicationBackground")
    }
    else{
      showError("Current CTC or Technical Experience field is in Blank")
    }
  }

  return (
    <div className="container">
      <h2>Work Experience</h2>
      <form>
      <label>Current CTC</label>
        <Input
          type="number"
          placeholder="CTC Per Annum"
          value={currentCTC}
          onChange={(e)=>setCurrentCTC(e.target.value)}
          onFocus={()=>setError((prev)=>({...prev,currentCTC:false}))}
          className={error.currentCTC ? "error" : ""}

        />
        <label>Technical Experience</label>
        <Input
          type="number"
          placeholder="Experience in Years"
          value={experience}
          onChange={handleExperienceChange}
          onFocus={()=>setError((prev)=>({...prev,experience:false}))}
          className={error.experience ? "error" : ""}


        />
        <Button type="primary" onClick={() => setAdd(experience > 0)}>
          Save
        </Button>

        {add && (
          <div>
            {/* Company Name */}
            <label>Company Name</label>
            <Input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={() => setError((prev) => ({ ...prev, companyName: false }))}
              className={error.companyName ? "error" : ""}
            />

            {/* Role Selection */}
            <label>Role</label>
            <Select
              placeholder="Select role"
              value={role || undefined}
              onChange={setRole}
              onFocus={() => setError((prev) => ({ ...prev, role: false }))}
              className={`role-dropdown ${error.role ? "error" : ""}`}
              style={{ width: "100%" }}
            >
              {roles.map((roleOption) => (
                <Option key={roleOption} value={roleOption}>
                  {roleOption}
                </Option>
              ))}
            </Select>

            {/* Description */}
            <label>Description</label>
            <Input.TextArea
              placeholder="Explain about your project (max 500 words)"
              value={description}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/).length;
                if (words <= 500) {
                  setDescription(e.target.value);
                } else {
                  showError("Limit is 500 words");
                }
              }}
              onFocus={() => setError((prev) => ({ ...prev, description: false }))}
              className={error.description ? "error" : ""}
            />

            {/* Work Duration */}
            <label>Work Duration</label>
            <div className="date-picker-container">
              <DatePicker
                placeholder="Start Date"
                value={startDate}
                onChange={setStartDate}
                onFocus={() => setError((prev) => ({ ...prev, startDate: false }))}
                format="YYYY-MM-DD"
                className={error.startDate ? "error" : ""}
              />
              <DatePicker
                placeholder="End Date"
                value={endDate}
                onChange={setEndDate}
                onFocus={() => setError((prev) => ({ ...prev, endDate: false }))}
                format="YYYY-MM-DD"
                className={error.endDate ? "error" : ""}
              />
            </div>
           
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </form> <Button type="primary" onClick={() => setAdd(experience > 0)}>
          Add
        </Button>

      <Button  onClick={()=>{navigate("/")}}>
        Back
      </Button>
      <Button  onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default WorkExperience;
