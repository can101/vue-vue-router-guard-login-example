import Vue from "vue";
import Vuex from "vuex";
import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../Firebase.js";
const colRef = collection(db, "log");
const auth = getAuth();
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: null,
      password: null,
    },
    log: [],
    auth: null,
  },
  getters: {
    useremailget: (state) => state.user.email,
    userpasswordget: (state) => state.user.password,
    authUser: (state) => state.auth,
  },
  mutations: {
    async getAll(state) {
      await getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            state.push({ ...doc.data(), id: doc.id });
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    async addLog(state) {
      await addDoc(colRef, {
        password: state.user.password,
        email: state.user.email,
        created: serverTimestamp(),
      }).then(() => {
        state.user.email = null;
        state.user.password = null;
      });
    },
    async getRealAll(state) {
      onSnapshot(colRef, (snapshot) => {
        state.log = [];
        snapshot.docs.forEach((doc) => {
          state.log.push({ ...doc.data(), id: doc.id });
        });
      });
    },
    async registerUser(state) {
      createUserWithEmailAndPassword(
        auth,
        state.user.email,
        state.user.password
      )
        .then((cred) => {
          console.log("created user", cred.user);
          router.push({ name: "Login" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async siginUser(state) {
      signInWithEmailAndPassword(auth, state.user.email, state.user.password)
        .then((cred) => {
          console.log("created user", cred.user);
          router.push({ name: "About" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async logout(state) {
      state.user.email = null;
      state.user.password = null;
      state.auth = null;
      signOut(auth)
        .then(() => {
          console.log("logout process successfull");
          router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    userDataUpdate(state, user) {
      state.user.email = user.email;
      state.user.password = user.password;
    },
    userStateChanged(state) {
      onAuthStateChanged(auth, (user) => {
        console.log("user Status Changed : ", user);
        state.auth = user;
        // const { accessToken, email, uid } = user;
        // state.auth = { accessToken, email, uid };
      });
    },
  },
  actions: {
    updateUserData({ commit }, user) {
      commit("userDataUpdate", user);
      commit("registerUser");
    },
    siginUserData({ commit }, user) {
      commit("userDataUpdate", user);
      commit("siginUser");
    },
    logoutUser({ commit }) {
      commit("logout");
    },
  },
  modules: {},
});
