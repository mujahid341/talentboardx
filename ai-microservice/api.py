# api.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from orchestrator import run_ai_match
import fitz  # PyMuPDF
import json

app = FastAPI()

# Allow frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(uploaded_file: UploadFile) -> str:
    """
    Extracts plain text from a PDF file using PyMuPDF.
    """
    pdf_bytes = uploaded_file.file.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text.strip()


@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job: str = Form(...)
):
    try:
        # Parse JD object from JSON string
        job_obj = json.loads(job)
        jd_text = job_obj.get("description", "") + "\n\n" + "Skills: " + ", ".join(job_obj.get("skills", []))
        
        # Read resume PDF
        resume_text = extract_text_from_pdf(resume)

        # Call AI pipeline
        result = run_ai_match(jd_text, resume_text)

        return JSONResponse(content=result)
    
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Something went wrong: {str(e)}"}
        )
