import React, { useEffect } from 'react';
import styled from 'styled-components';
import Table from '../molecules/Table';
import Button from '../atoms/Button';
import Text from '../../constants/Text';
import { connect } from 'react-redux';
import { initLake as initLakeAction } from '../../actions';
import { jump as jumpAction } from '../../actions';

const Wrapper = styled.div`
    width: 100vw;
    margin: 20px;
    display: flex;
    align-items: center;
`;

const Error = styled.p`
    color: red;
    font-weight: 700;
`;

const RootView = ({ initLake, error, isLakeInit, jump }) => {
    useEffect(() => {
        initLake();
    }, []);

    return (
        <Wrapper>
            <div>
                <Error>{error}</Error>
                {isLakeInit && <Table />}
            </div>
            <div>
                <h3>{Text.actions}</h3>
                <Button onClick={jump}>{Text.buttons.jump}</Button>
            </div>
        </Wrapper>
      )
};

const mapStateToProps = ({ isLakeInit, error }) => ({
    isLakeInit,
    error
  });

const mapDispatchToProps = (dispatch) => ({
    initLake: () => dispatch(initLakeAction()),
    jump: () => dispatch(jumpAction()),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RootView);