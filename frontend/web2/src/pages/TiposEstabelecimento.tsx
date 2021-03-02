import React from 'react';
import HeaderToolBar from '../components/HeaderToolBar';
import LeftSideToolBar from '../components/LeftSideToolBar';

export default function TiposEstabelecimento() {
    return (
        <div className="application-content">
            <LeftSideToolBar />
            <div className="application-header">
            <HeaderToolBar
                    title={{ text: "Tipos de Estabelecimento", url: "/tiposestabelecimento" }}
                    links={[{ text: "Novo", url: "/novotipoestabelecimento" }]}
                />
            </div>
            <div className="application-body">

            </div>
        </div>
    )
}