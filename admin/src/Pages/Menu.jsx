import React, { useState } from 'react';
import "../css/menu.css";
import { Button } from "@mui/material";


const Menu = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };


  return (
    <>
      <div className="menu-content">
        <div className='menu-file'>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            name="MenuPDF"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" className='upload-img2'>
              Upload Menu File
            </Button>
          </label>
          {file && (
            <div className='pdf-viewer'>
              <iframe
                src={file}
                width="100%"
                height="600px"
                style={{ border: "none", marginTop: "20px" }}
                title="Menu PDF"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
