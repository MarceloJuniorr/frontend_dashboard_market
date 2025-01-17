import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography, Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DataInput from './components/DataInput';
import StatBox from './components/StatBox';
import ItemList from './components/ItemList';
import SalesList from './components/SalesList';
import CustomerList from './components/customerList';

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);


  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL_SALES;
        console.log(backendUrl)
        const response = await fetch(`${backendUrl}/api/sales?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();
        console.log('Dados recebidos:', data); // Verificação de dados recebidos
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        setDashboardData({
          quantidadeVendas: 0,
          valorTotal: "0.00",
          ticketMedio: "0.00",
          itensMaisVendidos: [],
          clientes: [],
          vendas: []
        });
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const handleShowDetails = (sale) => {
    // Buscando a venda completa, incluindo produtos, e passando para o modal
    const vendaCompleta = dashboardData.vendas.find(v => v.codigo === sale.codigo);
    console.log('Venda completa:', vendaCompleta); // Verificar se a venda completa com produtos está sendo selecionada
    setSelectedSale(vendaCompleta);
  };

  const handleCloseModal = () => {
    setSelectedSale(null);
  };

  // Verifica se os dados estão disponíveis
  if (!dashboardData) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard de Vendas
        </Typography>

        {/* Inputs de Data */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DataInput label="Data Inicial" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DataInput label="Data Final" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </Grid>
        </Grid>

        {/* Blocos de Informações */}
        {dashboardData && (
          <Grid container spacing={2} my={4}>
            <Grid item xs={12} sm={4}>
              <StatBox title="Quantidade de Vendas" value={dashboardData.quantidadeVendas} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatBox title="Valor Total" value={`R$ ${dashboardData.valorTotal}`} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatBox title="Ticket Médio" value={`R$ ${dashboardData.ticketMedio}`} />
            </Grid>
          </Grid>
        )}

        {/* Lista de Itens Mais Vendidos */}
        {dashboardData && <ItemList items={dashboardData.itensMaisVendidos} />}

        {/* Lista de Resumo de clientes */}
        {dashboardData && <CustomerList customers={dashboardData.clientes} />}

        {/* Lista de Vendas */}
        {dashboardData && <SalesList sales={dashboardData.vendas} onShowDetails={handleShowDetails} />}

        {/* Modal para Detalhes da Venda */}
        <Modal open={!!selectedSale} onClose={handleCloseModal}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              padding: 4,
              borderRadius: 2,
              marginTop: '10%',
              maxWidth: 800,
              width: '90%', // Responsivo
              margin: 'auto',
              overflowY: 'auto' // Scroll vertical no modal, caso necessário
            }}
          >
            <Typography variant="h6">Detalhes da Venda {selectedSale?.codigo}</Typography>

            {/* Verifica se há produtos e exibe a tabela */}
            {selectedSale && selectedSale.produtos && selectedSale.produtos.length > 0 ? (
              <TableContainer component={Paper} sx={{ maxHeight: 300, overflowX: 'auto' }}> {/* Scroll horizontal e vertical */}
                <Table sx={{ minWidth: 650 }} aria-label="tabela de produtos">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '0.9rem' }}>Descrição</TableCell>
                      <TableCell align="right" sx={{ fontSize: '0.9rem' }}>Quantidade</TableCell>
                      <TableCell align="right" sx={{ fontSize: '0.9rem' }}>Total Item (R$)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedSale.produtos.map((produto, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" sx={{ fontSize: '0.9rem' }}>
                          {produto.descricao}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: '0.9rem' }}>{produto.quantidade}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '0.9rem' }}>{produto.totalItem.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>Nenhum produto encontrado</Typography>
            )}
            <Button onClick={handleCloseModal} sx={{ mt: 2 }}>Fechar</Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default Dashboard;
