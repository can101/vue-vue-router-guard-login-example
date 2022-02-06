<template>
  <div>
    <input type="email" v-model="user.email" placeholder="email" />
    <input type="password" v-model="user.password" placeholder="password" />
    <button @click="siginUser">Login</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters(["useremailget", "userpasswordget", "authUser"]),
  },
  methods: {
    ...mapMutations(["userStateChanged"]),
    ...mapMutations(["userStateChanged", "siginUser"]),
    ...mapActions(["siginUserData"]),
    siginUser() {
      this.siginUserData(this.user);
      this.userStateChanged();
    },
  },
};
</script>

<style></style>
