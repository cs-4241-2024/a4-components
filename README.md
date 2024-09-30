# Task Tracker Application

**Hosted at**: [Task Tracker](https://a4-yourname.glitch.me)

## Overview

The **Assignment Tracker** allows users to create or delete tasks. The client side is reimplemented using react. 
## Goals of the Application

- **User Authentication**: Users can log in using either GitHub OAuth or a sign up for an account.
- **Task Management**: Users can create and delete their tasks, which are stored in a MongoDB database for persistence between sessions.
- **React**: The frontend was reimplented with React components- **Security**: Data is securely handled as sessions are being maintained using Passport.js.

## Features

1. **User Authentication**:

   - Users can log in via **GitHub OAuth** or **locally**.
   - New users can sign up, and returning users can log in and manage their tasks.

2. **Task Management**:

   - **Add Tasks**: Users can create tasks and give them a priority level (High/Low).
    - **Delete Tasks**: Users can remove tasks by clicking the delete button.

3. **Persistent Data Storage**:

   - The tasks are all saved in **MongoDB**, so data is stored between sessions and be accessed by any device that connects to the website.

4. **Responsive Design**:
   - The user interface is responsive and simplistic to help users easily navigate and use the site its purpose but still designed with intent.

5. **React based ui**:
   - Front end was reimplemented using React and components such as TaskForm, TaskRow, and TaskTracker. It is also set up to use client-based routing 
   between login, sign up, and tracker.
