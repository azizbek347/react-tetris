import styled from 'styled-components';
import {TETROMINOS} from '../../utils/tetromino';
import {memo} from "react";

const StyledTetrisCell = styled.div`
  width: auto;
  border: 1px solid #000;
  background-color: rgb(${props => props.color});
`;

const TetrisCell = ({type}) => <StyledTetrisCell color={TETROMINOS[type]['color']}/>

export default memo(TetrisCell);