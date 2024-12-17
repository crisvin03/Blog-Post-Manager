// Fetch and Display Posts
async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  // Display first 20 posts
  posts.slice(0, 20).forEach(post => {
    addPostToDOM(post, null); // Pass null for image as placeholders don't include images
  });
}

// Add New Post to the DOM
function addPostToDOM(post, imageURL) {
  const postsContainer = document.getElementById('posts');
  const postElement = document.createElement('div');
  postElement.className = 'post';
  postElement.id = `post-${post.id}`;
  postElement.innerHTML = `
    ${imageURL ? `<img src="${imageURL}" alt="${post.title}" class="post-image">` : ''}
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <div class="button-container" style="display: none;">
      <button class="edit-btn" onclick="editPost(${post.id})"></button>
      <button class="delete-btn" onclick="deletePost(${post.id})"></button>
    </div>
  `;
  postsContainer.appendChild(postElement);
}

// Show Success Message
function showSuccessMessage(message) {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerText = message;
  document.body.appendChild(successMessage);

  setTimeout(() => successMessage.remove(), 3000);
}

// Add New Post
document.getElementById('newPostForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const imageInput = document.getElementById('image');

  let imageURL = null;
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      imageURL = reader.result;
      const newPost = { id: Date.now(), title, body }; // Simulating ID with Date.now()
      addPostToDOM(newPost, imageURL);
      showSuccessMessage('Post added successfully!');
      document.getElementById('newPostForm').reset();
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    const newPost = { id: Date.now(), title, body }; // Simulating ID with Date.now()
    addPostToDOM(newPost, null);
    showSuccessMessage('Post added successfully!');
    document.getElementById('newPostForm').reset();
  }
});

// Edit Post
async function editPost(id) {
  const postElement = document.getElementById(`post-${id}`);
  const currentTitle = postElement.querySelector('h3').innerText;
  const currentBody = postElement.querySelector('p').innerText;

  const title = prompt('Enter new title:', currentTitle);
  const body = prompt('Enter new content:', currentBody);

  if (title && body) {
    // Simulate updating the post in the DOM
    postElement.querySelector('h3').innerText = title;
    postElement.querySelector('p').innerText = body;
    showSuccessMessage('Post updated successfully!');
  }
}

// Delete Post
async function deletePost(id) {
  const confirmation = confirm('Are you sure you want to delete this post?');

  if (confirmation) {
    // Simulate deleting the post from the DOM
    document.getElementById(`post-${id}`).remove();
    showSuccessMessage('Post deleted successfully!');
  }
}

// Toggle Views
document.getElementById('home-link').addEventListener('click', () => {
  document.getElementById('new-post-section').style.display = 'none';
  document.getElementById('posts-section').style.display = 'block';

  // Hide edit buttons
  const postElements = document.querySelectorAll('.post .button-container');
  postElements.forEach(buttonContainer => buttonContainer.style.display = 'none');
});

document.getElementById('add-new-post-link').addEventListener('click', () => {
  document.getElementById('new-post-section').style.display = 'block';
  document.getElementById('posts-section').style.display = 'none';
});

document.getElementById('edit-post-link').addEventListener('click', () => {
  document.getElementById('new-post-section').style.display = 'none';
  document.getElementById('posts-section').style.display = 'block';

  // Show edit buttons
  const postElements = document.querySelectorAll('.post .button-container');
  postElements.forEach(buttonContainer => buttonContainer.style.display = 'block');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the "Add New Post" section is visible when the page loads
  document.getElementById('new-post-section').style.display = 'block';
  document.getElementById('posts-section').style.display = 'none';

  fetchPosts();
});
