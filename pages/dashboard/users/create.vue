<template>
  <div class="users-create form">
    <div class="form-content">
      <form class="form-content__form mt-3" @submit.prevent="submit">
        <h3 class="title">Informations sur l' Utilisateur</h3>
        <div class="form-group mt-3">
          <label for="title">Nom</label>
          <b-input
            v-model="user.noms"
            type="text"
            class="form-control"
            placeholder="Noms de l'utilisateur"
          />
        </div>
        <div class="form-group mt-3">
          <label for="title">Fonction</label>
          <b-input
            v-model="user.function"
            type="text"
            class="form-control"
            placeholder="fonction de l'utilisateur"
          />
        </div>
        <div class="form-group mt-3">
          <label for="title">Email</label>
          <b-input
            v-model="user.email"
            type="text"
            class="form-control"
            placeholder="Adresse email de l'utilisateur"
          />
        </div>

        <div class="form-group mt-3">
          <label for="title">Rôle</label>
          <b-form-select
            v-model="user.role"
            :options="options.roles"
          ></b-form-select>
        </div>
        <div class="submit-btn mt-3">
          <button class="btn btn-primary" type="submit">Créer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersCreate',
  layout: 'dashboard',
  data() {
    return {
      user: {
        noms: '',

        fonction: '',
        role: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      options: {
        roles: [
          { value: '', text: "Choisir un rôle de l'utilisateur" },
          { value: 'admin', text: 'Admin' },
          { value: 'membre', text: 'Membre du Cabinet' },
          {
            value: 'conseiller-administrateur',
            text: 'Conseiller Administratif',
          },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.users-create {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1f1;
  @media (max-width: 992px) {
    padding: 10px;
  }
  &.form {
    .form-content {
      width: 70%;
      padding: 20px;
      margin-bottom: 50px;

      @media (max-width: 992px) {
        width: 100%;
      }
      &__form {
        background-color: $white;
        padding: 20px;
        & > form {
          width: 100%;
          & > div {
            margin-bottom: 20px;
          }
        }
      }
      .submit-btn {
        @media (max-width: 992px) {
          margin-top: 20px;
          button {
            width: 100% !important;
          }
        }
      }
      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
