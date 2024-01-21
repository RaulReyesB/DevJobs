//const { set } = require("mongoose");

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelector(".lista-conocimientos");

  if (skills) {
    skills.addEventListener("click", agregarSkills);

    // Una vez que estamos en editar llamar la funcion
    skillsSelecionados();
  }
});

const skills = new Set();
const agregarSkills = (e) => {
  if (e.target.tagName === "LI") {
    if (e.target.classList.contains("activo")) {
      //quitarlo del ser y quitar la clase
      skills.delete(e.target.textContent);
      e.target.classList.remove("activo");
    } else {
      //agregarlo al set y agregar la clase
      skills.add(e.target.textContent);
      e.target.classList.add("activo");
    }
  }
  const skillsArray = [...skills];
  document.querySelector("#skills").value = skillsArray;
};

const skillsSelecionados = () => {
  const seleccionadas = Array.from(
    document.querySelectorAll(".lista-conocimientos .activo")
  );

  seleccionadas.forEach((seleccionadas) => {
    skills.add(seleccionadas.textContent);
  });

  const skillsArray = [...skills];
  document.querySelector("#skills").value = skillsArray;
};
