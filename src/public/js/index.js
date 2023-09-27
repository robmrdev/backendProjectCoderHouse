const socket = io();
socket.emit('message', "From websocket")


socket.on('updateProducts', products =>{

    const productList = document.getElementById('realTimeProducts');
    productList.innerHTML = ''; 

    products.forEach((product) => {
        const productCard = document.createElement('div');
        const productNumber = document.createElement('h3');
        productNumber.textContent = `Number ${product.id}`;
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
        productDelete.setAttribute('data-product-id', product.id);
        productCard.appendChild(productDelete);

    });
})

document.querySelectorAll('.delete-product').forEach((button) => {
    button.addEventListener('click', async (e) => {
        const productId = e.target.getAttribute('data-product-id');

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

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
    const code = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
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
                category
            }),
            
        });

        if (response.status === 200) {
            console.log('Producto registrado con éxito');
        } else {
            console.error('Error al registrar el producto');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
});