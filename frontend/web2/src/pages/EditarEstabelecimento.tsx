import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import Select from 'react-select';
import HeaderToolBar from '../components/HeaderToolBar';

import LeftSideToolBar from '../components/LeftSideToolBar';
import IEntidadeGenerica from '../interfaces/IEntidadeGenerica';
import IEstabelecimento from '../interfaces/IEstabelecimento';
import IValueLabelPair from '../interfaces/IValueLabelPair';

import api from '../services/api';

import './EditarEstabelecimento.css';

export default function EditarEstabelecimento() {
    const { id } = useParams<{ id: string }>();
    const [description, setDescription] = useState('');
    const [chave, setChave] = useState('');
    const [tipoDominio, setTipoDominio] = useState<IValueLabelPair[]>([]);
    const [tipo, setTipo] = useState<IValueLabelPair | null>();

    const history = useHistory();

    useEffect(() => {
        api.get<IEntidadeGenerica[]>('tipodominio?iddominio=1')
            .then(response => {
                let options = response.data.map(t => {
                    return { value: t.id, label: t.descricao };
                }).sort((a, b) => {
                    return ('' + a.label).localeCompare(b.label);
                });
                setTipoDominio(options);
            })
    }, []);

    useEffect(() => {
        api.get<IEstabelecimento>(`estabelecimento/${id}`)
            .then(response => {
                setDescription(response.data.descricao);
                setChave(response.data.palavraChave);
                setTipo(
                    {
                        value: response.data.classificacao.id,
                        label: response.data.classificacao.descricao
                    });
            });
    }, []);

    async function handleEditarEstabelecimento(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            id: id,
            descricao: description,
            palavrachave: chave,
            classificacao: { id: tipo?.value }
        }

        try {
            await api.put('estabelecimento', data);

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    function handleOnChangeDomainType(e: IValueLabelPair | null) {
        setTipo(e);
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
                    title={{ text: "Estabelecimentos", url: "/estabelecimentos" }}
                    links={
                        [
                            {
                                text: "Novo",
                                url: "/novoestabelecimento"
                            }
                        ]}
                />
            </div>
            <div className="application-body">
                <section>
                    <p>Editar Dados do Estabelecimento</p>
                </section>
                <form onSubmit={e => handleEditarEstabelecimento(e)}>
                    <input placeholder="Informe a descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="form-control"
                    />
                    <input placeholder="Informe a palavra chave"
                        value={chave}
                        onChange={e => setChave(e.target.value)}
                        className="form-control"
                    />
                    <label className="filter-label" htmlFor="drpTipoDominio">Classificação</label>
                    <Select
                        id="drpTipoDominio"
                        value={tipo}
                        options={tipoDominio}
                        onChange={e => handleOnChangeDomainType(e)}
                        defaultValue={{ value: "0", label: "Selecione..." }}
                    />
                        <Button variant="secondary" onClick={e => handleBackButton(e)}>Voltar</Button>
                        <button className="btn btn-primary" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}