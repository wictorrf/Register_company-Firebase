import {useContext} from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';
import perfil from '../../assets/perfil.png';

import {Link} from 'react-router-dom';
import {FiHome, FiUser, FiSettings} from "react-icons/fi";

//  <img src={user.perfilUrl === null ? perfil : user.perfilUrl } alt="Foto perfil" />
export default function Header(){

    const {user} = useContext(AuthContext)

    return(
        <div className="sidebar">
            
            <div>
               <img src={user.perfilUrl === null ? perfil : user.perfilUrl } alt="Foto perfil" />
            </div>

            <Link to="/dashboard">
            <FiHome color="#000" size={24}/>
                chamados
            </Link>
            <Link to="/customers">
            <FiUser color="#000" size={24}/>
                Clientes
            </Link>
            <Link to="/profile">
            <FiSettings color="#000" size={24}/>
                Configuracoes
            </Link>
            
        </div>
    )
}