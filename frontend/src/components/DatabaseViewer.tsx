import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, IconButton, Menu, Button, SelectChangeEvent } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DatabaseViewer: React.FC = () => {
    const [tables, setTables] = useState<string[]>([]);
    const [selectedTable, setSelectedTable] = useState<string>('');
    const [columns, setColumns] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [uniqueValues, setUniqueValues] = useState<string[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [filterValue, setFilterValue] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/tables')
            .then(response => setTables(response.data))
            .catch(error => console.error('Error fetching tables:', error));
    }, []);

    useEffect(() => {
        if (selectedTable) {
            axios.get(`http://127.0.0.1:8000/columns/${selectedTable}`)
                .then(response => setColumns(response.data))
                .catch(error => console.error('Error fetching columns:', error));

            axios.get(`http://127.0.0.1:8000/data/${selectedTable}`)
                .then(response => setData(response.data))
                .catch(error => console.error('Error fetching table data:', error));
        }
    }, [selectedTable]);

    const handleColumnClick = (event: React.MouseEvent<HTMLElement>, column: string) => {
        setSelectedColumn(column);
        setAnchorEl(event.currentTarget);
        axios.get(`http://127.0.0.1:8000/unique_values/${selectedTable}/${column}`)
            .then(response => setUniqueValues(response.data))
            .catch(error => console.error('Error fetching unique values:', error));
    };

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilterValue(event.target.value as string);
    };

    const applyFilter = () => {
        if (filterValue) {
            const filteredData = data.filter(row => row[selectedColumn] === filterValue);
            setData(filteredData);
        } else {
            axios.get(`http://127.0.0.1:8000/data/${selectedTable}`)
                .then(response => setData(response.data))
                .catch(error => console.error('Error fetching table data:', error));
        }
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container>
            <h1>Database Viewer</h1>
            <FormControl fullWidth>
                <InputLabel id="table-select-label">Select Table</InputLabel>
                <Select
                    labelId="table-select-label"
                    value={selectedTable}
                    onChange={e => setSelectedTable(e.target.value as string)}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {tables.map(table => (
                        <MenuItem key={table} value={table}>{table}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedTable && (
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column}>
                                    {column}
                                    <IconButton onClick={(event) => handleColumnClick(event, column)}>
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl) && selectedColumn === column}
                                        onClose={handleClose}
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel id="filter-select-label">Select Value</InputLabel>
                                            <Select
                                                labelId="filter-select-label"
                                                value={filterValue}
                                                onChange={handleFilterChange}
                                            >
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                {uniqueValues.map(value => (
                                                    <MenuItem key={value} value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                            <Button onClick={applyFilter}>Apply Filter</Button>
                                        </FormControl>
                                    </Menu>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map(column => (
                                    <TableCell key={column}>{row[column]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Container>
    );
};

export default DatabaseViewer;