const passwordModal = document.getElementById("passwordModal");
const eventFormModal = document.getElementById("eventFormModal");
const addEventButton = document.getElementById("addEventButton");
const passwordSubmit = document.getElementById("passwordSubmit");
const passwordInput = document.getElementById("passwordInput");
const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");

// Mostrar el modal de contraseña cuando se hace clic en el botón "Add Event"
addEventButton.addEventListener("click", function () {
  passwordModal.style.display = "block";
});

// Cerrar el modal si se hace clic fuera de él o se presiona la tecla Esc
window.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    (passwordModal.style.display === "block" ||
      eventFormModal.style.display === "block")
  ) {
    passwordModal.style.display = "none";
    eventFormModal.style.display = "none";
  }
});

// Presionar el botón de enviar contraseña al presionar la tecla Enter
passwordInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que el formulario se envíe
    passwordSubmit.click(); // Simular clic en el botón de enviar contraseña
  }
});

// Verificar la contraseña y mostrar el modal del formulario de evento
passwordSubmit.addEventListener("click", function () {
  const password = ""; // Reemplazar con tu contraseña
  const enteredPassword = passwordInput.value;
  if (enteredPassword === password) {
    passwordModal.style.display = "none";
    eventFormModal.style.display = "block"; // Mostrar el modal del formulario de evento
  } else {
    alert("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
  }
});

// Función para guardar el evento en el almacenamiento local
function saveEvent(event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const eventName = document.getElementById("eventName").value;
  const eventPhoto = document.getElementById("eventPhoto").value;
  const eventDateTime = document.getElementById("eventDateTime").value;
  const eventRed = document.getElementById("eventRed").value;
  const eventNFTQuantity = document.getElementById("eventNFTQuantity").value;
  const eventMintPrice = document.getElementById("eventMintPrice").value;
  const eventMintLink = document.getElementById("eventMintLink").value;
  const eventTwitter = document.getElementById("eventTwitter").value;
  const eventDiscord = document.getElementById("eventDiscord").value;

  // Crear objeto de evento
  const eventData = {
    name: eventName,
    photoLink: eventPhoto,
    datetime: eventDateTime,
    red: eventRed,
    nftQuantity: eventNFTQuantity,
    mintPrice: eventMintPrice,
    mintLink: eventMintLink,
    twitter: eventTwitter,
    discord: eventDiscord,
  };

  // Obtener los eventos guardados del almacenamiento local
  let savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];

  // Agregar el nuevo evento a la lista de eventos guardados
  savedEvents.push(eventData);

  // Guardar la lista actualizada de eventos en el almacenamiento local
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

  // Mostrar el evento en la página
  displayEvent(eventData);

  // Limpiar el formulario
  eventForm.reset();

  // Cerrar el modal del formulario de evento
  eventFormModal.style.display = "none";
}

// Función para mostrar el evento en la página
function displayEvent(eventData) {
  const eventItem = document.createElement("li");
  const eventDateTime = new Date(eventData.datetime).toLocaleString(); // Formatear la fecha y hora
  eventItem.innerHTML = `
    <div class="event-content">
      <strong>Nombre del Evento:</strong> ${eventData.name}<br>
      <strong>Link de la Foto:</strong> <img src="${eventData.photoLink || 'placeholder.jpg'}" alt="Evento"><br>
      <strong>Fecha y Hora:</strong> ${eventDateTime}<br>
      <strong>Red:</strong> ${eventData.red}<br>
      <strong>Cantidad de NFT:</strong> ${eventData.nftQuantity}<br>
      <strong>Precio de Minteo:</strong> ${eventData.mintPrice}<br>
      <strong>Link del Minteo:</strong> <a href="${eventData.mintLink || '#'}" target="_blank">${eventData.mintLink || 'N/A'}</a><br>
      <strong>Twitter:</strong> <a href="${eventData.twitter || '#'}" target="_blank">${eventData.twitter || 'N/A'}</a><br>
      <strong>Discord:</strong> <a href="${eventData.discord || '#'}" target="_blank">${eventData.discord || 'N/A'}</a><br>
    </div>
    <button class="delete-event-btn">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;

  // Agregar el evento a la lista de eventos
  eventList.appendChild(eventItem);

  // Agregar evento de clic al botón de eliminación
  const deleteButton = eventItem.querySelector(".delete-event-btn");
  deleteButton.addEventListener("click", function () {
    deleteEvent(eventItem);
  });
}

// Función para eliminar un evento
function deleteEvent(eventItem) {
  // Obtener el índice del evento en la lista
  const index = Array.from(eventList.children).indexOf(eventItem);

  // Obtener los eventos guardados del almacenamiento local
  let savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];

  // Eliminar el evento del arreglo de eventos guardados
  savedEvents.splice(index, 1);

  // Guardar la lista actualizada de eventos en el almacenamiento local
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

  // Eliminar el evento de la lista en la página
  eventItem.remove();
}

// Mostrar eventos guardados al cargar la página
function loadEvents() {
   const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
   savedEvents.forEach((event) => {
     displayEvent(event); // Llamar a displayEvent() con el objeto de evento completo
   });
 }

loadEvents();