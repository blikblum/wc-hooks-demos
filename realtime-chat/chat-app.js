import firebase from 'https://unpkg.com/@firebase/app@0.x?module'
import { component, html, useState, useEffect, useContext } from 'https://unpkg.com/haunted/haunted.js?module';
import { DbContext } from './db-context.js'

function ChatApp() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState({});

  const db = useContext(DbContext);

  const chatRoomMessages = db.collection('chatrooms')
    .doc('global')
    .collection('messages')

    

  useEffect(() => {
    const handleNewMessages = snap => {
      // avoid updating messages when there are no changes
      const changes = snap.docChanges()
      if (changes.length) {
        setMessages(snap.docs.map(doc => doc.data()))
      }      
    }
    const unsubscribe = chatRoomMessages.orderBy('date').onSnapshot(handleNewMessages);
    return unsubscribe;
  }, []);

  const handleNameChange = e => setNickname(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handleClick = e => {
    db.collection('nicknames').add({
      nickname,
      email,
    });
    setJoined(true);
  };

  const handleMsgChange = e => setMsg(e.target.value);
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      chatRoomMessages.add({
        sender: nickname,
        msg,
        date: firebase.firestore.Timestamp.fromDate(new Date())
      });
      setMsg("");
    }
  };

  return html`
    <div class="App">
      ${!joined
        ? html`
            <div class="joinForm">
              <input
                class="form-control"
                placeholder="Nickname"
                .value=${nickname}
                @change=${handleNameChange}
              /><br /><input
                class="form-control"
                placeholder="Email"
                .value=${email}
                @change=${handleEmailChange}
              /><br /><button class="btn btn-primary" @click=${handleClick}>Join</button>
            </div>
          `
        : html`
            <div class="chat">
              <div class="messages">
                ${Object.keys(messages).map(message => {
                  if (messages[message]["sender"] === nickname)
                    return html`
                      <div class="message">
                        <span id="me">${messages[message]["sender"]} :</span
                        ><br />${messages[message]["msg"]}
                      </div>
                    `;
                  else
                    return html`
                      <div class="message">
                        <span id="sender">${messages[message]["sender"]} :</span
                        ><br />${messages[message]["msg"]}
                      </div>
                    `;
                })}
              </div>
              <input
                class="form-control"
                placeholder="msg"
                @input=${handleMsgChange}
                @keydown=${handleKeyDown}
                .value=${msg}
              /><br />
            </div>
          `}
    </div>
  `;  
}

customElements.define('chat-app', component(ChatApp, {useShadowDOM: false}));