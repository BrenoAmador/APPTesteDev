import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function Gerador() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [quantidade, setQuantidade] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [arquivoGerado, setArquivoGerado] = useState(false);

  const baixar = async () => {
    if (!quantidade || quantidade < 1 || quantidade > 1000) {
      setMessage("Por favor, insira uma quantidade válida (1-1000).");
      setError(true);
      return;
    }
    setMessage("Gerando arquivo...");
    setError(false);
    try {
      const response = await axios.get(apiUrl + "gerador/excel/" + quantidade, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${quantidade}ItensGerados.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setArquivoGerado(true);
      setMessage(`Arquivo gerado com sucesso! (${quantidade})`);
      setError(false);
    } catch (err) {
      setMessage("Falha ao gerar o arquivo.");
      setError(true);
    }
  };

  const enviarEmail = async () => {
    if (arquivoGerado === false) {
      setError(true);
      setMessage("Por favor, gere o arquivo antes de enviar por e-mail.");
      return;
    }
    setMessage("Enviando arquivo por e-mail...");
    setError(false);
    try {
      await axios.post(
        apiUrl +"email/enviar/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Arquivo enviado sucesso!");
      setError(false);
    } catch (err) {
      console.error(err);
      setMessage("Falha ao enviar e-mail.");
      setError(true);
    }
  };

  return (
    <Form style={{ padding: 20 }}>
      {message && (
        <Alert className="col-md-3" variant={error ? "danger" : "success"}>
          {message}
        </Alert>
      )}
      <h1>Gerador de Dados</h1>
      <Form.Group className="mb-2 col-md-3" controlId="formQuantidade">
        <Form.Label>Quantidade de itens desejada a gerar.</Form.Label>
        <Form.Control
          type="number"
          placeholder="Insira a quantidade!"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          min={1}
          max={1000}
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" onClick={baixar}>
          Baixar
        </Button>
        <Button variant="secondary" onClick={enviarEmail}>
          Enviar por e-mail
        </Button>
      </div>
    </Form>
  );
}

export default Gerador;
