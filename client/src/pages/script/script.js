import React from "react";
import { useLocation } from 'react-router-dom';
import './script.css';

const Script = () => {
  const location = useLocation();
  const { generatedText } = location.state || { generatedText: "" }; // Fallback to empty string if state is undefined

  // Use generatedText as initial form value or display it directly
  return (
    <div>
      <h1>This is the Script Page</h1>
      <p>Welcome to the Script Page. You can put your script-related content here.</p>
      {/* Display the text or use it as part of a form */}
      <textarea defaultValue={generatedText}></textarea>
    </div>
  );
};

export default Script;