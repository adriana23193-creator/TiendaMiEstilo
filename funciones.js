// ===== PRODUCTOS =====
const productosPorPagina = 6;
let paginaActual = 1;

const productos = [
    {
        img: "img/p1.jpg",
        titulo: "Chaqueta Impermeable Trail",
        categoria: "Chaquetas",
        descripcion: "Material Gore-Tex, resistente al viento y lluvia. Ideal para rutas exigentes.",
        precio: "₡65,000"
    },
    {
        img: "img/zap.jpg",
        titulo: "Botas de Montaña Pro",
        categoria: "Calzado",
        descripcion: "Suela Vibram con agarre extremo. Soporte de tobillo reforzado.",
        precio: "₡89,000"
    },
    {
        img: "img/blus.png",
        titulo: "Camiseta Técnica Dry-Fit",
        categoria: "Ropa de Montaña",
        descripcion: "Transpirable y de secado rápido. Protección UV50+.",
        precio: "₡18,500"
    },
    {
        img: "img/jobackpa.jpg",
        titulo: "Mochila de Senderismo 40L",
        categoria: "Accesorios",
        descripcion: "Sistema de suspensión ergonómica. Porta hidratación incluido.",
        precio: "₡55,000"
    },
    {
        img: "img/shor.jpg",
        titulo: "Pantalón Convertible Trekking",
        categoria: "Ropa de Montaña",
        descripcion: "Se convierte en short. Tejido ripstop resistente a desgarros.",
        precio: "₡32,000"
    },
    {
        img: "img/aacce.jpg",
        titulo: "Gorra Técnica Ventilada",
        categoria: "Accesorios",
        descripcion: "Malla transpirable lateral. Visera larga para sol intenso.",
        precio: "₡12,000"
    },
    {
        img: "img/sueter.jpg",
        titulo: "Fleece Polar Mountain",
        categoria: "Chaquetas",
        descripcion: "Forro polar de alta densidad. Perfecto para el amanecer en el Chirripó.",
        precio: "₡42,000"
    },
    {
        img: "img/gafa.jpg",
        titulo: "Gafas de Sol Polarizadas",
        categoria: "Accesorios",
        descripcion: "Protección UV400. Marco irrompible TR-90 para deportes extremos.",
        precio: "₡27,500"
    },
    {
        img: "img/calcetines.jpg",
        titulo: "Calcetines Merino Wool",
        categoria: "Accesorios",
        descripcion: "Lana merino con acolchado en zonas de impacto. Anticampollas.",
        precio: "₡8,500"
    },
    {
        img: "img/bas.jpg",
        titulo: "Bastones de Trekking",
        categoria: "Equipos",
        descripcion: "Aluminio 7075, empuñadura de corcho. Par completo con punteras.",
        precio: "₡38,000"
    },
    {
        img: "img/cort.jpg",
        titulo: "Cortavientos Ultralight",
        categoria: "Chaquetas",
        descripcion: "Pesa solo 120g. Se empaca en su propio bolsillo. Resistente al agua.",
        precio: "₡29,000"
    },
    {
        img: "img/gua.jpg",
        titulo: "Guantes de Senderismo",
        categoria: "Accesorios",
        descripcion: "Palma reforzada con cuero sintético. Dedos táctiles para usar el celular.",
        precio: "₡14,000"
    }
];

// ===== MOSTRAR PRODUCTOS =====
function mostrarProductos() {
    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = "";

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);

    productosPagina.forEach(producto => {
        const columna = document.createElement("div");
        columna.className = "col-md-4 mb-4";
        columna.innerHTML = `
        <div class="card producto-card h-100">
            <img src="${producto.img}" class="card-img-top" alt="${producto.titulo}">
            <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <span class="badge bg-primary mb-2">${producto.categoria}</span>
                <p>${producto.descripcion}</p>
                <h4 class="text-primary">${producto.precio}</h4>
                <button class="btn btn-primary w-100 comprar-btn">
                    <i class="bi bi-cart-plus me-2"></i>Comprar
                </button>
            </div>
        </div>`;
        contenedor.appendChild(columna);
    });

    mostrarPaginacion();
    iniciarBotonesComprar();
    iniciarAnimaciones();
}

// ===== PAGINACIÓN =====
function mostrarPaginacion() {
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === paginaActual ? "active" : ""}`;

        const enlace = document.createElement("button");
        enlace.className = "page-link";
        enlace.textContent = i;

        enlace.addEventListener("click", () => {
            paginaActual = i;
            mostrarProductos();
            window.scrollTo({
                top: document.getElementById("productos").offsetTop - 100,
                behavior: "smooth"
            });
        });

        li.appendChild(enlace);
        paginacion.appendChild(li);
    }
}

// ===== INICIO =====
document.addEventListener("DOMContentLoaded", () => {
    iniciarContadores();
    iniciarBotonTop();
    mostrarProductos();
});

// ===== CONTADORES ANIMADOS =====
function iniciarContadores() {
    const contadores = document.querySelectorAll(".contador");
    contadores.forEach(contador => {
        const objetivo = parseInt(contador.getAttribute("data-numero"));
        let valorActual = 0;
        const incremento = objetivo / 100;
        const actualizar = () => {
            valorActual += incremento;
            if (valorActual < objetivo) {
                contador.innerText = Math.floor(valorActual).toLocaleString();
                requestAnimationFrame(actualizar);
            } else {
                contador.innerText = objetivo.toLocaleString();
            }
        };
        actualizar();
    });
}

// ===== BOTÓN VOLVER ARRIBA =====
function iniciarBotonTop() {
    const boton = document.getElementById("btnTop");
    window.addEventListener("scroll", () => {
        boton.classList.toggle("mostrar", window.scrollY > 300);
    });
    boton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===== BOTONES COMPRAR =====
function iniciarBotonesComprar() {
    const botones = document.querySelectorAll(".comprar-btn");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const tarjeta = e.target.closest(".producto-card");
            const titulo = tarjeta.querySelector(".card-title").textContent;
            alert(` "${titulo}" fue agregado al carrito.\n¡Gracias por tu compra en MiEstiloCR!`);
        });
    });
}

// ===== ANIMACIONES DE SCROLL =====
function iniciarAnimaciones() {
    const elementos = document.querySelectorAll(".producto-card, .testimonial");
    const observer = new IntersectionObserver(
        entradas => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.15 }
    );
    elementos.forEach(el => observer.observe(el));
}

// ===== CAMBIO DE COLOR NAVBAR =====
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("navbar-scroll", window.scrollY > 100);
});

// ===== SCROLL SUAVE MENÚ =====
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener("click", function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));
        if (destino) {
            destino.scrollIntoView({ behavior: "smooth" });
        }
    });
});


 
const EMAILJS_PUBLIC_KEY  = "BuNnIRZgoT9jz5OgB";      //Public Key
const EMAILJS_SERVICE_ID  = "service_jkqwvgn";      // Service ID
const EMAILJS_TEMPLATE_ID = "template_3mx6qxf";     // Template ID
 
// Inicializar EmailJS
(function () {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();
 
// ===== ENVÍO CON EMAILJS =====
function enviarCorreoEmailJS() {
    const nombre  = document.getElementById("nombre").value.trim();
    const correo  = document.getElementById("correo").value.trim();
    const fecha   = document.getElementById("fecha").value;
    const mensaje = document.getElementById("mensaje").value.trim();
    const form    = document.getElementById("formContacto");
    const alerta  = document.getElementById("alertaCorreo");
    const spinner = document.getElementById("spinnerCorreo");
    const btnEnviar = document.getElementById("btnEnviar");
 
    // Validación
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        mostrarAlerta("alerta-warning", "Por favor completa todos los campos requeridos.");
        return;
    }
 
    // Mostrar spinner y deshabilitar botón
    spinner.classList.remove("d-none");
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
 
    // Parámetros que coinciden con las variables del template en EmailJS
    const parametros = {
        nombre:  nombre,
        correo:  correo,
        fecha:   fecha || "No indicada",
        mensaje: mensaje
    };
 
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, parametros)
        .then(() => {
            mostrarAlerta("alert-success",
                `¡Mensaje enviado, ${nombre}! Te responderemos pronto a <strong>${correo}</strong>.`);
            form.reset();
            form.classList.remove("was-validated");
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            mostrarAlerta("alert-danger",
                " Hubo un error al enviar el mensaje. Verifica tu configuración de EmailJS o inténtalo más tarde.");
        })
        .finally(() => {
            spinner.classList.add("d-none");
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Correo';
        });
}
 
// Mostrar alerta de resultado
function mostrarAlerta(tipo, texto) {
    const alerta = document.getElementById("alertaCorreo");
    alerta.className = `alert ${tipo}`;
    alerta.innerHTML = texto;
    alerta.classList.remove("d-none");
    alerta.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => alerta.classList.add("d-none"), 7000);
}
 
// Limpiar formulario
function limpiarFormulario() {
    const form = document.getElementById("formContacto");
    form.reset();
    form.classList.remove("was-validated");
    document.getElementById("alertaCorreo").classList.add("d-none");
}