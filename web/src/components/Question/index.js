import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { BsPeopleFill, BsCalendarFill } from 'react-icons/bs';
import { FaTags } from 'react-icons/fa';

import { QuestionArea } from './styled';

function Question(props) {
    return (
        <>
            <QuestionArea>
                <Link to={`/questions/${props.id}`}>
                    <h3>{props.title}</h3>
                </Link>
                <hr />

                <div className="info">
                    <div>
                        <div>
                            <strong>Votos</strong>
                        </div>
                        <div className="desc">
                            <AiFillLike size="17px" color="black" />
                            <span>{props.votes} votos</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <strong>Número de respostas</strong>
                        </div>
                        <div className="desc">
                            <BsPeopleFill size="17px" color="black" />
                            <span>{props.answers} respostas</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <strong>Data de criação</strong>
                        </div>
                        <div className="desc">
                            <BsCalendarFill size="17px" color="black" />
                            <span>{props.dateCreation}</span>
                        </div>
                    </div>
                </div>

                <div className="tags">
                    <div className="title">
                        <div>
                            <strong>Tags</strong> <br/>
                            <FaTags size="17px" color="black" />
                        </div>
                    </div>
                    <div className="items">
                        {Array.isArray(props.tags) &&
                            props.tags.map((item, i) => {
                                return <div key={i}>{item}</div>
                        })}

                        {props.tags.length === 0 &&
                            <small>Nenhuma Tag</small>
                        }

                        {Array.isArray(props.tags) === false && 
                            <div>{props.tags}</div>
                        }
                    </div>
                </div>
            </QuestionArea>
        </>
    );
}

export default Question;