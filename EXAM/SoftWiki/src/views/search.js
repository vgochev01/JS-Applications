import { html } from '../../node_modules/lit-html/lit-html.js';
import { articlesByTitle } from '../api/data.js';

const articleTemplate = (article) => html`
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>
`;

const searchTemplate = (search, articles, showResults) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${search} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${ articles.length && showResults > 0 ? articles.map(articleTemplate) : articles.length == 0 && showResults ? html`
        <h3 class="no-articles">No matching articles</h3>
        ` : ''}
    </div>
</section>
`;

export async function showSearch(ctx) {

    updateView(false);

    function updateView(showResults, articles = []){
        ctx.render(searchTemplate(search, articles, showResults));
    }

    async function search(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const match = formData.get('search');
        if(match != ''){
            const articles = await articlesByTitle(match)
            updateView(true, articles);
        } else {
            return alert('Field is requied!')
        }
    }
}