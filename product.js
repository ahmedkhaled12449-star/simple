document.addEventListener("DOMContentLoaded", async () => {

    const PRODUCTS_API =
        "https://script.google.com/macros/s/AKfycbyYkJOEZ7n_AMLWodcpc8QaA_4dV2f2UC7LA35XcgHdq4B13jp7-XkJYVPr_Qzac7cFZg/exec";


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            params.get("id")
        );


    let product;


    // =========================
    // LOAD PRODUCT
    // =========================

    try {

        const response =
            await fetch(
                PRODUCTS_API
            );


        const products =
            await response.json();


        product =
            products.find(
                item =>
                    item.id === productId
            );

    }

    catch (error) {

        console.error(error);

        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#0b0b0b;
                color:white;
                font-family:Arial,sans-serif;
                text-align:center;
                padding:20px;
            ">

                <div>

                    <h1>
                        Unable to load product
                    </h1>

                    <p style="margin:20px 0;">
                        Please try again later.
                    </p>

                    <a
                        href="index.html"
                        style="
                            display:inline-block;
                            padding:14px 25px;
                            background:white;
                            color:#111;
                            text-decoration:none;
                        "
                    >
                        BACK TO COLLECTION
                    </a>

                </div>

            </div>
        `;

        return;

    }


    // =========================
    // PRODUCT NOT FOUND
    // =========================

    if (!product) {

        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#0b0b0b;
                color:white;
                font-family:Arial,sans-serif;
                text-align:center;
                padding:20px;
            ">

                <div>

                    <h1>
                        Product Not Found
                    </h1>

                    <p style="margin:20px 0;">
                        This product does not exist.
                    </p>

                    <a
                        href="index.html"
                        style="
                            display:inline-block;
                            padding:14px 25px;
                            background:white;
                            color:#111;
                            text-decoration:none;
                        "
                    >
                        BACK TO COLLECTION
                    </a>

                </div>

            </div>
        `;

        return;

    }


    // =========================
    // PRODUCT INFORMATION
    // =========================

    document.getElementById(
        "product-name"
    ).textContent =
        product.name;


    document.getElementById(
        "product-price"
    ).textContent =
        product.price + " EGP";


    // =========================
    // PRODUCT IMAGES
    // =========================

    const mainImage =
        document.getElementById(
            "main-product-image"
        );


    const thumbnails =
        document.getElementById(
            "product-thumbnails"
        );


    const previousButton =
        document.getElementById(
            "gallery-prev"
        );


    const nextButton =
        document.getElementById(
            "gallery-next"
        );


    let images =
        Array.isArray(product.images)
            ? product.images
            : [];


    // Compatibility with old products
    if (
        images.length === 0 &&
        product.image
    ) {

        images = [
            product.image
        ];

    }


    let currentImageIndex = 0;


    function showImage(index) {

        if (
            images.length === 0
        ) {
            return;
        }


        if (
            index < 0
        ) {

            index =
                images.length - 1;

        }


        if (
            index >= images.length
        ) {

            index = 0;

        }


        currentImageIndex =
            index;


        mainImage.src =
            images[currentImageIndex];


        document
            .querySelectorAll(
                ".product-thumbnail"
            )
            .forEach(
                (thumbnail, i) => {

                    thumbnail.classList.toggle(
                        "active",
                        i === currentImageIndex
                    );

                }
            );

    }


    // Create thumbnails

    thumbnails.innerHTML = "";


    images.forEach(
        (image, index) => {

            const thumbnail =
                document.createElement(
                    "img"
                );


            thumbnail.src =
                image;


            thumbnail.alt =
                product.name;


            thumbnail.className =
                "product-thumbnail";


            thumbnail.addEventListener(
                "click",
                () => {

                    showImage(
                        index
                    );

                }
            );


            thumbnails.appendChild(
                thumbnail
            );

        }
    );


    // Previous image

    previousButton.addEventListener(
        "click",
        () => {

            showImage(
                currentImageIndex - 1
            );

        }
    );


    // Next image

    nextButton.addEventListener(
        "click",
        () => {

            showImage(
                currentImageIndex + 1
            );

        }
    );


    // Hide arrows if only one image

    if (
        images.length <= 1
    ) {

        previousButton.style.display =
            "none";

        nextButton.style.display =
            "none";

        thumbnails.style.display =
            "none";

    }


    // Show first image

    showImage(0);



    // =========================
    // COLORS
    // =========================

    const colorsContainer =
        document.getElementById(
            "colors"
        );


    let selectedColor = "";


    product.colors.forEach(
        color => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                color;


            button.className =
                "option-button";


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "#colors .option-button"
                        )
                        .forEach(
                            btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    selectedColor =
                        color;

                }
            );


            colorsContainer.appendChild(
                button
            );

        }
    );



    // =========================
    // SIZES
    // =========================

    const sizesContainer =
        document.getElementById(
            "sizes"
        );


    let selectedSize = "";


    product.sizes.forEach(
        size => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                size;


            button.className =
                "option-button";


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "#sizes .option-button"
                        )
                        .forEach(
                            btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    selectedSize =
                        size;

                }
            );


            sizesContainer.appendChild(
                button
            );

        }
    );



    // =========================
    // ORDER FORM
    // =========================

    const form =
        document.getElementById(
            "productOrderForm"
        );


    const message =
        document.getElementById(
            "order-message"
        );


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!selectedColor) {

                message.textContent =
                    "Please choose a color.";

                return;

            }


            if (!selectedSize) {

                message.textContent =
                    "Please choose a size.";

                return;

            }


            const quantity =
                document.getElementById(
                    "quantity"
                ).value;


            const data = {

                name:
                    document
                        .getElementById(
                            "name"
                        )
                        .value
                        .trim(),

                phone:
                    document
                        .getElementById(
                            "phone"
                        )
                        .value
                        .trim(),

                governorate:
                    document
                        .getElementById(
                            "governorate"
                        )
                        .value
                        .trim(),

                address:
                    document
                        .getElementById(
                            "address"
                        )
                        .value
                        .trim(),

                product:
                    product.name,

                price:
                    product.price,

                color:
                    selectedColor,

                size:
                    selectedSize,

                quantity:
                    quantity

            };


            const scriptURL =
                "https://script.google.com/macros/s/AKfycbzE7EL_O87sfQySrm77THE1pndIaWizHCZyLdBzqs_11-GadO7hu2WmghuBQXzZehLDiQ/exec";


            message.textContent =
                "Sending your order...";


            try {

                await fetch(
                    scriptURL,
                    {

                        method:
                            "POST",

                        mode:
                            "no-cors",

                        body:
                            JSON.stringify(
                                data
                            )

                    }
                );


                message.textContent =
                    "Order received successfully!";


                form.reset();


                selectedColor =
                    "";

                selectedSize =
                    "";


                document
                    .querySelectorAll(
                        ".option-button"
                    )
                    .forEach(
                        button => {

                            button.classList.remove(
                                "active"
                            );

                        }
                    );

            }


            catch (error) {

                console.error(
                    error
                );


                message.textContent =
                    "Something went wrong. Please try again.";

            }

        }
    );

});
