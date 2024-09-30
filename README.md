## Laptop Loan Tracker

Christian Rua http://a4-christianr839.glitch.me

***Recreation of A2, so there are no login or database features.***

This project is a simple form that allows an IT desk to keep track of laptops that are on loan. Users fill out a form indicating the ID number of the laptop and the name of the individual it's being loaned to and their information will be stored server-side and displayed in the table.

There are two rules regarding laptop IDs: Only positive integers are allowed and there can be no duplicates. The application will provide a warning if either of these occur (if you insert a decimal, the floor of that value will be used).

If multiple clients are in use at the same time, the user may select the "pull from server" button to retrieve any data that is stored on the server. Additionally, the table sorts itself and has an additional column to flag any people who appear more than once in the table (this is not case-sensitive).

I used a flexbox column for my UI positioning as well as colors from an Adobe color wheel.

I chose to rebuild this website using React since that is what my final project group is using and I wanted some additional practice with it. Overall, I do like React but I think that the process would have been better if the app was built from the ground-up with React in mind. Some of the solutions that I implemented initially felt clunky in the new framework. If I were to do it again, for example, I would have bound the table to the UI element rather than doing a full refresh. The only constraint here was time.