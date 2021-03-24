export const state = () => ({
  numberOfVoters: []
})

export const getters = {

}

export const mutations = {
  setVotersOptions: (state, payload) => {
    state.numberOfVoters = payload;
  },
  changeAgree(state,index) {
    state.numberOfVoters[index].options[0].numberOfVoters ++;
  },
  changeDisagree(state,index) {
    state.numberOfVoters[index].options[1].numberOfVoters ++;
  }
}

