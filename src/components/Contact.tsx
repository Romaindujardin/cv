import React from "react";
import "./Contact.css";
import BlobOrbit from "./BlobOrbit";

const Contact: React.FC = () => {
  const handleContactClick = (action: string) => {
    switch (action) {
      case "cv":
        window.open("./img/cv.pdf", "_blank");
        break;
      case "email":
        window.open("mailto:dujardin.romain@icloud.com", "_blank");
        break;
      case "phone":
        window.open("tel:0783193023", "_blank");
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/dujardin-romain/", "_blank");
        break;
    }
  };

  return (
    <section id="section5" className="contact-section">
      <h1 style={{ color: "white", marginLeft: "5%" }}>
        Contacts
        <svg
          stroke="#62B2FF"
          fill=""
          strokeWidth="1"
          viewBox="0 0 24 24"
          className="hover:text-purple-500"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Location_Arrow_1">
            <path d="M14.472,20.937a1.438,1.438,0,0,1-1.3-.812L10.3,14.343a1.418,1.418,0,0,0-.642-.641L3.874,10.831A1.462,1.462,0,0,1,4.06,8.136l14.952-5a1.46,1.46,0,0,1,1.849,1.847l-5,14.952a1.439,1.439,0,0,1-1.284.994C14.543,20.936,14.507,20.937,14.472,20.937ZM19.479,4.063a.488.488,0,0,0-.149.024h0l-14.952,5a.46.46,0,0,0-.058.849L10.1,12.805A2.444,2.444,0,0,1,11.2,13.9l2.87,5.782a.443.443,0,0,0,.445.255.45.45,0,0,0,.4-.312l5-14.953a.462.462,0,0,0-.433-.607Z"></path>
          </g>
        </svg>
      </h1>
      <div className="container">
        <div className="text-container">
          <h1>
            Restons <br /> connectés,
          </h1>
        </div>
        <div className="button-container">
          <div className="button-column">
            <button onClick={() => handleContactClick("cv")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 7a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3-.5a1 1 0 0 1-1-1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h-2.5z" />
              </svg>
              Mon CV
            </button>
            <button onClick={() => handleContactClick("email")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.708 2.825L15 11.383V5.383zM1 5.383v6l4.708-2.825L1 5.383zM14.708 12.383L8 8.383l-6.708 4V12.383h13.416z" />
              </svg>
              Mon mail
            </button>
            <button onClick={() => handleContactClick("phone")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.293 16.88l-4.5-2c-.723-.324-1.612-.112-2.116.525l-1.71 2.175c-3.902-2.073-7.035-5.206-9.108-9.108l2.174-1.71c.639-.504.85-1.392.525-2.116l-2-4.5c-.433-.974-1.588-1.436-2.613-.977L2.413 2.342c-.804.367-1.332 1.177-1.332 2.047C1.08 14.86 9.14 22.92 19.61 22.92c.87 0 1.68-.528 2.048-1.332l1.367-3.175c.46-1.025-.003-2.18-.977-2.613z" />
              </svg>
              Mon téléphone
            </button>
            <button onClick={() => handleContactClick("linkedin")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Mon LinkedIn
            </button>
          </div>
          <div className="blob-container">
            <BlobOrbit />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
