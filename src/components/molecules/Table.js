import React from 'react';
import styled from 'styled-components';
import Text from '../../constants/Text';
import Checkbox from '../atoms/Checkbox';
import { connect } from 'react-redux';
import { toggleCell as toggleCellAction } from '../../actions';

const StyledTable = styled.table`
    border: 2px solid #0074D9;
	border-radius: 5px;
	float: left;
	padding: 10px;
	margin: 10px 10px 150px 10px;
    max-width: 60vw;
`;

const StyledRow = styled.tr``;

const StyledHeader = styled.th`
    font-size: 1.6em;
	padding-bottom: 10px;   
`;

const StyledCell = styled.td`
    border: 1px solid #aaa;
	height: 60px;
	width: 60px;
`;

const Table = ({ lake, activeCells, toggleCell, setError }) => {

    return (
        <StyledTable>
            <thead>
              <StyledRow>
                  <StyledHeader colSpan="10">{Text.title}</StyledHeader>
              </StyledRow>
          </thead>
          <tbody>
              { lake.map((row, index) => (
                  <StyledRow key={index}>
                     { row.map((cell, i) => (
                          <StyledCell key={`${index}${i}`}>
                              <Checkbox item={cell}
                                        onClick={(e) => toggleCell({
                                            row: cell.row,
                                            cell: cell.cell})}/>
                          </StyledCell>
                      ))
                      }
                  </StyledRow>
              ))}
          </tbody>
        </StyledTable>
      )
};

const mapStateToProps = ({ lake }) => ({
    lake
});

const mapDispatchToProps = (dispatch) => ({
    toggleCell: (item) => dispatch(toggleCellAction(item))
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);