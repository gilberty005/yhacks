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
        try{
            const response = await fetch("http://127.0.0.1:5000/generate_video",{
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
                navigate('/player', { state: { generatedText: data.data } });
            } else {
                console.error("Server responded with status:", response.status);
            }
        } catch(error) {
            console.error("Error forming video:", error);
        }
    };

    return (
        <>
            <div className="content-container">
                <div className="form-container">
                    <h1 className="script-intro">Let's Make Some Video Magic Happen!</h1>
                    <p className="script-subintro">Freely edit the script before it gets turned into a video!</p>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <textarea 
                            defaultValue={generatedText} 
                            onChange={handleChange}
                            className="script-textbox"
                        ></textarea>
                        <br />
                        <input
                            type="submit"
                            value="GENERATE VIDEO"
                            className="submit-focus-style"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Video;