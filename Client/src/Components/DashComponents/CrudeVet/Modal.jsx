/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import provinces from "./province";
import distr from "./district";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ matchModal }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState(distr);

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setSelectedProvince(selectedProvince);
    const filteredDistricts = getDistrictsForProvince(selectedProvince);
    setFilteredDistricts(filteredDistricts);
  };

  const getDistrictsForProvince = (province) => {
    if (province === "Kigali city") {
      return ["Select", "Kicukiro", "Gasabo", "Nyarugenge"];
    } else if (province === "Northern Province") {
      return ["select", "Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"];
    } else if (province === "Southern Province") {
      return [
        "select",
        "Gisagara",
        "Huye",
        "Kamonyi",
        "Muhanga",
        "Nyamagabe",
        "Nyanza",
        "Nyaruguru",
        "Ruhango",
        "Bugesera",
      ];
    } else if (province === "Eastern Province") {
      return [
        "select",
        "Gatsibo",
        "Kayonza",
        "Kirehe",
        "Ngoma",
        "Nyagatare",
        "Rwamagana",
      ];
    } else {
      return [
        "Select",
        "Karongi",
        "Ngororero",
        "Nyabihu",
        "Nyamasheke",
        "Rubavu",
        "Rusizi",
        "Rutsiro",
      ];
    }
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  const formData = new FormData()
  formData.append("fullName", fullName)
  formData.append("email", email)
  formData.append("nationalId", nationalId)
  formData.append("phoneNumber", phoneNumber)
  formData.append("province", province)
  formData.append("district", district)

  let token = localStorage.getItem("token")

  const handleLogin = (e)=>{
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5680/mpas/veterian/vet/addVet",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Baerer ${token}`
      }
    })
    .then((response)=>{
      console.log(response)
      setTimeout(()=>{
        toast.success("veterinary added successfully")
      navigate("/dashboard/veternaries")
      }, 300)
      
    })
    .catch((error)=>{
      console.log(error)
      toast.error("failed to add veterinary")
    })
  }

  return (
    <div className="mt-20 ml-10 text-[1rem] flex items-center justify-center   w-full absolute inset-0 backdrop-filter backdrop-blur-sm top-[-1rem] left-[-2.3rem] h-screen">
      <div
        className="mt-20 ml-10 text-[1rem] flex items-center justify-center  w-full absolute  top-[-1rem] left-[-2.3rem] h-screen "
        onClick={matchModal}
      ></div>
      <div className="w-[90%] md:w-[50%] bg-white p-10 rounded-lg shadow z-10">
        <h1 className="text-2xl relative bottom-4 left-[-1rem]">Register</h1>
        <form className=" w-full " onSubmit={handleLogin}>
          <div className="md:grid grid-cols-2">
            <div className="flex flex-col py-1">
              <label>Full Name</label>
              <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
                required
                type="text"
                placeholder="Full name"
                className="border border-green-700 px-4 py-1 rounded mt-2"
              />
            </div>
            <div className="flex flex-col py-1 md:ml-4">
              <label>Email address</label>
              <input
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
                required
                type="text"
                placeholder="email"
                className="border border-green-700 px-4 py-1 rounded mt-2"
              />
            </div>
            <div className="flex flex-col py-1">
              <label>Phone number</label>
              <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
                required
                type="number"
                placeholder="phone"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div>
            <div className="flex flex-col py-1 md:ml-4">
              <label>National ID</label>
              <input
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
                required
                type="number"
                placeholder="national ID"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div>
            {/* <div className="flex flex-col py-1">
              <label>Password</label>
              <input
                required
                type="password"
                placeholder="password"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div> */}
            <div className="flex flex-col py-1 md:ml- ">
              <label>Province</label>
              {/* <select
                onChange={handleProvinceChange}
                className="border border-green-700 px-4 py-1 rounded mt-1"
              >
                {provinces.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select> */}
               <input
              value={province}
              onChange={(e) => setProvince(e.target.value)}
                required
                type="text"
                placeholder="province"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div>
            <div className="flex flex-col py-1 md:ml-4">
              <label> District</label>
              {/* <select className="border border-green-700 px-4 py-1 rounded mt-1 ">
                {filteredDistricts.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select> */}
               <input
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
                required
                type="text"
                placeholder="district"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div>
          </div>
          <div className="">
            <button type="submit" className="bg-[#1a8cff] rounded uppercase text-white font-semibold w-full py-1 mt-4">
              {load ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Modal;
