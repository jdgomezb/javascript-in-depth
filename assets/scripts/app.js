const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const URL = 'https://jsonplaceholder.typicode.com/pos';
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open(method, url);
    
    xhr.responseType = 'json';
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error('Something went wrong!'));
      }
    };
    
    xhr.onerror = function() {
      reject(new Error('Request failed!'));
    };
    
    xhr.send(JSON.stringify(data));
  });

  return promise;
};

// const fetchPosts = () => {
//   sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
//     .then(responseData => {
//       const listOfPosts = responseData;
//       for (const post of listOfPosts) {
//         const postEl = document.importNode(postTemplate.content, true);
//         postEl.querySelector('h2').textContent = post.title.toUpperCase();
//         postEl.querySelector('p').textContent = post.body;
//         listElement.append(postEl);
//       }
//     })
// };

const fetchPosts = async () => {
  try {
    const responseData = await sendHttpRequest(
      'GET', 
      URL
      );
      const listOfPosts = responseData;
      for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        postEl.querySelector('li').id = post.id;
        listElement.append(postEl);
      }
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (title, content) => {
  const userId = Math.floor(Math.random() * 10) + 1;
  const post = {
    title,
    body: content,
    userId,
  }

  const responseData = await sendHttpRequest('POST',URL, post);
};

// fetchPosts();
fetchButton.addEventListener('click', fetchPosts);

// createPost('Dummy Post', 'With a Dummy content');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredTitle = e.currentTarget.querySelector('#title').value;
  const enteredContent = e.currentTarget.querySelector('#content').value;
  // validate input fields somehow here!

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const postId = e.target.parentElement.id;

    sendHttpRequest('DELETE', `${URL}/${postId}`)
  }
});