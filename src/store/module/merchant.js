export default {
  state: {
    merchant: null,
    store: null
  },
  mutations: {
    setMerchant (state, merchant) {
      state.merchant = merchant
    },
    setStore (state, store) {
      state.store = store
    }
  }
}
