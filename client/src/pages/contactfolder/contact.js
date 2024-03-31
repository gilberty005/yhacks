import React, { useState } from "react";
import "./contact.css";

const initialFormData = {
  age_group: "",
  subject: "",
  topic: "",
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
      const response = await fetch("http://127.0.0.1:5000/members", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData
      });
      const data = await response.json();
      console.log(data);
      // Update state with backend response
      setFormData(prevData => ({ ...prevData, responseMessage: data.data }));
    } catch (error) {
      console.error("Error posting form data:", error);
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="form-container">
          <h1 className="gradient__text">Let's Get Your Lesson Plan Done!</h1>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="age">AGE</label><br />
            <input
              type="number"
              min={0}
              max={100}
              id="age_group"
              name="age_group"
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
              value={formData.topic}
              onChange={handleChange}
            /><br /><br />
            <input
              type="submit"
              className="submit-focus-style"
              value="MAKE A LESSON PLAN!"
            />
          </form>
        </div>
        {formData.responseMessage && (
        <div className="response-container">
          <h3>Your New Lesson Plan:</h3>
          {/* Modified part to display responseMessage with new lines for "-" and numbers */}
          <p>
            {formData.responseMessage.split('').map((char, index) => (
              /[-0-9]/.test(char) ? [<br key={index} />, char] : char
            ))}
          </p>
        </div>
        )}
      </div>
    </>
  );
}