import React from 'react';
import { Table } from 'react-bootstrap';
import HeaderToolBar from '../components/HeaderToolBar';
import LeftSideToolBar from '../components/LeftSideToolBar';

import './DescricaoExtra.css';

export default function DescricaoExtra() {
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

                    </tbody>
                </Table>
            </div>
        </div>
    )
}