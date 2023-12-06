const contenedor = document.querySelector("#carrito"); //contenedor carrito
const botones = document.querySelectorAll(".btn-primary"); // botones
const template = document.querySelector("#template"); //template
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();

let carritoProductos = [];

const agregarProductoCarrito = (e) => {
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio,)
    };

    const posicion = carritoProductos.findIndex(item => {
        return item.titulo === producto.titulo
    })
    
    if (posicion === -1) {
        carritoProductos.push(producto);
    } else {
        carritoProductos[posicion].cantidad++
    }

    mostrarCarrito()

};

const mostrarCarrito = () => {
    contenedor.textContent = " ";

    carritoProductos.forEach((item) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector("li .badge").textContent = item.cantidad;
        clone.querySelector(".text-uppercase .lead").textContent = item.titulo;
        clone.querySelector(".justify-content-between div .lead span").textContent = item.precio * item.cantidad;

        clone.querySelector(".btn-success").dataset.id = item.id
        clone.querySelector(".btn-danger").dataset.id = item.id

        fragment.appendChild(clone);
    });

    contenedor.appendChild(fragment);
    mostrarFooter()
};

const mostrarFooter = () => {
    footer.textContent = " "

    const total = carritoProductos.reduce((acc, current) => {
        return acc + current.cantidad * current.precio
        }, 0)
        console.log(total)

    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector(".lead span").textContent = total

    footer.appendChild(clone)
}

const btnAgregar = (e) => {
    carritoProductos = carritoProductos.map(item => {
        if (e.target.dataset.id === item.id) {
            item.cantidad++
        }       
        return item
    }) 
    mostrarCarrito()
}

const btnQuitar = (e) => {
    carritoProductos = carritoProductos.filter((item) => {
        if (e.target.dataset.id === item.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                if (item.cantidad === 0) return;
            }
            
        }
        return item;
    });
    mostrarCarrito()
};

document.addEventListener("click", (e) => {
    if (e.target.matches (".btn-primary")) {
        agregarProductoCarrito(e)
    } 
    if (e.target.matches (".btn-success")) {
        btnAgregar(e)
    }    
    if (e.target.matches (".btn-danger")) {
        btnQuitar(e)
    }
});