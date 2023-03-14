import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Track } from '../models/Track'
import type { RootState } from './store'

interface TrackState {
  tracks: Track[],
  trackId: string,
  search: string
}

const initialState: TrackState = {
    tracks: [] as Track[], 
    trackId: "",
    search: ""
}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload
    },
    setTrackId: (state, action: PayloadAction<string>) => {
      state.trackId = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  }
})

export const { setTracks, setTrackId, setSearch } = tracksSlice.actions

export const selectTracks = (state: RootState) => state.tracks
export default tracksSlice.reducer