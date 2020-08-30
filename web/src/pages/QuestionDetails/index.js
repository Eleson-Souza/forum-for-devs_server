/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser'; // conversão de string para HTML.
import { AiFillLike } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

import api from '../../services/api';
import { getCookieUser, isLogged } from '../../services/authHandler';
import { formatDate } from '../../services/utils';
import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Container, ErrorMessage } from '../../components/MainComponents';
import { QuestionArea } from './styled';

function QuestionDetails() {
    let { id } = useParams();
    let user = getCookieUser();
    let logged = isLogged();

    const [question, setQuestion] = useState({});
    const [listAnswers, setListAnswers] = useState([]);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [isLike, setIsLike] = useState(true);

    useEffect(() => {
        const getQuestion = async () => {
            const response = await api.get(`questions/${id}`);
            setQuestion(response.data.question);
            setListAnswers(response.data.answers);
        }
        getQuestion();
    }, []);

    async function handleSubmitAnswer(event) {
        event.preventDefault();

        if(!logged) { // se não estiver logado, redireciona para página de login.
            window.location.href = '/login';
        }
        
        try {
            // cadastro de resposta
            await api.post('answers', {
                idQuestion: question.id,
                description,
                idUser: user.id
            });

            // requisitando na API a listagem de respostas atualizadas da pergunta
            const response = await api.get(`questions/${id}`);
            setListAnswers(response.data.answers);

            // limpa state description.
            setDescription('');

        } catch(error) {
            setErrors(error.response.data.errors);
        }
    }

    async function handleNewLikeAnswer(idAnswer, quantLikes) {
        setIsLike(!isLike);
        let newQuantLikes = 0;
        if(isLike) {
            newQuantLikes = quantLikes + 1;
        } else {
            newQuantLikes = quantLikes - 1;
        }

        await api.put(`answers/${idAnswer}`, {
            quant_likes: newQuantLikes
        });
    }

    return (
        <>
            <Header />

            <Container>
                <QuestionArea>
                    <div className="header-question">
                        <div className="title">
                            <h2>{question.title}</h2>

                            <div className="box-user">
                                <small className="date">
                                    Perguntada dia {formatDate(question.creation_date)}
                                </small>
                                <small className="user">
                                    <FaUserCircle size="24px" />
                                    <span>{question.name}</span>
                                </small>
                            </div>
                        </div>

                        <Link to="/new-question" className="new-question">
                            Faça uma pergunta
                        </Link>
                    </div>

                    <hr />
                    
                    {/* Pergunta */}
                    <article>
                        <p id="body">
                            {ReactHtmlParser(question.body)}
                        </p>

                        <div className="like">
                            <div className="liked-question">
                                <AiFillLike size="40px" className="icon-like" />
                                <span>Curtir pergunta</span>
                            </div>
                            <div className="quant-likes">{question.quant_likes} Curtidas</div>
                        </div>
                    </article>

                    {/* Respostas */}
                    <article>
                        <h3>
                            {listAnswers.length === 0 && 
                            `Nenhuma resposta`}
                            {listAnswers.length === 1 && 
                                `${listAnswers.length} Resposta`
                            }
                            {listAnswers.length > 1 && 
                                `${listAnswers.length} Respostas`
                            }
                        </h3>

                        {listAnswers.map((item, i) => {
                            return (
                                <>
                                    <p>
                                        {ReactHtmlParser(item.description)}
                                    </p>

                                    <div className="like" key={i}>
                                        <div className="answer-details">
                                            <div className="liked">
                                                <AiFillLike size="40px" className="icon-like"/*  onClick={()=>handleNewLikeAnswer(item.id, item.quant_likes)} *//>
                                                <span>Curtir resposta</span>
                                            </div>

                                            <div className="user">
                                                <FaUserCircle size="24px" />
                                                <span>{item.name}</span>
                                            </div>

                                        </div>
                                        <div className="quant-likes">{item.quant_likes} Curtidas</div>
                                    </div>

                                    <hr />
                                </>
                            );
                        })}
                    </article>

                    <h3>Adicione sua resposta</h3>
                    <form 
                        method="POST" 
                        onSubmit={handleSubmitAnswer}
                    >
                        {errors.description && 
                            <ErrorMessage className="error">{errors.description}</ErrorMessage>
                        }
                        <Editor
                            apiKey="xflzhey2swfzs2oij4nlwyajp2wg0rgjtifrae5l3sfzjk3z"
                            init={{
                            height: 300,
                            menubar: true,
                            language: 'pt_BR',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft alignjustify | bullist numlist outdent indent | removeformat'
                            }}
                            value={description}
                            onEditorChange={(content)=>{setDescription(content)}}
                        />
                        <button type="submit">Publicar</button>
                    </form>
                </QuestionArea>
            </Container>

            <Footer />
        </>
    );
}

export default QuestionDetails;