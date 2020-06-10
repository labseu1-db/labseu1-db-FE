import React from 'react';
import styled from 'styled-components';

export class Placeholder extends React.Component {
  state = {
    isPlaceholderActive: true
  };

  render() {
    const { heading, info, image } = this.props;
    return (
      <div aria-label="Placeholder">
        {this.state.isPlaceholderActive && (
          <StyledPlaceholderContainer>
            <StyledPlaceholderHeading>
              <div>{heading}</div>
              <div
                className="dismiss"
                onClick={() => this.setState({ isPlaceholderActive: false })}
              >
                Dismiss
              </div>
            </StyledPlaceholderHeading>
            <StyledPlaceholderInfo>{info}</StyledPlaceholderInfo>
            <StyledPlaceholderImage>
              <img src={image} alt="placeholder" />
            </StyledPlaceholderImage>
          </StyledPlaceholderContainer>
        )}
      </div>
    );
  }
}

const StyledPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;
const StyledPlaceholderImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
  img {
    width: 40%;
  }
`;
const StyledPlaceholderHeading = styled.div`
  width: 100%;
  color: white;
  line-height: 2.5;
  padding: 0 20px;
  background-color: #00bc98;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  .dismiss {
    font-weight: 400;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledPlaceholderInfo = styled.div`
  width: 100%;
  color: black;
  background-color: #e6e5fe;
  height: 100px;
  padding: 20px;
  border-radius: 0 0 10px 10px;
`;
export default Placeholder;
