import React, { useEffect, useState } from 'react';
import BookSchedule from './components/Booklist';

function App() {
  return (
    <div className="App">
      <h1>📚 BookNow 📚</h1>
      <p>{serverStatus}</p>
      <BookSchedule />
    </div>
  );
}
//function App() {
  //const [serverStatus, setServerStatus] = useState("Connecting...");

  //useEffect(() => {
    //fetch('/books')  // This should hit your backend if proxy is set
      //.then(res => {
       // if (res.ok) {
        //  setServerStatus("✅ Connected to Backend");
       // } else {
       //   setServerStatus("⚠️ Backend responded with error");
       // }
      //})
      //.catch(() => {
      //  setServerStatus("❌ Failed to connect to Backend");
      //});
  //}, []);

  //eturn (
    //<div className="App">
     // <h1>📚 BookNow 📚</h1>
     // <p>{serverStatus}</p>
     // <BookSchedule />
//</div>
  ///);
//}

export default App;

