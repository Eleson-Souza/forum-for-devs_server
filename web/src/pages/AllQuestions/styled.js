import styled from 'styled-components';

export const QuestionsArea = styled.div`

display: flex;

.questions {
    flex: 1;
    margin-left: 132px;

    .header {
        display: flex;
        justify-content: space-between;
        padding-top: 26px;
    }

    h2 {
        font-size: 25.33px;
    }

    .new-question {
        text-decoration: none;
        height: fit-content;
        background-color: #4987AA;
        border-radius: 5px;
        padding: 10px 17px;
        margin-right: 50px;
        color: #FFF;
        font-size: 18px;
        font-weight: bold;
        transition: all ease 0.3s;

        &:hover {
            background-color: #3f7594;
        }
    }
}

.filters {
    width: 373px;
    box-sizing: border-box;
    padding: 26px 35px;
    background-color: rgba(180,142,225,0.2);

    h2 {
        font-size: 25.33px;
        margin-bottom: 15px;
    }

    form {
        margin-top: 24px;
        font-size: 17px;

        input {
            
        }

        .search {
            display: flex;
            align-items: center;
            height: 42px;
            background-color: #FFF;
            width: calc(100% - 35px);
            border: 2px solid #FFF;
            border-radius: 20px;
            padding: 0px 20px;
            margin-bottom: 25px;
            transition: all ease 0.3s;

            input {
                height: 42px;
                width: 100%;
                font-size: 17px;
                margin-left: 10px;
                border: none;
                outline: 0;
                background-color: inherit;
            }

            &:hover {
                background-color: #F0F0F0;
                border: 2px solid #C4C4C4;
            }
        }

        .classification,
        .ordination {
            span {
                margin-bottom: 15px;
                font-weight: bold;
            }

            .inputRadio {
                margin-bottom: 10px;
                margin-left: 12px;

                label {
                    margin-left: 10px;
                }
            }
        }

        button {
            background-color: #4BB94F;
            border: none;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
            margin-top: 15px;
            padding: 8px 16px;
            font-size: 17px;
            color: #FFF;
            float: right;
            cursor: pointer;
        }
    }
}

`;

export const AllQuestionsArea = styled.div`

display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin-right: 50px;
margin-top: 50px;

`;