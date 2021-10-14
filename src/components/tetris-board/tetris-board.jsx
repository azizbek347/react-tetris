import styled from 'styled-components'
import TetrisCell from "../tetris-cell";
import RestartOverlay from "../restart-overlay";

const StyledTetrisBoard = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.height}, calc(40vh / ${props => props.width}));
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 2px;
  padding: 2px;
  border: 1px solid #333;
  max-width: 320px;
  min-width: 320px;
  width: 100%;
  position: relative;
  @media (min-width: 768px) {
    max-width: 400px;
  }
  @media (min-width: 1170px) {
    max-width: 480px;
  }
`;

const TetrisBoard = ({stage, isPlaying, startGame}) => (
    <StyledTetrisBoard height={stage.length} width={stage[0].length}>
        {stage.map((row, rowIndex) => row.map((col, colIndex) => <TetrisCell key={`${rowIndex} ${colIndex}`} type={col[0]}/>))}
        {!isPlaying && <RestartOverlay startGame={startGame}/>}
    </StyledTetrisBoard>
);

export default TetrisBoard;