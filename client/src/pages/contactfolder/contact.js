import React, { useState } from "react";
import "./contact.css";

const initialFormData = {
  age_group: "",
  subject: "",
  topic: "",
  lesson_plan: "",
  responseMessage: "" 
};

export function Contact() {
  const [formData, setFormData] = useState(initialFormData);

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
      const response = await fetch("http://127.0.0.1:5000/members", { // Ensure this URL matches your Flask server's address
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });
      const data = await response.json();
      console.log(data);  
      setFormData(prevData => ({ ...prevData, responseMessage: data.data }));  // Update state with backend response
    } catch (error) {
      console.error("Error posting form data:", error);
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="form-container">
          <h2 className="gradient__text">Let's Get Your Lesson Plan Done!</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="age">Age:</label><br />
            <input
              type="number"
              id="age_group"
              name="age_group"
              required
              value={formData.age_group}
              onChange={handleChange}
            /><br />
            <label htmlFor="subject">Subject:</label><br />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
            /><br /><br />
            <label htmlFor="topic">Topic:</label><br />
            <input
              type="text"
              id="topic"
              name="topic"
              required
              value={formData.topic}
              onChange={handleChange}
            /><br /><br />
            <label htmlFor="lesson_plan">Lesson Plan:</label><br />
            <textarea
              id="lesson_plan"
              name="lesson_plan"
              value={formData.lesson_plan}
              onChange={handleChange}
            /><br /><br />
            <input
              type="submit"
              className="submit focus-style"
              value="Make a Video!"
            />
          </form>
        </div>
        
        {formData.responseMessage && (
        <div className="response-container">
          <h3>Response from Server:</h3>
          <p>{formData.responseMessage}</p>
        </div>
      )}
    </div>
  </>
);
}