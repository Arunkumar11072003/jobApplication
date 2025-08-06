import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PersonalInformations from './PersonalInformations';
import { useState } from 'react';
import WorkExperience from './WorkExperience';

import EdicationBackground from './EdicationBackground';
import TeckSkills from './TeckSkills';
import Priview from './Priview';
import AfterApplication from './AfterApplication';

function App() {
  const [name,setName]=useState("")
  const [mail,setMail]=useState("")
  const [number,setNumber]=useState("")
  const [address,setAddress]=useState("")
  const [imageData,setImageData]=useState({})
  const [workExperience,setWorkExperience]=useState([])
  const [experience,setExperience]=useState("")
   const [degree, setDegree] = useState('')
      const [university,setUniversity]=useState("")
      const [department,setDepartment]=useState("")
      const [passedOutYear,setPassedOutYear]=useState()
      const [certificates, setCertificates] = useState([]);
      const [skills,setSkills]=useState([])
      const [location,setLocation]=useState("")
      const [salary,setsalary]=useState("")
      const [openToRemote,setOpenToRemote]=useState(null)
      const [resumeJson, setResumeJson] = useState(null);
      const [linkedInURL,setLinkedInURL]=useState("")
      const [nativeDistrict,setNativeDistrict]=useState("")
      const [nationalities,setNationalities]=useState("")
      const [currentCTC,setCurrentCTC]=useState("")
      const [noticePeriod,setNoticePeriod]=useState("")
      
      console.log(resumeJson)
  return (
    <div className="App">
  <Routes>
    <Route path='/' element={ <PersonalInformations 
    name={name} 
    mail={mail} 
    number={number} 
    address={address} 
    setAddress={setAddress} 
    setName={setName} 
    setMail={setMail} 
    setNumber={setNumber} 
    imageData={imageData} 
    setImageData={setImageData}
    nativeDistrict={nativeDistrict}
    setNativeDistrict={setNativeDistrict}
    nationalities={nationalities}
    setNationalities={setNationalities}
    />}
    > 
    </Route>
    <Route path='/workexperience' 
    element={<WorkExperience 
    workExperience={workExperience} 
    setWorkExperience={setWorkExperience}
    experience={experience}
    setExperience={setExperience}
    currentCTC={currentCTC}
    setCurrentCTC={setCurrentCTC}
    
    />}>
    </Route>

        <Route path='/edicationBackground' 
    element={<EdicationBackground 
    degree={degree} 
    university={university} 
    department={department} 
    passedOutYear={passedOutYear} 
    certificates={certificates} 
    setDegree={setDegree} 
    setUniversity={setUniversity} 
    setDepartment={setDepartment} 
    setPassedOutYear={setPassedOutYear} 
    setCertificates={setCertificates}/>}>
    </Route>
      
      <Route path='/techSkills' 
    element={<TeckSkills 
    skills={skills} 
    setSkills={setSkills} 
    location={location}
    setLocation={setLocation} 
    salary={salary} 
    setsalary={setsalary} 
    openToRemote={openToRemote} 
    setOpenToRemote={setOpenToRemote} 
    resumeJson={resumeJson} 
    setResumeJson={setResumeJson}
    linkedInURL={linkedInURL}
    setLinkedInURL={setLinkedInURL}
    noticePeriod={noticePeriod}
    setNoticePeriod={setNoticePeriod}
    />}>
    </Route>

     <Route path='/preview' 
    element={<Priview 
      experience={experience}
      name={name} 
      mail={mail} 
      number={number} 
      address={address} 
      imageData={imageData} 
    workExperience={workExperience} 
    degree={degree} 
    university={university} 
    department={department} 
    passedOutYear={passedOutYear} 
    certificates={certificates}
    skills={skills}
    location={location}
    salary={salary}
    openToRemote={openToRemote}
    resumeJson={resumeJson} 
    linkedInURL={linkedInURL}
    nativeDistrict={nativeDistrict}
    nationalities={nationalities}
    setNationalities={setNationalities}
    currentCTC={currentCTC}
    noticePeriod={noticePeriod}
    setNoticePeriod={setNoticePeriod}
    
  />}>
    </Route>
    <Route path='/applications' element={<AfterApplication/>}></Route>
  </Routes>
    </div>
  );
}

export default App;
