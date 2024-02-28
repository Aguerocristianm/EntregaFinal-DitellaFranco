class Cart {
    constructor(list = []) {
        this.cart = list;
        this.loadCartFromLocalStorage();
    }

    addToCart({ id_product, name, price }) {
        const index = this.cart.findIndex(product => product.id_product === id_product);
        if (index === -1) {
            this.cart.push({ id_product, name, price, units: 1 });
        } else {
            this.cart[index].units += 1;
        }

        this.saveCartToLocalStorage();
    }

    getProducts() {
        return this.cart;
    }

    getCount() {
        return this.cart.reduce((count, product) => count + product.units, 0);
    }

    getSum() {
        return this.cart.reduce((total, product) => total + (product.units * product.price), 0);
    }

    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }
    clearCart() {
        this.cart = [];
        this.saveCartToLocalStorage();
        renderCart()
    }
}
