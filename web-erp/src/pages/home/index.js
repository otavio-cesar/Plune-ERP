import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getOrdens } from "../../services/ordem";
import { MeuAlerta } from "../../components/meuAlerta";
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

export default function HomePage(props) {
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [rows, setRows] = useState([]);
    const history = useHistory();

    const columns = [
        { field: 'id', headerName: 'OP', width: 100 },
        { field: 'servico', headerName: 'Serviço', width: 430 },
        { field: 'situacao', headerName: 'Situação', width: 130 },
        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        // },
    ];

    useEffect(() => {
        showOrdens()
    }, [])

    async function showOrdens() {
        const data = await getOrdens();
        const _rows = data.data.row.map(o => {
            return {
                id: o.Id.value,
                servico: o.ProdutoId.resolved,
                situacao: o.Status.resolved
            }
        })
        setRows(_rows)
    }

    async function handleLogin(e) {
    }

    return (
        <>
            <MeuAlerta open={showAlert} setOpen={setShowAlert} severity="error" message={messageAlert}></MeuAlerta>
            <Container className="container" maxWidth="sm">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </Container>
        </>
    );
}