import {observer} from 'mobx-react';
import TetrisBoard from "../tetris-board";
import styled from 'styled-components'
import throttle from 'lodash.throttle';
import {useMemo, useEffect, useRef} from "react";

const throttleTime = 200;

const StyledWrapper = styled.div`
  outline: none;
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const Tetris = observer(({store}) => {
    const {stage, movePlayer, playerRotate, drop, startGame, isPlaying} = store;
    const tetrisRef = useRef();

    const throttledMove = useMemo(() => throttle(({code}) => {
            switch (code) {
                case 'ArrowRight': {
                    movePlayer(1);
                    break;
                }
                case 'ArrowLeft': {
                    movePlayer(-1);
                    break;
                }
                case 'ArrowUp': {
                    playerRotate(1)
                    break;
                }
                case 'ArrowDown': {
                    drop()
                    break;
                }
                default:
                    return;
            }
        }, throttleTime), [playerRotate, movePlayer, drop]
    );

    useEffect(() => () => throttledMove.cancel(), [throttledMove]);

    useEffect(() => tetrisRef.current.focus(), [isPlaying]);

    return <StyledWrapper tabIndex='0' onKeyDown={throttledMove} ref={tetrisRef}>
        <TetrisBoard stage={stage} isPlaying={isPlaying} startGame={startGame}/>
    </StyledWrapper>;
});

export default Tetris;