import { html } from '../../node_modules/lit-html/lit-html.js';
import { getArticleById, editArticle } from '../api/data.js';

const editTemplate = (article, onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" .value=${article.title} placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" .value=${article.category} placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" .value=${article.content} id="content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>
`;


export async function showEdit(ctx) {
    const id = ctx.params.id;
    const article = await getArticleById(id);

    ctx.render(editTemplate(article, onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const entries = [...formData.entries()];

        const validCategories = ['JavaScript', 'C#', 'Java', 'Python'];

        if(entries.some(([k,v]) => v == '')){
            return alert("All fields are required!");
        }

        const category = formData.get('category');
        if(validCategories.includes(category) == false){
            return alert('The category must be one of "JavaScript", "C#", "Java", or "Python".');
        }

        const data = entries.reduce((acc, [k, v]) => {
            acc[k] = v;
            return acc;
        }, {});

        const result = await editArticle(id, data);
        ctx.page.redirect('/details/' + result._id);
    }
}