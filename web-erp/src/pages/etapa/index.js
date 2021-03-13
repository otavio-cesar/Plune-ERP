import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getStagesByIdOrder } from "../../services/stage";
import { MeuAlerta } from "../../components/meuAlerta";
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { viewPort } from "../../util/responsive";
import Loading from "../../components/loading";

export default function EtapaPage(props) {
    const screenWidth = viewPort()
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const columns = [
        { field: 'id', hide: true },
        { field: 'ordem', headerName: 'Ordem', width: screenWidth * (0.15) },
        { field: 'processo', headerName: 'Processo', width: screenWidth * (0.5) },
        { field: 'situacao', headerName: 'Situação', width: screenWidth * (0.25) },
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
        const idOrder = props.location.state.idOrder
        console.log(idOrder)
        if (!idOrder)
            history.push('/')
        else {
            showStages(idOrder)
        }
    }, [])

    async function showStages(idOrder) {
        setLoading(true)
        const data = await getStagesByIdOrder(idOrder);
        setLoading(false)

        const _rows = data.data.row.map(o => {
            return {
                id: o.ProcessoId.value,
                ordem: o.OrdemProcessoId.value,
                processo: o.ProcessoId.resolved,
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
            {loading && <Loading ></Loading>}

            <div className="container" >
                <div className="containerTable">
                    <DataGrid rows={rows} columns={columns} pageSize={10} />
                </div>
            </div>
        </>
    );
}