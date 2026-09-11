const PRODUCTS_API =
    "https://script.google.com/macros/s/AKfycbyYkJOEZ7n_AMLWodcpc8QaA_4dV2f2UC7LA35XcgHdq4B13jp7-XkJYVPr_Qzac7cFZg/exec";

let products = [];

async function loadProducts() {
    try {
        const response =
            await fetch(
                PRODUCTS_API +
                "?t=" +
                Date.now()
            );

        const data =
            await response.json();

        products =
            data.map(product => {
                const images =
                    Array.isArray(product.images)
                        ? product.images
                        : [];

                return {
                    id: Number(product.id),

                    name:
                        product.name,

                    price:
                        Number(product.price),

                    image:
                        product.image ||
                        images[0] ||
                        "",

                    images:
                        images,

                    colors:
                        Array.isArray(product.colors)
                            ? product.colors
                            : [],

                    sizes:
                        Array.isArray(product.sizes)
                            ? product.sizes
                            : [],

                    status:
                        product.status ||
                        "Available"
                };
            });

        console.log(
            "Products loaded from Google Sheets:",
            products
        );

        return products;

    } catch (error) {

        console.error(
            "Products loading error:",
            error
        );

        products = [];

        return products;
    }
}
