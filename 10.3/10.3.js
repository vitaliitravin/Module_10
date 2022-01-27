// Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

// Добавить в чат механизм отправки гео-локации

// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. 
// Сообщение, которое отправит обратно эхо-сервер, не выводить.

const wsUri = "wss://echo.websocket.org/";

document.addEventListener('DOMContentLoaded', function() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  
  const geoBtn = document.querySelector(".btn-geo");
  const mapLink = document.querySelector('#map-link');
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  };
  
  socket.onmessage = (event) => {
    writeToScreen(event.data, true);
  };
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  };
  
  
  sendBtn.addEventListener('click', function() {
     if (!input.value) return;
      else {
        socket.send(input.value);
        writeToScreen(input.value, false);
        input.value === "";
      }
  });
  
  function writeToScreen (message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved": "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }

 //Геолокация
  
  const geoError = () => {
    infoOutput.innerText = "Невозможно получить ваше местоположение";
    // writeToScreen('Невозможно получить ваше местоположение', false);
  };
  
  const geoSuccess = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
  
    const geoLink = mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // const geoText = mapLink.textContent = 'Гео-локация';
    writeToScreen(`<a href=${geoLink} target="_blank">Гео-локация</a>`, false)
  };

  geoBtn.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';
    
    if(!navigator.geolocation) {
      infoOutput.innerText = 'Geolocation не поддерживается вашим браузером';
    } else {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
  });
})