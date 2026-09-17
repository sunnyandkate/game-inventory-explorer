import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityActiveCanvas({ api, bag, setBag, fetchBag }){
  const { unityProvider, isLoaded } = useUnityContext({
  loaderUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.loader.js",
  dataUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.data",
  frameworkUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.framework.js",
  codeUrl: "/UnityBuild/JungleExplorer/Build/JungleExplorer.wasm",
});

  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(fetchBag, 2000);
    return () => clearInterval(interval);
  }, [isLoaded, fetchBag]);

  return (
     <div className="game-canvas">
          {!isLoaded && <p> Loading game assets...</p>}

          <Unity unityProvider={unityProvider} style={{ width: "100%", height: "450px", borderRadius: "8px", visibility: isLoaded ? "visible" : "hidden" }} />
        </div>
  );
}

export default function GamePanel({ api }){
  const [bag, setBag] = useState([]);
  const [hasConsent, setHasConsent] = useState(false); 

const fetchBag = React.useCallback(() => {
  fetch(`${api}/game/bag`).
  then(res => res.json()).
  then(data => setBag(data));
}, [api]);

useEffect(() => {
    fetchBag();
}, [fetchBag]);

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
       
    {!hasConsent ? (
      <div className="privacy-overlay">
          <p className="overlay-title"><strong>Unity WebGL Initialization Consent</strong></p>
          <p className="overlay-disclaimer">
            Clicking below mounts the interactive gameplay window. This allows Unity Technologies 
            to process essential technical network parameters (including your IP address, device specifications, 
            and hardware configurations) necessary to render and execute the WebGL runtime simulation.
          </p>
          <button className="consent-btn" onClick={() => setHasConsent(true)}>
            Activate & Play 
          </button>
        </div>
    ) : (
        <UnityActiveCanvas api={api} bag={bag} setBag={setBag} fetchBag={fetchBag} />  
    )}
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