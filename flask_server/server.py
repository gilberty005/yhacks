from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
import json
from dotenv import load_dotenv, find_dotenv
from urllib.request import urlopen
import urllib.request;
from bs4 import BeautifulSoup
import requests
import re

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load environment variables
_ = load_dotenv(find_dotenv())  # read local .env file

# Set the OpenAI API key from the environment variables
openai.api_key = os.environ['OPENAI_API_KEY']

# Initialize the OpenAI client
client = openai.OpenAI()

def get_completion_from_messages(messages, model="gpt-3.5-turbo", temperature=0.2, max_tokens=1000):
    """
    Get a completion for a given prompt using the specified model and an array of messages.
    
    Args:
        messages (list of dict): An array of message dicts with 'role' and 'content' keys.
        model (str): The model to use for generating completion.
        
    Returns:
        str: The content of the first choice's message.
    """
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature, 
        max_tokens=max_tokens
    )
    return response.choices[0].message.content

def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0,
    )
    return response.choices[0].message.content

def betterFindAll(totalText, startKey, endKey):
    list = []
    for i in range(len(totalText) - len(startKey) + 1):
        #print("Trying: " + totalText[i:i+len(startKey)])
        if(totalText[i:i+len(startKey)] == startKey):
            print("Bingo")
            subtext = totalText[i+len(startKey):]
            #print("Subtext: " + subtext)
            if(endKey in subtext):
                #print("Double")
                list.append(totalText[i:i+len(startKey)+subtext.index(endKey)])
    return list


@app.route("/members", methods=['GET', 'POST'])
def members():
    if request.method == 'POST':
        data = request.json
        user_message = f"Age group: {data['age_group']} years old, Subject: {data['subject'].capitalize()}, Topic: {data['topic']}"
        
        # Define the system message
        delimiter = "####"
        system_message = """
        Follow these steps to generate a lesson plan for the user. The user query will be delimited with four hashtags, i.e. ####. 

        #### 
        Identify the age group and subject of the lesson, and determine if the user input is a topic or a pre-existing lesson plan. Do not output any text during this step.

        #### 
        Generate a lesson plan based on the provided topic, age group, and subject area. Print the generated lesson plan. 
        """
        bannedDomains = ("google.com","amazon.com","books")
        pCutoff = 5000
        sucessCutoff = 3
        tokenCutoff = 10
        topic = data['topic']
        alteredUrl = "https://www.google.com/search?q=" + topic.replace(" ","+") + "&num=100"

        response = requests.get(alteredUrl)
        print("RT:\n" + response.text)
        regexExpression = "https:.*?&amp;sa"
        matchedResults = betterFindAll(response.text,"https://","&amp;sa")
        print("MR: " + str(matchedResults))

        for i in range(len(matchedResults) - 1, -1, -1):
            banned = False
            for x in bannedDomains:
                if(x in matchedResults[i]):
                    banned = True
            if(banned):
                matchedResults.pop(i)
        print("Number of Links: " + str(len(matchedResults)))
        response = ""
        j = 0
        success = 0
        while(j < len(matchedResults) and success < sucessCutoff):
            url = matchedResults[j]
            j += 1
            print("URL: " + url)
            html = None
            try:
                page = urlopen(url)
                html_bytes = page.read()
                html = html_bytes.decode("utf-8")
                print("Successfully reached")
            except:
                try:
                    page=urllib.request.Request(url,headers={'User-Agent': 'Mozilla/5.0'}) 
                    infile=urllib.request.urlopen(page).read()
                    html = infile.decode('utf-8')
                    print("Successfully reached")
                except:
                    print("Both Methods failed, unable to use source")
                    continue
            
            soup = BeautifulSoup(html, "html.parser")
            soupText = soup.get_text()
            results = str(soup.find_all("p"))
            results = re.sub("<a.*?>","",results)
            print(len(results))
            if(len(results) < pCutoff):
                continue
            for i in range(min(int(len(results)/10000) + 1,tokenCutoff)):
                print("I: " + str(i))
                response += get_completion("Summarize the following information:" + results[10000*i:min(len(results),10000*i + 9999)])
            response += "\n"
            success += 1
        user_message = "Utilizing only the information contained in this html code, give an answer to the message in accordance with " + topic + " using code: " + response
        messages = [
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': f"{delimiter}{user_message}{delimiter}"},
        ] 
        
        response_content = get_completion_from_messages(messages)
        
        return jsonify({"status": "success","data": response_content}), 200
    else:
        return jsonify({"ERROR": ["ERROR IN INPUT"]})

@app.route("/generate_script", methods=['GET','POST'])
def generate_script():
    if request.method == 'POST':
        data = request.json
        user_message = f"Lesson Plan: {data['lesson_plan']}"

        # Define the system message
        delimiter = "####"
        system_message = """
        Based on the provided lesson plan, generate a detailed script suitable for creating an educational video.
        """

        messages = [
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': f"{delimiter}{user_message}{delimiter}"},
        ]

        response_content = get_completion_from_messages(messages)
        
        return jsonify({"status": "success", "script": response_content}), 200
    else:
        return jsonify({"ERROR": ["ERROR IN INPUT"]})

if __name__ == "__main__":
    app.run(debug=True)