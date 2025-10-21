# # orchestrator.py

# from agents.jd_agent import analyze_jd
# from agents.resume_agent import analyze_resume
# from agents.match_evaluator import evaluate_match

# def extract_score(response: str) -> int:
#     import re

#     # Try multiple possible patterns that Gemini may return
#     patterns = [
#         r"(?i)Match Score[:\-]?\s*(\d+)",      # Match Score: 95
#         r"\*\*(\d{1,3})\/100\*\*",             # **95/100**
#         r"(\d{1,3})\/100"                      # 95/100
#     ]

#     for p in patterns:
#         match = re.search(p, response)
#         if match:
#             score = int(match.group(1))
#             # Keep it within 0–100
#             return min(max(score, 0), 100)

#     # Default fallback
#     return 0


# def run_ai_match(jd_text: str, resume_text: str) -> dict:
#     """
#     Runs the full analysis and returns only aiMatchScore and aiFeedback.
#     """
#     jd_result = analyze_jd(jd_text)
#     jd_summary = jd_result["raw_response"]

#     resume_result = analyze_resume(resume_text)
#     resume_summary = resume_result["raw_response"]

#     match_result = evaluate_match(jd_summary, resume_summary)
#     match_summary = match_result["raw_response"]

#     return {
#         "aiMatchScore": extract_score(match_summary),
#         "aiFeedback": match_summary.strip()
#     }


from services.llm import ask_gemini
from agents.jd_agent import analyze_jd
from agents.resume_agent import analyze_resume
from agents.match_evaluator import evaluate_match

def extract_score(response: str) -> int:
    import re
    patterns = [
        r"(?i)Match Score[:\-]?\s*(\d+)",
        r"\*\*(\d{1,3})\/100\*\*",
        r"(\d{1,3})\/100"
    ]
    for p in patterns:
        match = re.search(p, response)
        if match:
            return min(max(int(match.group(1)), 0), 100)
    return 0


def shorten_feedback_as_json(full_feedback: str) -> dict:
    import re

    # Match score
    score_match = re.search(r"(?i)(\d{1,3})\/100", full_feedback)
    score = score_match.group(1) if score_match else "?"

    # Matching skills
    matching_block = re.findall(r"\*\*Matching Skills:\*\*\s*((?:\*.+\n)+)", full_feedback)
    matching_skills = [s.strip("* ").strip() for s in matching_block[0].strip().split("\n")] if matching_block else []

    # Missing skills
    missing_block = re.findall(r"\*\*Missing Skills.*?:\*\*\s*((?:\*.+\n)+)", full_feedback)
    missing_skills = [s.strip("* ").strip() for s in missing_block[0].strip().split("\n")] if missing_block else []

    # Recommendation
    recommendation_match = re.search(r"(?i)Hiring Recommendation\s*\n(.+)", full_feedback)
    recommendation = recommendation_match.group(1).strip() if recommendation_match else "No recommendation found."

    return {
        "matchScoreSummary": f"{score}/100",
        "matchingSkills": matching_skills,
        "missingSkills": missing_skills,
        "recommendation": recommendation
    }




def run_ai_match(jd_text: str, resume_text: str) -> dict:
    jd_result = analyze_jd(jd_text)
    jd_summary = jd_result["raw_response"]

    resume_result = analyze_resume(resume_text)
    resume_summary = resume_result["raw_response"]

    match_result = evaluate_match(jd_summary, resume_summary)
    match_summary = match_result["raw_response"]

    return {
        "aiMatchScore": extract_score(match_summary),
        "aiFeedback": shorten_feedback_as_json(match_summary)
    }
