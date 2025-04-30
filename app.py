from dotenv import load_dotenv
import os
import json
from openai import OpenAI
import fitz  
from docx import Document
from langdetect import detect
from flask import Flask, render_template, request, jsonify, make_response

# Load environment variables
load_dotenv()

# Read API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)

# Flask
app = Flask(__name__, static_folder="static", template_folder="templates")

def analyze_text_with_openai(text):
    # prompt 
    prompt = f"""
    Analyze the following text for harmful content, including xenophobic language, misinformation, and harmful content.
    Provide a classification (None, Mild, High, Max), a target (xenophobic language, misinformation, and harmful content), reasoning, sentiment, and key keywords.

    Text: {text}

    You "Must" and only need to Respond in JSON format like below:
    {{
        "classification": "None/Mild/High/Max",
        "target": "xenophobic language/misinformation/harmful content",
        "reason": "Explanation of classification",
        "sentiment": "Positive/Negative/Neutral",
        "keywords": "Comma-separated relevant keywords"
    }}
    And don't include any unnecessary characters or text. like : ``` or anything else.
    """

    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-3.3-70b-instruct:free",
            messages=[{
                "role": "user",
                "content": f"{prompt}"
            }]
        )
        
        print("Response from OpenRouter API:", response)  # For debugging, log the response
        response_text = response.choices[0].message.content
        # print(f"Response text: {response_text}")  # Log the raw response text
        return json.loads(response_text)  # return to dict

    except Exception as e:
        print("Error in API call:", str(e))
        return None  # None


@app.route("/")
def index():
    resp = make_response(render_template("index.html"))
    resp.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    resp.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
    return resp

@app.route("/report")
def report():
    return render_template("report.html")

@app.route("/analyze", methods=["GET","POST"])
def analyze():
    text = request.form.get("news_text", "").strip()
    file = request.files.get("uploaded_file")

    if file:
        if file.filename.endswith(".pdf"):
            document = fitz.open(stream=file.read(), filetype="pdf")
            text = " ".join([page.get_text() for page in document])
        elif file.filename.endswith(".docx"):
            document = Document(file)
            text = "\n".join([para.text for para in document.paragraphs])

    if not text:
        return render_template("index.html", error="Please provide text or upload a document.")


    analysis_result = analyze_text_with_openai(text)
       
         # ensure analysis_result is dict
    if isinstance(analysis_result, str):
            analysis_result = json.loads(analysis_result)

    print("analysis_result from OpenAI:", analysis_result)
    return render_template("report.html", **analysis_result)  # go to report.html
 


if __name__ == "__main__":
    app.run(debug=True)