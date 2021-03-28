import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import HeaderToolBar from '../components/HeaderToolBar';
import LeftSideToolBar from '../components/LeftSideToolBar';
import IEstabelecimento from '../interfaces/IEstabelecimento';
import api from '../services/api';

import './Estabelecimentos.css';
import { TiTrash } from 'react-icons/ti';
import { Modal } from 'react-bootstrap';

export default function Estabelecimentos() {
    const [data, setData] = useState<IEstabelecimento[]>();
    const [showDeleteDialog, setShowDeleteDialog] = useState({ show: false, id: 0 });

    useEffect(() => {
        api.get('estabelecimento')
            .then(response => {
                setData(response.data);
            });
    }, []);

    function handleDelete() {
        const id = showDeleteDialog.id;

        api.delete(`estabelecimento/${id}`)
            .then(result => {
                alert('deu certo');
            });

        setData(data?.filter(d => Number(d.id) !== id));
        setShowDeleteDialog({ show: false, id: 0 });
    }

    function modalDelete() {
        return (
            <Modal show={showDeleteDialog.show} onHide={() => setShowDeleteDialog({ show: false, id: 0 })} >
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Estabelecimento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Confirma exclusão do registro {showDeleteDialog.id}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteDialog({ show: false, id: 0 })}>Cancelar</Button>
                    <Button variant="primary" onClick={() => handleDelete()}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div className="application-content">
            {modalDelete()}
            <LeftSideToolBar />
            <div className="application-header">
                <HeaderToolBar
                    title={{ text: "Estabelecimentos", url: "/estabelecimentos" }}
                    links={[{ text: "Novo", url: "/novoestabelecimento" }]}
                />
            </div>
            <div className="application-body">
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descrição</th>
                            <th>Palavra Chave</th>
                            <th>Classificação</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.descricao}</td>
                                    <td>{e.palavraChave}</td>
                                    <td>{e.classificacao.descricao}</td>
                                    <td>
                                        <Link to={`/editarestabelecimento/${e.id}`}>
                                            <BsPencilSquare size={20} color="rgb(54, 96, 146)" />
                                        </Link>
                                    </td>
                                    <td>
                                        <TiTrash size={25} onClick={() => setShowDeleteDialog({ show: true, id: Number(e.id) })} color="rgb(130, 11, 17)" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>)
}