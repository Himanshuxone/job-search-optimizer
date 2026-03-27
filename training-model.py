import os
import json
import requests
import numpy as np
import PyPDF2
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from flask import Flask, request, jsonify

app = Flask(__name__)

# --- CONFIGURATION ---
# 1. Load the lightweight "Brain" (runs on CPU)
print("Loading AI Model...")
model = SentenceTransformer('all-MiniLM-L6-v2')

# 2. In-Memory "Database" for jobs
JOB_MARKET_DB = []
JOB_VECTORS = []

# --- CORE FUNCTIONS ---

def extract_text_from_pdf(pdf_file):
    """Simple PDF parser"""
    reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def fetch_market_jobs(query="software engineer", location="UK"):
    """
    Fetches LIVE jobs from the market. 
    Replace APP_ID and APP_KEY with your free Adzuna credentials.
    """
    APP_ID = os.getenv("ADZUNA_APP_ID", "YOUR_ID_HERE") 
    APP_KEY = os.getenv("ADZUNA_APP_KEY", "YOUR_KEY_HERE")
    
    url = f"https://api.adzuna.com/v1/api/jobs/gb/search/1"
    params = {
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'results_per_page': 20,
        'what': query,
        'where': location,
        'content-type': 'application/json'
    }
    
    try:
        response = requests.get(url, params=params)
        data = response.json()
        jobs = []
        for item in data.get('results', []):
            jobs.append({
                'id': item.get('id'),
                'title': item.get('title'),
                'company': item.get('company', {}).get('display_name'),
                'description': item.get('description'),
                'url': item.get('redirect_url')
            })
        return jobs
    except Exception as e:
        print(f"Error fetching jobs: {e}")
        return []

def update_vector_store(new_jobs):
    """
    'Trains' the model by updating the vector space with new job data.
    """
    global JOB_MARKET_DB, JOB_VECTORS
    
    if not new_jobs:
        return
    
    # Add new jobs to DB
    JOB_MARKET_DB.extend(new_jobs)
    
    # Create embeddings (The "AI" part)
    descriptions = [j['title'] + " " + j['description'] for j in new_jobs]
    new_vectors = model.encode(descriptions)
    
    # Update Vector Index
    if len(JOB_VECTORS) == 0:
        JOB_VECTORS = new_vectors
    else:
        JOB_VECTORS = np.vstack([JOB_VECTORS, new_vectors])
    
    print(f"Model updated! Total jobs in market memory: {len(JOB_MARKET_DB)}")

# --- API ENDPOINTS ---

@app.route('/update-market', methods=['POST'])
def trigger_update():
    """Endpoint to trigger a market refresh (The 'Training' step)"""
    query = request.json.get('query', 'developer')
    location = request.json.get('location', 'London')
    
    jobs = fetch_market_jobs(query, location)
    update_vector_store(jobs)
    
    return jsonify({"status": "success", "jobs_added": len(jobs)})

@app.route('/match-resume', methods=['POST'])
def match_resume():
    """Upload a resume to find matches"""
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file provided"}), 400
        
    file = request.files['resume']
    resume_text = extract_text_from_pdf(file)
    
    # 1. Embed the Resume
    resume_vector = model.encode([resume_text])
    
    # 2. Semantic Search (Cosine Similarity)
    if len(JOB_VECTORS) == 0:
        return jsonify({"message": "Market data is empty. Call /update-market first."})
        
    scores = cosine_similarity(resume_vector, JOB_VECTORS)[0]
    
    # 3. Rank Results
    top_indices = np.argsort(scores)[::-1][:5] # Top 5
    
    results = []
    for idx in top_indices:
        job = JOB_MARKET_DB[idx]
        results.append({
            "title": job['title'],
            "company": job['company'],
            "match_score": f"{float(scores[idx])*100:.1f}%",
            "link": job['url']
        })
        
    return jsonify({"matches": results})

if __name__ == "__main__":
    # Pre-load some dummy data on startup if API keys aren't set
    if not os.getenv("ADZUNA_APP_ID"):
        print("No API Key found. Loading dummy data...")
        dummy_jobs = [
            {"id": "1", "title": "Python Developer", "company": "TechCorp", "description": "Looking for python and AI skills.", "url": "#"},
            {"id": "2", "title": "Marketing Manager", "company": "BizLt", "description": "SEO and sales focus.", "url": "#"}
        ]
        update_vector_store(dummy_jobs)
        
    app.run(host='0.0.0.0', port=5000)