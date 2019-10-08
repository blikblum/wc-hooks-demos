import firebase from 'https://unpkg.com/@firebase/app@0.x?module'
import { LitElement, html } from 'https://unpkg.com/lit-element@2.2.1/lit-element.js?module';


class ChatApp extends LitElement {
  static get properties() {
    return {
      nickname: {type: String},
      email: {type: String},
      joined: {type: Boolean},
      msg: {type: String},
      messages: {type: Array},
    }
  }

  constructor() {
    super() 
    this.nickname = ''
    this.email = ''
    this.joined = false
    this.msg = ''
    this.messages = []
  }

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this.db = firebase.firestore()
    this.chatRoomMessages = this.db
      .collection('chatrooms')
      .doc('global')
      .collection('messages')
    
    this._unsubscribe = this.chatRoomMessages
      .orderBy('date')
      .onSnapshot(snap => {
        // avoid updating messages when there are no changes
        const changes = snap.docChanges()
        if (changes.length) {
          this.messages = snap.docs.map(doc => doc.data())
        }      
      });    
  }

  disconnectedCallback() {    
    super.disconnectedCallback()
    this._unsubscribe()
  }

  handleClick() {
    this.db.collection('nicknames').add({
      nickname: this.nickname,
      email: this.email,
    });
    this.joined = true;
  }

  handleNameChange(e) {
    this.nickname = e.target.value
  }

  handleEmailChange(e) {
    this.email = e.target.value
  }

  handleMsgChange(e) {
    this.msg = e.target.value
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.chatRoomMessages.add({
        sender: this.nickname,
        msg: this.msg,
        date: firebase.firestore.Timestamp.fromDate(new Date())
      });
      this.msg = '';
    }
  }

  updated(changed) {
    if (changed.has('messages')) {
      const messagesEl = this.querySelector('.messages')
      if (messagesEl) {
        messagesEl.scrollTop = messagesEl.scrollHeight
      }      
    }
  }

  render() {
    const { messages } = this
    return html`
    <div class="App">
      ${!this.joined
        ? html`
            <div class="joinForm">
              <input
                class="form-control"
                placeholder="Nickname"
                .value=${this.nickname}
                @change=${this.handleNameChange}
              /><br /><input
                class="form-control"
                placeholder="Email"
                .value=${this.email}
                @change=${this.handleEmailChange}
              /><br /><button class="btn btn-primary" @click=${this.handleClick}>Join</button>
            </div>
          `
        : html`
            <div class="chat">
              <div class="messages">
                ${Object.keys(messages).map(message => {
                  if (messages[message]["sender"] === this.nickname)
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
                @input=${this.handleMsgChange}
                @keydown=${this.handleKeyDown}
                .value=${this.msg}
              /><br />
            </div>
          `}
    </div>
  `;  
  }
}

customElements.define('chat-app', ChatApp);