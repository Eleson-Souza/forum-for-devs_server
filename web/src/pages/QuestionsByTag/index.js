import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { getCookieUser } from '../../services/authHandler';

import api from '../../services/api';
import { formatDate } from '../../services/utils';
import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import Question from '../../components/Question';
import { QuestionsArea, AllQuestionsArea } from './styled';
import imgNotFound from '../../images/not-found.png';

function QuestionsByTag() {
    let user = getCookieUser();
    let {slug} = useParams();

    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState('');
    const [radioClassifSelected, setRadioClassifSelected] = useState('creation_date');
    const [radioOrderSelected, setRadioOrderSelected] = useState('desc');

    useEffect(() => {
        const getQuestions = async () => {
            const response = await api.get(`/questions/tag/${slug}`);
            setQuestions(response.data);
        }
        getQuestions();
    }, []);

    // Consumindo API para filtros das perguntas, de acordo com os parametros requisitados.
    async function handleSubmitFilter(event) {
        event.preventDefault();

        let queryParam = `?search=${search}&classification=${radioClassifSelected}&order=${radioOrderSelected}`;
        let response = await api.get(`questions${queryParam}`);
        
        setQuestions(response.data);
    }

    function handleChangedRadioClassif() {
        // acessando todos os inputs radio 'classif'.
        let radio = document.getElementsByName('classif');

        // percorrendo array e setando o state de acordo com a seleção do radio.
        radio.forEach(item => {
            if(item.checked && item.id === 'name') {
                setRadioClassifSelected('title');
            } else if(item.checked && item.id === 'recents') {
                setRadioClassifSelected('creation_date');
            } else if(item.checked && item.id === 'likes') {
                setRadioClassifSelected('quant_likes');
            } else if(item.checked && item.id === 'answers') {
                setRadioClassifSelected('quant_answers');
            }
        });
    }

    function handleChangedRadioOrder() {
        let radio = document.getElementsByName('ordination');

        radio.forEach(item => {
            if(item.checked && item.id === 'asc') {
                setRadioOrderSelected('asc');
            } else if(item.checked && item.id === 'desc') {
                setRadioOrderSelected('desc');
            }
        });
    }

    return (
        <>
            <Header />

            <QuestionsArea>
                <div className="questions">
                    <div className="header">
                        <h2>Todas as perguntas com a tag "{slug.toUpperCase()}"</h2>
                        <Link to="/new-question" className="new-question">
                            Faça uma pergunta
                        </Link>
                    </div>

                    {questions.length !== 0 &&
                        <h3 className="quant-questions">
                            {questions.length} perguntas
                        </h3>
                    }

                    <AllQuestionsArea>
                        {questions.length === 0 && // se não houver registros...
                            <div className="not-found">
                                <img src={imgNotFound} alt="Não encontrado" />
                                <h2>Nenhuma pergunta encontrada</h2>
                                <span>Não houve resultados para esse busca, tente pesquisar por outras tags similares</span>
                            </div>
                        }

                        { questions.map(question => { // renderizando itens do array...
                            return (
                                <Question // componente de cada pergunta com passagem de props.
                                    key={question.id}
                                    id={question.id}
                                    title={question.title}
                                    votes={question.quant_likes}
                                    answers={question.quant_answers}
                                    dateCreation={question.creation_date}
                                    tags={question.tag}
                                />
                            );
                        }) }
                    </AllQuestionsArea>
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
                                <input type="radio" id="recents" name="classif" value="creation_date" /> 
                                <label htmlFor="recents">Data de criação</label>                            
                            </div>
                            <div className="inputRadio">
                                <input type="radio" id="likes" name="classif" /> 
                                <label htmlFor="likes">Curtidas</label>                            
                            </div>
                            <div className="inputRadio">
                                <input type="radio" id="answers" name="classif" /> 
                                <label htmlFor="answers">Respostas</label>                            
                            </div>
                        </div>

                        <div className="ordination" onChange={handleChangedRadioOrder}>
                            <span>Ordenar por</span>
                            <div className="inputRadio">
                                <input type="radio" id="asc" name="ordination" /> 
                                <label htmlFor="asc">Crescente</label>
                            </div>
                            <div className="inputRadio">
                                <input type="radio" id="desc" name="ordination" /> 
                                <label htmlFor="desc">Decrescente</label>
                            </div>
                        </div>

                        <button type="submit">Aplicar filtros</button>
                    </form>
                </div>
            </QuestionsArea>

            <Footer />
        </>
    );
}

export default QuestionsByTag;