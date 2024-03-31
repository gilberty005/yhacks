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

def generateImage(prompt):
    return client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1792x1024",
        quality="standard",
        n=1,
        )

def generateTTS(prompt, name, voice):
    audio_directory = 'static/audio'  # Define the directory to save audio files
    if not os.path.exists(audio_directory):  # Check if the directory exists
        os.makedirs(audio_directory)  # Create the directory if it does not exist
    file_path = os.path.join(audio_directory, f"{name}.mp3")  # Construct the file path

    with client.audio.speech.with_streaming_response.create(
        model="tts-1",
        voice=voice,
        input=prompt,
        response_format='mp3'
    ) as response:
        response.stream_to_file(file_path)



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
        
        return jsonify({"status": "success", "data": response_content}), 200
    else:
        return jsonify({"ERROR": ["ERROR IN INPUT"]})
    
@app.route("/generate_video", methods=['GET','POST'])
def generate_video():
    if request.method == 'POST':
        data = request.json
        script = data.get('script', '')
        #script = """````[The video opens with a shot of a lush green forest with sunlight filtering through the leaves. A narrator begins speaking as the camera zooms in on a single leaf.]\n\nNarrator: "Welcome to our lesson on understanding photosynthesis, the remarkable process that sustains life on Earth by converting light energy into chemical energy. Today, we will delve into the stages, importance, variations, and even the exciting world of artificial photosynthesis."\n\n[Cut to a classroom setting with a whiteboard and the teacher standing ready to begin the lesson.]\n\nTeacher: "Let's start by defining photosynthesis. It's the process by which plants, algae, and some bacteria harness light energy to produce oxygen and glucose, fueling the entire ecosystem."\n\n[The whiteboard displays the definition of photosynthesis as the teacher elaborates.]\n\nTeacher: "Photosynthesis is crucial for maintaining the balance of gases in our atmosphere and providing energy for all living organisms. Now, let's explore the stages of this fascinating process."\n\n[Cut to a diagram showing the stages of photosynthesis as the teacher explains.]\n\nTeacher: "Photosynthesis occurs in two main stages: the light-dependent reactions and the light-independent reactions. The chloroplasts play a key role in these processes, converting light energy into chemical energy."\n\n[The teacher continues to explain the specific processes involved in each stage, emphasizing the importance of each step.]\n\nTeacher: "Different types of photosynthesis, such as the C3 and C4 pathways, have evolved to adapt to varying environmental conditions. These mechanisms optimize the efficiency of photosynthesis under different circumstances."\n\n[Transition to a discussion on the role of photosynthesis in ecosystems.]\n\nTeacher: "In ecosystems, photosynthesis is essential for producing oxygen, capturing carbon dioxide, and providing energy for organisms. It's a fundamental process that sustains life as we know it."\n\n[Cut to a segment on the efficiency and variations in photosynthesis.]\n\nTeacher: "Factors like light intensity, temperature, and CO2 levels influence the efficiency of photosynthesis. Plants have developed strategies like the C4 and CAM pathways to thrive in diverse environments."\n\n[The teacher introduces the concept of artificial photosynthesis and its potential applications.]\n\nTeacher: "Artificial photosynthesis mimics natural processes to capture and store solar energy. It holds promise as a sustainable energy source, offering a carbon-neutral solution to our energy needs."\n\n[The video transitions to an interactive activity where students label a diagram of the photosynthesis process.]\n\nTeacher: "Now, let's put our knowledge to the test. In small groups, label the different stages and components of photosynthesis on your handouts. Discuss the significance of each stage and how they contribute to the overall process."\n\n[The video concludes with a reflection on the impact of photosynthesis and the potential of artificial photosynthesis.]\n\nTeacher: "As we wrap up, remember the vital role photosynthesis plays in our world. Reflect on how this process shapes our environment and consider the exciting possibilities of artificial photosynthesis in shaping a sustainable future."\n\n[Narrator speaks as the video fades to black.]\n\nNarrator: "By understanding photosynthesis, we gain insight into the intricate web of life on Earth and the potential for innovative solutions to environmental challenges. Thank you for joining us on this enlightening journey."\n\n[End of video.]````"""

        scriptPieces = script.split("\n\n")
        captions = []
        narrations = []
        for p in scriptPieces:
            if(p[0:1] == "["):
                captions.append(p)
            else:
                narrations.append(p)

        imageUrls = []
        for c in range(len(captions)):
            try:
                response = generateImage(captions[c])
                imageUrl = response.data[0].url
                imageUrls.append(imageUrl)
            except:
                print("Unable to make image for: " + captions[c])

        audios = []
        characters = []
        voices = ["fable", "onyx", "nova", "alloy", "echo", "simmer"]
        for n in range(len(narrations)):
            fileName = "audio " + str(n) + ".mp3"
            text = narrations[n]
            speaker = text[0:text.index(":")]
            if(speaker not in characters):
                characters.append(speaker)
            generateTTS(text[text.index(":") + 1:], fileName, voices[characters.index(speaker)])
            audios.append(fileName)

        return jsonify({"image_urls": imageUrls, "audio_files": audios}), 200

    else:
        return jsonify({"error": "Invalid request method"}), 405
    

if __name__ == "__main__":
    app.run(debug=True)