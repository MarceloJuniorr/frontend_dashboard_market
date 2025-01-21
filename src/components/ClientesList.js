// components/ClientesList.js
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ClientesList = ({ clientes = [] }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é pequena (mobile)

    const columns = [
        { field: 'nome', headerName: 'Cliente', width: isMobile ? 150 : 300 },
        { field: 'quantidadeCompras', headerName: 'Quantidade Compras', type: 'number', width: isMobile ? 100 : 200 },
        { field: 'valorTotal', headerName: 'Total Comprado (R$)', type: 'number', width: isMobile ? 100 : 180 },
        { field: 'valorCrediario', headerName: 'Total Crediario (R$)', type: 'number', width: isMobile ? 100 : 180 }
    ];

    const rows = clientes.map((cliente, index) => ({
        id: index,
        nome: cliente.nome,
        quantidadeCompras: cliente.quantidadeCompras,
        valorTotal: cliente.valorTotal,
        valorCrediario: cliente.valorCrediario

    }));

    return (
        <Box sx={{ my: 4, overflowX: 'auto' }}> {/* Ativa rolagem horizontal */}
            <Typography variant="h5" gutterBottom>Clientes</Typography>
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

export default ClientesList;
