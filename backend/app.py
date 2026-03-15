import os
import json
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
from google import genai
from google.genai import types
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_mock_response(language, error_msg, depth, tone):
    """Provides a realistic simulation if all AI providers are out of quota."""
    return {
        "1. Error Name": f"Potential {language} Syntax/Logic Exception",
        "2. Simple Explanation": f"[SIMULATED] Depth: {depth}, Tone: {tone}. You're seeing this because your AI API Quotas (OpenAI/Gemini/Groq) have been exceeded.",
        "3. Why This Error Happens": "The error message you pasted indicates an issue with how the code is structured or how data is being accessed at runtime.",
        "4. How to Fix It": "Check your API billing dashboards or top up your credits. For the code itself, ensure all variables are defined before use.",
        "5. Example Code Fix": f"// Simulated fix for {language} ({tone} tone)\nconsole.log('Ensure your API keys are active!');",
        "6. Prevention Tips": "Keep a small balance in your accounts or check API region availability.",
        "is_simulated": True
    }

def get_ai_response(language, error_msg, depth, tone):
    prompt_instruction = ""
    if depth == "beginner":
        prompt_instruction += "Keep the explanation extremely simple, avoid jargon. "
    elif depth == "senior":
        prompt_instruction += "Provide a deep dive into the underlying engine behavior or memory management. "
    
    if tone == "eli5":
        prompt_instruction += "Explain it like I am 5 years old. "
    elif tone == "pro":
        prompt_instruction += "Be extremely concise, professional, and skip any friendly greetings. "

    prompt = f"""You are an expert software engineer and programming mentor. {prompt_instruction}
Analyze the programming error below and explain it clearly for the user. 

Programming Language: {language}
Error Message: {error_msg}

Provide the output using this exact structure as a valid JSON object:
{{
  "1. Error Name": "Short name",
  "2. Simple Explanation": "Main clear explanation",
  "3. Why This Error Happens": "Technical reason",
  "4. How to Fix It": "Step by step fix",
  "5. Example Code Fix": "Corrected code snippet",
  "6. Prevention Tips": "How to avoid in future"
}}

IMPORTANT: Return ONLY the JSON object.
"""

    openai_key = os.environ.get("OPENAI_API_KEY")
    gemini_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    groq_key = os.environ.get("GROQ_API_KEY")

    # Debug: Print masked keys
    def mask_key(k):
        return f"{k[:8]}...{k[-4:]}" if k and len(k) > 12 else "NOT_SET"
    
    print(f"DEBUG: OpenAI Key: {mask_key(openai_key)}")
    print(f"DEBUG: Gemini Key: {mask_key(gemini_key)}")
    print(f"DEBUG: Groq Key:   {mask_key(groq_key)}")

    # 1. Try OpenAI
    if openai_key and len(openai_key) > 20:
        try:
            print(f"--- Attempting OpenAI (gpt-4o-mini) ---")
            client = OpenAI(api_key=openai_key)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                response_format={ "type": "json_object" },
                temperature=0.7,
                messages=[
                    {"role": "system", "content": "You are a helpful software debugging assistant."},
                    {"role": "user", "content": prompt}
                ]
            )
            print("SUCCESS: OpenAI request successful.")
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"ERROR: OpenAI Analysis Failed: {str(e)}")
            
    # 2. Try Gemini
    if gemini_key:
        for model_name in ['gemini-2.0-flash', 'gemini-1.5-flash']:
            try:
                print(f"--- Attempting Gemini ({model_name}) ---")
                client = genai.Client(api_key=gemini_key)
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(response_mime_type='application/json'),
                )
                print(f"SUCCESS: Gemini ({model_name}) request successful.")
                return json.loads(response.text)
            except Exception as e:
                print(f"ERROR: Gemini {model_name} Failed: {str(e)}")

    # 3. Try Groq (Llama 3)
    if groq_key:
        try:
            print(f"--- Attempting Groq (llama-3.3-70b-versatile) ---")
            client = Groq(api_key=groq_key)
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": "You are a helpful software debugging assistant that outputs ONLY JSON."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            print("SUCCESS: Groq request successful.")
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"ERROR: Groq Analysis Failed: {str(e)}")

    # 4. Final Fallback: Simulation Mode
    print("!!! CRITICAL: ALL AI PROVIDERS FAILED - ENTERING SIMULATION MODE !!!")
    return get_mock_response(language, error_msg, depth, tone)

@app.route('/explain-error', methods=['POST'])
def explain_error():
    try:
        data = request.json
        result = get_ai_response(
            data.get('language'), 
            data.get('error'),
            data.get('depth', 'standard'),
            data.get('tone', 'mentor')
        )
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host=host, port=port)
