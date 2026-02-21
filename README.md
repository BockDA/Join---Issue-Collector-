JOIN – Kanban-Style Task Manager

JOIN is a collaborative web-based task manager inspired by the Kanban system. Developed using JavaScript, Firebase, HTML, and CSS, and extended with n8n automation, it enables users to visually manage tasks and automatically create tasks from incoming emails.

🎯 Project Description

Manage and organize your workflow with ease:

Create, edit, and delete tasks

Move tasks across different stages using drag-and-drop

Assign tasks to users and categories

Create tasks via email → automatically placed in Triage

Real-time data handling powered by Firebase

Automated workflows handled by n8n

Fully responsive design for desktop and mobile



🚀 Features

✅ Create and manage tasks manually in the UI

✅ Email-to-Task automation

Incoming emails are processed by n8n

Task data is extracted and written to Firebase

New tasks are automatically stored in the Triage column

✅ Organize tasks using drag-and-drop

✅ Assign categories and users to tasks

✅ Automated notifications via n8n

When a task is moved, the creator receives an email notification

✅ Real-time data sync with Firebase

✅ Responsive UI

✅ Smooth animations and transitions

⚙️ Automation Workflow (n8n)

The following automations are implemented:



📩 Email → Task Creation

Incoming email is received (e.g., via IMAP/Gmail trigger in n8n)

n8n extracts:

Title

Description

Sender (task creator)

n8n writes a new task document to Firebase

Task is automatically assigned to the Triage status


🔄 Task Movement → Notification

A task status change is detected (e.g., via webhook or Firebase trigger)

n8n identifies the task creator

An email notification is sent to the creator with the updated status


🛠️ Technologies Used

JavaScript (ES6+) – Frontend logic and interactivity

Firebase – Real-time database and backend services

n8n – Workflow automation (email parsing, Firebase integration, notifications)

HTML5 – Markup structure

CSS3 – Styling with Flexbox and Grid



🔗 Architecture Overview

Frontend (JOIN UI)
⬇
Firebase (Task storage & real-time sync)
⬇
n8n (Automation layer)

Email → Task → Firebase

Task status change → Email notification

Wenn du willst, ergänze ich dir noch:

📡 Webhook-Flow Beschreibung für dein Angular/JS Frontend

📄 Beispiel für das Firebase Task Schema

🧠 n8n Workflow JSON (Import ready)

Dann hast du eine komplette Dev-Doku für dein Repo.