import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './video.css';

const initialFormData = {
    script: "",
  };

const Video = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { generatedText } = location.state || { generatedText: "" };
    const [formData, setFormData] = useState({ ...initialFormData, script: generatedText });

    const handleChange = (e) => {
        const lessonPlan = e.target.value;
        // If the textarea is empty, replace it with a default string
        const updatedPlan = lessonPlan.trim() === '' ? 'None' : lessonPlan.replace(/\n/g, ' ');
        setFormData({ script: updatedPlan });
      };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonData = JSON.stringify(formData);
        // Add your submission logic here
        // For example, you can navigate or perform an action based on the form data
    };

    return (
        <div>
            <h1>Let's Make Some Video Magic Happen!</h1>
            <p>Freely edit the script before it gets turned into a video!</p>
            <form onSubmit={handleSubmit}>
            <textarea
                defaultValue={generatedText}
                onChange={handleChange}
            ></textarea>
            <br></br>
            <input
                type="submit"
                className="submit-plan-style"
                value="GENERATE VIDEO"
            />
            </form>
        </div>
    );
};

export default Video;
