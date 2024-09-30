import React from 'react';

const Body = () => {
  return (
    <main>
      <h2>How to use</h2>
      <p className="p-skinny">
        Use this to keep track of classmates and friends' contact information that you meet throughout the years. 
        To add a person, enter their name, email, phone number, age separated by commas and click submit. 
        To delete a classmate, enter the person's full name into the delete bar, then click delete. 
        To edit a classmate, enter their name, select what you want to edit, and enter the new value.
      </p>

      <h2>Add Classmates</h2>
      <form>
        <input type="text" id="yourname" placeholder="Name,email,phone,age" required />
        <button id="add-button" className="start-button" type="submit">Add</button>
      </form>

      <h2>My Classmates</h2>
      <table className="h-table" id="friend-list"></table>

      <h2>Delete Name</h2>
      <form>
        <input className="input-d" type="text" id="editname" placeholder="Name" required />
        <button id="delete-button" className="delete-button" type="submit">Delete</button>
      </form>

      <h2>Edit List</h2>
      <form className="form-signin">
        <input className="input-d" type="text" id="name-to-edit" placeholder="Name To Edit" required />
        <select id="edit-list">
          <option value="1">Name</option>
          <option value="2">Email</option>
          <option value="3">Phone</option>
          <option value="4">Grade</option>
        </select>
        <input className="input-d" type="text" id="new-value" placeholder="New Value" required />
        <button id="edit-button" className="signin-button" type="submit">Edit</button>
      </form>
    </main>
  );
};

export default Body;
