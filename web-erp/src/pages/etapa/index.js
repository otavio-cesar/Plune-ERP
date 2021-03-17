import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getStagesByIdOrder, patchStageSituation } from "../../services/stage";
import { MeuAlerta } from "../../components/meuAlerta";
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { viewPort } from "../../util/responsive";
import Loading from "../../components/loading";
import { stageSituation } from "../../util/constants";

import React from 'react';
import { MeuDialog } from "../../components/dialog";

export default function EtapaPage(props) {
    const screenWidth = viewPort()
    const [showAlert, setShowAlert] = useState(false);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const [showDialog, setShowDialog] = useState(<></>);
    const [reason, setReason] = useState('')
    const history = useHistory();

    const idOrder = props.location.state.idOrder

    const columns = [
        { field: 'id', hide: true },
        { field: 'ordem', headerName: 'Ordem', width: screenWidth * (0.175) },
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
                situacao: o.Status.resolved,
                metadata: { ...o }
            }
        })
        setRows(_rows)
    }

    async function handleStartStage() {
        setShowDialog(
            <MeuDialog
                open={true}
                setOpen={setShowDialog}
                title={'Iniciar etapa'}
                message={`Deseja iniciar o processo: ${selectedRow.metadata.ProcessoId.resolved}?`}
                action={async () => {
                    setLoading(true)
                    await patchStageSituation(idOrder, selectedRow.metadata.ProcessoId.value, selectedRow.metadata.ProdutoId.value, stageSituation.started.id)
                        .then((data) => {
                            console.log(data)
                            rows.forEach((el, i) => {
                                if (el.id == selectedRow.metadata.ProcessoId.value) {
                                    rows[i] = { ...el, situacao: data.Field.Status.resolved, metadata: { ...data.Field } }
                                    return
                                }
                            })
                            setRows([...rows])
                            setLoading(false)
                            showMeuAlert('Etapa iniciada', 'success')
                        })
                        .catch(e => {
                            setLoading(false)
                            showMeuAlert(e.message, 'error')
                        })
                }}>
            </MeuDialog>
        )
    }

    async function handlePauseStage() {
        setShowDialog(
            <MeuDialog
                open={true}
                setOpen={setShowDialog}
                title={'Pausar etapa'}
                message={`Deseja interromper o processo: ${selectedRow.metadata.ProcessoId.resolved}?`}
                askReason
                reason={reason}
                setReason={setReason}
                action={async () => {
                    setLoading(true)
                    await patchStageSituation(idOrder, selectedRow.metadata.ProcessoId.value, selectedRow.metadata.ProdutoId.value, stageSituation.paused.id, reason)
                        .then((data) => {
                            console.log(data)
                            rows.forEach((el, i) => {
                                if (el.id == selectedRow.metadata.ProcessoId.value) {
                                    rows[i] = { ...el, situacao: data.Field.Status.resolved, metadata: { ...data.Field } }
                                    return
                                }
                            })
                            setRows([...rows])
                            setLoading(false)
                            showMeuAlert('Etapa pausada', 'success')
                        })
                        .catch(e => {
                            setLoading(false)
                            showMeuAlert(e.message, 'error')
                        })
                }}>
            </MeuDialog>
        )
    }

    async function handleFinishStage() {
        var reason
        await patchStageSituation(idOrder, selectedRow.metadata.ProcessoId.value, selectedRow.metadata.ProdutoId.value, stageSituation.paused.id, reason)
    }

    async function handleSelectRow(el) {
        console.log(el)
        setSelectedRow(el.row)
    }

    function showMeuAlert(message, severity) {
        setShowAlert(
            <MeuAlerta
                open={true}
                setOpen={setShowAlert}
                severity={severity}
                message={message}>
            </MeuAlerta>
        )
    }

    return (
        <>
            {showAlert}
            {loading && <Loading ></Loading>}
            {showDialog}

            <div className="container" >
                <div className="lineAction">
                    <Button variant="contained" color="primary" onClick={() => handleStartStage()} disabled={!selectedRow}>
                        Iniciar Etapa
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handlePauseStage()} disabled={!selectedRow}>
                        Interromper
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleFinishStage()} disabled={!selectedRow}>
                        Finalizar
                    </Button>
                </div>
                <div className="containerTable">
                    <DataGrid rows={rows} columns={columns} pageSize={10} onCellClick={(el) => handleSelectRow(el)} />
                </div>
            </div>
        </>
    );
}