from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/members", methods=['GET', 'POST'])
def members():
    if request.method == 'POST':
        data = request.json
        print(data)
        return jsonify({"status": "success", "data": data}), 200
    else:
        return jsonify({"members": ["Member1", "Member2", "Member3"]})

if __name__ == "__main__":
    app.run(debug=True)



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

def get_completion_from_messages(messages, model="gpt-3.5-turbo", temperature=0.2, max_tokens=1500):
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
        user_message = f"Age group: {data['age_group']} years old, Subject: {data['subject'].capitalize()}, Lesson Plan: {data['lesson_plan']}, Topic: {data['topic']}"
        
        # Define the system message
        delimiter = "####"
        system_message = """
        Follow these steps to generate a script for a short video. The user query will be delimited with four hashtags, i.e. ####. 

        Step 1:#### First identify what age group and subject the lesson is on. Also decide whether the user inputted a topic or a lesson plan. Do not print out text for this step. 

        Step 2:#### If the user did not input an lesson plan, based on the topic, age group of the audience, and subjet area, generate a lesson plan on the topic and print it out. If the user has a lesson plan already, ignore this step. Only print out the lesson plan if it needs to be generated. Otherwises, no text should be printed at this step. 

        Step 3:#### Based on lesson plan, write a script for a 3 minute video that goes over the the important points of the topic in accordance to the lesson plan. 

        Step 4:#### Based on the video script, generate image prompts that are very specific for DALLE for each frame of the video. 
        """
        
        messages = [
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': f"{delimiter}{user_message}{delimiter}"},
        ] 
        
        response_content = get_completion_from_messages(messages)
        
        return jsonify({"status": "success", "data": response_content}), 200
    else:
        return jsonify({"members": ["Member1", "Member2", "Member3"]})

if __name__ == "__main__":
    app.run(debug=True)
