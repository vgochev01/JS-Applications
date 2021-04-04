import { html } from '../../node_modules/lit-html/lit-html.js';
import { createArticle } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form @submit=${onSubmit} id="create" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
    </form>
</section>
`;


export async function showCreate(ctx) {

    ctx.render(createTemplate(onSubmit));

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

        await createArticle(data);
        ctx.page.redirect('/');
    }
}