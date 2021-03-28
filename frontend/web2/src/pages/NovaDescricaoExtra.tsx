import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import ptBr from 'date-fns/locale/pt-BR'
import HeaderToolBar from '../components/HeaderToolBar';
import LeftSideToolBar from '../components/LeftSideToolBar';
import IEntidadeGenerica from '../interfaces/IEntidadeGenerica';
import IEstabelecimento from '../interfaces/IEstabelecimento';
import IValueLabelPair from '../interfaces/IValueLabelPair';

import api from '../services/api';

import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap';

export default function NovaDescricaoExtra() {
    const [tipoDominio, setTipoDominio] = useState<IValueLabelPair[]>([]);
    const [estabelecimentos, setEstabelecimentos] = useState<IValueLabelPair[]>();
    const [descricao, setDescricao] = useState("");
    const [tipo, setClassificacao] = useState<IValueLabelPair | null>();
    const [estab, setEstab] = useState<IValueLabelPair | null>();
    const [dataCompra, setDataCompra] = useState(new Date());
    const [indice, setIndice] = useState(1);


    useEffect(() => {
        api.get<IEntidadeGenerica[]>('tipodominio?iddominio=1')
            .then(response => {
                let options = response.data.map(t => {
                    return { value: t.id, label: t.descricao };
                }).sort((a, b) => {
                    return ('' + a.label).localeCompare(b.label);
                });
                setTipoDominio(options);
            });

        api.get<IEstabelecimento[]>('estabelecimento')
            .then(response => {
                setEstabelecimentos(response.data.map(e => ({ value: e.id, label: e.palavraChave })));
            });
    }, []);

    function handleNovaDescricaoExtra(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            estabelecimento: {
                id: estab?.value,
            },
            classificacao: {
                id: tipo?.value
            },
            dataCompra: dataCompra,
            indiceCompra: indice,
            descricao: descricao
        };

        api.post('descricaoextra', data)
            .then(result => {
                alert("cadastrou");
                setEstab(null);
                setClassificacao(null);
                setDescricao("");
                setIndice(1);
            });
    }

    function handleDataCompra(date: Date) {
        setDataCompra(date);
    }

    return (
        <div className="application-content">
            <LeftSideToolBar />
            <div className="application-header">
                <HeaderToolBar
                    title={{ text: "Descrição extra", url: "/descricaoextra" }}
                    links={[{ text: "Nova", url: "/novadescricaoextra" }]}
                />
            </div>
            <div className="application-body">
                <section>
                    Incluir nova descrição extra
                </section>
                <form onSubmit={e => handleNovaDescricaoExtra(e)} >
                    <Form.Control
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        type="text"
                        placeholder="Informe a descrição"
                        maxLength={200} />
                    <Select
                        id="drpEstabelecimentos"
                        value={estab}
                        options={estabelecimentos}
                        onChange={e => setEstab(e)}
                        defaultValue={{ value: "0", label: "Selecione..." }}
                    />
                    <Select
                        id="drpTipoDominio"
                        value={tipo}
                        options={tipoDominio}
                        onChange={e => setClassificacao(e)}
                        defaultValue={{ value: "0", label: "Selecione..." }}
                    />
                    <DatePicker
                        selected={dataCompra}
                        onChange={handleDataCompra}
                        locale={ptBr}
                        dateFormat="dd/MM/yyyy"
                    />
                    <input value={indice} type="number" min="1" max="10" onChange={e => setIndice(Number(e.target.value))} />
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            </div>
        </div>
    )
}