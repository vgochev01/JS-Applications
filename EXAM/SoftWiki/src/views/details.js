import { html } from '../../node_modules/lit-html/lit-html.js';
import { getArticleById, apiDeleteArticle } from '../api/data.js';

const detailsTemplate = (article, info) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
            ${info.isOwner ? html`
                <a @click=${info.delArticle} href="javascript:void(0)" class="btn delete">Delete</a>
                <a href="/edit/${article._id}" class="btn edit">Edit</a>
            ` : ''}
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>
`;


export async function showDetails(ctx){
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const article = await getArticleById(id);

    const info = {
        isOwner: userId == article._ownerId,
        delArticle
    }

    ctx.render(detailsTemplate(article, info));

    async function delArticle(){
        const confirmation = confirm("Are you sure want to delete this offer?");
        if(confirmation){
            await apiDeleteArticle(id);
            ctx.page.redirect('/');
        }
    }
}