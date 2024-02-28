const modalElement = document.querySelector('#modalCarrito');
const modal = new bootstrap.Modal(modalElement, {});
const btnUmbrella = document.querySelector('#btnUmbrella')
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const cartCount = document.querySelector('#cartCount');
const cartSum = document.querySelector('#cartSum');
const inputSearch = document.querySelector('#inputSearch');
const listProducts = document.querySelector('#listProducts');
const selectCategory = document.querySelector('#selectCategory');
const modalListProducts = document.querySelector('#modalListProducts');
const btnClose = document.querySelector('#btnClose');
const btnSave = document.querySelector('#btnSave');
const btnOrder = document.querySelector('#btnOrder');
const btnOrder2 = document.querySelector('#btnOrder2');
const listCart = JSON.parse(localStorage.getItem('cart')) || [];
const cart = new Cart(listCart);
const btnClear = document.querySelector('#btnClear');

if (btnUmbrella) {
    btnUmbrella.addEventListener('click', () => {
        swal("¡Bien!", "Gracias por hacer click aqui ;)", "success");
        modal.hide();
    })
}

if (btnModalCarrito) {
    btnModalCarrito.addEventListener('click', () => {
        const list = cart.getProducts();
        cartSum.innerText = cart.getSum();
        renderCart(list);
        modal.show();
    });
}

if (btnClose) {
    btnClose.addEventListener('click', () => {
        modal.hide();
    });
}
inputSearch.addEventListener('input', (event) => {
    const search = event.target.value;
    const newList = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    renderProducts(newList);
})

if (btnOrder) {
    btnOrder.addEventListener('click', () => {
        products.sort((a, b) => a.price - b.price);
        renderProducts(products);
    });
}

if (btnOrder2) {
    btnOrder2.addEventListener('click', () => {
        products.sort((a, b) => b.price - a.price);
        renderProducts(products);
    });
}

if (btnSave) {
    btnSave.addEventListener('click', () => {
        swal("¡Bien!", "Gracias por tu compra :)", "success");
        modal.hide();
    });
}

if (selectCategory) {
    selectCategory.addEventListener('change', (e) => {
        const id_category = selectCategory.value;
        filterCategory(id_category);
    });
}

const filterCategory = (id_category) => {
    const newList = products.filter((product) => product.id_category == id_category);
    renderProducts(newList);
};

const renderProducts = (list) => {
    listProducts.innerHTML = '';
    list.forEach(product => {
        listProducts.innerHTML +=
            `<div class="col-sm-4 col-md-3">
                <div class="card p-3">
                    <h4>${product.name}</h4>
                    <img class="img-fluid" src="${product.img}" alt="${product.name}">
                    <h3 class="text-center">$${product.price} </h3>
                    <button id="${product.id_product}" type="button" class="btn btnAddCart">
                        <i class="fa-solid fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>`;
    });

    const btns = document.querySelectorAll('.btnAddCart');
    btns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

const addToCart = (e) => {
    const id = e.target.id;
    const product = products.find(item => item.id_product == id);
    cart.addToCart(product);
    cartCount.innerText = cart.getCount();
    console.log(product)

    Toastify({
        close: true,
        text: "Producto agregado al carro",
        gravity: "bottom",
        duration: 2500,
        style: {
            background: "#d5bdaf",
            color: "white"
        },
    }).showToast();
}

const renderCart = (list) => {
    modalListProducts.innerHTML = '';
    list.forEach(product => {
        modalListProducts.innerHTML +=
            `<tr>
                <td>${product.name}</td>
                <td>${product.units}</td>
                <td>$${product.price}</td>
                <td>$${product.price * product.units}</td>
            </tr>`
    });
}

const renderCategory = (list) => {
    selectCategory.innerHTML = '';
    list.forEach(category => {
        selectCategory.innerHTML +=
            `<option value="${category.id_category}"> ${category.name}</option>`
    });
}

const getProducts = async () => {

    try {
        const endPoint = "data.json";
        const resp = await fetch(endPoint);
        const json = await resp.json();

        const { products: fetchedProducts, category } = json;
        products = fetchedProducts;
        renderProducts(products);
        renderCategory(category);

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: 'Ocurrió un error al mostrar los Productos, por favor inténtelo más tarde',
            icon: "error",
            confirmButtonText: 'Aceptar'
        });
        console.log(error);
    }
}
btnClear.addEventListener('click', () => {
    cart.clearCart();
    renderCart()
});
getProducts();