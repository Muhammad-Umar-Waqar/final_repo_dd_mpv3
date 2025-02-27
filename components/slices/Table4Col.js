import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography 
} from '@mui/material';

const Table4Col = ({ input }) => {
  return (
    <>
      {input.primary.table_title?.text && (
        <Typography variant="h3" className="w-100">
          {input.primary.table_title.text}
        </Typography>
      )}
      <TableContainer component={Paper} elevation={1}>
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
              {[
                input.primary.column_1_heading,
                input.primary.column_2_heading,
                input.primary.column_3_heading,
                input.primary.column_4_heading
              ].map((heading, index) => (
                <TableCell 
                  key={index}
                  component="th"
                  align="center"
                  sx={{
                    fontSize: '16px',
                    color: 'black',
                    textAlign: 'center'
                  }}
                >
                  {heading}
                </TableCell>
              ))}
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
                {[
                  item.col1.html,
                  item.col2.html,
                  item.col3.html,
                  item.col4.html
                ].map((content, cellIndex) => (
                  <TableCell 
                    key={cellIndex}
                    align="center"
                    sx={{
                      padding: '2px',
                      margin: '2px',
                      textAlign: 'center',
                      fontWeight: 500,
                      '& p': {
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
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Table4Col;