# Neel Patel Portfolio

A premium, responsive, JSON-first personal portfolio website for showcasing Python, Machine Learning, Data Science, internships, education, certificates, achievements, and project work.

This portfolio is built with **HTML5**, **CSS3**, and **vanilla JavaScript**. All major content is managed through JSON files, so profile details, skills, projects, experience, education, certificates, achievements, and social links can be updated without changing the main HTML structure.

## Overview

This project is designed as a professional portfolio for:

- Python development
- Machine Learning
- Data Science
- Data Analysis
- Web Development
- Internship and academic profile presentation

The UI uses a modern dark theme, glass-style cards, responsive layouts, scroll reveal animations, project detail modals, certificate previews, and recruiter-friendly content hierarchy.

## Features

- JSON-first content architecture
- Fully responsive layout for mobile, tablet, and desktop
- Dynamic project cards loaded from `projects.json`
- Project detail modal with gallery support
- Dynamic skills grouped by category
- Dynamic experience timeline
- Dynamic education cards
- PNG certificate preview cards with in-page modal viewing
- Achievement cards with image preview and modal viewing
- Contact section with email, LinkedIn, and GitHub links
- Resume view/download button
- Smooth animations and professional hover effects
- Fallback UI for missing images or empty data
- Easy future customization through JSON only

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- JSON
- Responsive CSS Grid and Flexbox

## Project Structure

```text
portfolio/
  index.html
  style.css
  script.js
  README.md
  data/
    profile.json
    skills.json
    projects.json
    experience.json
    education.json
    certificates.json
    achievements.json
    socials.json
  assets/
    images/
    certificates/
    project-media/
    resume/
```

## Run Locally

This portfolio loads JSON files using JavaScript `fetch()`. Because of browser security rules, open the website through a local server instead of opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

VS Code Live Server can also be used.

## JSON Content Files

| File | Purpose |
| --- | --- |
| `data/profile.json` | Name, role, bio, location, resume, CTA buttons, profile image |
| `data/skills.json` | Skill groups and skill chips |
| `data/projects.json` | Project cards, project details, tech stack, screenshots, videos, links |
| `data/experience.json` | Internship and work experience timeline |
| `data/education.json` | Academic history |
| `data/certificates.json` | PNG certificate previews and modal images |
| `data/achievements.json` | Awards, hackathons, recognitions, achievement images |
| `data/socials.json` | Email, LinkedIn, GitHub, and other social links |

## Add A New Project

Add a new object to `data/projects.json`:

```json
{
  "title": "Customer Churn Prediction",
  "category": "Machine Learning",
  "shortDescription": "A model that predicts customer churn from structured customer behavior data.",
  "detailedDescription": "Explain the dataset, preprocessing, model, metrics, result, and what you learned.",
  "techStack": ["Python", "Pandas", "Scikit-learn"],
  "features": ["Data cleaning", "Feature engineering", "Model evaluation"],
  "mainImage": "assets/project-media/churn-main.png",
  "mediaGallery": [
    {
      "type": "image",
      "title": "Confusion Matrix",
      "url": "assets/project-media/churn-confusion-matrix.png",
      "alt": "Customer churn model confusion matrix"
    }
  ],
  "outputScreenshots": ["assets/project-media/churn-confusion-matrix.png"],
  "demoVideo": "",
  "liveDemoLink": "",
  "githubLink": "https://github.com/your-username/project",
  "status": "Completed",
  "highlight": true
}
```

Place project images and videos inside:

```text
assets/project-media/
```

## Add A Certificate

Certificates are image-based. Save the certificate as a PNG inside `assets/certificates/`, then add an object to `data/certificates.json`:

```json
{
  "title": "Introduction to HTML, CSS, & JavaScript",
  "issuer": "Coursera / Platform Name",
  "date": "2024",
  "imageUrl": "assets/certificates/html-css-js.png",
  "credentialUrl": "",
  "description": "Completed foundational training in frontend web technologies."
}
```

The same `imageUrl` is used for the card preview and the full in-page modal view.

## Add An Achievement

Save the achievement image as a PNG, then add an object to `data/achievements.json`:

```json
{
  "title": "Hackathon Winner",
  "subtitle": "RE-INNOVATE: The Retail & Move the Market",
  "date": "2024",
  "imageUrl": "assets/certificates/LDCE.png",
  "description": "Recognized for contributing to a winning hackathon solution.",
  "highlight": true
}
```

The image appears on the achievement card and opens larger in a modal.

## Update Experience

Add or remove internship objects in `data/experience.json`:

```json
{
  "company": "Company Name",
  "role": "Internship Role",
  "duration": "June 2024 - August 2024",
  "location": "Ahmedabad",
  "details": [
    "Describe your work clearly.",
    "Mention tools, learning, and outcomes.",
    "Keep bullet points concise and recruiter-friendly."
  ]
}
```

## Update Education

Add or remove education objects in `data/education.json`:

```json
{
  "institution": "Institution Name",
  "degree": "Degree or Program",
  "duration": "January 2022 - April 2025",
  "status": "Completed"
}
```

Education cards display in a clean two-column layout on desktop and stack on smaller screens.

## Update Skills

Edit `data/skills.json`:

```json
{
  "category": "Programming",
  "items": ["Python", "JavaScript", "PHP Basics"]
}
```

Skill categories display in a four-column grid on desktop, two columns on tablet, and one column on mobile.

## Update Resume

Place your resume PDF here:

```text
assets/resume/neel-patel-resume.pdf
```

Or update the `resumeUrl` value in `data/profile.json`.

## Update Social Links

Edit `data/socials.json`:

```json
{
  "platform": "GitHub",
  "label": "github.com/Neel-Patel-0109",
  "url": "https://github.com/Neel-Patel-0109",
  "icon": "github"
}
```

## Deployment

This is a static website and can be hosted on:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any static hosting provider

For GitHub Pages, upload the repository and enable Pages from the repository settings.

## Notes

- Do not open `index.html` directly if JSON content does not load.
- Use a local server during development.
- Keep image paths accurate in JSON files.
- Use PNG images for certificates and achievements.
- Replace demo projects with real projects before sharing the portfolio professionally.

## Author

**Neel Patel**  
Python Developer | Machine Learning | Data Science  
Greater Ahmedabad Area

- Email: `neelpatel0179@gmail.com`
- LinkedIn: [linkedin.com/in/neelpatel0109](https://www.linkedin.com/in/neelpatel0109)
- GitHub: [github.com/Neel-Patel-0109](https://github.com/Neel-Patel-0109)
