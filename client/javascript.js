const styleElement = document.createElement('style');
styleElement.textContent = `
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

#widget {
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.post-container {
  width: 100%;
  max-width: 500px;


  margin: 10px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.creator-section {
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 2px solid #e5e7eb;
}

.creator-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
}

.creator-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;
}

.creator-bio {
  font-size: 14px;
  color: #666;
}

.timestamp {
  margin-bottom: 10px;
  margin-left: auto;
  color: #777;
}

.tag {
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: #f5f5f5;
  border-radius: 1rem;
  border-width: 1px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: #777;
  white-space: nowrap;
}

.content-paragraph {
  margin-bottom: 10px;
  line-height: 1.5;
}

.content-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.show-more-link {
  display: block;
  text-align: center;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  background-color: #f5f5f5;
  transition: background-color 0.3s, color 0.3s;
}

.show-more-link:hover {
  background-color: #e5e7eb;
}

.article {

  transition:height 0.3s ease-in-out;
  transition-delay: 0.1s;
   overflow: hidden;
}
`;

document.head.appendChild(styleElement);

class MediumPost extends HTMLElement {
  constructor() {
    super();
    this.showMore = false;
    this.content = '';
    this.postContent = null //post div
    this.showButton = null; //show button
    this.titleBar = null;
    this.Article = null; //article
    this.creatorSection = null;//creator header
  }

  connectedCallback() {
    this.renderPost();
  }
  formatTime(timestamp) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - timestamp;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (timeDiff < minute) {
      return `${Math.floor(timeDiff / 1000)} seconds ago`;
    } else if (timeDiff < hour) {
      return `${Math.floor(timeDiff / minute)} minutes ago`;
    } else if (timeDiff < day) {
      return `${Math.floor(timeDiff / hour)} hours ago`;
    } else {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const dayOfMonth = date.getDate();

      return `${month}/${dayOfMonth}/${year}`;
    }
  }
  renderPost() {
    if (this.postContent == null) {
      this.postContent = document.createElement("div");
      this.postContent.className = "post-container";
    }
    if (this.creatorSection == null) {

      this.creatorSection = document.createElement("div");
      this.creatorSection.className = "creator-section";
      var headerCard = document.createElement("div");
      headerCard.style = "display: flex;"

      var profileImg = document.createElement("img");
      profileImg.className = "creator-image"
      profileImg.alt = "creator-image"
      profileImg.src = "https://miro.medium.com/v2/resize:fit:1400/format:webp/" + this.content.Creator.Image;
      headerCard.appendChild(profileImg)

      var profileName = document.createElement("h2");
      profileName.className = "creator-name"
      profileName.innerText = this.content.Creator.Name;
      headerCard.appendChild(profileName)


      var profileBio = document.createElement("p");
      profileBio.className = "creator-bio"
      profileBio.innerText = this.content.Creator.Bio;

      this.creatorSection.appendChild(headerCard)
      this.creatorSection.appendChild(profileBio)

      this.postContent.appendChild(this.creatorSection);


    }

    if (this.titleBar == null) {
      this.titleBar = document.createElement("div");
      this.titleBar.style = "display: flex; align-items: baseline;"
      this.titleBar.innerHTML = `  <h1 class="post-title">
      ${this.content.Title}
      <p class="timestamp" style="display: inline;margin-left: 10px;font-weight: normal;font-size: medium;">Posted ${this.formatTime(this.content.CreatedAt)}</p>
    </h1>`
      this.postContent.appendChild(this.titleBar)
    }


    if (this.Article == null) {
      this.Article = document.createElement("div")
      this.Article.className = "article"
      this.postContent.appendChild(this.Article)
    }
    this.Article.innerHTML = `${this.content.Content
      .slice(2, this.showMore ? this.content.Content.length - 2 : 5)
      .map(
        (content, index) =>
          `<${content.type} class="${content.type === "IMG" ? "content-image" : "content-paragraph"
          }"${content.type === "IMG"
            ? `src="https://miro.medium.com/v2/resize:fit:1400/format:webp/${content.image}"`
            : ""
          }>${content.type !== "IMG" ? content.text + (index === 2 && this.content.Content.length > 5 && !this.showMore ? " ..." : "") : ""}</${content.type}>${content.type === "IMG" ? "<br/>" : ""
          }`
      )
      .join("")}`;



    if (this.showButton == null) {


      this.showButton = document.createElement("a");
      this.showButton.className = "show-more-link"
      this.showButton.onclick = () => {
        this.showMore = !this.showMore;
        this.renderPost(); // Update the post content when showMore changes
      };
      this.postContent.appendChild(this.showButton);
    }
    this.showButton.innerText = this.showMore ? "Show Less" : "Show More";
    this.appendChild(this.postContent)





  }
}

class MediumWidget extends HTMLElement {
  constructor() {
    super();
    this.limit = 10;
    this.offset = 0;
    this.isLoading = false;
    this.ChildrenPosts = new Map();
  }

  connectedCallback() {
    this.fetchData();

    // Add scroll event listener
    window.addEventListener("scroll", this.handleScroll.bind(this));

  }

  disconnectedCallback() {
    // Remove scroll event listener when the component is removed from the DOM
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll() {
    if (!this.isLoading && this.shouldLoadMore()) {
      this.offset += this.limit;
      this.fetchData();
    }
  }

  shouldLoadMore() {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 200; // Number of pixels before the bottom to start loading more
    return scrollPosition > documentHeight - threshold;
  }

  async fetchData() {
    try {
      this.isLoading = true;
      const data = await fetch(`http://localhost:3003/data?limit=${this.limit}&offset=${this.offset}`)
      const result = await data.json()
      result.forEach(post => {
        this.renderPost(post);
      });
      this.isLoading = false;
    } catch (error) {
      console.error("Error fetching data:", error);
      this.isLoading = false;
    }
  }

  renderPost(post) {
    const test = document.createElement("medium-post");
    test.content = post
    this.appendChild(test)
  }
}

customElements.define("medium-widget", MediumWidget);

customElements.define("medium-post", MediumPost);
