import React from "react";

class Loading extends React.Component {
  render() {
    return (
      <div style={{
        color: 'white',
        position: 'fixed',
        zIndex: 10000,
        height: '100vh',
        width: '100vw',
        display: 'grid',
        placeItems: 'center',
      }}>
        <div className="overlay"
            style={{
                zIndex: 9,
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, .5)'
            }}
        
        ></div>
        <span style={{
            position: 'relative',
            zIndex: 10
        }}>...Is loading</span>
      </div>
    );
  }
}

export default Loading;
