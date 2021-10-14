import styled from "styled-components";

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: grid;
  place-items: center;
`;

const StyledInner = styled.div`
  text-align: center;
`

const StyledButton = styled.button`
  border-radius: .5em;
  border: none;
  padding: 1em;
  font-size: 1.2em;
  background-color: #917B64;
  color: #ffffff;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const StyledTitle = styled.p`
  font-size: 3em;
  color: #FF4D69;
  margin: 0 0 1em;
  white-space: nowrap;
  @media (min-width: 1170px) {
    font-size: 4em;
  }
`;

const RestartOverlay = ({startGame}) => (
    <StyledOverlay>
        <StyledInner>
            <StyledTitle>Конец игры!!!</StyledTitle>
            <StyledButton onClick={startGame}>Еще?</StyledButton>
        </StyledInner>
    </StyledOverlay>
);


export default RestartOverlay;