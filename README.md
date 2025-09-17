# MSALI7 - AI Photo Editor

Unleash your creativity with MSALI7, the intuitive AI-powered photo editor. Transform your images with simple text prompts—from adding whimsical accessories to changing entire backgrounds. Our clean, responsive interface makes photo editing effortless and fun. Powered by Google's cutting-edge Gemini model, your imagination is the only limit.

![MSALI7 Photo Editor Screenshot](https://storage.googleapis.com/aistudio-marketplace/project-broll/189d9804-9c59-450f-90e8-0731f202518e/0.png)

---

## ✨ Features

- **AI-Powered Editing**: Leverages the Gemini API to perform complex image edits from natural language instructions.
- **Intuitive UI**: A bright, clean, three-panel layout for easy "Original" vs. "Edited" comparison.
- **Drag & Drop Uploader**: Easily upload images by dragging them into the application or by clicking to browse.
- **Inspiration Suggestions**: A curated list of creative prompts to help spark ideas for your next edit.
- **Download Your Creations**: Save your edited images directly to your device with a single click.
- **Fully Responsive**: A seamless experience across desktop, tablet, and mobile devices.
- **Zero Backend Needed**: Runs entirely in the browser using the `@google/genai` SDK.

---

## 🚀 Getting Started

To run this project locally, follow these steps.

### Prerequisites

- A modern web browser.
- A Google Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/msali7-photo-editor.git
    cd msali7-photo-editor
    ```

2.  **Set up your API Key:**
    The application loads the Gemini API key from `process.env.API_KEY`. To provide this, you should create a `.env` file in the root of your project directory:
    
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```
    
    Replace `YOUR_GEMINI_API_KEY` with your actual key. The included `.gitignore` file will prevent this file from being committed to your repository.

3.  **Run the application:**
    Since this is a client-side application without a build step, you can run it using any simple local web server. One of the easiest ways is with the [Live Server extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

    Alternatively, you can use Python's built-in server:
    
    - **Python 3:**
      ```bash
      python -m http.server
      ```
    
    Once the server is running, open your browser and navigate to the provided local address (e.g., `http://localhost:8000`).

---

## 🔧 How to Use

1.  **Upload an Image**: Click the upload area or drag and drop an image file (PNG, JPG, or WEBP).
2.  **Provide an Instruction**: In the central control panel, type a prompt describing how you want to change the image (e.g., "Add a futuristic helmet").
3.  **Get Inspired (Optional)**: If you're unsure what to do, click on one of the suggestions like "Make it a vintage photograph" to auto-fill the prompt.
4.  **Generate**: Click the "Generate" button.
5.  **View and Download**: The AI-edited image will appear in the right-hand panel. Hover over it to reveal the download button.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)
- **Module Loading**: ES Modules with Import Maps (no bundler required)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.