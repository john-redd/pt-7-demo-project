const baseURL = "http://localhost:4000";

const userIDInput = document.getElementById("user-id");

async function createPost() {
  const titleVal = document.getElementById("title").value;
  const bodyVal = document.getElementById("body").value;
  const imgURLVal = document.getElementById("img-url").value;
  const userIDVal = parseInt(userIDInput.value, 10);

  const payload = {
    title: titleVal,
    body: bodyVal,
    imgURL: imgURLVal,
    userID: userIDVal,
  };

  await axios.post(`${baseURL}/api/posts`, payload);

  // 1. Array of post objects
  // Update the DOM with all posts

  // 2. Singular new post object
  // Update the DOM with just this one new post

  alert("Successfully create post!");
}

const createPostButton = document.querySelector("#create-post-button");
createPostButton.addEventListener("click", createPost);

function getUserIDFromURLForHiddenInput(){
  const urlSearchParams = new URLSearchParams(window.location.search)
  let userID = urlSearchParams.get('userID')

  userIDInput.value = userID
}

getUserIDFromURLForHiddenInput()

async function getPosts(){
  try {
    const response = await axios.get(`${baseURL}/api/posts`);

    renderPosts(response.data)
  } catch (error) {
    alert('An unexpected error has occured, please try again later.')
  }
}

getPosts()

function renderPosts(posts){
  const postsContainer = document.getElementById('posts-container')

  console.log(postsContainer)

  const postsHTML = posts.map(createPostHTML).join('')

  console.log(postsHTML)

  postsContainer.innerHTML = postsHTML
}

function createPostHTML(post){
  return `
    <div class="post">
      <p>${post.title}</p>
      <p>${post.body}</p>
      <p>Post by <span class="user-email">${post.email}</span></p>
    </div>
  `
}

// 1
// Demo of looping over all query params
// for (const entry of urlSearchParams.entries()){
//   const key = entry[0]
//   const val = entry[1]
//   console.log(`${key}: ${val}`)
// }

// 2
// Demo of getting a specific value
// console.log(`The value of the userID query param is ${urlSearchParams.get('userID')}`)

// 3
// Demo of how to manually get query params
// window.location.search.slice(1).split('&').map(keyAndValue => {
//   const splitKeyAndValue = keyAndValue.split('=')
//   const key = splitKeyAndValue[0]
//   const value = splitKeyAndValue[1]
//
//   if(key === 'userID'){
//     userID = parseInt(value, 10)
//   }
// });
//
