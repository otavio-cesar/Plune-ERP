import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';
import { useState } from "react";
import { getUsers } from "../../services/usuario";
import { MeuAlerta } from "../../components/meuAlerta";
import { useHistory } from 'react-router-dom';

export default function HomePage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const res = await getUsers(username, password)

        if (res.status == 200) {
            const user = await res.json()
            const token = res.headers['token']
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token);
            history.push('/');
        } else {
            setShowAlert(true)
            const error = (await res.json()).error
            setMessageAlert(error)
        }
    }

    return (
        <>
            <MeuAlerta open={showAlert} setOpen={setShowAlert} severity="error" message={messageAlert}></MeuAlerta>

            <Container className="container" maxWidth="sm">
                <div className="logo">
                    <FaIndustry className="logo-img" size={50} color="#3f51b5" />
                    <span className="logo-title">HOME</span>
                </div>
                <form autoComplete="off" onSubmit={handleLogin} >
                    <TextField className="line" id="standard-basic" label="Usuário/Email" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField className="line" id="standard-basic" label="Senha" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="line-botao">
                        <Button variant="contained" color="primary" type="submit">
                            Entrar
                        </Button>
                        <Button variant="outlined"  >Esqueci a senha</Button>
                    </div>
                </form>
            </Container>
        </>
    );
}