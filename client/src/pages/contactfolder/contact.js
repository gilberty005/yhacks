import React, { useState } from "react";
import "./contact.css";
import { useNavigate } from 'react-router-dom';

const initialFormData = {
  age_group: "",
  subject: "",
  topic: "",
  responseMessage: ""
};

export function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'lesson_plan' && value.trim() === '' ? 'None' : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'lesson_plan' ? updatedValue.replace(/\n/g, ' ') : updatedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData);
    try {
      const response = await fetch("http://127.0.0.1:5000/members", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData
      });
      if (response.ok) { 
        const data = await response.json();
        console.log(data);
        localStorage.setItem('formData', jsonData);
        // Navigate with state
        navigate('/script', { state: { generatedText: data.data } });
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
          <h1 className="script-intro">Let's Make Some Lesson Magic Happen!</h1>
          <p className="script-subintro">Welcome to the Lesson Page. You can put your lesson-related content here.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="age">AGE</label><br />
            <input
              type="number"
              min={1}
              max={100}
              id="age_group"
              name="age_group"
              placeholder="e.g. 10, 16, etc."
              required
              value={formData.age_group}
              onChange={handleChange}
              className="form-category"
            /><br />
            <label htmlFor="subject">SUBJECT</label><br />
            <input
              type="text"
              minLength={2}
              maxLength={30}
              id="subject"
              name="subject"
              required
              placeholder="e.g. Math, History, etc."
              value={formData.subject}
              onChange={handleChange}
            /><br /><br />
            <label htmlFor="topic">TOPIC</label><br />
            <input
              type="text"
              id="topic"
              maxLength={50}
              name="topic"
              required
              placeholder="e.g. Photosynthesis, etc."
              value={formData.topic}
              onChange={handleChange}
            /><br />
            <input
              type="submit"
              className="submit-focus-style"
              value="GENERATE LESSON PLAN"
            />
          </form>
        </div>
      </div>
    </>
  );
}