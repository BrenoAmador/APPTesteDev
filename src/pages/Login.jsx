import { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(apiUrl + "login", {
        email,
        senha,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.usuario);

      setMessage("Login realizado com sucesso!");
      setError(false);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setMessage(err.response.data);
        setError(true);
      } else {
        //console.log(apiUrl)
        setMessage("Ocorreu um erro, tente novamente.");
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4 text-center">Login Gerador de Dados</h3>

              {message && (
                <Alert variant={error ? "danger" : "success"}>
                  <center>{message}</center>
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Carregando...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
