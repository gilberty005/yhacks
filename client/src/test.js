import React, { useState } from "react";
import "./contact.css";

// Define your JSON data directly in your code
const initialFormData = {
  age: "",
  subject: "",
  topic: "",
  lesson_plan: ""
};

export function Contact() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Serialize form data to JSON
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData);
  };

  return (
    <>
      <div className="content-container">
        <div className="form-container">
          <h2 className="gradient__text">Let's Connect!</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="age">Age:</label><br />
            <input
              type="number"
              id="age"
              name="age"
              required
              value={formData.age}
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
            <label htmlFor="topic">Lesson Plan:</label><br />
            <input
              type="text"
              id="topic"
              name="topic"
              required
              value={formData.topic}
              onChange={handleChange}
            /><br /><br />
            <label htmlFor="lesson_plan">Lesson Plan:</label><br />
            <input
              type="text"
              id="lesson_plan"
              name="lesson_plan"
              value={formData.lesson_plan}
              onChange={handleChange}
            /><br /><br />
            <input
              type="submit"
              className="submit focus-style"
              value="Save JSON"
            />
          </form>
        </div>
      </div>
    </>
  );
}
