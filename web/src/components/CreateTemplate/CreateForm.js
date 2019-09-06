import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Template from "../Template/Template";
import "./CreateForm.css";

const schema = Yup.object().shape({
  phrase: Yup.string()
    .min(2, "Deve ter mais que 2 caracteres.")
    .max(45, "Deve ter menos que 45 caracteres.")
    .required("Campo obrigatorio."),
  translation: Yup.string()
    .min(2, "Deve ter mais que 2 caracteres.")
    .max(45, "Deve ter menos que 45 caracteres.")
    .required("Campo obrigatorio."),
  type: Yup.string().required("Campo obrigatorio."),
  userName: Yup.string()
    .min(2, "Deve ter mais que 2 caracteres.")
    .max(20, "Deve ter menos que 20 caracteres.")
    .required("Campo obrigatorio."),
  description: Yup.string()
    .min(10, "Deve ter mais que 10 caracteres.")
    .max(80, "Deve ter menos que 80 caracteres.")
    .required("Campo obrigatorio.")
});

const initialValue = {
  phrase: "",
  translation: "",
  type: "exp",
  userName: "",
  description: ""
};

export default function CreateForm(props) {
  return (
    <div>
      <h1 className="Title">Criar Traduçao</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={values => {
          props.onSubmit(values);
        }}
      >
        {({ errors, touched, values }) => {
          return (
            <Fragment>
              <Form className="CreateForm">
                <label htmlFor="userName">Nome de usuário (@instagram):</label>
                <Field name="userName" placeholder="Nome de usuário" />
                {errors.userName && touched.userName ? <p>{errors.userName}</p> : null}
                <label htmlFor="phrase">Frase:</label>
                <Field name="phrase" placeholder="Frase" />
                {errors.phrase && touched.phrase ? <p>{errors.phrase}</p> : null}
                <label htmlFor="translation">Traduçao:</label>
                <Field name="translation" placeholder="Tradução" />
                {errors.translation && touched.translation ? <p>{errors.translation}</p> : null}
                <label htmlFor="type">Tipo:</label>
                <Field component="select" name="type">
                  <option value="exp">Expressão (exp)</option>
                  <option value="sub">Substantivo (sub)</option>
                  <option value="adj">Adjetivo (adj)</option>
                  <option value="pro">Provérbio (pro)</option>
                  <option value="cit">Citação (cit)</option>
                </Field>
                {errors.type && touched.type ? <p>{errors.type}</p> : null}
                <label htmlFor="description">Descrição:</label>
                <Field name="description" placeholder="Descrição" />
                {errors.description && touched.description ? <p>{errors.description}</p> : null}
                <div>
                  <Template
                    translation={values.translation}
                    description={values.description}
                    phrase={values.phrase}
                    userName={values.userName}
                    type={values.type}
                    small
                  />
                </div>
                <button type="submit">pronto !</button>
              </Form>
            </Fragment>
          );
        }}
      </Formik>
    </div>
  );
}
