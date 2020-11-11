window.addEventListener('load', function () {
    document.getElementById(send-button).value;
    console.log(peoplesay);

    let obj = {"number" : peoplesay};

    let jsonData = JSON.stringify(obj);

    fetch('/peoplesay', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: jsonData
    })

    .then(response => response.json())
    .then(data => {console.log(data)});


    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', function () {
        console.log("Connected");
    });

    /* --- Code to RECEIVE a socket message from the server --- */
    let chatBox = document.getElementById('chat-box-msgs');

    //Listen for messages named 'msg' from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        if (data.id === 1) {
            //Create a message string and page element
            let receivedMsg = data.name + ": " + data.msg;
            let msgEl = document.createElement('p');
            msgEl.innerHTML = receivedMsg;

            //Add the element with the message to the page
            chatBox.appendChild(msgEl);
            //Add a bit of auto scroll for the chat box
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        console.log(data);
    });

    /* --- Code to SEND a socket message to the Server --- */
    let nameInput = document.getElementById('name-input')
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        let curName = nameInput.value;
        let curMsg = msgInput.value;
        let msgObj = { "name": curName, "msg": curMsg, "id": 1 };
 
        //Send the message object to the server
        socket.emit('msg', msgObj);
    });

    let commentBox = document.getElementById('comment-box-msg');
    
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        if (data.id === 2){
            let enteredMsg = data.name + ": " + data.msg;
            let writeEl = document.createElement('p');
            writeEl.innerHTML = enteredMsg;

            commentBox.appendChild(writeEl);
    
            commentBox.scrollTop = commentBox.scrollHeight;

        }
        console.log(data);
    });
    
    let glassInput = document.getElementById('glass-input')
    let writeInput = document.getElementById('write-input');
    let enterButton = document.getElementById('enter-button');

    enterButton.addEventListener('click', function () {
        let userName = glassInput.value;
        let userMsg = writeInput.value;
        let userObj = { "name": userName, "msg": userMsg, "id": 2 };
 
        //Send the message object to the server
        socket.emit('msg', userObj);

    });
    let wordBox = document.getElementById('comment-box-three');
    
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        if (data.id === 3){
            let returnedMsg = data.name + ": " + data.msg;
            let writtenEl = document.createElement('p');
            writtenEl.innerHTML = returnedMsg;
    
            wordBox.appendChild(writtenEl);
        
            wordBox.scrollTop = wordBox.scrollHeight;
        }
        console.log(data);
    });
    
    let identityInput = document.getElementById('identity-input')
    let stateInput = document.getElementById('state-input');
    let returnButton = document.getElementById('return-button');

    returnButton.addEventListener('click', function () {
        let personName = identityInput.value;
        let personMsg = stateInput.value;
        let personObj = { "name": personName, "msg": personMsg, "id": 3 };
 
        //Send the message object to the server
        socket.emit('msg', personObj);

    });
});