import React from 'react';

const Table5Col = ({ input }) => {
  const getColumnHtml = (column) => {
    if (!column || !Array.isArray(column)) return '';
    return column.map(item => item.text).join('');
  };

  return (
    <>
      {input.primary.table_title?.text && (
        <div className="w-full">
          <h3 className="text-2xl font-bold mb-4">{input.primary.table_title.text}</h3>
        </div>
      )}
      <div className="rounded shadow-sm">
        <table className="w-full border-collapse font-raleway font-normal my-3">
          <thead className="border-b-[5px] border-b-red-500">
            <tr className="bg-white leading-[25px]">
              {[
                input.primary.column_1_heading,
                input.primary.column_2_heading,
                input.primary.column_3_heading,
                input.primary.column_4_heading,
                input.primary.column_5_heading
              ].map((heading, index) => (
                <th 
                  key={index}
                  className="text-base text-black text-center font-medium p-2"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {input.items.map((item, index) => (
              <tr 
                key={index} 
                className={`border-b border-[#cccccc] ${index % 2 === 1 ? 'bg-[#cccccc]' : ''}`}
              >
                {[
                  item.col1,
                  item.col2,
                  item.col3,
                  item.col4,
                  item.col5
                ].map((col, cellIndex) => (
                  <td 
                    key={cellIndex}
                    className="p-2 m-0.5 text-center text-sm [&>p]:text-sm [&>p]:font-normal [&>p]:leading-[1.43] [&>p]:text-center [&>p]:p-0.5 [&>p]:m-0.5 [&>p]:align-top [&>p]:border-t-0"
                    dangerouslySetInnerHTML={{ 
                      __html: getColumnHtml(col)
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table5Col;