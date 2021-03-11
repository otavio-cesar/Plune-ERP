import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getOrdens } from "../../services/ordem";
import { MeuAlerta } from "../../components/meuAlerta";
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { viewPort } from "../../util/responsive";

export default function HomePage(props) {
    const screenWidth = viewPort()
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [rows, setRows] = useState([]);
    const history = useHistory();
    
    const columns = [
        { field: 'id', headerName: 'OP', width: screenWidth * (0.15) },
        { field: 'servico', headerName: 'Serviço', width: screenWidth * (0.6) },
        { field: 'situacao', headerName: 'Situação', width: screenWidth * (0.2) },
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
            <div className="container" >
                <div className="containerTable">
                    <DataGrid rows={rows} columns={columns} pageSize={10} />
                </div>
            </div>
        </>
    );
}