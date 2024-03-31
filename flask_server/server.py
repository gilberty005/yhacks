from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
import json
from dotenv import load_dotenv, find_dotenv

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load environment variables
_ = load_dotenv(find_dotenv())  # read local .env file

# Set the OpenAI API key from the environment variables
openai.api_key = os.environ['OPENAI_API_KEY']

# Initialize the OpenAI client
client = openai.OpenAI()

def get_completion_from_messages(messages, model="gpt-3.5-turbo", temperature=0.2, max_tokens=3000):
    """
    Get a completion for a given prompt using the specified model and an array of messages.
    """
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature, 
        max_tokens=max_tokens
    )
    return response.choices[0].message.content

@app.route("/members", methods=['GET', 'POST'])
def members():
    if request.method == 'POST':
        data = request.json
        user_message = f"Age group: {data['age_group']} years old, Subject: {data['subject'].capitalize()}, Topic: {data['topic']}"
        
        # Define the system message
        delimiter = "####"
        system_message = """
        Follow these steps to generate a script for a short video. The user query will be delimited with four hashtags, i.e. ####. 

        #### 
        Identify the age group and subject of the lesson, and determine if the user input is a topic or a pre-existing lesson plan. Do not output any text during this step.

        #### 
        Generate a lesson plan based on the provided topic, age group, and subject area. Print the generated lesson plan. 
        """
        
        messages = [
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': f"{delimiter}{user_message}{delimiter}"},
        ] 
        
        response_content = get_completion_from_messages(messages)
        
        return jsonify({"status": "success","data": response_content}), 200
    else:
        return jsonify({"ERROR": ["ERROR IN INPUT"]})

if __name__ == "__main__":
    app.run(debug=True)
