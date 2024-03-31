import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './script.css';

const initialFormData = {
  lesson_plan: "",
};

const Script = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { generatedText } = location.state || { generatedText: "" }; // Fallback to empty string if state is undefined
  const [formData, setFormData] = useState({ ...initialFormData, lesson_plan: generatedText });

  const handleChange = (e) => {
    const lessonPlan = e.target.value;
    // If the textarea is empty, replace it with a default string
    const updatedPlan = lessonPlan.trim() === '' ? 'None' : lessonPlan.replace(/\n/g, ' ');
    setFormData({ lesson_plan: updatedPlan });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData);
    try {
      const response = await fetch('http://127.0.0.1:5000/generate_script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData
      });
      if (response.ok) { 
        const data = await response.json();
        console.log(data);
        localStorage.setItem('formData', jsonData);

        navigate('/video', { state: { generatedText: data.data } });
      } else {
        console.error("Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error posting form data:", error);
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="form-container">
          <h1 className="script-intro">Let's Make Some Script Magic Happen!</h1>
          <p className="script-subintro">Welcome to the Script Page. You can put your script-related content here.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <textarea 
              defaultValue={generatedText} 
              onChange={handleChange}
              className="script-textbox"
            ></textarea>
            <br />
            <input
              type="submit"
              value="GENERATE SCRIPT"
              className="submit-focus-style"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Script;