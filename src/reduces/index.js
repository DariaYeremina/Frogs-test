import actions from '../constants/actions';
import Text from '../constants/Text';

const initialState = {
   lake: [],
   isLakeInit: false,
   activeCells: [],
   error: ''
};

const compareCells = (elInArray, another) => (elInArray.row === another.row && elInArray.cell === another.cell);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.INIT_LAKE: 
            let result = [];
            let item = {
                gender: null,
                attributes: [],
                row: null,
                cell: null,
                available: true
            };
            for (let i = 0; i < 6; i++) {
                result.push([]);
                for (let j = 0; j < 10; j++) {
                    let cell = {...item};
                    cell.row = i;
                    cell.cell = j;
                    if (i === 0 && j === 0) {
                        cell.gender = 'male';
                        cell.available = false;
                        cell.attributes = ['tall', 'fat'];
                    }
                    if (i === 0 && j === 1) {
                        cell.gender = 'female';
                        cell.available = false;
                        cell.attributes = ['short', 'slim'];
                    }
                    result[i].push(cell);
                }
            }
            return {
                ...state,
                lake: result,
                isLakeInit: true
            }
        case actions.TOGGLE_CELL:
            let newActiveCells = [...state.activeCells];
            let isItemAdded = newActiveCells.find(el => compareCells(el, action.item));
            if (isItemAdded) {
                newActiveCells.splice(newActiveCells.findIndex(el => compareCells(el, action.item), 1));
            } else if (newActiveCells.length === 2) {
                return {
                    ...state,
                    error: Text.errors.maxTwoCells
                }
            } else if (newActiveCells.length === 0 || !isItemAdded) {
                newActiveCells.push(action.item);
            }
            return {
                ...state,
                activeCells: newActiveCells,
                error: ''
            }
        case actions.SET_ERROR:
            return {
                ...state,
                error: action.text
            }
        case actions.JUMP:
            let afterJumpLake = [...state.lake];
            let firstPosition = afterJumpLake[state.activeCells[0].row][state.activeCells[0].cell];
            let secondPosition = afterJumpLake[state.activeCells[1].row][state.activeCells[1].cell];

            let checkPosition = true; 
            let checkAvailable = true;

            if (firstPosition.gender === 'male' || secondPosition.gender === 'male') {
                checkPosition = (Math.abs(firstPosition.row - secondPosition.row) === 3 || Math.abs(firstPosition.row - secondPosition.row) === 0) 
                                && (Math.abs(firstPosition.cell - secondPosition.cell) === 3 || Math.abs(firstPosition.cell - secondPosition.cell) === 0);
            } else {
                checkPosition = (Math.abs(firstPosition.row - secondPosition.row) === 2 || Math.abs(firstPosition.row - secondPosition.row) === 0) 
                                && (Math.abs(firstPosition.cell - secondPosition.cell) === 2 || Math.abs(firstPosition.cell - secondPosition.cell) === 0);
            }

            checkAvailable = firstPosition.available !== secondPosition.available;

            if (state.activeCells.length < 2) {
                return {
                    ...state,
                    error: Text.errors.chooceTwoCells
                }
            } else if (!checkAvailable) {
                return {
                    ...state,
                    error: Text.errors.chooseAvailable
                }
            } else if (!checkPosition) {
                return {
                    ...state,
                    error: Text.errors.correctWay
                }
            } else {
                let attributes = {
                    attributes: firstPosition.attributes,
                    gender: firstPosition.gender,
                    available: firstPosition.available,
                };

                Object.keys(attributes).forEach(k => {
                    firstPosition[k] = secondPosition[k];
                    secondPosition[k] = attributes[k]
                });
            }

            return {
                ...state,
                lake: afterJumpLake,
                activeCells: [],
                error: ''
            }
        default: 
            return state;
    }
};

export default reducer;