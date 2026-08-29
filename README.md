# ACM ITU Student Chapter — Website

## Project Structure

```
/
├── frontend/                   # All UI — HTML, CSS, JS
│   ├── index.html              # Landing page
│   ├── public/                 # Static assets (images, icons, fonts)
│   │   └── ACM_logo.png
│   └── pages/
│       ├── auth/
│       │   └── auth.html       # Login + Signup (single page, slide transition)
│       └── legal/
│           ├── terms.html      # Terms of Service
│           └── privacy.html    # Privacy Policy
│
├── backend/                    # Server-side code (Node/Express — coming soon)
│   └── src/
│       ├── routes/             # API route definitions
│       ├── controllers/        # Business logic
│       ├── models/             # Database models
│       ├── middleware/         # Auth, validation, error handling
│       └── config/             # DB config, env, constants
│
└── README.md
```

## Tech Stack (Planned)
- **Frontend:** HTML, CSS, Vanilla JS → React (future)
- **Backend:** Node.js + Express
- **Database:** MongoDB / PostgreSQL (TBD)
- **Auth:** JWT-based authentication

## Getting Started
Open `frontend/index.html` in a browser to view the landing page.
