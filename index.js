let carrito = [];
let productos = [];

fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    productos = json;

    let productosContainer = document.querySelector("#productosContainer");

    /* MOSTRAR TODOS LOS  PRODUCTOS */
    let mostrarTodosProductos = document.querySelector("#verTodosProductos");
    mostrarTodosProductos.addEventListener("click", () => {
      productosContainer.innerText = "";
      productos.forEach((producto) => {
        productosCard(producto);
      });
    });
    mostrarTodosProductos.click();

    /* Mostrar categoria pan */

    let verPanes = document.querySelector("#verPanes");
    verPanes.addEventListener("click", () => {
      productosContainer.innerText = "";
      let productosCatPan = productos.filter(
        (producto) => producto.categoria === "pan"
      );
      productosCatPan.forEach((producto) => {
        productosCard(producto);
      });
    });

    /* Mostrar Categoria Cookies */

    let verCookies = document.querySelector("#verCookie");
    verCookies.addEventListener("click", () => {
      productosContainer.innerText = "";
      let productosCatCookie = productos.filter(
        (producto) => producto.categoria === "cookie"
      );
      productosCatCookie.forEach((producto) => {
        productosCard(producto);
      });
    });

    /* Mostrar Categoria Trufas */

    let verTrufas = document.querySelector("#verTrufas");
    verTrufas.addEventListener("click", () => {
      productosContainer.innerText = "";
      let productosCatTrufa = productos.filter(
        (producto) => producto.categoria === "trufa"
      );
      productosCatTrufa.forEach((producto) => {
        productosCard(producto);
      });
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  let cartButton = document.querySelector("#cart");
  
  // MOSTRAR PRODUCTOS EN EL CARRITO
  
  cartButton.addEventListener("click", () => {
    actualizarCarrito();
    
  });
});

function actualizarCarrito() {
  let cartContainer = document.querySelector("#cartContainer");
  let vaciarCarrito = document.querySelector('#vaciarCarrito')

  cartContainer.innerHTML = "";

  carrito.forEach((item) => {

    // DOM CARRITO

    let li = document.createElement("li");
    li.setAttribute(
      "class",
      "list-group-item d-flex justify-content-between align-items-start mb-5 border-bottom"
    );

    let div = document.createElement("div");
    div.setAttribute("class", "ms-2 me-auto ");

    let div2 = document.createElement("div");
    div2.setAttribute("class", "ms-2 d-flex flex-column");

    let nombreDiv = document.createElement("div");
    nombreDiv.setAttribute("class", "fw-bold");
    nombreDiv.innerText = `${item.nombre}`;

    let p = document.createElement("p");
    p.innerText = `$${item.precio}`;

    let span = document.createElement("span");
    span.setAttribute("class", "badge bg-primary rounded-pill mb-2");
    span.innerText = `${item.cantidad}`;

    let borrar = document.createElement("img");
    borrar.setAttribute("src", "./img/borrar.png");
    borrar.setAttribute(
      "class",
      "mt-2 d-flex align-items-center justify-content-cente"
    );
    borrar.setAttribute("style", "width:20px");


    // BOTONES DE VACIAR Y BORRAR ITEMS CARRITO

    let buttonBorrar = document.createElement("button");
    buttonBorrar.setAttribute("style", "border:none; background:none");
    buttonBorrar.append(borrar);
    buttonBorrar.addEventListener("click", () => {
      carrito = carrito.filter((producto) => producto.id !== item.id);
      actualizarCarrito()
    });

    vaciarCarrito.addEventListener('click',()=>{
      carrito = []
      actualizarCarrito()
    })


    // BOTONES CANTIDAD Y TOTAL CARRITO





    div.append(nombreDiv, p);
    div2.append(span, buttonBorrar);
    li.append(div, div2);
    cartContainer.append(li);
  });

  actualizarCantidadYTotal()
}

function productosCard(producto) {
  let productosContainer = document.querySelector("#productosContainer");
  let verMasActive = false;

  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let imgContainer = document.createElement("img");
  imgContainer.setAttribute("class", "imgContainer");
  imgContainer.setAttribute("src", producto.img);
  imgContainer.setAttribute("alt", producto.descripcion);

  let productoContainer = document.createElement("div");
  productoContainer.setAttribute("class", "productoContainer");

  let tituloContainer = document.createElement("h4");
  tituloContainer.setAttribute("class", "tituloContainer");
  tituloContainer.innerText = producto.nombre;

  let descripcionContainer = document.createElement("p");
  descripcionContainer.setAttribute("class", "descripcionContainer");

  let precioContainer = document.createElement("h6");
  precioContainer.setAttribute("class", "precioContainer");
  precioContainer.innerText = `$${producto.precio}`;

  let btnsContainer = document.createElement("div");
  btnsContainer.setAttribute("class", "btnsContainer");

  let agregarBtnContainer = document.createElement("button");
  agregarBtnContainer.setAttribute("class", "agregarBtn");
  agregarBtnContainer.innerText = "Agregar al carrito";
  agregarBtnContainer.addEventListener("click", () => {
    chequearProductoRepetido(producto);
    actualizarCantidadYTotal()
  });

  // Boton ver Menos, Ver mas

  let verMasBtn = document.createElement("button");
  verMasBtn.setAttribute("class", "comprarBtn");
  verMasBtn.innerText = "Ver mas";
  verMasBtn.addEventListener("click", () => {
    if (!verMasActive) {
      descripcionContainer.innerText = `${producto.descripcion}`;
      verMasBtn.innerText = "Ver menos";
    } else {
      descripcionContainer.innerText = "";
      verMasBtn.innerText = "Ver mas";
    }
    verMasActive = !verMasActive;
  });

  btnsContainer.append(verMasBtn, agregarBtnContainer);

  productoContainer.append(
    tituloContainer,
    descripcionContainer,
    precioContainer
  );

  card.append(imgContainer, productoContainer, btnsContainer);

  productosContainer.append(card);
}

function chequearProductoRepetido(producto) {
  const repetido = carrito.find((item) => item.id === producto.id);
  if (repetido) {
    repetido.cantidad += 1;
  } else {
    carrito.push(producto);
  }
}

function actualizarCantidadYTotal() {
  let cantidadItemsCarrito = document.querySelector(".cantidadItemsCarrito");
  let totalItemsCarrito = document.querySelector(".totalItemsCarrito");
  let cantidadItemsCarritoModal = document.querySelector(".cantidadItemsCarritoModal");
  let totalItemsCarritoModal = document.querySelector(".totalItemsCarritoModal");

  let cantidadTotal = 0;
  let totalCarrito = 0;

  carrito.forEach((item) => {
    cantidadTotal += item.cantidad;
    totalCarrito += item.precio * item.cantidad;
  });

  cantidadItemsCarrito.innerText = cantidadTotal;
  totalItemsCarrito.innerText = `$${totalCarrito}`;
  cantidadItemsCarritoModal.innerText = cantidadTotal;
  totalItemsCarritoModal.innerText = `$${totalCarrito}`;
}