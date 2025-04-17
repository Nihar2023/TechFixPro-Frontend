import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import "./reportIssue.css";

import mobileData from "../../assets/brands_and_models.json";
import laptopData from "../../assets/laptop_json_file.json";
import repairPrices from "../../../data.js";
import { DeviceContext } from "../../Context/Device.jsx";
import { CartContext } from "../../Context/CartContext.jsx";
import { UserContext } from "../../Context/UserContext.jsx";

const issuesList = [
  "Battery Drain", "Screen Cracks", "Touchscreen Not Working",
  "Charging Issues", "Overheating", "Speaker/Microphone Problems",
  "Camera Not Working", "Water Damage", "Software Issues",
  "Network & Connectivity Issues"
];

function ReportIssue() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const { deviceData, setDeviceData } = useContext(DeviceContext);
  
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState(deviceData.serviceType || "");

  const { device, company, model, address, mobileNo, date } = deviceData;

  const getBrandData = () => (device === "laptop" ? laptopData : mobileData);

  const getCompanyOptions = () =>
    Object.keys(getBrandData()).map((comp) => ({ label: comp, value: comp }));

  const getModelOptions = () =>
    getBrandData()[company]?.map((mod) => ({ label: mod, value: mod })) || [];

  const calculateTotalAmount = () => {
    return selectedIssues.reduce((total, issue) => {
      return total + (repairPrices[device]?.[company]?.[model]?.[issue] || 0);
    }, 0);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedIssues((prev) =>
      prev.includes(value)
        ? prev.filter((issue) => issue !== value)
        : [...prev, value]
    );
  };

  const handleChangeServiceType = (e) => {
    const value = e.target.value;
    setDeliveryOption(value);
    setDeviceData((prev) => ({ ...prev, serviceType: value }));
  };

  useEffect(() => {
    setDeviceData((prev) => ({ ...prev, total_cost: calculateTotalAmount() }));
  }, [selectedIssues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!userData.email)
    {
      navigate('/login')
      return;
    }
    const updatedData = { ...deviceData, issues: selectedIssues };
    const { device, model, company, description, serviceType, address, date, mobileNo, store } = updatedData;
    if (!device || !model || !company || !description || !serviceType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (serviceType === "pickup" && (!address || !mobileNo || !date)) {
      toast.error("Please enter pickup details.");
      return;
    }

    if (serviceType === "pickup") {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/user/add-to-cart`, {
          ...updatedData,
          userEmail: userData.email,
        });

        if (!res.data.success) {
          toast.error(res.data.message);
          return;
        }

        toast.success(res.data.success);
        navigate("/cartItems");

        setDeviceData({
          device: "",
          model: "",
          company: "",
          issues: [],
          description: "",
          address: "",
          date: "",
          mobileNo: "",
          serviceType: "",
        });
        setSelectedIssues([]);
      } catch {
        toast.error("Failed to submit. Try again.");
      }
    } else {
      navigate(`/stores/${device}`);
    }
  };

  return (
    <div className="issue-container">
      <p>Select Device Type</p>
      <select
        value={device}
        onChange={(e) =>
          setDeviceData((prev) => ({
            ...prev,
            device: e.target.value,
            company: "",
            model: "",
          }))
        }
      >
        <option value="">Select device type</option>
        <option value="mobile">Mobile</option>
        <option value="laptop">Laptop</option>
      </select>

      <div className="form-group">
        <p className="form-label">Select Company</p>
        <Select
          isDisabled={!device}
          options={getCompanyOptions()}
          value={company ? { label: company, value: company } : null}
          onChange={(selected) =>
            setDeviceData((prev) => ({
              ...prev,
              company: selected.value,
              model: "",
            }))
          }
          placeholder="Select a Company"
        />
      </div>

      <div className="form-group">
        <p className="form-label">Select Model</p>
        <Select
          isDisabled={!company}
          options={getModelOptions()}
          value={model ? { label: model, value: model } : null}
          onChange={(selected) =>
            setDeviceData((prev) => ({ ...prev, model: selected.value }))
          }
          placeholder="Select a Model"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Problem Description</label>
        <textarea
          id="description"
          value={deviceData.description || ""}
          onChange={(e) =>
            setDeviceData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      {device && company && model && (
        <div className="form-group">
          <p className="form-label">Select Issues (optional)</p>
          {issuesList.map((issue) => (
            <label key={issue}>
              <input
                type="checkbox"
                value={issue}
                checked={selectedIssues.includes(issue)}
                onChange={handleCheckboxChange}
              />
              {" "}{issue}
            </label>
          ))}
        </div>
      )}

      <h3>Select Service Type</h3>
      <label>
        <input
          type="radio"
          name="serviceType"
          value="pickup"
          checked={deliveryOption === "pickup"}
          onChange={handleChangeServiceType}
        />
        Repair Doorstep
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="serviceType"
          value="visit"
          checked={deliveryOption === "visit"}
          onChange={handleChangeServiceType}
        />
        Visit the Store
      </label>

      {deliveryOption === "pickup" && (
        <>
          <label htmlFor="date">Pickup Date</label>
          <input
            type="date"
            id="date"
            value={date || ""}
            onChange={(e) =>
              setDeviceData((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address || ""}
              onChange={(e) =>
                setDeviceData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Mobile Number</label>
            <input
              type="number"
              placeholder="Enter mobile number"
              value={mobileNo || ""}
              onChange={(e) =>
                setDeviceData((prev) => ({ ...prev, mobileNo: e.target.value }))
              }
            />
          </div>
        </>
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ReportIssue;
