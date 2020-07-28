import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signInApi, setTokenApi } from "../../api/auth";

import "./SignInForm.scss";

export default function SignInForm(props) {
  const { setRefreshChecklogin } = props;
  const [FormData, setFormData] = useState(initialFormValue());
  const [signInLoading, setSignInLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(FormData).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(FormData) !== validCount) {
      toast.warning("Completa todos los campos del formulario.");
    } else {
      if (!isEmailValid(FormData.email)) {
        toast.warning("Email es inválido");
      } else {
        setSignInLoading(true);
        signInApi(FormData)
          .then((response) => {
            if (response.message) {
              toast.warning(response.message);
            } else {
              setTokenApi(response.token);
              setRefreshChecklogin(true);
            }
          })
          .catch(() => {
            toast.error("Error del servidor, inténtelo más tarde.");
          })
          .finally(() => {
            setSignInLoading(false);
          });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            defaultValue={FormData.email}
            name="email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            defaultValue={FormData.password}
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signInLoading ? "Iniciar sesión" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );

  function initialFormValue() {
    return {
      email: "",
      password: "",
    };
  }
}
