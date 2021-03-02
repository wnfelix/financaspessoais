import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DescricaoExtra from './pages/DescricaoExtra';
import EditarEstabelecimento from './pages/EditarEstabelecimento';
import Estabelecimentos from './pages/Estabelecimentos';
import NovaDescricaoExtra from './pages/NovaDescricaoExtra';
import NovoEstabelecimento from './pages/NovoEstabelecimento';
import NovoTipoEstabelecimento from './pages/NovoTipoEstabelecimento';
import TiposEstabelecimento from './pages/TiposEstabelecimento';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Estabelecimentos} />
                <Route path='/estabelecimentos' component={Estabelecimentos} />
                <Route path='/editarestabelecimento/:id' component={EditarEstabelecimento} />
                <Route path='/novoestabelecimento' component={NovoEstabelecimento} />
                <Route path='/tiposestabelecimento' component={TiposEstabelecimento} />
                <Route path='/novotipoestabelecimento' component={NovoTipoEstabelecimento} />
                <Route path='/descricaoextra' component={DescricaoExtra} />
                <Route path='/novadescricaoextra' component={NovaDescricaoExtra} />
            </Switch>
        </BrowserRouter>
    )
}