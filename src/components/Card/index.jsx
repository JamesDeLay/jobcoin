import React from "react";
import styled from 'styled-components' ;

const CardContainer = styled.article`
    border: 1px solid #dadada;
    background-color: #fff;
    /* padding-bottom: 2rem; */
    /* padding-top: 2rem; */
    height: 100%;
    border-radius: 5px;
    .card-children {
        padding: 1rem;
    }
`

const CardTitle = styled.div`
    border-bottom: 1px solid #dadada;
    width: 100%;
    background-color: #ebedf3;
    h1 {
        text-align: center;
        margin-bottom: 2rem;
        padding-top: 2rem;
    }
` 

function Card({title, children}) {
    return (
        <CardContainer>
            {
                title && (
                <CardTitle>
                    <h1>{title}</h1>
                </CardTitle>
                )
            }
            <div className="card-children">
                {children}
            </div>
        </CardContainer>
    )
}

export default Card;