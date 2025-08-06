import { notification, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalInformation.css';
import axios from 'axios';

const { Option } = Select;
const PersonalInformations = (props) => {
  const { setNationalities,nationalities,setNativeDistrict,nativeDistrict,name, mail, address, number, setName, setAddress, setMail, setNumber, imageData, setImageData } = props;
  
  const [districts,setDistricts]=useState([])
  const [nationalitys,setNationalitys]=useState([])

  const [errors, setErrors] = useState({
    name: false,
    mail: false,
    address: false,
    number: false,
    imageData: false,
    nativeDistrict:false,
    nationalities:false

  });

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageData({
        name: file.name,
        type: file.type,
        url: url,
      });

      setErrors((prev) => ({ ...prev, imageData: false }));
    }
  };

  const showError = (message) => {
    notification.error({
      message: 'Validation Error',
      description: message,
      placement: 'top',
      duration: 3, // Auto-close after 3 seconds
      style: {
        backgroundColor: '#fff2f0', // Light red background
        border: '1px solid #ffccc7',
        color: '#cf1322',
      },
    });
  };

  const handleNext = () => {
    const updatedErrors = {
      name: !name || !/^[A-Za-z\s]{3,}$/.test(name), // ✅ Name must be at least 3 characters & only letters/spaces
      mail: !mail || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail),
      address: !address || address.trim().length < 3,
      number: !number || !/^\d{10}$/.test(number),
      imageData: !imageData || !imageData.url,
      nativeDistrict:!nativeDistrict.trim(),
      nationalities:!nationalities.trim()
    }
  
    setErrors(updatedErrors);
    const invaliedField = Object.keys(updatedErrors).filter((field) => updatedErrors[field]);
    if (invaliedField.length>0) {
      showError(`Please fill in: ${invaliedField.join(', ')}`);
      return
    }
  
    navigate('/workexperience')
  }

  const handleInputFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: false }));
  };
  const getErrorStyle = (field) => {
    return errors[field] ? { borderColor: 'red', boxShadow: '0 0 5px red' } : {};
  };


  useEffect(() => {
    axios
      .get("http://localhost:4201/PersonalInformation")
      .then((response) => {
        console.log("Full API Response:", response.data);
        
       
  
        setDistricts(response.data.districts);
        setNationalitys(response.data.nationalities);
      })
      .catch((error) => console.error(" Error fetching data:", error));
}, []);
  
  return (
    <div>
      <form>
        <h1>Application Form</h1>
      <label>Upload Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={getErrorStyle("imageData")}
        />
                {imageData?.url && <img src={imageData.url} alt="Uploaded Preview" width="200" height="200" />}

        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e)=>{
            const value = e.target.value;
            setName(value)}}
          onFocus={() => handleInputFocus('name')}
          style={getErrorStyle("name")}
        
         
        />

<label>E-mail</label>
        <input
          type="email"
          placeholder="Mail"
          value={mail}
          onChange={(e) => {
            const value = e.target.value
            setMail(value)

          }}
          onFocus={() => handleInputFocus('mail')}
          style={getErrorStyle("mail")}
        />

        <label>Contact Number</label>
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => {
          const value=  e.target.value
          setNumber(value)}}
          onFocus={() => handleInputFocus('number')}
          style={getErrorStyle("number")}
        />

        <label>Current Address</label>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => {
            const value = e.target.value.trim();
            setAddress(value);
            setErrors((prev) => ({ ...prev, address: value.length < 3 }));
          }}
          onFocus={() => handleInputFocus('address')}
          style={getErrorStyle("address")}
        />
                <label>Select Your native District</label>

        <Select 
        placeholder="Native District"
        value={nativeDistrict||undefined}
        onChange={setNativeDistrict}
        onFocus={() => handleInputFocus("nativeDistrict")}
        style={getErrorStyle("nativeDistrict")}
        >
          {districts?.map((district) => (
            <Option key={district} value={district}>
              {district}
            </Option>
          ))}
      

        </Select>
        <label>Nationalities</label>

        <Select 
        placeholder="Nationalities"
        value={nationalities||undefined}
        onChange={setNationalities}
        onFocus={()=>handleInputFocus("nationality")}
        style={getErrorStyle("nationality")}
        >
          {nationalitys?.map((nationalitys)=>(
           <Option key={nationalitys} value={nationalitys}>
             {nationalitys}
             </Option>
          ))}
      

        </Select>
       

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInformations;
