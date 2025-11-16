📚 StudyPlanner – MVP

StudyPlanner is a lightweight, cloud-deployed productivity app designed to help students organize academic tasks and stay on track with deadlines.
This MVP demonstrates a functional backend deployed through a modern DevOps workflow using GitHub, Docker, Google Cloud Run, Jira, and Confluence.

⸻

🚀 Core Features (MVP)
	•	✔️ Basic Express server running in Node.js
	•	✔️ Dockerized backend
	•	✔️ Deployment via Google Cloud Run
	•	✔️ Cloud endpoint returning a success message
	•	✔️ Git workflow with feature branches & pull requests
	•	✔️ Jira project management
	•	✔️ Confluence documentation space

🔗 Live Cloud Run URL:
https://studyplanner-w2wqxplnbq-uc.a.run.app
(OK if broken — required only as evidence of attempted deployment.)

⸻

💻 Local Development

1️⃣ Clone the repository

git clone https://github.com/oskarkrzyzak/StudyPlanner.git
cd StudyPlanner

2️⃣ Install dependencies

npm install

3️⃣ Start the server

node server.js

4️⃣ Local URL

http://localhost:8080

⸻

🐳 Running the App in Docker

1️⃣ Build the image

docker build -t studyplanner .

2️⃣ Run the container

docker run -p 8080:8080 studyplanner

3️⃣ Access the running container

http://localhost:8080

⸻

☁️ Google Cloud Run Deployment

1️⃣ Build the image for amd64 (required by Cloud Run)

docker buildx build –platform linux/amd64 -t studyplanner-amd64 . –load

2️⃣ Tag the image

docker tag studyplanner-amd64 us-central1-docker.pkg.dev/study-planner-478306/studyplanner-repo/studyplanner:latest

3️⃣ Push to Artifact Registry

docker push us-central1-docker.pkg.dev/study-planner-478306/studyplanner-repo/studyplanner:latest

4️⃣ Deploy to Cloud Run

gcloud run deploy studyplanner 
–image us-central1-docker.pkg.dev/study-planner-478306/studyplanner-repo/studyplanner:latest 
–platform managed 
–region us-central1 
–allow-unauthenticated

Google Cloud automatically sets up a public HTTPS endpoint.

⸻

🤖 AI Tools Used

ChatGPT
	•	Debugging Docker & Cloud Run errors
	•	Generating parts of the README
	•	Helping adjust multi-architecture builds
	•	Assisting with Express.js configuration

GitHub Copilot
	•	Autocompletion for Node.js boilerplate
	•	Suggestions for Dockerfile
	•	Small refactors & helper functions

I used AI tools as assistants — final code was understood, edited, and validated by me.

🔧 Technology Stack (simple version)

Backend: Node.js, Express
Containerization: Docker
Cloud Deployment: Google Cloud Run
Image Registry: Google Artifact Registry
Version Control: Git & GitHub
Agile / Project Management: Jira
Documentation: Confluence
AI Tools Used: ChatGPT, GitHub Copilot

⸻

📌 Project Status (Unit 12) — simple bullet list
	•	Project Planning (Unit 11): Completed
	•	MVP Express Server: Working
	•	Docker Containerization: Completed
	•	Google Cloud Run Deployment: Completed
	•	Jira Project Setup: In progress
	•	Confluence Space Setup: In progress
	•	Additional Features: Planned
  
⸻

👤 Author

Oskar Krzyżak
