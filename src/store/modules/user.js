import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken, setName, getName, removeName, setRefreshToken, removeRefreshToken, setCompanyType, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getName(),
    companyType: '',
    userInfo: JSON.parse(getUserInfo()) || {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TYPE: (state, type) => {
    state.companyType = type
  },
  SET_INFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, code, uuid } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        code: code.trim(),
        uuid: uuid
      }).then(response => {
        console.log(response)
        // access_token  expires_in
        const { access_token, refreshToken, username, companyType, userinfo } = response.data
        setToken(access_token)
        // setName(username)
        // setCompanyType(companyType)
        // setUserInfo(userinfo)
        // setRefreshToken(refreshToken)
        commit('SET_TOKEN', access_token)
        // commit('SET_NAME', username)
        // commit('SET_TYPE', companyType)
        // commit('SET_INFO', userinfo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        removeName()
        removeRefreshToken()
        removeUserInfo()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeName()
      removeUserInfo()
      removeRefreshToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

