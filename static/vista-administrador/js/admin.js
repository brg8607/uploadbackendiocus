import { API } from "./config.js";

const btn = document.querySelector("button[onclick='añadirCurso()']");
btn.addEventListener("click", crearCurso);

async function crearCurso() {
  const nombre   = document.getElementById("Course_name").value.trim();
  const desc     = document.getElementById("course_description").value.trim();

  // 1. envía al backend
  const res = await fetch(`${API}/api/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: nombre, description: desc, teacher_id: 1 })
  });

  if (!res.ok) { alert("Error guardando curso"); return; }

  const curso = await res.json();   // trae id y code

  // 2. pinta la tarjeta
  const cont = document.getElementById("contenedor-cursos");
  cont.insertAdjacentHTML("beforeend", tarjetaHTML(curso));

  // 3. limpia inputs
  document.getElementById("Course_name").value = "";
  document.getElementById("course_description").value = "";
}

function tarjetaHTML(c) {
  return `
  <div class="col-md-4">
    <a href="curso.html?id=${c.id}" class="text-decoration-none text-dark">
      <div class="card border" style="transition:box-shadow .3s"
           onmouseover="this.style.boxShadow='0 8px 16px rgba(0,0,0,.3)'"
           onmouseout="this.style.boxShadow='none'">
        <img src="img/photos/unsplash-1.jpg" class="card-img-top"
             alt="Imagen del Curso" style="max-height:200px;object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title">${c.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Código: ${c.code}</h6>
          <p class="card-text">${c.description}</p>
        </div>
      </div>
    </a>
  </div>`;
}
