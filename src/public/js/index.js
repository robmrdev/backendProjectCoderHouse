// const socket = io();
// socket.emit('message', "From websocket")




function updateProducts (products) {

    const productList = document.getElementById('realTimeProducts');
    productList.innerHTML = ''; 

    products.forEach((product) => {
        const productCard = document.createElement('div');
        const productNumber = document.createElement('h3');
        productNumber.textContent = `Number ${product._id}`;
        const productTitle = document.createElement('p');
        productTitle.textContent = `Product: ${product.title}`;
        const productDescription = document.createElement('p');
        productDescription.textContent = `Description: ${product.description}`;
        const productCode = document.createElement('p');
        productCode.textContent = `Code: ${product.code}`;
        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: ${product.price}`;
        const productStock = document.createElement('p');
        productStock.textContent = `Stock: ${product.stock}`;
        productList.appendChild(productCard);
        productCard.appendChild(productNumber);
        productCard.appendChild(productTitle);
        productCard.appendChild(productDescription);
        productCard.appendChild(productCode);
        productCard.appendChild(productPrice);
        productCard.appendChild(productStock);


        const productDelete = document.createElement('button');

        productDelete.textContent = `Delete`;
        productDelete.className = 'delete-product'
        productDelete.setAttribute('data-product-id', product._id);
        productCard.appendChild(productDelete);

    });

    document.querySelectorAll('.delete-product').forEach((button) => {
        button.addEventListener('click', async (e) => {
            const productId = e.target.getAttribute('data-product-id');
    
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                });


                const newProductList = await fetch('/api/products/', { method: 'GET'})
                const productListUpdated = await newProductList.json()
                updateProducts(productListUpdated.payload)


                if (response.status === 200) {
                    console.log('Producto eliminado con éxito');
                } 
                else {
                    console.error('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        });
    });
}



document.querySelectorAll('.delete-product').forEach((button) => {
    button.addEventListener('click', async (e) => {
        const productId = e.target.getAttribute('data-product-id');
        console.log(productId)
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });


            const newProductList = await fetch('/api/products/', { method: 'GET'})
            const productListUpdated = await newProductList.json()
            updateProducts(productListUpdated.payload)



            if (response.status === 200) {
                console.log('Producto eliminado con éxito');
            } 
            else {
                console.error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    });
});


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const status = true

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
                status
            }),
        });
        
        const newProductList = await fetch('/api/products/', { method: 'GET'})
        const productListUpdated = await newProductList.json()
        updateProducts(productListUpdated.payload)

        if (response.status === 201) {
            console.log('Producto registrado con éxito');
        } else {
            console.error('Error al registrar el producto');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
});





