async function getPostData() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const response = await fetch(url);
  return await response.json();
}

function renderLinkIcon(node) {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );

  iconSvg.setAttribute('fill', 'none');
  iconSvg.setAttribute('viewBox', '0 0 24 24');
  iconSvg.setAttribute('stroke', 'black');
  iconSvg.classList.add('post-icon');

  iconPath.setAttribute(
    'd',
    'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
  );
  iconPath.setAttribute('stroke-linecap', 'round');
  iconPath.setAttribute('stroke-linejoin', 'round');
  iconPath.setAttribute('stroke-width', '2');

  iconSvg.appendChild(iconPath);

  return node.appendChild(iconSvg);
}

function renderPosts(app, posts) {
  const postNodes = posts.map((post) => {
    // Create the DOM elements
    const postCard = document.createElement('div');
    const postHeader = document.createElement('div');
    const postTitleAnchor = document.createElement('a');
    const postTitle = document.createElement('h2');
    const postText = document.createElement('p');

    // Add some classes and attributes
    postCard.classList.add('post-card');
    postHeader.classList.add('post-header');
    postTitle.classList.add('post-title')
    postTitle.id = post.title;
    postTitleAnchor.href = '#' + post.title;

    // Place the text content
    postTitle.textContent = post.title;
    postText.textContent = post.body;

    // TODO: Add the icon here

    // Put together the DOM nodes
    postHeader.appendChild(postTitleAnchor)
    postHeader.appendChild(postTitle);
    postCard.appendChild(postHeader);
    postCard.appendChild(postText);
    app.appendChild(postCard);

renderLinkIcon(postTitleAnchor);
    return postCard;
  });
  return postNodes;
}

async function mountPosts() {
  const app = document.querySelector('#posts');
  const posts = await getPostData();
  renderPosts(app, posts);
}

mountPosts();

