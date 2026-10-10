# JOIN – Kanban style task manager

JOIN is a collaborative web-based task manager inspired by the Kanban system. Developed using JavaScript, Firebase, HTML, and CSS, and extended with n8n automation, it enables users to visually manage tasks and automatically create tasks from incoming emails.

## 🎯 Project Description

Manage and organize your workflow with ease:

- Create, edit, and delete tasks
- Move tasks across different stages using drag-and-drop
- Assign tasks to users and categories
- Create tasks via email → automatically placed in Triage
- Data storage via Firebase Realtime Database (REST API)
- Automated workflows handled by n8n
- Fully responsive design for desktop and mobile

## 🚀 Features

- ✅ Create and manage tasks manually in the UI
- ✅ Email-to-task automation
  - Incoming emails are processed by n8n
  - Task data is extracted and written to Firebase
  - New tasks are automatically stored in the Triage column
- ✅ Organize tasks using drag and drop (desktop) or the "Move to" menu (mobile)
- ✅ Board columns: Triage, To do, In progress, Await feedback, Done
- ✅ Assign categories and users to tasks
- ✅ Automated notifications via n8n
  - When a task is moved, the creator receives an email notification
- ✅ Responsive UI
- ✅ Smooth animations and transitions

## ⚙️ Automation Workflow (n8n)

The following automations are implemented. The exported workflow can be found in [`n8n/JoinDAn8n.json`](n8n/JoinDAn8n.json).

### 📩 Email → Task Creation

1. Incoming email is received (e.g., via IMAP/Gmail trigger in n8n)
2. n8n extracts:
   - Title
   - Description
   - Sender (task creator)
3. n8n writes a new task document to Firebase
4. Task is automatically assigned to the Triage status

### 🔄 Task Movement → Notification

1. A task is moved to another column on the board
2. The frontend calls an n8n webhook with the task data
3. n8n identifies the task creator
4. An email notification is sent to the creator with the updated status

## 🛠️ Technologies Used

- **JavaScript (ES6+)** – Frontend logic and interactivity
- **Firebase Realtime Database** – Data storage, accessed via REST API (`fetch`)
- **n8n** – Workflow automation (email parsing, Firebase integration, notifications)
- **HTML5** – Markup structure
- **CSS3** – Styling with Flexbox and Grid

## 🔗 Architecture Overview

```text
Frontend (JOIN UI)
        ⬇
Firebase (Task storage)
        ⬇
n8n (Automation layer)
```

- Email → Task → Firebase
- Task status change → Email notification

## ▶️ Getting Started

The project uses plain HTML, CSS and JavaScript – no build step and no package installation is required.

1. Clone the repository.
2. Create the file `scripts/data.js`. It is listed in `.gitignore` and therefore not part of the repository, because it contains the project-specific URLs:

   ```js
   const Base_URL = "https://<your-project>.firebasedatabase.app/";
   const urln8n = "https://<your-n8n-instance>/webhook/";
   ```

3. Open `index.html` in the browser, preferably via a local web server (e.g. the VS Code extension "Live Server").
