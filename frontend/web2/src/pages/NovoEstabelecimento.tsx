import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import './NovoEstabelecimento.css';

import api from '../services/api'
import IEntidadeGenerica from '../interfaces/IEntidadeGenerica';
import IValueLabelPair from '../interfaces/IValueLabelPair';
import LeftSideToolBar from '../components/LeftSideToolBar';

export default function NovoEstabelecimento() {
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

    function handleOnChangeDomainType(e: IValueLabelPair | null) {
        setTipo(e);
    }

    function handleBackButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        history.goBack();
    }

    async function salvarEstabelecimento(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            descricao: description,
            palavrachave: chave,
            classificacao: { id: tipo?.value }
        };

        try {
            await api.post('estabelecimento/cadastrar', data);

            setDescription('');
            setChave('');
            setTipo(null);

            alert('Cadastrado com sucesso');
        } catch (error) {
            alert('Ocorreu um problema ao cadastrar estabelecimento, tenta novamente');
        }
    }

    return (
        <div className="novoestabelecimento-content">
            <LeftSideToolBar />
            <div className="novoestabelecimento-header">
                cabeçalho                
            </div>
            <div className="novoestabelecimento-body">
                <section>
                    <p>Informe os dados do novo estabelecimento</p>
                </section>
                <form onSubmit={e => salvarEstabelecimento(e)}>
                    <input placeholder="Informe a descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Informe a palavra chave"
                        value={chave}
                        onChange={e => setChave(e.target.value)}
                    />
                    <Select
                        value={tipo}
                        options={tipoDominio}
                        onChange={e => handleOnChangeDomainType(e)}
                        className="select-control"
                    />
                    <button type="button" onClick={e => handleBackButton(e)}>Voltar</button>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}