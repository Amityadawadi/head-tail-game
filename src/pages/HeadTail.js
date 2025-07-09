import React, { useState } from 'react';

const HeadTail = () => {
  const [selected, setSelected] = useState('');
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!selected) {
      setError('Please select value from dropdown');
      return;
    }

    setError('');

    let updatedColumns = [...columns];

    // Find the last column of this type (H or T)
    let lastIndex = -1;
    for (let i = updatedColumns.length - 1; i >= 0; i--) {
      if (updatedColumns[i][0] === selected) {
        lastIndex = i;
        break;
      }
    }

    if (lastIndex === -1) {
      // No column exists for this type, create new
      updatedColumns.push([selected]);
    } else {
      // Check the last column added (of any type)
      const lastColType = updatedColumns[updatedColumns.length - 1][0];

      if (lastColType === selected) {
        // Add to the existing column
        updatedColumns[lastIndex].push(selected);
      } else {
        // Create a new column
        updatedColumns.push([selected]);
      }
    }

    setColumns(updatedColumns);
    setSelected('');
  };

  return (
    <div>
      <h1>Head & Tail Page</h1>

      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select Value</option>
        <option value="H">H</option>
        <option value="T">T</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', marginTop: '20px' }}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} style={{ margin: '0 15px', textAlign: 'center' }}>
            {col.map((item, rowIndex) => (
              <div key={rowIndex}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadTail;
