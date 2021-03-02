import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import HeaderToolBar from '../components/HeaderToolBar';
import LeftSideToolBar from '../components/LeftSideToolBar';
import IEntidadeGenerica from '../interfaces/IEntidadeGenerica';
import IValueLabelPair from '../interfaces/IValueLabelPair';

import api from '../services/api';

import './NovoTipoEstabelecimento.css';

export default function NovoTipoEstabelecimento() {
    const [description, setDescription] = useState('');
    const [domainType, setDomainType] = useState<IValueLabelPair>();
    const [typeList, setTypeList] = useState<IValueLabelPair[]>([]);
    const history = useHistory();

    useEffect(() => {
        api.get<IEntidadeGenerica[]>('dominio')
            .then(response => {
                let options = response.data.map(item => {
                    return { value: item.id, label: item.descricao };
                }).sort((a, b) => {
                    return ('' + a.label).localeCompare(b.label);
                });
                setTypeList(options);
            })
    }, []);

    function handleOnChangeDomainType(e: IValueLabelPair | null) {
        if (e) setDomainType(e);
    }

    async function handleCadastrar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!domainType)
            return;

        const data = {
            descricao: description,
            dominio: { id: domainType.value }
        };

        try {
            await api.post('tipodominio', data);

            history.push('/');
        } catch (error) {
            alert('Ocorreu um eror ao tentar cadastrar');
        }
    }

    function handleBackButton(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div className="application-content">
            <LeftSideToolBar />
            <div className="application-header">
                <HeaderToolBar
                    title={{ text: "Tipos de Estabelecimento", url: "/estabelecimentos" }}
                    links={[{ text: "Novo", url: "/novotipoestabelecimento" }]}
                />
            </div>
            <div className="application-body">
                <section>
                    <p>Incluir Novo Tipo</p>
                </section>
                <section>
                    <form onSubmit={handleCadastrar}>
                        <input placeholder="Informe a descrição"
                            onChange={e => setDescription(e.target.value)}
                            className="form-control"
                        />
                        <Select
                            defaultValue={{ value: "0", label: "Selecione..." }}
                            options={typeList}
                            onChange={e => handleOnChangeDomainType(e)}
                            className="select-control"
                        />
                        <Button variant="secondary" onClick={e => handleBackButton(e)}>Voltar</Button>
                        <button className="btn btn-primary" type="submit">Cadastrar</button>
                    </form>
                </section>
            </div>
        </div>
    );
}