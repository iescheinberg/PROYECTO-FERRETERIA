document.addEventListener('DOMContentLoaded', function(){
    const productListContainer = document.getElementById('product-list');
    const productDetailContainer = document.getElementById('product-detail');

    fetch('prod_completo.json')
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

            var lastPositionList = 0;
//          var lastPositionDetail = 0;
            var lastPositionDetail = 130; //es el offsetTop de productDetailContainer en PC...no va en celus
            const detailButtons = document.querySelectorAll('.detail-button');
            detailButtons.forEach(button =>{
                button.addEventListener('click', function(){
                    lastPositionList = document.documentElement.scrollTop;
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
//                  window.scrollTo(0, 0);
                    window.scrollTo(0, lastPositionDetail);

                    const backButton = document.getElementById('back-button');
                    backButton.addEventListener('click', function(){
                        lastPositionDetail = productDetailContainer.offsetTop;
                        productDetailContainer.style.display = 'none';
                        productListContainer.style.display = 'flex';
                        window.scrollTo(0, lastPositionList);
                    })
                })
            })
        })
        .catch(error => {
            console.error('prod_completo - Error al obtener datos de la API:', error);
                const productElement = document.createElement('div');
                productElement.classList.add('prod-card');
                productElement.innerHTML = `
                       Error inesperado:<br>
                       ${error} <br>
                    </div>`;
                productListContainer.appendChild(productElement);
      });
})