// components/ItemList.js
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ItemList = ({ items = [] }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é pequena (mobile)

    const columns = [
        { field: 'descricao', headerName: 'Descrição', width: isMobile ? 150 : 300 },
        { field: 'quantidadeVendida', headerName: 'Quantidade Vendida', width: isMobile ? 100 : 200 },
        { field: 'precoMedio', headerName: 'Preço Médio (R$)', width: isMobile ? 100 : 180, hide: isMobile },
        { field: 'totalVendido', headerName: 'Total Vendido (R$)', width: isMobile ? 100 : 180 }
    ];

    const rows = items.map((item, index) => ({
        id: index,
        descricao: item.descricao,
        quantidadeVendida: item.quantidadeVendida.toFixed(2),
        precoMedio: item.precoMedio,
        totalVendido: item.totalVendido
    }));

    return (
        <Box sx={{ my: 4, overflowX: 'auto' }}> {/* Ativa rolagem horizontal */}
            <Typography variant="h5" gutterBottom>Itens Mais Vendidos</Typography>
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

export default ItemList;
