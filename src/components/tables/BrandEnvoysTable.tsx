import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
import UserBrandEnvoy from '../../types/entities/identity/user-brand-envoy.entity';
import PrimaryButton from '../PrimaryButton';
import useActions from '../../store/hooks/useActions';
import useUserState from '../../store/hooks/selectors/useUserState';

interface BrandEnvoysTableProps {
  rows?: UserBrandEnvoy[];
  filter?: 'authorized' | 'pending' | 'all';
}

const BrandEnvoysTable: React.FC<BrandEnvoysTableProps> = ({ filter = 'all' }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { authorizeEnvoy, getUsers } = useActions();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { users: rows, brandEnvoyAuthorized } = useUserState();

  useEffect(() => {
    getUsers({
      pageSize: rowsPerPage,
      pageNumber: page + 1,
      filterField: 'isAuthorizedEnvoy',
      filterValue: filter === 'authorized' ? true : filter === 'pending' ? false : undefined,
      orderBy: 'isAuthorizedEnvoy'
    });
  }, [brandEnvoyAuthorized, page, rowsPerPage, filter]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Authorization</TableCell>
              <TableCell>brand id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows as UserBrandEnvoy[]).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>
                    {row.isAuthorizedEnvoy ? (
                      'Authorized'
                    ) : (
                      <PrimaryButton
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          authorizeEnvoy(row.id);
                        }}
                      >
                        Authorize
                      </PrimaryButton>
                    )}
                  </TableCell>
                  <TableCell>{row.brand?.id}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length + 1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BrandEnvoysTable;
