# CV Genius API

**AI-Powered Resume Review Backend**

CV Genius is a backend API that allows users to upload their resumes (PDF), analyzes them using OpenAI, and provides professional feedback. It also integrates Stripe for priority submissions and Twilio to send admin alerts — all packaged in a Dockerized, CI/CD-ready Node.js application.

---

## ✨ Features

- Upload PDF resume via `/api/review-resume`
- AI-generated feedback using OpenAI (or OpenRouter)
- Priority submission triggers Stripe checkout
- Admin SMS alerts via Twilio
- MongoDB database for storing feedback
- Fully Dockerized and tested
- Built for Postman-based QA testing

---

## 🛠 Tech Stack

- Node.js + Express
- MongoDB (local or Atlas)
- OpenAI (or OpenRouter)
- Stripe 
- Twilio 
- Docker + Docker Compose
- Postman 

---

## 📦 API Endpoints

### `POST /api/review-resume`
Uploads a resume for review.

**Form-Data Fields:**
- `name`: User's name (text)
- `email`: User's email (text)
- `priority`: `true` or `false` (text)
- `resume`: Resume file (PDF only)

**Responses:**
- If priority is `false`: returns AI feedback
- If priority is `true`: returns Stripe Checkout URL

---

### `GET /api/review-status/:email`
Check status of analysis for a given email.

---

## 🐳 Running Locally with Docker

1. Create `.env` file at root:
```
MONGO_URI=mongodb://mongo:27017/cvgenius
PORT=5000
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_twilio_number
ADMIN_PHONE_NUMBER=your_verified_number
STRIPE_SECRET_KEY=sk_test_...
CLIENT_DOMAIN=https://postman.com/success
OPENROUTER=true
OPENROUTER_API_KEY=your_key
OPENAI_API_KEY=your_key
```

2. Run:
```bash
docker-compose up --build
```

3. Open Postman and test:
- `POST http://localhost:5000/api/review-resume`
- Use `form-data` with fields: `name`, `email`, `priority`, `resume (PDF)`

---

## 📤 Deployment Ready

This API can be deployed to Render (Node or Docker).
- Connect GitHub repo
- Set environment variables in dashboard
- Start command: `node src/app.js`
- Optional: use GitHub Actions for CI/CD

---

## 📌 Notes


- Stripe Checkout is used in test mode only
- Admin SMS works only to verified numbers in Twilio trial mode

---

## 📄 License

MIT — use, fork, or adapt for your own project.

> Built as a portfolio project to showcase real-world backend, QA, and DevOps skills.