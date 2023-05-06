const socket = io();
const messageInput = document.querySelector('#input-msg');
const messagesContainer = document.querySelector('#messagesContainer');
const sendBtn = document.querySelector('#sendButton');
const name = prompt('Enter your name: ');

socket.emit('new-user-joined', name);

const appendMessage = (msg, cssClasses) => {
  const message = document.createElement('div');
  message.textContent = msg;
  message.classList.add(...cssClasses);
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

};

const sendMessage = () => {
  const message = messageInput.value;
  const ownMessage = document.createElement('div');

  ownMessage.classList.add('mb-4', 'flex', 'flex-row-reverse', 'message', 'w-[26rem]');
  ownMessage.innerHTML = `
    <div class="rounded-md bg-white px-4 py-2">
      <span class="text-base text-blue-400">you</span>
      <p id="my-msg" class="text-lg leading-tight text-blue-950">${message}</p>
    </div>
  `;
  messagesContainer.append(ownMessage);
  messagesContainer.querySelectorAll('.message')[0].style.marginTop = '10px';

  socket.emit('send', message);
  messageInput.value = '';
};

sendBtn.addEventListener('click', event => {
  event.preventDefault();
  sendMessage();
});

messageInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') { sendMessage(); }
});

socket.on('user-joined', name => {
  appendMessage(`${name} joined the chatroom`, ['text-center', 'text-blue-950', 'text-base', 'opacity-70']);
});

socket.on('receive', data => {
  const otherMessage = document.createElement('div');
  otherMessage.classList.add('mb-4', 'flex', 'message', 'w-[26rem]');
  otherMessage.innerHTML = `
    <div class="rounded-md bg-white px-4 py-2">
      <span id="other" class="text-base text-blue-400">${data.name}</span>
      <p id="other-msg" class="text-lg leading-tight text-blue-950">${data.message}</p>
    </div>
  `;
  messagesContainer.append(otherMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  messagesContainer.classList.add('scroll-down');

});