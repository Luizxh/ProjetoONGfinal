
  const botaoMenu = document.getElementById("btn-menu");
  const menuLista = document.getElementById("menu-lista");

  botaoMenu.addEventListener("click", () => {
    menuLista.classList.toggle("mostrar");
  });

