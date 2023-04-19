<template>
  <div class="form-content">
    <v-form ref="login" v-model="valid" class="login-form mt-3">
      <v-col>
        <v-text-field
          v-model="email"
          type="email"
          :rules="emailRules"
          append-icon="mdi-email"
          label="Adresse Eléctronique"
          filled
          required
        ></v-text-field>
      </v-col>

      <v-col>
        <v-btn
          :loading="loading"
          color="primary"
          class="btn-submit"
          block
          large
          @click="signIn"
        >
          Réinitialiser
        </v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FormForgot',
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      showPassword: false,
      emailRules: [
        (v) => !!v || 'Email est réquis',
        (v) => /.+@.+\..+/.test(v) || 'Vous devez entrer un email valide',
      ],
      passwordRules: [(v) => !!v || 'Mot de passe Réquis'],
    }
  },
  computed: {
    ...mapGetters({
      loading: 'auth/loading',
      validation: 'auth/validation',
      error: 'auth/error',
    }),
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async signIn() {
      if (this.$refs.login.validate()) {
        await this.login({
          identifier: this.email,
          password: this.password,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-content {
  .red {
    color: red;
  }
  .login-form {
    padding: 0 150px;
    @media (max-width: 768px) {
      padding: 0 50px;
    }
    .btn-submit {
      background: $primary;
      color: $white;
      font-weight: 600;
      font-size: 1.2rem;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: $secondary;
        color: $white;
      }
    }
  }
}
</style>
