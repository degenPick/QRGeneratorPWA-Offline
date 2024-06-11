import React, { useState } from "react";

const QRGeneratorPage = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("Akil");
  const [lastName, setLastName] = useState("Shah");
  const [email, setEmail] = useState("akilshah81@gmail.com");
  const [phone1, setPhone1] = useState("8460805070");
  const [phone2, setPhone2] = useState("8460805070");
  const [phone3, setPhone3] = useState("8460805070");
  const [company, setCompany] = useState("Ziance Technologies");
  const [jobTitle, setJobTitle] = useState("Developer");
  const [website, setWebsite] = useState("ziance.com");
  const [qrType, setQrType] = useState("contact");
  const [image, setImage] = useState("");

  const [msg, setMsg] = useState("");

  const fetchGenerateQr = () => {
    if (!firstName) {
      alert("Please enter first name.");
    } else if (!lastName) {
      alert("Please enter last name.");
    } else if (!email) {
      alert("Please enter email");
    } else if (!phone1) {
      alert("Please enter phone1 (primary).");
    } else if (!company) {
      alert("Please enter company.");
    } else if (!jobTitle) {
      alert("Please enter job title.");
    } else if (!website) {
      alert("Please enter website.");
    } else if (!qrType) {
      alert("Please select qr type.");
    } else {
      setLoading(true);
      setMsg("");

      if (navigator.onLine) {
        generateQrAPI();
      } else {
        emailQr();
      }
    }
  };

  const generateQrAPI = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_primary: phone1,
      phone_mobile1: phone2,
      phone_mobile2: phone3,
      company: company,
      job_title: jobTitle,
      website: website,
    };

    fetch(`http://localhost:3002/api/qr?qrcode=${qrType}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("FinalRes", res.Response);
        setImage(res.Response);
      })
      .catch((err) => {
        console.error("Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const emailQr = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_primary: phone1,
      phone_mobile1: phone2,
      phone_mobile2: phone3,
      company: company,
      job_title: jobTitle,
      website: website,
    };

    fetch(`http://localhost:3002/api/send-email?qrcode=${qrType}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("MESSAGE", res.message);
      })
      .catch((err) => {
        console.error("Error", err);
      })
      .finally(() => {
        setLoading(false);
        setMsg("Your request has been processed successfully.");
      });
  };

  return (
    <div className="form-container">
      <h1 style={{ fontSize: "24px", color: "black", marginBottom: "10px" }}>
        QR Code Generator
      </h1>
      <form
        id="contactForm"
        noValidate
        onSubmit={(e) => e.preventDefault()}
        method="post"
      >
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          id="phone1"
          placeholder="Phone 1 (primary)"
          value={phone1}
          onChange={(e) => setPhone1(e.target.value)}
        />
        <input
          type="tel"
          id="phone2"
          placeholder="Phone 2"
          value={phone2}
          onChange={(e) => setPhone2(e.target.value)}
        />
        <input
          type="tel"
          id="phone3"
          placeholder="Phone 3"
          value={phone3}
          onChange={(e) => setPhone3(e.target.value)}
        />
        <input
          type="text"
          id="company"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          id="jobTitle"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <input
          type="url"
          id="website"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <select
          id="qrType"
          value={qrType}
          onChange={(e) => setQrType(e.target.value)}
        >
          <option value="contact">Contact</option>
          <option value="vcard">VCard</option>
        </select>
        <button
          type="button"
          id="submitBtn"
          onClick={fetchGenerateQr}
          disabled={loading}
        >
          {!loading ? "Generate QR" : "Loading...."}
        </button>
      </form>
      <div id="result" className={image !== "" ? "" : "hidden"}>
        <img
          id="qrImage"
          src={image}
          alt="QR Code"
          style={{ width: "200px", height: "200px" }}
        />
        <button id="downloadBtn">Download QR</button>
      </div>
      <span
        style={{
          color: "green",
          fontSize: "14px",
        }}
      >
        {msg}
      </span>
    </div>
  );
};

export default QRGeneratorPage;
