import React from 'react';

const Table2Col = ({ input }) => {
  const getColumnHtml = (column) => {
    if (!column || !Array.isArray(column)) return '';
    return column.map(item => item.text).join('');
  };

  return (
    <div className="rounded shadow-sm">
      <table className="w-full border-collapse font-raleway font-normal my-3">
        <thead className="border-b-[5px] border-b-red-500">
          <tr className="bg-white leading-[25px]">
            <th className="text-base text-black text-center font-medium p-2">
              {input.primary.column_1_heading}
            </th>
            <th className="text-base text-black text-center font-medium p-2">
              {input.primary.column_2_heading}
            </th>
          </tr>
        </thead>
        <tbody>
          {input.items.map((item, index) => (
            <tr 
              key={index} 
              className={`border-b border-[#cccccc] ${index % 2 === 1 ? 'bg-[#cccccc]' : ''}`}
            >
              <td 
                className="p-2 m-0.5 text-center text-sm [&>p]:text-sm [&>p]:font-normal [&>p]:leading-[1.43] [&>p]:text-center [&>p]:p-0.5 [&>p]:m-0.5 [&>p]:align-top [&>p]:border-t-0"
                dangerouslySetInnerHTML={{ 
                  __html: getColumnHtml(item.col1)
                }}
              />
              <td 
                className="p-2 m-0.5 text-center text-sm [&>p]:text-sm [&>p]:font-normal [&>p]:leading-[1.43] [&>p]:text-center [&>p]:p-0.5 [&>p]:m-0.5 [&>p]:align-top [&>p]:border-t-0"
                dangerouslySetInnerHTML={{ 
                  __html: getColumnHtml(item.col2)
                }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2Col;