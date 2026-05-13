/* ===== CARRUSEL ===== */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let carouselInterval = null;

const config = {
    modelaje: {
        folder: "modelaje",
        prefix: "modelaje",
        ext: "JPG",
        files: [
            1,2,3,4,5,6,7,8,9,10,12,13,14,15,18,19,20,21,22,24,25,26,27,28,
            34,35,36,42,43,44,48,49,50,53,54,55,56
        ]
    },
    mascotas: {
        folder: "mascotas",
        prefix: "mascotas",
        ext: "jpg",
        files: Array.from({ length: 25 }, (_, i) => i + 1)
    },
    comida: {
        folder: "comida",
        prefix: "comida",
        ext: "jpg",
        files: Array.from({ length: 77 }, (_, i) => i + 1)
    },
    eventos: {
        folder: "eventos",
        prefix: "FOTOGRAFIA-",
        ext: "JPG",
        files: [1]
    },
    bbc: { folder: "", prefix: "bbc", ext: "jpg", files: [] },
    biker: { folder: "", prefix: "biker", ext: "jpg", files: [] },
    fotosUrbanas: { folder: "fotos-urbanas", prefix: "fotos-urbanas", ext: "jpg", files: [] },
    discotecas: { folder: "discotecas", prefix: "discotecas", ext: "jpg", files: [] },
    producto: { folder: "producto", prefix: "producto", ext: "jpg", files: [] },
    portafolioComercial: { folder: "portafolio-comercial", prefix: "FOTOGRAFIA-", ext: "jpg", files: Array.from({ length: 57 }, (_, i) => i + 1) },
    deportes: { folder: "deportes", prefix: "deportes", ext: "jpg", files: [] }
};

// Banner de cada categoría del portafolio. Cambia aquí la foto que quieres mostrar en el encabezado.
const data = {
    modelaje: {
        img: "img/modelaje/modelajebanner.JPG",
        title: "Modelaje",
        text: "Capturando estilo y personalidad."
    },
    mascotas: {
        img: "img/mascotas/mascotas1.jpg",
        title: "Mascotas",
        text: "Momentos únicos con tus mejores amigos."
    },
    eventos: {
        img: "img/eventos/FOTOGRAFIA-1.JPG",
        title: "Eventos",
        text: "Instantes especiales con estilo y emoción."
    },
    bbc: {
        img: "img/bbc1.jpg",
        title: "BBC",
        text: "Producción visual creativa."
    },
    comida: {
        img: "img/comida/comida1.jpg",
        title: "Comida",
        text: "Fotografía que despierta el apetito."
    },
    biker: {
        img: "img/biker1.jpg",
        title: "Biker",
        text: "Velocidad y estilo."
    },
    fotosUrbanas: {
        img: "img/fotos-urbanas/fotos-urbanas1.jpg",
        title: "Fotos Urbanas",
        text: "Capturando la esencia de la ciudad."
    },
    discotecas: {
        img: "img/discotecas/discotecas1.jpg",
        title: "Discotecas",
        text: "Noches llenas de energía y diversión."
    },
    producto: {
        img: "img/producto/bannerproducto.jpg",
        title: "Producto",
        text: "Fotografía de productos con detalle."
    },
    portafolioComercial: {
        img: "img/portafolio-comercial/bannerportafoliocomercial.JPG",
        title: "Portafolio Comercial",
        text: "Trabajos comerciales profesionales."
    },
    deportes: {
        img: "img/deportes/deportes1.jpg",
        title: "Deportes",
        text: "Acción y adrenalina en cada captura."
    }
};

window.onload = () => {
    initCarousel();
    startCarousel();
    showSectionById('hero');
    actualizarHero('modelaje');
};

/* ===== CARRUSEL ===== */
function initCarousel() {
    updateCarousel();
}

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

function startCarousel() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5500);
}

function goSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    updateCarousel();
}

function prevSlide() {
    goSlide(currentSlide - 1);
}

function nextSlide() {
    goSlide(currentSlide + 1);
}

/* ===== SECCIONES ===== */
function showSectionById(id) {
    document.querySelectorAll("section").forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) {
        target.style.display = "block";
        target.classList.add("active-section");
    }

    if (id === "hero") {
        const principal = document.getElementById("principal");
        if (principal) {
            principal.style.display = "block";
            principal.classList.add("active-section");
        }
    }

    // menú hamburguesa SOLO en portafolio
    const burger = document.querySelector(".menu-hamburguesa");
    const menu = document.getElementById("menuFiltros");

    if (id === "fotos") {
        burger.style.display = "flex";
    } else {
        burger.style.display = "none";
        menu.classList.remove("activo");
        burger.classList.remove("open");
    }
}

/* ===== NAVEGACIÓN ===== */
function irAInicio() {
    showSectionById("hero");
}

function mostrarSeccion(id) {
    showSectionById(id);
}

function irAPortafolio() {
    showSectionById("fotos");

    setTimeout(() => {
        cambiarCategoria("modelaje");
    }, 50);
}

function irAContacto() {
    showSectionById("experiencia");
    setTimeout(() => {
        const contacto = document.getElementById("contacto");
        if (contacto) {
            contacto.scrollIntoView({ behavior: "smooth" });
        }
    }, 100);
}

function filtrar(categoria) {
    cambiarCategoria(categoria);
}

/* ===== MENÚ ===== */
function toggleMenuFiltro() {
    document.getElementById("menuFiltros").classList.toggle("activo");
    document.querySelector(".menu-hamburguesa").classList.toggle("open");
}

/* ===== CATEGORÍAS ===== */
function cambiarCategoria(categoria) {
    actualizarHero(categoria);
    cargarGaleria(categoria);

    // cerrar menú
    document.getElementById("menuFiltros").classList.remove("activo");
    document.querySelector(".menu-hamburguesa").classList.remove("open");
}

/* ===== GALERÍA ===== */
function cargarGaleria(categoria) {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = ""; // 🔥 evita duplicados

    const cat = config[categoria];
    if (!cat) return;

    const files = Array.isArray(cat.files)
        ? [...cat.files].sort((a, b) => Number(a) - Number(b))
        : [];

    if (files.length === 0) {
        const aviso = document.createElement("div");
        aviso.className = "galeria-empty";
        aviso.textContent = "No hay fotos disponibles para esta categoría.";
        galeria.appendChild(aviso);
        return;
    }

    const fallbackPaths = (category, number) => {
        const base = cat.folder ? `img/${cat.folder}/${cat.prefix}${number}` : `img/${cat.prefix}${number}`;
        const variants = [
            `${base}.${cat.ext}`,
            `${base}.${cat.ext.toUpperCase()}`
        ];

        if (category === "modelaje") {
            variants.push(`img/modelaje/modelaje0${number}.JPG`);
            variants.push(`img/modelaje/modelaje0${number}.jpg`);
            variants.push(`img/modelaje/modelaje ${number}.JPG`);
            variants.push(`img/modelaje/modelaje ${number}.jpg`);
        }

        if (category === "portafolioComercial") {
            variants.push(`img/portafolio-comercial/FOTOGRAFIA-${number}.jpg`);
            variants.push(`img/portafolio-comercial/FOTOGRAFIA-${number}.JPG`);
            variants.push(`img/portafolio-comercial/FOTOGRAFIA${number}.jpg`);
            variants.push(`img/portafolio-comercial/FOTOGRAFIA${number}.JPG`);
        }

        return variants;
    };

    files.forEach((number) => {
        const img = document.createElement("img");
        img.alt = categoria;
        img.classList.add(categoria);

        const paths = fallbackPaths(categoria, number);
        let currentIndex = 0;

        const loadNext = () => {
            if (currentIndex >= paths.length) {
                img.remove();
                return;
            }
            img.src = paths[currentIndex];
            currentIndex += 1;
        };

        img.addEventListener("error", loadNext);
        img.addEventListener("load", () => {
            img.classList.add("show");
        });

        loadNext();
        galeria.appendChild(img);
    });
}

/* ===== HERO DINÁMICO ===== */
function actualizarHero(categoria) {
    const hero = document.getElementById("categoriaHero");

    const d = data[categoria];
    if (!d) return;

    hero.style.backgroundImage = `url('${d.img}')`;
    hero.querySelector(".categoria-hero-title").textContent = d.title;
    hero.querySelector(".categoria-hero-text").textContent = d.text;

    // animación tipo carrusel
    hero.classList.remove("fade-in");
    void hero.offsetWidth;
    hero.classList.add("fade-in");
}

/* ===== VIDEOS ===== */
function irAVideos(id) {
    showSectionById(id);

    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, 200);
}