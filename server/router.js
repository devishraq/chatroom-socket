const express = require('express');
const path = require('path');
const router = express.Router()
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'join.html')));
router.get('/chatroom', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'chat.html')));
module.exports = router;