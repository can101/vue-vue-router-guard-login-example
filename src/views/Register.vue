<template>
  <div>
    <input type="email" v-model="ruser.email" placeholder="email" />
    <input type="password" v-model="ruser.password" placeholder="password" />
    <button @click="siginUser">Register</button>
    <div class="alert alert-warning">
      {{ useremailget }} {{ userpasswordget }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      ruser: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters(["useremailget", "userpasswordget"]),
  },
  methods: {
    ...mapMutations(["userStateChanged"]),
    ...mapActions(["updateUserData"]),
    siginUser() {
      this.updateUserData(this.ruser);
    },
  },
};
</script>

<style></style>
