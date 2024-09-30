# To-Do List Project - Assignment #2
https://a4-kennethsmith.glitch.me/ 
## Overview
This project is a customizable to-do list application that was initially created using JavaScript, CSS, and HTML. It has since been refactored and redesigned using **React** to provide a more modular and interactive interface. The application enables users to add, edit, and delete tasks while dynamically organizing them based on priority and deadlines.

## Features
- **Task Addition with Priority and Date Selection**:
  - When a new task is added, the user is prompted to assign a priority (1-5) and select a deadline using a calendar component.
  
- **Priority-Based Color Coding**:
  - Tasks are color-coded based on their assigned priority:
    - **Priority 1**: White
    - **Priority 2**: Purple
    - **Priority 3**: Pink
    - **Priority 4**: Blue
    - **Priority 5**: Red

- **Bold Text for Imminent Deadlines**:
  - If a task’s due date is within a week or less, the task is displayed in **bold** text to signify urgency.

- **Automated Task Sorting**:
  - Tasks are automatically sorted by priority, with higher priority tasks listed at the top.
  - If multiple tasks share the same priority, the one with the closest deadline is positioned first.

- **Task Editing and Deletion**:
  - Users can modify or remove tasks, providing complete flexibility in task management.

## Technology Used
- **React**: For creating a dynamic and component-based UI.
- **JavaScript, CSS, HTML**: Used in the original implementation and later integrated into the React structure.

## Purpose
This project demonstrates effective task management using React, combining intuitive UI elements and smart task prioritization strategies to enhance productivity and user experience.

## Development Experience Summary
Using React made development easier by allowing better organization of the code through components. It simplified handling features like task sorting and updating the UI. Managing state in React was also more straightforward compared to the original JavaScript version. The only downside was a small learning curve when switching to React.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Navigate into the project directory
      ```bash
    cd todo-list-project 

3. Install required dependencies:
   ```bash
    npm install

4. Start the application:
    ```bash
    npm run dev    