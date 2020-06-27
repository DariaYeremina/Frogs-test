import actions from '../constants/actions';

export const initLake = () => ({type: actions.INIT_LAKE});

export const toggleCell = (item) => ({type: actions.TOGGLE_CELL, item});

export const setError = (text) => ({type: actions.SET_ERROR, text});

export const jump = () => ({type: actions.JUMP});