import { Button, Container, TextField } from "@material-ui/core";
import './styles.css';
import { FaIndustry } from 'react-icons/fa';

function LoginPage(props) {

    return (
        <>
            <Container className="container" maxWidth="sm">
                <div className="logo">
                    <FaIndustry className="logo-img" size={50} color="#3f51b5" />
                    <span className="logo-title">Controle de Ordens de Produção</span>
                </div>
                <form noValidate autoComplete="off">
                    <TextField className="line" id="standard-basic" label="Usuário/Email" />
                    <TextField className="line" id="standard-basic" label="Senha" />
                    <div className="line-botao">
                        <Button variant="contained" color="primary">
                            Entrar
                        </Button>
                        <Button variant="outlined">Esqueci a senha</Button>
                    </div>
                </form>
            </Container>
        </>
    );
}

export default LoginPage;