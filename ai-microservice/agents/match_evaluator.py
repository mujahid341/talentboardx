# agents/match_evaluator.py

from services.llm import ask_gemini

def evaluate_match(jd_summary: str, resume_summary: str) -> dict:
    """
    Compare JD and Resume summaries, return match score and analysis.
    """
    prompt = f"""
You are a recruitment AI assistant.

Compare the following Job Description summary and Resume summary.

1. Give a Match Score out of 100.
2. List matching skills and missing skills.
3. Provide a short analysis of strengths and weaknesses.
4. End with a 2-line hiring recommendation.

---

**Job Description Summary**
{jd_summary}

---

**Resume Summary**
{resume_summary}

---

Format your output clearly with sections.
"""

    result = ask_gemini(prompt)

    return {
        "raw_response": result
    }
