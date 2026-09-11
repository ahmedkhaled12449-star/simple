document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       GET PRODUCT
    ========================= */
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));
    const product = products.find(item => item.id === productId);
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
                    <h1>Product Not Found</h1>
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
    /* =========================
       PRODUCT INFORMATION
    ========================= */
    document.getElementById("main-product-image").src =
        product.image;
    document.getElementById("product-name").textContent =
        product.name;
    document.getElementById("product-price").textContent =
        product.price + " EGP";
    /* =========================
       COLOR OPTIONS
    ========================= */
    const colorsContainer =
        document.getElementById("colors");
    let selectedColor = "";
    product.colors.forEach(color => {
        const button =
            document.createElement("button");
        button.type = "button";
        button.textContent = color;
        button.className = "option-button";
        button.addEventListener("click", () => {
            document
                .querySelectorAll("#colors .option-button")
                .forEach(btn => {
                    btn.classList.remove("active");
                });
            button.classList.add("active");
            selectedColor = color;
        });
        colorsContainer.appendChild(button);
    });
    /* =========================
       SIZE OPTIONS
    ========================= */
    const sizesContainer =
        document.getElementById("sizes");
    let selectedSize = "";
    product.sizes.forEach(size => {
        const button =
            document.createElement("button");
        button.type = "button";
        button.textContent = size;
        button.className = "option-button";
        button.addEventListener("click", () => {
            document
                .querySelectorAll("#sizes .option-button")
                .forEach(btn => {
                    btn.classList.remove("active");
                });
            button.classList.add("active");
            selectedSize = size;
        });
        sizesContainer.appendChild(button);
    });
    /* =========================
       ORDER FORM
    ========================= */
    const form =
        document.getElementById("productOrderForm");
    const message =
        document.getElementById("order-message");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        /* Check Color */
        if (!selectedColor) {
            message.textContent =
                "Please choose a color.";
            return;
        }
        /* Check Size */
        if (!selectedSize) {
            message.textContent =
                "Please choose a size.";
            return;
        }
        /* Get Quantity */
        const quantity =
            document.getElementById("quantity").value;
        /* Collect Order Data */
        const data = {
            name:
                document.getElementById("name").value.trim(),
            phone:
                document.getElementById("phone").value.trim(),
            governorate:
                document.getElementById("governorate").value.trim(),
            address:
                document.getElementById("address").value.trim(),
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
        /* Google Apps Script */
        const scriptURL =
            "https://script.google.com/macros/s/AKfycbzE7EL_O87sfQySrm77THE1pndIaWizHCZyLdBzqs_11-GadO7hu2WmghuBQXzZehLDiQ/exec";
        /* Loading */
        message.textContent =
            "Sending your order...";
        try {
            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data)
            });
            message.textContent =
                "Order received successfully!";
            form.reset();
            /* Reset selections */
            selectedColor = "";
            selectedSize = "";
            document
                .querySelectorAll(".option-button")
                .forEach(button => {
                    button.classList.remove("active");
                });
        } catch (error) {
            console.error(error);
            message.textContent =
                "Something went wrong. Please try again.";
        }
    });
});
