const styleElement = document.createElement('style');
styleElement.textContent = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  }

  #widget {
    width: 400px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .post-container {
    max-width: 600px;
    margin: 10 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f1f1f1;
  }

  /* Style for the post title */
  .post-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  /* Style for the creator section */
  .creator-section {
    display: flex;
    background-color: #ccc;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 8px;
    padding: 10px;
  }

  .creator-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .creator-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .creator-bio {
    font-size: 14px;
    color: #666;
  }

  /* Style for the tags and timestamp */
  .tags-timestamp {
    margin-bottom: 10px;
    color: #777;
  }

  /* Style for the content paragraphs */
  .content-paragraph {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  /* Style for image content */
  .content-image {
    max-width: 100%;
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
    border: 2px solid #333;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }

  .show-more-link:hover {
    background-color: #333;
    color: #fff;
  }
`;

document.head.appendChild(styleElement);


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
        this.addEventListener("click", this.handleShowMoreClick);

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

    fetchData() {
        this.isLoading = true;
        fetch(`http://localhost:3003/data?limit=${this.limit}&offset=${this.offset}`)
            .then(data => data.json())
            .then(result => {
                result.forEach(element => {
                    this.renderPost(element);

                });
                this.isLoading = false;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                this.isLoading = false;
            });
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

    handleShowMoreClick(event) {
        const target = event.target;
        if (target.classList.contains("show-more-link")) {
            const slug = target.getAttribute("data-slug");
            this.ShowMore(slug);
            event.preventDefault();
        }
    }

    ShowMore(slug) {
        const contentSection = this.ChildrenPosts.get(slug).element.querySelector(".content-section");
        const post = this.ChildrenPosts.get(slug).data;

        contentSection.innerHTML = `${post.Content.slice(1, post.Content.length - 1)
            .map(
                (content) =>
                    `<${content.type} class="${content.type === "IMG" ? "content-image" : "content-paragraph"
                    }"${content.type === "IMG"
                        ? `src="https://miro.medium.com/v2/resize:fit:1400/format:webp/${content.image}"`
                        : ""
                    }>${content.type !== "IMG" ? content.text : ""}</${content.type}>${content.type === "IMG" ? "<br/>" : ""
                    }`
            )
            .join("")}`;
    }

    renderPost(post) {
        const postContainer = document.createElement("div");
        postContainer.className = "post-container";

        postContainer.innerHTML = `
          <h1 class="post-title">${post.Title}</h1>

          <p class="tags-timestamp">${post.Tags.join(", ")}</p>
          <p class="tags-timestamp">${this.formatTime(post.CreatedAt)}</p>
          <div class="creator-section">
            <img class="creator-image" src="https://miro.medium.com/v2/resize:fit:1400/format:webp/${post.Creator.Image}" alt="Creator Image">
            <div>
              <h2 class="creator-name">${post.Creator.Name}</h2>
              <p class="creator-bio">${post.Creator.Bio}</p>
            </div>
          </div>
          <div class="content-section">
            ${post.Content
                .slice(1, 5)
                .map(
                    (content, index) =>
                        `<${content.type} class="${content.type === "IMG" ? "content-image" : "content-paragraph"
                        }"${content.type === "IMG"
                            ? `src="https://miro.medium.com/v2/resize:fit:1400/format:webp/${content.image}"`
                            : ""
                        }>${content.type !== "IMG" ? content.text + (index === 4 && post.Content.length > 5 ? " ..." : "") : ""}</${content.type}>${content.type === "IMG" ? "<br/>" : ""
                        }`
                )
                .join("")}
                ${post.Content.length > 5 ? `<br/><a href="#" class="show-more-link" data-slug="${post.Slug}">SHOW MORE</a>` : ""}
                </div>
        `;

        this.ChildrenPosts.set(post.Slug, { data: post, element: postContainer });
        this.appendChild(postContainer);
    }
}

customElements.define("medium-widget", MediumWidget);
