import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getOrdens } from "../../services/ordem";
import { MeuAlerta } from "../../components/meuAlerta";
import { useHistory } from 'react-router-dom';

export default function HomePage(props) {
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const history = useHistory();

    useEffect(() => {
        const orders = getOrdens();
        console.log(orders)
    },[])

    async function handleLogin(e) {
    }

    return (
        <>teste
            <MeuAlerta open={showAlert} setOpen={setShowAlert} severity="error" message={messageAlert}></MeuAlerta>
        </>
    );
}