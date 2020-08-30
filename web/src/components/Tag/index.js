import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

import { TagArea } from './styled';

function Tag(props) {
    return (
        <>
            <TagArea>
                <div className="title-header">
                    <Link to={`/questions/tag/${props.slug}`}>
                        <h3>{props.name}</h3>
                    </Link>
                    <img src={props.image} alt="Imagem da tag" />
                </div>
                <hr />

                <div className="info-body">
                    <p>
                        {props.description}
                    </p>
                </div>

                <div className="info-footer">
                    <span>Número de perguntas</span>
                    <div>
                        <BsFillQuestionCircleFill size="17px" />
                        <span>{props.quantQuestions} perguntas</span>
                    </div>
                </div>
            </TagArea>
        </>
    );
}

export default Tag;