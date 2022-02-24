import Header from '../../components/Header';
import { useState, useEffect, useContext} from 'react';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify'
import Title from '../../components/Title';
import {FiPlusCircle} from 'react-icons/fi';
import './new.css';


export default function New(){

    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const {user} = useContext(AuthContext);

    useEffect(() => {
        async function loadCostomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) => {

                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                        
                    })
                })

                if(lista.length === 0){
                    console.log('NENHUMA EMPRESA ENCONTTRADA!');
                    setCustomers([ { id: 1, nomeFantasia: 'FREELA' } ]);
                    setLoadCustomers (false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);


            })
            .catch((error) => {
                console.log('Deu algum erro', error);
                setLoadCustomers(false);
                setCustomers([ { id: 1, nomeFantasia: '' } ]);
            })

        }

        loadCostomers();

      }, []);


      async function handleRegister(e){
        e.preventDefault();
       
        await firebase.firestore().collection('chamados')
        .add({
           created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(() => {
            toast.success('Chamado criado com sucesso1')
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((error) => {
            toast.error('Ops! Erro ao registrar, tente mais tarde.')
            console.log('error');
        })
    }


    // chama quando troca o assunto
    function handleChangeSelect(e){
        setAssunto(e.target.value);
        
    }

    //chama quando troca o status
    function handleOptionChange(e){
        setStatus(e.target.value);
    
    }

    //chamado quando troca de cliente
    function handleChangeCustomers(e){
        console.log('INDEX DO CLIENTE SELECIONADO: ', e.target.value);
        console.log('Cliente selecionado', customers[e.target.value]);
        setCustomerSelected(e.target.value);
    }


    return(
        <div>
            <Header/>

            <div className="content">
                <Title name=" Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile"  onSubmit={handleRegister} >
                        <label>Cliente</label>

                        {loadCustomers ? (
                            <input type="text" disable={true} value="Carregando clientes..." />
                        ): (

                            <select value={customerSelected} onChange={handleChangeCustomers} >
                           {customers.map((item, index) =>{
                               return(
                                   <option key={item.id} value={index}>
                                       {item.nomeFantasia}

                                   </option>
                               )
                           } )}
                        </select>

                        )}

                        <label>Assunto</label>
                        <select  value={assunto} onChange={handleChangeSelect}>
                            <option>  Suporte </option>
                            <option value="Visita tecnica">  visita tecnica </option>
                            <option value="Financeiro">  Financeiro </option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio"
                             name="radio"
                             value="Aberto"
                             onChange={handleOptionChange}
                             checked={ status === 'Aberto' }
                             />
                             <span>Em aberto</span>
                             <input type="radio"
                             name="radio"
                             value="progresso"
                             onChange={handleOptionChange}
                             checked={ status === 'progresso' }
                             />
                             <span>Progresso</span>

                             <input type="radio"
                             name="radio"
                             value="Atendido"
                             onChange={handleOptionChange}
                             checked={ status === 'atendido' }
                             />
                             <span>Atendido</span>
                        </div>

                        <label>Complemento</label>

                        <textarea
                        type="text"
                        placeholder="Descreva seu problema (opcional)."
                        value={complemento}
                        onChange={ (e) => setComplemento(e.target.value) }
                        />

                        <button type="submit">Registrar</button>

                    </form>
                </div>
            </div>
            
        </div>

    )
}