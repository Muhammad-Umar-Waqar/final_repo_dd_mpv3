import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const Table2Col = ({ input }) => {
  return (
    <TableContainer 
      component={Paper} 
      elevation={1}
    >
      <Table 
        sx={{
          width: '100%',
          borderSpacing: '10px',
          border: 'none',
          padding: '5px',
          borderCollapse: 'collapse',
          fontFamily: 'Raleway',
          fontWeight: 400,
          margin: '12px 0px',
          '& thead': {
            borderBottom: '5px solid #ff0000',
          },
          '& thead tr': {
            backgroundColor: '#ffffff',
            lineHeight: '25px'
          }
        }}
      >
        <TableHead className="bg-gray-200">
          <TableRow>
            <TableCell 
              component="th"
              sx={{
                fontSize: '16px',
                color: 'black',
                textAlign: 'center'
              }}
            >
              {input.primary.column_1_heading}
            </TableCell>
            <TableCell 
              component="th"
              sx={{
                fontSize: '16px',
                color: 'black',
                textAlign: 'center'
              }}
            >
              {input.primary.column_2_heading}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {input.items.map((item, index) => (
            <TableRow 
              key={index}
              sx={{
                padding: '0px',
                margin: '0px',
                borderBottom: '1px solid #cccccc',
                '&:nth-of-type(2n)': {
                  backgroundColor: '#cccccc'
                }
              }}
            >
              <TableCell 
                sx={{
                  padding: '2px',
                  margin: '2px',
                  textAlign: 'center',
                  fontWeight: 500,
                  '& p, & > div > p': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    lineHeight: 1.43,
                    textAlign: 'center',
                    padding: '2px',
                    margin: '2px',
                    verticalAlign: 'top',
                    borderTop: 0
                  }
                }}
                dangerouslySetInnerHTML={{ __html: item.col1.html }}
              />
              <TableCell 
                sx={{
                  padding: '2px',
                  margin: '2px',
                  textAlign: 'center',
                  fontWeight: 500,
                  '& p, & > div > p': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    lineHeight: 1.43,
                    textAlign: 'center',
                    padding: '2px',
                    margin: '2px',
                    verticalAlign: 'top',
                    borderTop: 0
                  }
                }}
                dangerouslySetInnerHTML={{ __html: item.col2.html }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Table2Col;