# agents/resume_agent.py

from services.llm import ask_gemini

def analyze_resume(resume_text: str) -> dict:
    """
    Analyze the resume and return structured data using Gemini.
    """
    prompt = f"""
You are an expert HR assistant.

Analyze the following RESUME and extract:
1. Candidate Name (if available)
2. Total Years of Experience
3. List of Technical Skills (bullet points)
4. Past Roles and Companies (bullet points)
5. Education Summary (bullet points)

Resume:
\"\"\"
{resume_text}
\"\"\"
"""
    result = ask_gemini(prompt)

    return {
        "raw_response": result
    }
