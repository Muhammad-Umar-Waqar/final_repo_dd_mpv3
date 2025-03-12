import { Box } from '@mui/material';

const CustomTable = ({ input }) => {
  if (!input.primary.table_content.text) return null;

  return (
    <Box
      sx={{
        width: '100%',
        borderSpacing: 0,
        borderCollapse: 'collapse',
        '& > div > table': {
          width: '100%',
          display: 'table',
          borderSpacing: 0,
          borderCollapse: 'collapse',
          boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        },
        '& > div > table .MuiTableCell-head': {
          color: 'rgba(0, 0, 0, 0.87)',
          fontWeight: 700,
          lineHeight: '1.5rem'
        },
        '& > div > table tbody.MuiTableBody-root': {
          display: 'table-row-group'
        },
        '& > div > table tr.MuiTableRow-root': {
          color: 'inherit',
          display: 'table-row',
          outline: 0,
          verticalAlign: 'middle'
        },
        '& > div > table th.MuiTableCell-root': {
          display: 'table-cell',
          padding: '16px',
          fontSize: '0.875rem',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          lineHeight: 1.43,
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
          letterSpacing: '0.01071em',
          verticalAlign: 'inherit'
        },
        '& > div > table th.font-bold': {
          fontWeight: 700
        },
        '& > div > table th.MuiTableCell-alignCenter': {
          textAlign: 'center'
        },
        '& > div > table td.MuiTableCell-root': {
          display: 'table-cell',
          padding: '16px',
          fontSize: '0.875rem',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          lineHeight: 1.43,
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
          letterSpacing: '0.01071em',
          verticalAlign: 'inherit'
        },
        '& > div > table td.MuiTableCell-alignCenter': {
          textAlign: 'center'
        },
        '& > div > table .MuiTableCell-alignCenter': {
          textAlign: 'center'
        }
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: input.primary.table_content.text }} className="w-100" />
    </Box>
  );
};

export default CustomTable;