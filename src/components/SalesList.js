// components/SalesList.js
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SalesList = ({ sales = [], onShowDetails }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é pequena (mobile)

    const columns = [
        { field: 'codigo', headerName: 'Código', width: isMobile ? 100 : 120 },
        { field: 'dataEmissao', headerName: 'Data Emissão', type: 'date', width: isMobile ? 120 : 150 },
        { field: 'nome', headerName: 'Cliente', width: isMobile ? 200 : 200 },
        { field: 'totalVenda', headerName: 'Total Venda (R$)', type: 'number', width: isMobile ? 120 : 180 },
        {
            field: 'detalhes',
            headerName: 'Detalhes',
            width: isMobile ? 100 : 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => onShowDetails(params.row)}
                >
                    Detalhes
                </Button>
            )
        }
    ];

    const rows = sales.map((sale, index) => ({
        id: index,
        codigo: sale.codigo,
        dataEmissao: new Date(sale.dataEmissao).toLocaleDateString(),
        nome: sale.nome,
        totalVenda: sale.totalVenda.toFixed(2)
    }));

    return (
        <Box sx={{ my: 4, overflowX: 'auto' }}> {/* Ativa rolagem horizontal */}
            <Typography variant="h5" gutterBottom>Vendas</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default SalesList;
