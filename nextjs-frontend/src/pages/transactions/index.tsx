import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { Button, Container, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { format, parseISO } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Token, validateAuth } from '../../utils/auth';
import makeHttp from '../../utils/http';
import { Transaction } from '../../utils/models';

interface TransactionsPageProps {
  transactions: Transaction[];
}

const columns: Column[] = [
  {
    name: 'payment_day',
    title: 'Data de Pagamento',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
  {
    name: 'name',
    title: 'Nome',
  },
  {
    name: 'category',
    title: 'Categoria',
  },
  {
    name: 'type',
    title: 'Operação',
  },
  {
    name: 'created_at',
    title: 'Criado da Operação',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
];

const TransactionsPage: NextPage<TransactionsPageProps> = ({
  transactions,
}) => {
  const router = useRouter();
  
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas Transações
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant={'contained'}
        color="primary"
        onClick={() => router.push('/transactions/new')}
      >
        Criar
      </Button>

      <Grid rows={transactions} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: 'created_at', direction: 'desc' }]}
        />
        <TableHeaderRow showSortingControls />
        <SearchState defaultValue="Conta de luz" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Container>
  );
}

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);

  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const token = (auth as Token).token;

  const { data: transactions } = await makeHttp(token).get('transactions');

  return {
    props: {
      transactions,
    },
  };
};
