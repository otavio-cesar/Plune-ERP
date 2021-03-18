import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getOrdens, getOrdensByLineProduction } from "../../services/ordem";
import { MeuAlerta } from "../../components/meuAlerta";
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { viewPort } from "../../util/responsive";
import Loading from "../../components/loading";
import EnumPermissions from "../../util/EnumPermissions";

export default function HomePage(props) {
    const screenWidth = viewPort()
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const columns = [
        { field: 'id', headerName: 'OP', width: screenWidth * (0.15) },
        { field: 'servico', headerName: 'Produto', width: screenWidth * (0.6) },
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
        let data
        const usuario = JSON.parse(localStorage.getItem('user'))
        if (usuario.permissao == EnumPermissions.Basic) {
            const LinhaProcessoProdutivoIds = JSON.parse(localStorage.getItem('user')).productionLine.map(p => p.value)
            setLoading(true)
            data = await getOrdensByLineProduction(LinhaProcessoProdutivoIds);
        } else {
            setLoading(true)
            data = await getOrdens();
        }
        setLoading(false)

        console.log(data.data.row)
        const _rows = data.data.row.map(o => {
            return {
                id: o.Id.value,
                servico: o.ProdutoId.resolved,
                situacao: o.Status.resolved,
                metadata: { ...o }
            }
        })
        setRows(_rows)
    }

    return (
        <>
            <MeuAlerta open={showAlert} setOpen={setShowAlert} severity="error" message={messageAlert}></MeuAlerta>
            {loading && <Loading ></Loading>}

            <div className="container" >
                <div className="containerTable">
                    <DataGrid rows={rows} columns={columns} pageSize={10} onCellClick={(el) => history.push('/etapa', { idOrder: el.row.id, situacao: el.row.metadata.Status })} />
                </div>
            </div>
        </>
    );
}