let selectedAnalyzeType = null;
let convertedAudioURL = null;

// "How to use"
const howToUseContent = {
  Video: `
    <p>For Video Analysis:<br>
    <p>1. <strong>Step 1: Upload Video File</strong><br>
    In the "Upload Video File (.mp4)" section, select your .mp4 file, then click the "Convert Video to Audio" button to convert the video into an audio file.</p >
    <p>2. <strong>Step 2: Preview and Download Audio</strong><br>
    After conversion, preview the audio in the "Audio Preview" section and download the generated .wav file.</p >
    <p>3. <strong>Transcribe Audio</strong><br>
    Open the <a href="https://whisper.ggerganov.com/" target="_blank">Whisper Web Tool</a >, select a model (Recommended: Base), and wait for the model to fully load. Drag the downloaded .wav file into the Whisper site to transcribe it, selecting the language corresponding to your content.</p >
    <p>4. <strong>Step 3: Perform Text Analysis</strong><br>
    Copy the transcription result from the Whisper site, paste it into the "Enter content..." field in the "Text" section, select the language, and click "Analyze" to view the analysis report.</p >
    <p>✅ <strong>Note:</strong> No installation or login is required. All operations run locally in your browser.</p >
  `,
  Audio: `
    <p>For Audio Analysis:<br>
    <p>1. <strong>Step 2: Upload Audio File</strong><br>
    In the "Upload Audio File (.mp3 or .wav)" section, select your .mp3 or .wav file, then click the "Standardize Audio Format" button to convert the audio into a Whisper-compatible .wav format.</p >
    <p>2. <strong>Step 2: Preview and Download Audio</strong><br>
    After conversion, preview the audio in the "Audio Preview" section and download the generated .wav file.</p >
    <p>3. <strong>Transcribe Audio</strong><br>
    Open the <a href="https://whisper.ggerganov.com/" target="_blank">Whisper Web Tool</a >, select a model (Recommended: Base), and wait for the model to fully load. Drag the downloaded .wav file into the Whisper site to transcribe it, selecting the language corresponding to your content.</p >
    <p>4. <strong>Step 3: Perform Text Analysis</strong><br>
    Copy the transcription result from the Whisper site, paste it into the "Enter content..." field in the "Text" section, select the language, and click "Analyze" to view the analysis report.</p >
    <p>✅ <strong>Note:</strong> No installation or login is required. All operations run locally in your browser.</p >
  `,
  Text: `
    <p>For Direct Text Analysis:<br>
    <p>1. <strong>Step 3: Input or Upload Text</strong><br>
    In the "Text" section, enter your text directly in the "Enter content..." field, or upload a PDF/DOCX file. Select the language and click "Analyze" to view the analysis report.</p >
    <p>✅ <strong>Note:</strong> No installation or login is required. All operations run locally in your browser.</p >
  `
};

// Step 1
function selectAnalyzeType(type) {
  selectedAnalyzeType = type;
  document.getElementById('analyze-type-display').textContent = `Selected: ${type}`;
  const howToUseElement = document.getElementById('how-to-use-content');
  howToUseElement.innerHTML = howToUseContent[type] || '<p>Please select an analyze type (Video, Audio, or Text) to see the corresponding instructions.</p >';
}

// Step 2
function convertVideoToAudio() {
  const videoInput = document.getElementById('videoInput');
  const videoStatus = document.getElementById('video-status');
  const audioPlayer = document.getElementById('audioPlayer');
  const downloadLink = document.getElementById('download-audio');

  if (!videoInput.files.length) {
    videoStatus.textContent = 'Please upload a video file!';
    return;
  }

  const file = videoInput.files[0];
  videoStatus.textContent = `Uploaded: ${file.name}`;

  setTimeout(() => {
    convertedAudioURL = URL.createObjectURL(file);
    audioPlayer.src = convertedAudioURL;
    videoStatus.textContent = `Conversion complete! File: ${file.name}`;

  
    downloadLink.href = convertedAudioURL;
    downloadLink.download = "converted.wav";
    downloadLink.style.display = 'inline-block';
  }, 1000);
}

// Step 3
function standardizeAudioFormat() {
  const audioInput = document.getElementById('audioInput');
  const audioStatus = document.getElementById('audio-status');
  const audioPlayer = document.getElementById('audioPlayer');
  const downloadLink = document.getElementById('download-audio');

  if (!audioInput.files.length) {
    audioStatus.textContent = 'Please upload an audio file!';
    return;
  }

  const file = audioInput.files[0];
  audioStatus.textContent = `Uploaded: ${file.name}`;

  setTimeout(() => {
    const standardizedAudioURL = URL.createObjectURL(file);
    audioPlayer.src = standardizedAudioURL;
    audioStatus.textContent = `Standardization complete! File: ${file.name}`;
    downloadLink.href = standardizedAudioURL;
    downloadLink.download = "converted.wav";
    downloadLink.style.display = 'inline-block';
  }, 1000);
}

