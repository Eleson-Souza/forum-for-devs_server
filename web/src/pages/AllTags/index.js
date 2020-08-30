import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { getCookieUser } from '../../services/authHandler';

import api from '../../services/api';
import { formatDate } from '../../services/utils';
import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import Tag from '../../components/Tag';
import { TagsArea, AllTagsArea } from './styled';

function AllTags() {
    let user = getCookieUser();

    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const [radioClassifSelected, setRadioClassifSelected] = useState('quant_questions');
    const [radioOrderSelected, setRadioOrderSelected] = useState('desc');

    useEffect(() => {
        const getTags = async () => {
            const response = await api.get('tags');
            setTags(response.data);
        }
        getTags();
    }, []);

    // Consumindo API para filtros das perguntas, de acordo com os parametros requisitados.
    async function handleSubmitFilter(event) {
        event.preventDefault();

        let queryParam = `?search=${search}&orderBy=${radioClassifSelected}&order=${radioOrderSelected}`;
        let response = await api.get(`tags${queryParam}`);
        
        setTags(response.data);
    }

    function handleChangedRadioClassif() {
        // acessando todos os inputs radio 'classif'.
        let radio = document.getElementsByName('classif');

        // percorrendo array e setando o state de acordo com a seleção do radio.
        radio.forEach(item => {
            if(item.checked && item.id === 'name') {
                setRadioClassifSelected('name');
                setRadioOrderSelected('asc');
            } else if(item.checked && item.id === 'relevance') {
                setRadioClassifSelected('quant_questions');
                setRadioOrderSelected('desc');
            }
        });
    }

    return (
        <>
            <Header />

            <TagsArea>
                <div className="questions">
                    <div className="header">
                        <h2>Tags das tecnologias</h2>
                        <Link to="/new-tag" className="new-tag">
                            Crie uma nova Tag
                        </Link>
                    </div>

                    <AllTagsArea>
                        { tags.map(tag => {
                            return (
                                <Tag // componente de cada tag com passagem de props.
                                    key={tag.id}
                                    id={tag.id}
                                    name={tag.name}
                                    slug={tag.slug}
                                    image={tag.image}
                                    description={tag.description}
                                    quantQuestions={tag.quant_questions}
                                />
                            );
                        }) }
                    </AllTagsArea>
                </div>

                <div className="filters">
                    <h2>Filtros</h2>
                    <hr />

                    <form method="POST" onSubmit={handleSubmitFilter}>
                        <div className="search">
                            <FaSearch size="21px" />
                            <input 
                                type="text" 
                                placeholder="Pesquisa" 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="classification" onChange={handleChangedRadioClassif}>
                            <span>Classificar por</span>
                            <div className="inputRadio">
                                <input type="radio" id="name" name="classif" /> 
                                <label htmlFor="name">Nome</label>
                            </div>
                            <div className="inputRadio">
                                <input type="radio" id="relevance" name="classif" /> 
                                <label htmlFor="relevance">Relevância / Popularidade</label>                            
                            </div>
                        </div>

                        <button type="submit">Aplicar filtros</button>
                    </form>
                </div>
            </TagsArea>

            <Footer />
        </>
    );
}

export default AllTags;