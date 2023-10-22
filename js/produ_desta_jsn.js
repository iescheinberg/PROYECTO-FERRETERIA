document.addEventListener('DOMContentLoaded', function(){
    const productListContainer = document.getElementById('product-list');
    const productDetailContainer = document.getElementById('product-detail');

    fetch('/dbjson/prod_destaca.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(product =>{
                const productElement = document.createElement('div');
                productElement.classList.add('prod-card');
                productElement.innerHTML = `
                    <div class="prod-img">
                    <img src="${product.imagen}" alt="${product.nombre}">
					</div>
                    <h3 class="prod-nombre">${product.nombre}<br>~<br>$${product.precio.toLocaleString('es-AR')}</h3>
                    <p class="prod-descri">${product.nombre}<br><br>${product.descripcion}<br><br>
                        <b>Precio: $${product.precio.toLocaleString('es-AR')}</b>
                    <br><button class="detail-button" data-id="${product.id}">Ver detalle</button>
                    </p>
                    `;
                productListContainer.appendChild(productElement);
            });

            const detailButtons = document.querySelectorAll('.detail-button');
            detailButtons.forEach(button =>{
                button.addEventListener('click', function(){
                    const productId = this.dataset.id;
                    const selectedProduct = data.find(product => product.id == productId);

                    productDetailContainer.innerHTML = `
                    <div class="prod-detalle">
                    <h2>${selectedProduct.nombre}</h2>
                    <p>${selectedProduct.descripcion}</p>
                    <img src="${selectedProduct.imagen}" alt="${selectedProduct.nombre}">
                    <p>Precio: $${selectedProduct.precio.toLocaleString('es-AR')} c/u</p><br>
                    <button id="back-button">Volver</button>
                    </div>
                    `;

                    productListContainer.style.display = 'none';
                    productDetailContainer.style.display = 'flex';

                    const backButton = document.getElementById('back-button');
                    backButton.addEventListener('click', function(){
                        lastPositionDetail = productDetailContainer.offsetTop;
                        productDetailContainer.style.display = 'none';
                        productListContainer.style.display = 'flex'
                    })
                })
            })
        })
        .catch(error => {
            console.error('produ_desta_jsn - Error al obtener datos de la API:', error);
                const productElement = document.createElement('div');
                productElement.classList.add('prod-card');
                productElement.innerHTML = `
                       <!-- Muestra el mensaje de error -->
                       Error inesperado:<br>
                       <!-- Muestra el error devuelto -->
                       ${error} <br>
                    </div>`;
                productListContainer.appendChild(productElement);
      });
})