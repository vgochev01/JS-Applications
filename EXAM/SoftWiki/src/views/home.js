import { html } from '../../node_modules/lit-html/lit-html.js';
import { lastArticleByCat } from '../api/data.js';

const articleTemplate = (article) => html`
<article>
    <h3>${article.title}</h3>
    <p>${article.content}</p>
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
</article>
`;

const noArticles = () => html`<h3 class="no-articles">No articles yet</h3>`;

const homeTemplate = (categories) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${categories.javascript.length > 0 ? categories.javascript.map(articleTemplate) : noArticles()}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${categories.csharp.length > 0 ? categories.csharp.map(articleTemplate) : noArticles()}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${categories.java.length > 0 ? categories.java.map(articleTemplate) : noArticles()}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${categories.python.length > 0 ? categories.python.map(articleTemplate) : noArticles()}
    </section>
</section>
`;

export async function showHome(ctx) {
    const articles = await lastArticleByCat()
    const categories = {
        javascript: articles.filter(a => a.category == 'JavaScript'),
        csharp: articles.filter(a => a.category == 'C#'),
        java: articles.filter(a => a.category == 'Java'),
        python: articles.filter(a => a.category == 'Python')
    }

    ctx.render(homeTemplate(categories));
}