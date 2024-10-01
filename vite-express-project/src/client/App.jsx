import React, { useState, useEffect } from 'react'

function App() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetchTableData()
  }, [])

  const fetchTableData = () => {
    fetch('/api/table')
      .then(response => response.json())
      .then(data => {
        setTableData(data.table)
      })
      .catch(error => console.error('Error fetching data:', error))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const json = { table: tableData }
    const body = JSON.stringify(json)

    const response = await fetch('/api/saveTable', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const text = await response.text()
    console.log(text)
    fetchTableData()
  }

  const handleAddRow = () => {
    setTableData(tableData.concat([['', '', '']]))
  }

  const handleDeleteRow = (index) => {
    const newData = tableData.filter((_, i) => i !== index)
    setTableData(newData)
  }

  const handleChange = (index, cellIndex, value) => {
    const newData = tableData.map((row, i) => {
      if (i === index) {
        const newRow = [...row]
        newRow[cellIndex] = value
        return newRow
      }
      return row
    })
    setTableData(newData)
  }

  return (
    <div>
      <table id="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Age (Days)</th>
            <th>Time until due (Days)</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {tableData.map((row, rowIndex) => {
            const age = Number(row[1])
            const time = Number(row[2])
            let priority = 'Moderate'
            if (age >= 2 * time) {
              priority = 'High'
            } else if (age < time / 2) {
              priority = 'Low'
            }
            
            return (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    <div
                      contentEditable
                      onBlur={(e) => handleChange(rowIndex, cellIndex, e.target.textContent)}
                    >
                      {cell}
                    </div>
                  </td>
                ))}
                <td>
                  <div contentEditable={false}>{priority}</div>
                </td>
                <td>
                  <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: 'center'}}>
        <button id="addRow" onClick={handleAddRow}>Add Row</button>
        <button id="saveTable" onClick={handleSave}>Save Table</button>
      </div>
    </div>
  )
}

export default App
