document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on
    if (document.getElementById('articles-container')) {
        loadArticleGrid();
    } 
    
    if (document.getElementById('markdown-content')) {
        loadSingleArticle();
    }
});

// --- LOGIC FOR BLOG.HTML (THE GRID) ---
async function loadArticleGrid() {
    const container = document.getElementById('articles-container');
    try {
        const response = await fetch('data/articles.json');
        const articles = await response.json();

        container.innerHTML = ''; // Clear loading spinner

        articles.forEach(article => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <img src="${article.image}" class="card-img-top" alt="${article.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <span class="badge bg-info text-dark mb-2">${article.category}</span>
                        <h5 class="card-title fw-bold">
                            <a href="article.html?id=${article.id}" class="text-decoration-none text-dark stretched-link">
                                ${article.title}
                            </a>
                        </h5>
                        <p class="card-text text-muted small">${article.summary}</p>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <small class="text-muted"><i class="far fa-user"></i> ${article.author} | <i class="far fa-calendar"></i> ${article.date}</small>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// --- LOGIC FOR ARTICLE.HTML (THE READER) ---
async function loadSingleArticle() {
    // 1. Get the 'id' from the URL (e.g., article.html?id=spss-guide)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        window.location.href = 'blog.html'; // Redirect if no ID
        return;
    }

    try {
        // 2. Fetch the JSON to find details
        const response = await fetch('data/articles.json');
        const articles = await response.json();
        const article = articles.find(a => a.id === articleId);

        if (!article) throw new Error('Article not found');

        // 3. Update the Header info
        document.getElementById('article-title').innerText = article.title;
        document.getElementById('article-category').innerText = article.category;
        document.getElementById('article-meta').innerText = `By ${article.author} • ${article.date}`;
        document.getElementById('article-hero-img').src = article.image;

        // 4. Fetch the actual Markdown file
        const mdResponse = await fetch(article.file);
        const mdText = await mdResponse.text();

        // 5. Convert Markdown to HTML using marked.js
        document.getElementById('markdown-content').innerHTML = marked.parse(mdText);

    } catch (error) {
        document.getElementById('markdown-content').innerHTML = `<div class="alert alert-danger">Error loading article. It may not exist.</div>`;
    }
}