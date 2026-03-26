import React from 'react';
import { marqueeItems } from '../data/Data';

const Marquee = () => {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      style={{
        padding: '18px 0',
        overflow: 'hidden',
        position: 'relative',
        background: '#ffffff', // ✅ white background
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb'
      }}
    >
      {/* Left Gradient Fade */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          background: 'linear-gradient(90deg, #ffffff, transparent)',
          zIndex: 2
        }}
      />

      {/* Right Gradient Fade */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          background: 'linear-gradient(-90deg, #ffffff, transparent)',
          zIndex: 2
        }}
      />

      {/* Track */}
      <div
        style={{
          display: 'flex',
          animation: 'marquee 28s linear infinite',
          width: 'max-content'
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 26px',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono',
              color: '#111827', // ✅ black text
              whiteSpace: 'nowrap'
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#111827', // ✅ black dot
                opacity: 0.6
              }}
            ></span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;