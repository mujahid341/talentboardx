# agents/jd_agent.py

from services.llm import ask_gemini

def analyze_jd(jd_text: str) -> dict:
    """
    Analyze the Job Description using Gemini and return structured info.
    """
    prompt = f"""
You are an expert HR assistant.

Analyze the following Job Description and extract the following:
1. Job Title
2. Key Responsibilities (bullet points)
3. Required Skills (bullet points)
4. Preferred Experience (bullet points)

Return it in clearly labeled sections.

Job Description:
\"\"\"
{jd_text}
\"\"\"
"""
    result = ask_gemini(prompt)

    return {
        "raw_response": result
    }
