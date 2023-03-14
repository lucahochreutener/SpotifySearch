import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface TokensState {
  accessToken: string,
  state: string,
  code: string,
  verifier: string,
}

const initialState: TokensState = {
  accessToken: "",
  state: "",
  code: "",
  verifier: "",
}

export const tokensSlice = createSlice({
  name: 'tokens',

  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload
    },
    setVerifier: (state, action: PayloadAction<string>) => {
      state.verifier = action.payload
    }
  }
})

export const { setAccessToken, setCode, setState, setVerifier } = tokensSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTokens = (state: RootState) => state.tokens

export default tokensSlice.reducer