document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 25;
    const mainImage = document.getElementById('main-image');
    const thumbnailGrid = document.getElementById('thumbnail-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const thumbnailScroller = document.getElementById('thumbnail-scroller');
    const thumbPrevBtn = document.getElementById('thumb-prev-btn');
    const thumbNextBtn = document.getElementById('thumb-next-btn');

    let currentIndex = 0;
    let thumbnails = [];

    // Generar miniaturas
    for (let i = 1; i <= totalImages; i++) {
        const number = i.toString().padStart(2, '0');
        const img = document.createElement('img');
        img.src = `pictures/${number}.jpg`;
        img.alt = `Miniatura ${i}`;
        img.classList.add('thumbnail');
        img.dataset.index = i - 1;
        thumbnailGrid.appendChild(img);
        thumbnails.push(img);
    }

    function showImage(index) {
        // Validar índice
        if (index < 0) {
            index = totalImages - 1;
        } else if (index >= totalImages) {
            index = 0;
        }
        currentIndex = index;

        const newSrc = `pictures/${(index + 1).toString().padStart(2, '0')}.jpg`;
        mainImage.src = newSrc;
        mainImage.alt = `Imagen de la galería ${index + 1}`;

        // Actualizar la miniatura activa
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');

        // Desplazar la miniatura para que esté visible
        thumbnails[index].scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    }

    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => showImage(parseInt(e.target.dataset.index)));
    });

    // Navegación de las miniaturas
    thumbPrevBtn.addEventListener('click', () => {
        thumbnailScroller.scrollBy({ left: -thumbnailScroller.clientWidth / 2, behavior: 'smooth' });
    });
    thumbNextBtn.addEventListener('click', () => {
        thumbnailScroller.scrollBy({ left: thumbnailScroller.clientWidth / 2, behavior: 'smooth' });
    });

    // Mostrar la primera imagen al cargar
    showImage(0);
});