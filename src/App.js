import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';

import './styles.scss';

function App(){

  const [dataCep, setDataCep] = useState('');

  function onSubmit(values, actions){
    console.log('SUBMIT', values);
  }

  function onBlurCep(ev, setFieldValue){
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g,'');

    if(cep?.length !== 8){
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('logradouro',data.logradouro);
        setFieldValue('bairro',data.bairro);
        setFieldValue('cidade',data.localidade);
        setFieldValue('uf',data.uf);

        setDataCep(data)
      });
  }

    return (
      <div className="App"> 
        <div className="Content">
          <Formik
            onSubmit={onSubmit}
            initialValues={{
              cep:''
            }}
            render={({ values, setFieldValue }) => (
            <Form>
              <div>
                <label>Cep:</label><br />
                <Field type="text" name="cep" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
              </div>
              <div>
                <label>Logradouro:</label><br />
                <Field type="text" name="logradouro" />
              </div>
              <div>
                <label>Bairro:</label><br />
                <Field type="text" name="bairro" />
              </div>
              <div>
                <label>Cidade:</label><br />
                <Field type="text" name="cidade" />
              </div>
              <div>
                <label>Uf:</label><br />
                <Field component="select" name="uf">
                  <option value={null}>Selecione o Estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="SC">Santa Catarina</option>
                </Field>
              </div>
              <button type="submit">Enviar</button>
            </Form>
            )}
          />
          
          <div className="Response">
            <h3>
              {
                dataCep !== ''
                ? 
                  dataCep.cep + ', ' + dataCep.logradouro + ', ' + dataCep.bairro + ', ' + dataCep.localidade + ', ' + dataCep.uf
                :
                  <React.Fragment><span style={{color: "green"}}>Faça uma pesquisa!</span></React.Fragment>
              }
            </h3>
          </div>
          
        </div>
      </div>
    );
  }

export default App;


