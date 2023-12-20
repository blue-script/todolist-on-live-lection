import {FilterValuesType} from '../App';

export const filterReducer = (state: FilterValuesType, action: FilterReducerACType): FilterValuesType => {
  switch (action.type) {
    case 'FILTER-REDUCER': {
      return action.payload.value
    }
  }
}

type FilterReducerACType = ReturnType<typeof filterReducerAC>
export const filterReducerAC = (value: FilterValuesType) => {
  return {
    type: 'FILTER-REDUCER',
    payload: {value}
  } as const
}