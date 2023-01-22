import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { TDispatch, TSelector } from './types'
import rootReducer from './slice'

const store = configureStore({
  reducer: rootReducer,
})

export const useAppDispatch: TDispatch = useDispatch
export const useAppSelector: TSelector = useSelector

export default store
