# Audio, Video & Text Analysis Tool

## Overview

This is a web-based analysis tool built for the United Nations International Computing Centre (UNICC) to assess potentially harmful content across **text**, **audio**, and **video** inputs. Users can upload files or enter raw text, and the system will detect signs of **xenophobia**, **misinformation**, or **harmful content** using **OpenRouter’s LLaMA 3.3-70B** language model.

## Features

- **Audio & Video Upload**: Supports `.mp3`, `.wav`, and `.mp4` formats. Converts video to audio and standardizes audio before analysis.
- **Text Input & File Upload**: Enter content directly or upload `.pdf` or `.docx` files for extraction and analysis.
- **Multilingual Support**: Choose from English, Chinese, French, Russian, Spanish, or Arabic.
- **Xenophobia Classification**: Detects content levels (`None`, `Mild`, `High`, `Max`) indicating the severity of harmful language.
- **Sentiment Analysis**: Evaluates the emotional tone of the content.
- **Reasoning & Explanation**: Provides an LLM-generated justification for the classification.
- **Keyword Extraction**: Outputs key terms related to the detected content.
- **Clean UI**: Interactive step-by-step interface with a downloadable audio preview.

## Setup and Installation
### Prerequisites
- Python 3.8+
- Flask
- PyMuPDF (for PDF text extraction)
- python-docx (for Word document parsing)
- OpenAI Python SDK (for OpenRouter API access)
- An OpenRouter API key

### Installation

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set the environment variable OPENROUTER_API_KEY with your OpenRouter key:
   ```bash
   export OPENROUTER_API_KEY=your_openrouter_api_key
   ```

### Running the Application
1. Start the Flask app:
   ```bash
   python app.py
   ```

2. Open your web browser and navigate to the provided local URL (usually http://127.0.0.1:5000).

## Usage
1. **Select Analysis Type**:
   - Choose from Text, Audio, or Video.

2. **Upload a File or Enter Content**:
   - Upload `.mp4`, `.mp3`, `.wav`, `.pdf`, or `.docx`, or enter content manually.

3. **Choose Language**:
   - Select from English, 中文, Français, Русский, Español, or العربية.

4. **Analyze**:
   - The results will be displayed in a structured report showing classification, target, reason, sentiment, and keywords.

## Configuration
### LLM Workflow
The backend is configured to interact with OpenRouter’s hosted LLaMA model to analyze the input and return a structured JSON object. The workflow includes:
- **Model**: meta-llama/llama-3.3-70b-instruct:free
- **Prompt Template**: Custom prompt asking for classification, target category, reason, sentiment, and keyword list.
- **Output Format**: JSON, rendered visually in the report interface.

### Example Output
```json
{
  "classification": "High",
  "target": "xenophobic language",
  "reason": "The content includes generalized stereotypes about a group, promoting harmful perceptions.",
  "sentiment": "Negative",
  "keywords": "immigrants, threat, invasion, jobs"
}
```

## Customization
- **CSS Styling**: UI styles are defined in `static/index.css` and `static/report.css`. Modify them to fit your branding.
- **HTML Templates**: Frontend layout is managed in `templates/index.html` and `templates/report.html`.
- **Model Configuration**: Switch models or adjust prompts inside `analyze_text_with_openai()` in `app.py`.
- **API Key**: Environment variable `OPENROUTER_API_KEY` controls access to OpenRouter.


---

Thank you for using the Audio, Video & Text Analysis Tool! 🕊️
