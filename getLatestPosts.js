async function fetchHTML(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }
  
  async function getLatestPosts() {
    const latestPostsContainer = document.querySelector(".latest-posts");
    const maxNumPosts = 5;
    let postNumber = 1;
    let postCount = 0;
  
    while (postCount < maxNumPosts) {
      try {
        const postUrl = `/blog/post${postNumber}.html`;
        const postHTML = await fetchHTML(postUrl);
  
        const postTitle = postHTML.querySelector("h1").innerText;
        const postDate = postHTML.querySelector("p").innerText;
        const postThumbnail = postHTML.querySelector(".post-image img").src;
        const postDescription = postHTML.querySelector(".post-description").innerText;

  
        const postElement = `
          <div class="latest-post">
            <img class="post-thumbnail" src="${postThumbnail}" alt="${postTitle}">
            <a href="${postUrl}">
              <h3>${postTitle}</h3>
            </a>
            <p class="post-description">${postDescription}</p>
            <p>${postDate}</p>
            </div>
        `;
  
        latestPostsContainer.insertAdjacentHTML("beforeend", postElement);
        postCount++;
      } catch (error) {
        console.log("Post not found:", postNumber);
      }
      postNumber++;
    }
  }
  
  getLatestPosts();
  