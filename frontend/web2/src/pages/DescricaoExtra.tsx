import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import HeaderToolBar from '../components/HeaderToolBar';
import LeftSideToolBar from '../components/LeftSideToolBar';
import IDescricaoExtra from '../interfaces/IDescricaoExtra';

import api from '../services/api';

import './DescricaoExtra.css';

export default function DescricaoExtra() {
    const [descricaoExtra, setDescricaoExtra] = useState<IDescricaoExtra[]>([]);

    useEffect(() => {
        api.get<IDescricaoExtra[]>('descricaoextra')
            .then(response => {
                setDescricaoExtra(response.data);
            })
    }, []);

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
                <Table>
                    <thead>
                        <tr>
                            <th>Estabelecimento</th>
                            <th>Classificação</th>
                            <th>Descrição</th>
                            <th>Data da Compra</th>
                            <th>Índice</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {descricaoExtra.map(d => {
                            return <tr>
                                <td>{d.estabelecimento.palavraChave}</td>
                                <td>{d.classificacao.descricao}</td>
                                <td>{d.descricao}</td>
                                <td>{d.dataCompra}</td>
                                <td>{d.indiceCompra}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}