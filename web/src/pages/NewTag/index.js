import React, { useState, useEffect } from 'react';
import {FaFileUpload} from 'react-icons/fa';

import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Container, ErrorMessage } from '../../components/MainComponents';
import { TagArea } from './styled';
import api from '../../services/api';

function NewTag() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState({});
    const [errors, setErrors] = useState({});

    const handleSubmitTag = async (event) => {
        event.preventDefault();

        try {
            const data = new FormData();

            data.append('name', name);
            data.append('image', image);
            data.append('description', description);

            await api.post('tags', data);
            
            window.location.href = '/tags';

        } catch(error) {
            console.log(error.response.data);
        }
    }

    return (
        <>
            <Header />

            <Container>
                <TagArea>
                    <h1>Crie uma Tag</h1>

                    <form 
                        method="POST" 
                        className="new-question" 
                        onSubmit={handleSubmitTag} 
                        encType="multipart/form-data"
                    >
                        <div className="title">Nome</div>
                        {errors.title && 
                            <ErrorMessage>{errors.title}</ErrorMessage>
                        }
                        <input 
                            type="text" 
                            placeholder="Nome da categoria ou tag" 
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                        />

                        <div className="body">Descrição</div>
                        {errors.body && 
                            <ErrorMessage>{errors.body}</ErrorMessage>
                        }
                        <textarea 
                            placeholder="Descreva sobre a tag"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        >
                        </textarea>

                        <label for="uploadFile">
                            <FaFileUpload size="25px" />
                            <span>Upload de imagem</span>
                        </label>
                        <input 
                            type="file" 
                            id="uploadFile" 
                            name="image"
                            onChange={(e)=>setImage(e.target.files[0])}
                        />

                        <button type="submit">Cadastrar tag</button>
                    </form>
                </TagArea>
            </Container>

            <Footer />
        </>
    );
}

export default NewTag;