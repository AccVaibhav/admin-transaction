import { useEffect, useState } from "react";
import { Pagination } from 'react-bootstrap';


/* eslint-disable react/prop-types */
const Table = ({
  cols,
  tableData,
  onRowClick
}) => {

  // Used for date sorting
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  // Used for pagination
  const [pages, setPages] = useState(1);

  // if prop tableData changed then reset pagination
  useEffect(() => {
    setPages(1);
  },[tableData]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const onPaginationClick = (page) => {
    setPages(page)
  }

  // Set the pagination UI at the botton
  let items = [];
  if(tableData.length > 0){
    for (let number = 1; number <= Math.ceil((tableData.length/10)); number++) {
      items.push(
        <Pagination.Item name={number} key={number} active={number === pages} onClick={() => onPaginationClick(number)}>
          {number}
        </Pagination.Item>,
      );
    }
  }

  // Filter data based on pagination
  let displayData = [];
  if(tableData.length > 0){
    for(let i = ((pages * 10) - 10); (i < (pages * 10) && tableData[i]) ; i++){
      displayData.push(tableData[i]);
    }
  }

  // Sorting data for date field
  if (sortConfig.key !== null) {
    // const sortedItems = [...displayData];
    displayData.sort((a, b) => {
      const valueA = new Date(a[sortConfig.key]).getTime();
      const valueB = new Date(b[sortConfig.key]).getTime();
      if (typeof valueA === "number" && typeof valueB === "number") {
        // Sort numbers
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }
      return 0;
    });

    // return sortedItems;
  }

  return (
    <div>
      <table class="table" >
        <thead>
          <tr>
            {cols.map((col, index) => (
              <th
                key={index}
                style={{
                  cursor: col.sortable ? "pointer" : "default",
                }}
                onClick={() => (col.sortable ? requestSort(col.key) : null)} 
                
              >
                <div style={{display:'flex',justifyContent:'center'}}>
                  {col.title}
                  {col.sortable && (
                    <>
                      {sortConfig.key === col.key && (
                        <>
                          {sortConfig.direction === "asc" ? (
                           
                            <span class="material-symbols-outlined">
                              arrow_upward
                            </span>
                          ) : (
                            <span class="material-symbols-outlined">
                              arrow_downward
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-600">
          {// Render the data rows when data is available
            displayData.length > 0 && displayData.map((item, rowIndex) => (
                <tr key={rowIndex} onClick={() => onRowClick(item)}>
                  {cols.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4  text-ellipsis text-xs font-medium text-gray-500  tracking-wider   valuesfont  ${
                        col.colored ? "text-gradient font-semibold truncate" : ""
                      }` }
                      style={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}
                    >
                      
                      {col.render
                        ? col.render(item, rowIndex)
                        : item[col.dataKey]}
                    </td>
                  ))}
                </tr>
              ))
          }
        </tbody>
      </table>
      { tableData.length <= 0 && <h2>No Transactions Found</h2>}
      {tableData.length > 10 && <Pagination className="flex-end">{items}</Pagination>}
    </div>
  );
};

export default Table;
