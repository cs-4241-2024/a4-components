## Assignment 4: To Do List with Priorities

http://a4-sophia-kalavantis.glitch.me

For this project, I re-implemented my to-do list app from A2 using React components.
The main changes that I did were just breaking the original functionality into React components: App.js, TaskForm.js, TaskList.js, and Task.js.
Instead of manipulating the DOM like I did with the original main.js, React does all that work through the components, and the form elements are now inside TaskForm.js.
The index.html just has a simple div for React to render, and all DOM stuff is done by React now.

React gives a more structured way of organizing code but it hindered my development experience overall. The CSS that originally worked perfectly with HTML and JavaScript didn’t apply as well to the new components.
Also, more files are now in my codebase to essentially do the same tasks that I had before, which made the code more complex without really improving functionality.

