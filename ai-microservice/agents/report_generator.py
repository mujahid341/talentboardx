# agents/report_generator.py

def generate_final_report(candidate_name: str, job_title: str, match_score: int, evaluation_text: str) -> str:
    """
    Format the match results into a clean, final report.
    """
    return f"""
===============================
📄 Candidate Match Report
===============================

👤 Candidate: {candidate_name}
🧑‍💼 Applied For: {job_title}
✅ Match Score: {match_score}/100

---

📝 Evaluation Summary:
{evaluation_text.strip()}

---

📌 Verdict:
Based on the AI analysis, {candidate_name} is a {"strong" if match_score >= 85 else "moderate"} fit for the {job_title} role.

"""
