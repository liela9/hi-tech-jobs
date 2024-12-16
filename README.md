# Hi-Tech Jobs

A web application designed to help job-seekers search for development roles and manage their recruitment processes efficiently. Initially built for personal use, this tool is now open for anyone looking to simplify their job search journey.

![image](https://github.com/user-attachments/assets/ea48b3c2-8958-47ad-9524-554fdfff4379)

## Features

- **Real-time updates:** Fetch the latest job postings with the push of a button.
- **Personalized list:** Answer a few simple questions (e.g., experience level, job category) to display relevant postings only
- **Interactive roles table:**
  - Filter jobs based on criteria.
  - Edit job details directly in the table.


## **Acknowledgment**

This project utilizes dynamic job-posting data from the [TechMap project](https://github.com/mluggy/techmap/tree/main/jobs). A big thank you to @mluggy for sharing this valuable resource with the community!


## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL database set up


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/liela9/hi-tech-jobs.git
   cd hi-tech-jobs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the app:
   ```bash
   npm run build
   ```

### Run
1. Launch the app:
   ```bash
   npm run {dev|start}
   ```
2. Open the app in your browser at:
   [http://localhost:3000](http://localhost:3000)


## Tech Stack
- **Frontend:** Next.js, React, Shadcn, TailwindCSS
- **Backend:** Node.js, TypeScript
- **Database:** PostgreSQL
- **Others:** WebSocket, ESLint


## Future Development

### TODOs
- Add Docker image with Postgres & Node pre-configured to launch the program easily
- Run with `npm run start`
- In "Submitted Jobs": fetch all submitted jobs, not just based on current keyword filter

### New Features
- **Location-based search:** Find jobs relevant to your location.
- **Add your own jobs:** Insert custom job postings.
- **Incorporating descriptions:** Scraping job description info and using an LLM to classify relevancy

**Suggestions Welcome!** Feel free to contribute ideas or improvements.

