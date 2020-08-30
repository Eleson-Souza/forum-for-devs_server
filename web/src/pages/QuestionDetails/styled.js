import styled from 'styled-components';

export const QuestionArea = styled.div`

margin-top: 23px;

.header-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .title {
        h2 {
            font-size: 22px;
            margin-bottom: 15px;
        }

        .box-user {
            background-color: #a8c5dd;
            padding: 4px 8px;
            border-radius: 4px;
            width: fit-content;

            small {
                display: block;
                font-size: 14px;
            }

            .date {
                color: #333;
            }

            .user {
                display: flex;
                align-items: center;
                margin-top: 5px;

                span {
                    margin-left: 5px;
                    font-weight: bold;
                }
            }
        }
    }

    .new-question {
        text-decoration: none;
        height: fit-content;
        background-color: #4987AA;
        border-radius: 5px;
        padding: 10px 17px;
        color: #FFF;
        font-size: 18px;
        font-weight: bold;
        transition: all ease 0.3s;

        &:hover {
            background-color: #3f7594;
        }
    }
}

hr {
    border: 1px solid rgba(0,0,0,0.37);
    margin-bottom: 28px;
}

article {
    font-size: 18px;
    text-align: justify;

    .like {
        margin-top: 15px;
        margin-bottom: 50px;

        .liked-question { /* estilo article pergunta */
            display: flex;
            align-items: center;

            .icon-like {
                cursor: pointer;
                transition: all ease-in 0.2s;

                &:hover {
                    color: #4080FF;
                }
            }

            span {
                margin-left: 6px;
                margin-top: 10px;
            }
        }

        .answer-details { /* estilo article respostas */
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
                display: flex;
                align-items: center;

                span {
                    margin-left: 6px;
                }
            }

            div.liked {
                .icon-like {
                    cursor: pointer;
                    transition: all ease-in 0.2s;

                    &:hover {
                        color: #4080FF;
                    }
                }

                span {                    
                    margin-top: 10px;
                }
            }

            div.user {
                background-color: #a8c5dd;
                padding: 4px 8px;
                border-radius: 4px;
                cursor: default;
                font-size: 15px;
                font-weight: bold;
            }
        }

        .quant-likes {
            margin-top: 10px;
        }
    }

    h3 {
        margin-bottom: 25px;
    }
}

h3 {
    font-size: 20px;
    margin-bottom: 16px;
}

form {
    margin-left: 20px;

    .error {
        width: fit-content;
    }

    div {
        width: 100%;
        font-size: 18px;
        border: 1px solid #4F4F4F;
        border-radius: 5px;
    }

    button {
        width: 141px;
        height: 39px;
        background-color: #4BB94F;
        color: #FFF;
        font-size: 18px;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.4);
        outline: 0;
        cursor: pointer;
        margin-top: 10px;
        transition: all ease 0.3s;

        &:hover {
            background-color: #3A9E4A;
        }
    }
}

`;