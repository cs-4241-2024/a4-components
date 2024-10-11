import React, { useState, useEffect } from 'react';
import './App.css';

const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('/posts');
    if (response.ok) {
      const postsData = await response.json();
      setPosts(postsData);
    } else {
      console.error('Failed to fetch posts:', response);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blogMetaData = {
      title: newPost.title,
      content: newPost.content,
      wordCount: newPost.content.split(' ').length,
      publication_date: new Date().toLocaleString(),
    };

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        body: JSON.stringify(blogMetaData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setPosts([...posts, blogMetaData]);
        setNewPost({ title: '', content: '' });
      } else {
        console.error('Error submitting post:', response);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleDelete = async (title) => {
    try {
      const response = await fetch('/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.title !== title));
      } else {
        console.error('Failed to delete post:', response);
      }
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  const handleEdit = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].isEditing = true;
    setPosts(updatedPosts);
  };

  const handleSave = async (index) => {
    const post = posts[index];
    try {
      const response = await fetch('/update', {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const updatedPosts = [...posts];
        updatedPosts[index].isEditing = false;
        setPosts(updatedPosts);
      } else {
        console.error('Failed to update post:', response);
      }
    } catch (error) {
      console.error('There was a problem with the update operation:', error);
    }
  };

  const handleChange = (event, index, field) => {
    const updatedPosts = [...posts];
    updatedPosts[index][field] = event.target.value;
    setPosts(updatedPosts);
  };

  return (
    <div className="container">
      <h1>Blogpost.io</h1>
      <p>Welcome to Blogpost.io!</p>
      <section>
        <h2>Create a new post</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
                placeholder="Title"
              />
            </li>
            <li>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Content"
              />
            </li>
          </ul>
          <button type="submit">Submit</button>
        </form>
      </section>

      <section>
        <h2>Your Posts</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Word Count</th>
              <th>Time Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>
                  {post.isEditing ? (
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => handleChange(e, index, 'title')}
                    />
                  ) : (
                    post.title
                  )}
                </td>
                <td>
                  {post.isEditing ? (
                    <textarea
                      value={post.content}
                      onChange={(e) => handleChange(e, index, 'content')}
                    />
                  ) : (
                    post.content
                  )}
                </td>
                <td>{post.wordCount}</td>
                <td>{post.publication_date}</td>
                <td className="actions">
                  {post.isEditing ? (
                    <button onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(post.title)}>🗑️</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default BlogApp;
