import styled from 'styled-components';

export const QuestionArea = styled.div`

margin-top: 37px;

h1 {
    font-size: 25px;
    margin-bottom: 36px;
}

form {
    margin: auto;
    width: 918px;
    box-sizing: border-box;
    background-color: #FFF;
    border-radius: 8px;
    padding: 35px 65px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.5);

    div {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 3px;
    }

    input, select, .tags-list {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #756F6F;
        border-radius: 5px;
        outline: 0;
        padding: 5px 10px;
        margin-bottom: 23px;
        font-size: 14px;
    }

    .tox-tinymce {
        border: 1px solid #756F6F;
        border-radius: 5px;
        outline: 0;
        margin-bottom: 23px;
        font-size: 14px;
    }

    .include-tags {
        display: flex;
        align-items: center;
        margin-bottom: 23px;

        select {
            margin: 0;
        }

        .icon-check {
            margin-left: 5px;
            cursor: pointer;
        }
    }

    .tags-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;

        span {
            display: flex;
            align-items: center;
            background-color: #1E90FF;
            color: #FFF;
            font-size: 12px;
            border-radius: 5px;
            padding: 6.5px 10px;
            margin-right: 7px;
            margin-bottom: 7px;

            .icon-close {
                margin-left: 5px;
                cursor: pointer;

                &:hover {
                    color: #FF6347;
                }
            }
        }
    }

    button {
        background-color: #4BB94F;
        color: #FFF;
        font-size: 15px;
        font-weight: 500;
        border: none;
        border-radius: 5px;
        outline: 0;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
        padding: 10px 30px;
        cursor: pointer;
        transition: all ease 0.3s;

        &:hover {
            background-color: #419D45;
        }
    }
}

`;