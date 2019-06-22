import * as types from './mutation_type'

export default {
  [ types.SET_STATE ] (state, data) {
    state[data.key] = data.val
  }
}
