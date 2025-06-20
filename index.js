import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const send = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    const data = await res.json();
    setChatLog([...chatLog, { user: input, bot: data.bot_response }]);
    setInput('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>SYNCRO Chat</h1>
      <div>{chatLog.map((c,i)=>(
        <div key={i}>
          <b>You:</b> {c.user}<br/>
          <b>SYNCRO:</b> {c.bot}
          <hr/>
        </div>
      ))}</div>
      <input value={input} onChange={e=>setInput(e.target.value)} style={{width:'60%'}}/>
      <button onClick={send}>Send</button>
    </div>
  );
}
