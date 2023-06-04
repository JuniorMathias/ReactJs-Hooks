import React, {useState, useCallback} from 'react';
import {Container,Form, SubmitButton, List,DeleteButton} from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

import api from '../../services/api';


export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  function handleInputChange(e){
    setNewRepo(e.target.value);
    setAlert(null);
  }
   const handleDelete = useCallback((repo) => {
     //verifica se é diferente do nome e retorna somente os diferentes dentro do find 
    const find = repositorios.filter( r => r.name !== repo);
    //retorna todos os valores diferentes do repo
    setRepositorios(find);
   }, [repositorios]);

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){ 
      setLoading(true);
      setAlert(null);
      try{
        if(newRepo === ''){
          throw new Error('Você precisa indicar um repositorio');
        }
        const response = await api.get(`repos/${newRepo}`);

        const hasRepo = repositorios.find( repo => repo.name === newRepo);

        if(hasRepo){
          throw new Error('Repositorio Duplicado');
        }
  
        const data = {
          name: response.data.full_name,
        }
      
        setRepositorios([...repositorios, data]);
        setNewRepo('');
      
      }catch(e){
        setAlert(true);
        console.log(e);
      }finally{
        setLoading(false);
      }
      }
      
    submit();

  }, [newRepo, repositorios]);


  return (
    <Container >
      <h1>
        <FaGithub size={25} />
        Meus Repositorios 
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
         type="text"
         placeholder="Adicionar Repositorios"
         value={newRepo}
         onChange={handleInputChange}
        />

        <SubmitButton Loading={loading ? 1 : 0} >
          {loading 
            ? (
              <FaSpinner color='#fff' size={14} /> 
            ) : (
              <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={()=> handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <a href="">
              <FaBars size={20}/>
            </a>
          </li>
        ))}
      </List>
    </Container>
  );
}

