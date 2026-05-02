/* ===== CARRUSEL ===== */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let carouselInterval = null;

window.onload = () => {
    initCarousel();
    startCarousel();
    showSectionById('hero');
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

function irAContacto() {
    showSectionById("contacto");
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
        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
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
    bbc: { folder: "", prefix: "bbc", ext: "jpg", files: [] },
    biker: { folder: "", prefix: "biker", ext: "jpg", files: [] },
    prendas: { folder: "", prefix: "prendas", ext: "jpg", files: [] }
};

    const cat = config[categoria];
    if (!cat) return;

    if (!cat.files || cat.files.length === 0) {
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

        return variants;
    };

    cat.files.forEach((number) => {
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

    const data = {
        modelaje: {
            img: "img/modelaje/modelaje1.JPG",
            title: "Modelaje",
            text: "Capturando estilo y personalidad."
        },
        mascotas: {
            img: "img/mascotas/mascotas1.jpg",
            title: "Mascotas",
            text: "Momentos únicos con tus mejores amigos."
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
        prendas: {
            img: "img/prendas1.jpg",
            title: "Prendas",
            text: "Detalles que destacan."
        }
    };

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
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
}