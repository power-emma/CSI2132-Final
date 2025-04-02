import React from 'react';

const TableComponent = ({ data }) => {
  const headers = Object.keys(data[0]);
  const rows = data.map(item => Object.values(item));
  if (data === null) {
    return (<div></div>)
  }
  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => <th key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, index) => <td key={index}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;