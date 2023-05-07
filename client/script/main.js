const socket = io();
const messageInput = document.querySelector('#input-msg');
const messagesContainer = document.querySelector('#messagesContainer');
const sendBtn = document.querySelector('#sendButton');
const name = localStorage.getItem('name');

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
  let tailwindClasses = ['mb-4', 'flex', 'flex-row-reverse', 'message']
  ownMessage.classList.add(...tailwindClasses);
  ownMessage.innerHTML = `
    <div class="rounded-md bg-white px-4 py-2">
      <span class="text-base text-blue-400">you</span>
      <p id="my-msg" class="text-lg leading-tight text-blue-950">${message}</p>
    </div>
  `;
  messagesContainer.append(ownMessage);
  messagesContainer.querySelectorAll('.message')[0].style.marginTop = '20px';
  socket.emit('send', message);
  messageInput.value = '';

};


sendBtn.addEventListener('click', event => {
  event.preventDefault();
  sendMessage()
  messagesContainer.classList.add('scrollw-down');
});
messageInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') { sendMessage(); }
});

socket.on('user-joined', name => {
  let tailwindClasses = ['text-center', 'text-blue-950', 'text-base', 'opacity-70'];
  appendMessage(`${name} has joined the chatroom`, tailwindClasses);
});

socket.on('receive', data => {
  const otherMessage = document.createElement('div');
  let tailwindClasses = ['mb-4', 'flex', 'message']
  otherMessage.classList.add(...tailwindClasses);
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

socket.on('left', name => {
  let tailwindClasses = ['text-center', 'text-blue-950', 'text-base', 'opacity-70']
  appendMessage(`${name} has left the chatroom`, tailwindClasses);
})