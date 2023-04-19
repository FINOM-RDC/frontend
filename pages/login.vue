<template>
  <div class="login">
    <div class="login__logo col-md-12 col-lg-6">
      <nuxt-logo src="/logo/logo-white.png" color="white" />
      <h2 class="login__logo-title">
        Portail de Gestion de Demandes <br />
        d'Ordre de Mission
      </h2>
      <p class="login__logo-description">Ministère des Finances</p>
    </div>
    <div class="login__form col-md-12 col-lg-6">
      <div class="login__form-logo d-lg-none">
        <nuxt-logo color="dark" />
      </div>
      <h1 class="text-center title my-3">Connexion</h1>
      <p class="text-center">
        Veuillez insérer vos coordonnées <br />
        pour accéder à la plateforme
      </p>
      <FormLogin />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  &__logo {
    background-color: $primary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    @media (max-width: 768px) {
      display: none;
    }
    &-title {
      @include title;
      color: $white;
      text-align: center;
      margin-top: 1.25rem;
    }
    &-description {
      @include subtitle;
      color: $white;
      font-weight: 500;
      text-align: center;
      margin-top: 1.25rem;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    .title {
      @include title;
      color: $primary;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>
