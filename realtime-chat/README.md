# Real Time Chat with Haunted and Firebase

Ported from [React version](https://www.freecodecamp.org/news/how-to-build-a-real-time-chatroom-with-firebase-and-react-hooks-eb892fa72f1e/)

### Configuration

* Create a project on [Firebase](https://firebase.google.com/)
* Configure Firestore on the project making all access public (test mode)
* Add a `firebase.config.js` exporting the project configuration:

```js
export default {
  apiKey: "xxx",
  authDomain: "xxx",
  databaseURL: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx"
};
```

### Usage

Open `index.html` on a local http server ([VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) works fine).

