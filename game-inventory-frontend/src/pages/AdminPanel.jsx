import { useState, useEffect } from 'react';

export default function AdminPanel({ api }){
  const [allItems, setAllItems] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState(""); 

  useEffect(() => {
    fetch(`${api}/admin/allItems`).then(res => res.json()).then(data => setAllItems(data));
  }, [api]);

  const handleCreate = (e) => {
    e.preventDefault();
    if(!name) return;

    fetch(`${api}/admin/create`, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Admin-Token": token},
      body: JSON.stringify({name})
    })
    .then(res => {
      if(!res.ok){
        throw new Error("Wrong Token");
      }
    return res.json();
  })
    .then(newItem => {
      setAllItems([...allItems, newItem]);
      setName("");
    })
    .catch(err => {
      alert(err.message);
    });
  };
    const handleDelete = (id) => {
    fetch(`${api}/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Admin-Token": token
      }
    })
    .then(res => {
       if(!res.ok){
        throw new Error("Invalid Administrative Authorization Token Key");
      }
        setAllItems(allItems.filter(item => item.id !== id));
    })
    .catch(err => {
      alert(err.message);
    });
  };

  return (
    <div className="admin-panel">
      <h2>Game Inventory</h2>
      <div className="password-container">
        <label>Admin Access Key:</label>
        <input type="password" placeholder="Enter secret token to write/delete..." value={token} onChange={e => setToken(e.target.value)} className="input-field"/>
      </div>
      <p>Type in items to add to the inventory</p>

      <form onSubmit={handleCreate} className="admin-panel-form">
        <input type="text" placeholder="Item Name" value={name} onChange={e => setName(e.target.value)} className="input-field"/>
        <button type="submit" className="submit-btn">
         Add Item
        </button>
      </form>

      <h3>Items</h3>
      <ul>
        {allItems.map(item => (
          <li key={item.id}>
            <div className="left-column">
                <strong>{item.name}</strong>
                <span style={{ color: item.found ? (item.used ? '#939f97' : '#d3cd5f') : '#ab9d87' }}>
                  {item.found ? (item.used ? " [Discovered & Used]" : " [Discovered & In Bag]") : " [Still Hidden]"}
                </span>
              </div>           
            <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
          </li>
        ))}
        </ul>
    </div>
  );
}