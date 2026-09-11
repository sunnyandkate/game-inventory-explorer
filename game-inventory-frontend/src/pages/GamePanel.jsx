import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

export default function GamePanel({ api }){
  const [bag, setBag] = useState([]);


const { unityProvider, isLoaded } = useUnityContext({
  loaderUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.loader.js",
  dataUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.data",
  frameworkUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.framework.js",
  codeUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.wasm",
});

const fetchBag = () => {
  fetch(`${api}/game/bag`).then(res => res.json()).then(data => setBag(data));
}

useEffect(() => {
    fetchBag();
}, [api]);

  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(fetchBag, 2000);
    return () => clearInterval(interval);
  }, [isLoaded]);


  const handleUse = (id, name) => {
    fetch(`${api}/game/use/${id}`, { method: "PUT" })
    .then(() => {
      setBag(bag.filter(item => item.id !== id));
    });
  };

  return (
    <div className="game-panel">
      <h2>Exploring Game</h2>
      <p>
        This game window is built for web browsers via Unity WebGL. 
        Discover items inside the game and watch your HTML web inventory bag below automatically synchronize over the database.
      </p>
        <div className="game-canvas">
          {!isLoaded && <p> Loading game assets...</p>}

          <Unity unityProvider={unityProvider} style={{ width: "100%", height: "450px", borderRadius: "8px", visibility: isLoaded ? "visible" : "hidden" }} />
        </div>

      <h3>Inventory Bag ({bag.length})</h3>
         <div className="inventory-bag">
          {bag.length === 0 ? <p>Your bag is empty.</p> : bag.map(item => (
            <div key={item.id} className="bag">
            <h4>{item.name}</h4>
            <button onClick={() => handleUse(item.id, item.name)} className="select-btn">Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}