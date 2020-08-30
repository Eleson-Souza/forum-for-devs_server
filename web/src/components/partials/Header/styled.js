import styled from 'styled-components';

export const HeaderArea = styled.nav`

display: flex;
align-items: center;
background-color: #B48EE1;
height: 60px;
padding: 0 20px;

.nav-menu-items {
    flex: 2;
    ul {
        display: flex;
        align-items: center;
        height: 60px;
        list-style: none;
        padding: 0;

        li {
            margin-right: 20px;       
            font-size: 17px;
            font-weight: bold;
            transition: all ease-in 0.3s;

            .link-home {
                display: flex;            
                align-items: center;
                text-decoration: none;
                color: #FFF;

                .logo {
                    height: 45px;
                    margin-right: 5px;
                }
            }

            a {
                text-decoration: none;
                color: #FFF;
            }

            &:not(.logo-item) {
                margin: 0px;
                padding: 20px 12px;
            }

            &:hover:not(.logo-item) {
                background-color: #8065A0;
            }
        }
    }
}

.nav-menu-options {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button, a {
        text-decoration: none;
        font-size: 17px;
        font-weight: bold;
        color: #FFF;
        padding: 3px 15px;
        margin-right: 10px;
        border: 1px solid #FFF;
        border-radius: 5px;
        cursor: pointer;
    }

    .login {
        background-color: #364EE6;
    }

    .register {
        background-color: #42BB7A;
    }

    .logout {
        background-color: #F00;
    }

    .user-logged {
        display: flex;
        align-items: center;

        .icon-user {
            margin-left: 10px;
        }

        label {
            margin-left: 5px;
            color: #FFF;
        }
    }
}

`;