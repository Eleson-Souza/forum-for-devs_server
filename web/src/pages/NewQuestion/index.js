import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {useParams} from 'react-router-dom';
import {FaCheckSquare} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';

import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Container, ErrorMessage } from '../../components/MainComponents';
import { QuestionArea } from './styled';
import { getCookieUser } from '../../services/authHandler';
import api from '../../services/api';

function NewQuestion() {
    const { id: user_id } = getCookieUser();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tagSelected, setTagSelected] = useState('Selecione uma tag');
    const [tags, setTags] = useState([]);
    const [tagsAdd, setTagsAdd] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let getTags = async () => {
            let response = await api.get('tags/all');
            setTags(response.data);
        }
        getTags();
    }, []);

    function handleAddTag() {
        if(!tagsAdd.includes(tagSelected) && tagSelected !== 'Selecione uma tag')
            setTagsAdd([...tagsAdd, tagSelected]);
    }

    function handleDeleteTag(index) {
        let listTags = [...tagsAdd];
        listTags.splice(index, 1);
        setTagsAdd(listTags);
    }

    async function handleSubmitQuestion(event) {
        event.preventDefault();

        try {
            await api.post(`questions`, {
                title,
                body,
                tags: tagsAdd,
                user_id
            });
            window.location.href = '/questions';
        } catch(error) {
            setErrors(error.response.data);
        }
    }

    return (
        <>
            <Header />

            <Container>
                <QuestionArea>
                    <h1>Faça uma pergunta</h1>

                    <form method="POST" className="new-question" onSubmit={handleSubmitQuestion}>
                        <div className="title">Título</div>
                        {errors.title && 
                            <ErrorMessage>{errors.title}</ErrorMessage>
                        }
                        <input 
                            type="text" 
                            placeholder="Qual sua pergunta sobre tecnologia? Seja específico." 
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />

                        <div className="body">Corpo</div>
                        {errors.body && 
                            <ErrorMessage>{errors.body}</ErrorMessage>
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
                            value={body}
                            onEditorChange={(content)=>{setBody(content)}}
                        />

                        <div className="tags">Tags</div>
                        <div className="include-tags">
                            <select 
                                title="Informe as tags/categorias referente(s) à pergunta."
                                value={tagSelected}
                                onChange={(e)=>{setTagSelected(e.target.value)}}
                            >
                                <option selected disabled>Selecione uma tag</option>
                                {tags.map((t, i) => {
                                    return <option key={i} value={t.slug}>{t.name}</option>
                                })}
                            </select>
                            <FaCheckSquare 
                                color="#4BB94F" 
                                size="34px" 
                                className="icon-check" 
                                onClick={handleAddTag}
                            />
                        </div>

                        <div className="tags-list">
                            {tagsAdd.length === 0 && 
                                <h3>Nenhuma tag escolhida, inclua novas tags...</h3>
                            }
                            {tagsAdd.map((tag, i) => {
                                return (
                                    <span key={i}>
                                        {tag} 
                                        <AiFillCloseCircle size="14px" className="icon-close" onClick={()=>{handleDeleteTag(i)}} />
                                    </span>
                                )
                            })}
                        </div>

                        <button type="submit">Cadastrar pergunta</button>
                    </form>
                </QuestionArea>
            </Container>

            <Footer />
        </>
    );
}

export default NewQuestion;