import React, { useEffect, useRef } from "react";

import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown, faArrowUp, faArrowLeft, faArrowRight} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faArrowDown, faArrowUp, faArrowLeft, faArrowRight);

import "../styles/styles.css";

export default function SnakeGame(props){
    let playBoard = document.querySelector(".play-board");
    let controls = document.querySelectorAll(".controls i");
    let gameOver = false;
    let foodX, foodY;
    let snakeX = 5, snakeY = 5;
    let velocityX = 0, velocityY = 0;
    let snakeBody = [];
    const intervalRef = useRef(null);
    
    const updateFoodPosition = () => {
        // Passing a random 1 - 30 value as food position
        foodX = Math.floor(Math.random() * 30) + 1;
        foodY = Math.floor(Math.random() * 30) + 1;
    }
    
    const handleGameOver = () => {
        // Clearing the timer and opening the score submission form
        clearInterval(intervalRef.current);
        props.onGameOver();
    }
    
    const changeDirection = e => {
        // Changing velocity value based on key press
        if(e.key === "ArrowUp" && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
        } else if(e.key === "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
        } else if(e.key === "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
        } else if(e.key === "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        }
    }
    
    // Calling changeDirection on each key click and passing key dataset value as an object
    controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));
    
    const gameTick = () => {
        if(gameOver) return handleGameOver();
        let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
        // Checking if the snake hit the food
        if(snakeX === foodX && snakeY === foodY) {
            updateFoodPosition();
            snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
            props.setScore(s => s + 1);
            console.log("here");
            // props.setScore(props.score + 1); // increment score by 1
        }
        // console.log(props.score);
        // Updating the snake's head position based on the current velocity
        snakeX += velocityX;
        snakeY += velocityY;
        
        // Shifting forward the values of the elements in the snake body by one
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position
    
        // Checking if the snake's head is out of wall, if so setting gameOver to true
        if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
            return gameOver = true;
        }
    
        for (let i = 0; i < snakeBody.length; i++) {
            // Adding a div for each part of the snake's body
            html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
            // Checking if the snake head hit the body, if so set gameOver to true
            if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
                gameOver = true;
            }
        }
        playBoard.innerHTML = html;
    }
    useEffect(()=>{
        snakeX = 5, snakeY = 5;
        velocityX = 0, velocityY = 0;
        gameOver = false;
        snakeBody = [];
        props.setScore(0);
        updateFoodPosition();
        if (intervalRef?.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(gameTick, 150);
        document.addEventListener("keyup", changeDirection);
        playBoard = document.querySelector(".play-board");
        controls = document.querySelectorAll(".controls i");
    },[props.reset])

    console.log(props.score)

    return  <div className="wrapper" >
                <div className="game-details">
                    <span className="score" id="score">Score: {props.score}</span>
                </div>
                <div className="play-board"></div>
                <div className="controls">
                    <i data-key="ArrowLeft">
                        <FontAwesomeIcon icon={faArrowLeft} size="5x" inverse />
                    </i>
                    <i data-key="ArrowUp">
                        <FontAwesomeIcon icon={faArrowUp} size="5x" inverse />
                    </i>
                    <i data-key="ArrowRight">
                        <FontAwesomeIcon icon={faArrowRight} size="5x" inverse />
                    </i>
                    <i data-key="ArrowDown">
                        <FontAwesomeIcon icon={faArrowDown} size="5x" inverse />
                    </i>
                </div>
            </div>
}