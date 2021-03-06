import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCount, getMemes, searchMemes } from '../api/data.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';
import { classMap } from '../../node_modules/lit-html/directives/class-map.js';

const memeTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>
`;

const memesTemplate = (memes, pageInfo) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div class="pageAndSearch">
            <div style=${styleMap(pageInfo.showPagination ? {} : {display: 'none'})} class="pagination">
                <h4>Page ${pageInfo.page} of ${pageInfo.pagesCount}</h4>
                ${pageInfo.page > 1 ? html`
                    <a @click=${() => pageInfo.prevPage()} href="/memes?page=${Number(pageInfo.page)-1}" id="pageBtn">Prev</a>
                ` : '' }

                ${pageInfo.page < pageInfo.pagesCount ? html`
                    <a @click=${() => pageInfo.nextPage()} href="/memes?page=${Number(pageInfo.page)+1}" id="pageBtn">Next</a>
                ` : ''}
            </div>
        <div class=${classMap({'searchCentered': pageInfo.showPagination == false, 'searchBar': true})}>
        <form @submit=${pageInfo.search} id="searchForm">
            <input @focus=${(ev) => ev.target.style.borderColor = 'black'} type="text" name="match" placeholder="Search..." />
            <input type="submit" value="Search" />
        </form>
        </div>
    </div>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${ memes.length > 0 ? 
            memes.map(memeTemplate)
         : html`
            <!-- Display : If there are no memes in database -->
            <p class="no-memes">No memes in database.</p>
        ` }
    </div>
</section>
`;

export async function showMemes(ctx) {
    const memesCount = await getCount();
    console.log(true);
    const pageInfo = {
        page: 1,
        pagesCount: Math.ceil(memesCount / 3),
        async nextPage() {
            this.page++;
        },
        async prevPage() {
            this.page--;
        },
        search: search,
        showPagination: true
    }

    const querystring = ctx.querystring.split('=');
    if(querystring && querystring[0] == 'page'){
        const page = querystring[1]
        pageInfo.page = page;
    }

    await updateView()

    async function updateView(){
        const memes = await getMemes(pageInfo.page);
        ctx.render(memesTemplate(memes, pageInfo));
    }

    async function search(ev) {
        ev.preventDefault();
        const match = ev.target.querySelector('input');
        if(match.value != ''){
            const memes = await searchMemes(match.value);
            pageInfo.showPagination = false;
            if(memes.length){
                ev.target.reset();
            }
            ctx.render(memesTemplate(memes, pageInfo));
        } else {
            match.style.borderColor = 'red';
        }
    }
}