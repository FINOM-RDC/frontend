// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage,
    reducer: (state) => ({
      missions: state.missions,
      ministerFunctions: state.ministerFunctions,
    }),
  }).plugin(store)
}
