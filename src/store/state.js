import { PLAY_MODE, FAVORITE_KEY,SEARCH_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'
const state = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  fullScreen: false,
  currentIndex: 0,
  favoriteList: [],
  searchHistory: load(SEARCH_KEY),
  playHistory: []
}

export default state
