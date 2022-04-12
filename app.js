const iconos = document.querySelectorAll(".escritorio__box");
const escritorio = document.querySelector(".escritorio");

let appCount = 0;

class app {
  constructor(nombre) {
    this._nombre = nombre;
  }

  agregarApp(appContent) {
    const container = document.querySelector("body");
    const app = document.createElement("div");
    appCount += 1;
    app.classList.add("ventana");
    app.innerHTML = `
    <div class="ventana__title">${this._nombre} </div>
    <div class="ventana__btn">
      <div class="ventana__button"><i class="fas fa-window-minimize"></i></div>
      <div class="ventana__button"><i class="far fa-window-restore"></i></div>
      <div class="ventana__button"><i class="fas fa-times" id="close"></i></div>
    </div>
        <div class="mydivheader myheader${appCount}"></div>
        <div class="ventana__container ">
        ${appContent.innerHTML}
        </div>
          
        `;
    container.appendChild(app);
  }

  cerrarApp(elmnt) {
    if(elmnt.id === "close"){
      console.log("dentro")
      elmnt.parentElement.parentElement.parentElement.remove()
    }
  }

  moverApp() {
    let draggableWidgets = document.querySelectorAll(".ventana");

    draggableWidgets.forEach((widget) => {
      dragElement(widget);
      function dragElement(elmnt) {
        let pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;

        if (document.querySelector(".myheader" + appCount)) {
          // si está presente, el header es desde donde se mueve el DIV:
          let myDivHeader = document.querySelectorAll(".myheader" + appCount);
          console.log(myDivHeader);

          myDivHeader.forEach((elemento) => {
            elemento.onmousedown = dragMouseDown;
            console.log(elemento);
          });
        } else {
          // de lo contrario, se mueve el DIV desde cualquier lugar dentro del DIV:
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          //guardamos el body para luego sacar su width y height
          const body = document.querySelector("body");
          //Ahora conseguimos el width de elemento actual
          let elmntWidth = elmnt.clientWidth;
          let elmntHeight = elmnt.clientHeight;
          //Teniendo el vw y vh del body ponemos topes para que los elementos no se salgan de la pantalla
          const bodyWidth = body.clientWidth - elmntWidth;
          const bodyHeight = body.clientHeight - elmntHeight;

          // set the element's new position:

          if (elmnt.offsetTop - pos2 <= 0) {
            elmnt.style.top == "0px";
          } else if (elmnt.offsetTop - pos2 >= bodyHeight) {
            elmnt.style.top == `${bodyHeight}` + "px";
          } else {
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          }

          if (elmnt.offsetLeft - pos1 <= 0) {
            elmnt.style.left == "0px";
          } else if (elmnt.offsetLeft - pos1 >= bodyWidth) {
            elmnt.style.left == `${bodyWidth}` + "px";
          } else {
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
          }
        }

        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }

        //Posicionamos el widget clickeado al frente de todo y hacemo que los elementos hermanos bajen su z-index
        elmnt.addEventListener("mousedown", () => {
          widget.style.zIndex = "1000";
          for (let sibling of elmnt.parentNode.children) {
            if (sibling !== elmnt) sibling.style.zIndex = "10";
          }
        });
      }
    });
  }
}

iconos.forEach((elmnt) => {
  elmnt.addEventListener("click", () => {
    elmnt.classList.add("escritorio__box--active");
    /*En Vanilla JS, puede recorrer los hijos de los padres y simplemente omitir el elemento en sí. Puede usar classListmétodos para agregar / eliminar la clase: */
    for (let sibling of elmnt.parentNode.children) {
      if (sibling !== elmnt)
        sibling.classList.remove("escritorio__box--active");
    }
  });
});

const sobreMiBox = document.getElementById("sobreMi")
const sobreMiVentana = new app("Sobre mi")
let sobreMiVentanaCount = 0

const sobreMiContent = document.createElement("div")
sobreMiContent.innerHTML = `
<h2 class="h2"><span class="maquina-escribir">Hola! soy Alejo Rivadeneira.</span></h2>
<p class="p">Desarrollador Front-End autodidacta de argentina.
    Me gusta el desarrollo de paginas web y aprender constantemente.</p>
    
    <p class="p">Soy de Glew, Buenos Aires. Tengo 22 años y conoci el desarrollo web en el secundario tecnico donde me recibi, a mediados de 2021 comenzo a llamarme mucho la atencion ser desarrollador front-end y decidi profesionalizarme en este rubro, ya que en aquel tiempo de colegio solo lo veia como pasatiempo.
    </p>
        <p class="p">Quiero crecer como desarrollador, estoy constantemente practicando y capacitandome para poder trabajar de esto.</p>
` 
 sobreMiBox.addEventListener("dblclick",(e)=>{
   if (sobreMiVentanaCount == 0) {
     sobreMiVentana.agregarApp(sobreMiContent)
     sobreMiVentana.moverApp()
     sobreMiVentanaCount = 1;
   } else {
    alert("La app ya está abierta");
   }
 })

 document.querySelector("body").addEventListener("click", (e) => {
  sobreMiVentana.cerrarApp(e.target)
 })



const educacionBox = document.getElementById("educacion")
const educacionVentana = new app("Educación")
let educacionVentanaCount = 0

const educacionContent = document.createElement("div")
educacionContent.innerHTML = `
<h2> asd </h2>
`
educacionBox.addEventListener("dblclick", ()=>{
  if (educacionVentanaCount == 0) {
    educacionVentana.agregarApp(educacionContent)
    educacionVentana.moverApp()
    educacionVentanaCount = 1;
  } else {
    alert("La app ya está abierta");
  }
})

const habilidadesBox = document.getElementById("habilidades")
const habilidadesVentana = new app("Habilidades")
let habilidadesVentanaCount = 0

const habilidadesContent = document.createElement("div")
habilidadesContent.innerHTML = `
<h2> asd </h2>
`
habilidadesBox.addEventListener("dblclick", ()=>{
  if (habilidadesVentanaCount == 0) {
    habilidadesVentana.agregarApp(habilidadesContent)
    habilidadesVentana.moverApp()
    habilidadesVentanaCount = 1;
  } else {
    alert("La app ya está abierta");
  }

})

const proyectosBox = document.getElementById("proyectos")
const proyectosVentana = new app("Proyectos")
let proyectosVentanaCount = 0

const proyectosContent = document.createElement("div")
proyectosContent.innerHTML = `
<h2> asd </h2>
`
proyectosBox.addEventListener("dblclick", ()=>{
  if (proyectosVentanaCount == 0) {
    proyectosVentana.agregarApp(proyectosContent)
    proyectosVentana.moverApp()
    proyectosVentanaCount = 1;
  } else {
    alert("La app ya está abierta");
  }
})

