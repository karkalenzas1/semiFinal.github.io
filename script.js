// Define a simple username and password for demonstration purposes
const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

// Check if the admin is already logged in
let isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

// Function to show or hide login and post forms based on login status
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const postForm = document.getElementById('post-form');
    const adminPosts = document.getElementById('admin-posts');

    if (isLoggedIn) {
        loginForm.style.display = 'none';
        postForm.style.display = 'block';
        toggleAdminPosts();
    } else {
        loginForm.style.display = 'block';
        postForm.style.display = 'none';
        adminPosts.style.display = 'none';
    }
}

// Function to handle the login process
function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    // Check if the entered credentials match the predefined admin credentials
    if (usernameInput === adminCredentials.username && passwordInput === adminCredentials.password) {
        // Set the login status in local storage
        localStorage.setItem('adminLoggedIn', 'true');
        
        // Update the UI
        isLoggedIn = true;
        toggleForms();
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

// Function to handle the logout process
function logout() {
    // Clear the login status in local storage
    localStorage.removeItem('adminLoggedIn');

    // Update the UI
    isLoggedIn = false;
    toggleForms();
}

// Function to show or hide the admin posts section
function toggleAdminPosts() {
    const adminPostsDiv = document.getElementById('admin-posts');
    adminPostsDiv.style.display = isLoggedIn ? 'block' : 'none';

    if (isLoggedIn) {
        loadAdminPosts();
    }
}

// Function to load and display admin posts
function loadAdminPosts() {
    var adminPostsContainer = document.getElementById('admin-posts-container');
    adminPostsContainer.innerHTML = '';

    // Retrieve posts from local storage
    var existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // Display each post with edit and delete options
    existingPosts.forEach(function(post, index) {
        var postDiv = document.createElement('div');
        postDiv.className = 'post';

        var postText = document.createElement('p');
        postText.textContent = post.content;

        var timestamp = document.createElement('span');
        timestamp.textContent = ' - ' + post.timestamp;

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editAdminPost(index);
        };

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteAdminPost(index);
        };

        postDiv.appendChild(postText);
        postDiv.appendChild(timestamp);
        postDiv.appendChild(editButton);
        postDiv.appendChild(deleteButton);

        adminPostsContainer.appendChild(postDiv);
    });
}

// Function to edit an admin post
function editAdminPost(index) {
    var existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    var updatedContent = prompt('Edit your post:', existingPosts[index].content);

    if (updatedContent !== null) {
        existingPosts[index].content = updatedContent;

        // Save the updated posts array to local storage
        localStorage.setItem('posts', JSON.stringify(existingPosts));

        // Reload admin posts
        loadAdminPosts();
    }
}

// Function to delete an admin post
function deleteAdminPost(index) {
    var existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    existingPosts.splice(index, 1);

    // Save the updated posts array to local storage
    localStorage.setItem('posts', JSON.stringify(existingPosts));

    // Reload admin posts
    loadAdminPosts();
}

// Function to add a post
function addPost() {
    var postContent = document.getElementById('post-content').value;

    if (postContent.trim() !== '') {
        // Save the post to local storage
        savePost(postContent);

        // Clear the input field
        document.getElementById('post-content').value = '';
    }
}

// Function to save a post to local storage
function savePost(postContent) {
    // Retrieve existing posts from local storage or initialize an empty array
    var existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // Create a new post object
    var newPost = {
        content: postContent,
        timestamp: new Date().toLocaleString()
    };

    // Add the new post to the beginning of the array
    existingPosts.unshift(newPost);

    // Save the updated posts array to local storage
    localStorage.setItem('posts', JSON.stringify(existingPosts));

    // Reload admin posts if logged in
    if (isLoggedIn) {
        loadAdminPosts();
    }
}

// Function to load and display user posts
function loadUserPosts() {
    var postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    // Retrieve posts from local storage
    var existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // Display each post in the user interface
    existingPosts.forEach(function(post) {
        var postDiv = document.createElement('div');
        postDiv.className = 'post';

        var postText = document.createElement('p');
        postText.textContent = post.content;

        var timestamp = document.createElement('span');
        timestamp.textContent = ' - ' + post.timestamp;

        postDiv.appendChild(postText);
        postDiv.appendChild(timestamp);

        postsContainer.appendChild(postDiv);
    });
}

// Initialize the UI based on login status
toggleForms();

// Load admin posts on page load if logged in
if (isLoggedIn) {
    loadAdminPosts();
}



