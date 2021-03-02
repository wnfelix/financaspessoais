import React from 'react'
import { BsBuilding } from 'react-icons/bs'
import { RiBookletLine } from 'react-icons/ri'
import { MdDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom'

import "./LeftSideToolBar.css";

export default function LeftSideToolBar() {
    return (
        <div className="leftsidetoolbar-content">
            <Link to={"/estabelecimentos"}>
                <BsBuilding size={26} color="white"/>
            </Link>
            <Link to={"/tiposestabelecimento"}>
                <RiBookletLine size={26} color="white"/>
            </Link>
            <Link to={"/descricaoextra"}>
                <MdDateRange size={26} color="white"/>
            </Link>
        </div>
    )
}