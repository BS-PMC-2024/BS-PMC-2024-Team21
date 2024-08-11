
import Card from '@mui/material/Card';
import { Button} from "@mui/material";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useAuth } from 'auth';
import Scrollbar from 'components/scrollbar';
import TableRowsLoader from 'components/table';
import { useEffect, useState } from 'react';
import TableHead from 'components/table/table-head';
import TableEmptyRows from 'components/table/table-empty-rows';
import TableNoData from 'components/table/table-no-data';
import { applyFilter, emptyRows, getComparator } from 'components/table/utils';
import axios from 'axios';
import StudentsTableHead from './app-website-visits-head.jsx'
import StudentsTableRow from './app-website-visits-row'



// ----------------------------------------------------------------------

export default function StudentsTableView() {
  const {currentUser}=useAuth();
  const [students, setStudents] = useState([]);
  const [loading,setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

   useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/lecturer/student-subject-averages");
        const data = response.data;
        console.log(data);
        setStudents(data);
        setLoading(false);

      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const notFound = !students.length && !!filterName;
  return (
    <Container>

      <Card>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <StudentsTableHead
                onRequestSort={handleSort}
                rowCount={students.length}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'C#', label: 'C#' },
                  { id: 'Python', label: 'Python' },
                  { id: 'SQL', label: 'SQL' },
                  {id:''}
                ]}
              />
              <TableBody>
                {!loading && students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StudentsTableRow
                      key={row.student_name}
                      name={row.student_name}
                      subjects={Object.values(row.subjects)}

                    />
                  ))}
                {loading && <TableRowsLoader rowsNum={rowsPerPage} cellNum={6} />}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, students.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
