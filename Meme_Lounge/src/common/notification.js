import { html } from "../../node_modules/lit-html/lit-html.js";

export const notify = (errMsg) => html`
<section id="notification">
    <div id="errorBox" class="notification">
        <span>${errMsg}</span>
    </div>
</section>
`;