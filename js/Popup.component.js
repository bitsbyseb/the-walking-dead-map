class Popup extends HTMLElement {
    static observedAttributes = ["nombre", "estado", "coordenadas", "temporadas", "descripcion"];

    constructor() {
        super();
        this.nombre = this.getAttribute('nombre');
        this.estado = this.getAttribute('estado');
        this.coordenadas = this.getAttribute('coordenadas');
        this.temporadas = this.getAttribute('temporadas');
        this.descripcion = this.getAttribute('descripcion');
    }

    get template() {
        const template = document.createElement('template');
        const seasons = this.temporadas.split('-');
        const seasonsList = seasons.map(x => `<li>${x}</li>`);
        console.log(seasonsList);
        template.innerHTML = `
            ${this.styles}
            <h2>${this.nombre}</h2>
            <img src="/public/places/${this.nombre}.webp" alt="${this.nombre}">
            <p>${this.descripcion}</p>
            <h3>Temporadas</h3>
            <ul>
                ${seasonsList.join("\n")}
            </ul>
        `;
        return template;
    }

    get styles() {
        return `<style>
            img {
                width:100%;
                height: 10rem;
            }
        </style>`;
    }

    render() {
        this.appendChild(this.template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.remove();
    }


    attributeChangedCallback(current,oldValue,newValue) {
        if (oldValue !== newValue) {
            this[current] = newValue;
        }
    }

    toString() {
        return this.innerHTML;
    }
}

window.customElements.define('popup-element', Popup);