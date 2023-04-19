<template>
  <div class="users-details">
    <div class="card card-users mb-5">
      <!-- create  users details interface -->
      <div
        class="card-users-title d-flex justify-content-between align-items-center"
      >
        <h3 class="card-title">Informations sur l'Utilisateur</h3>
        <div class="card-btn">
          <nuxt-link to="/dashboard/users" class="btn btn-primary">
            Retour
          </nuxt-link>
          <button class="edit-users btn btn-secondary">
            <span>Editer</span>
          </button>
        </div>
      </div>
      <div class="card-users-content d-flex flex-wrap justify-content-between">
        <div class="card-left col-md-12 col-lg-6">
          <div class="avatar">
            <img
              src="https://via.placeholder.com/150"
              alt="users avatar"
              class="img-fluid"
            />
          </div>
          <div class="payment-mode">
            <h3>Mode de Paiement</h3>
            <p>Mobile Money</p>
          </div>
          <div class="missions">
            <h3>Nombre de Missions</h3>
            <p>3</p>
          </div>
          <div class="Status">
            <h3>Statut</h3>
            <p>Actif</p>
          </div>
        </div>
        <div class="card-right col-md-12 col-lg-6">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="title">Nom</label>
                <input
                  v-model="user.noms"
                  type="text"
                  class="form-control"
                  placeholder="Noms de l'utilisateur"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="title">Fonction</label>
                <input
                  v-model="user.function"
                  type="text"
                  class="form-control"
                  placeholder="fonction de l'utilisateur"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="title">Email</label>
                <input
                  v-model="user.email"
                  type="text"
                  class="form-control"
                  placeholder="Adresse email de l'utilisateur"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="title">Rôle</label>
                <b-form-select
                  v-model="user.role"
                  :options="options.roles"
                ></b-form-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersDetails',
  layout: 'dashboard',
  data() {
    return {
      user: {
        noms: '',
        function: '',
        role: '',
        email: '',
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
.users-details {
  padding: 50px;
  background: #fff;
  display: flex;
  flex-direction: column;
  .row {
    @media (max-width: 768px) {
      margin-top: 20px;
    }
  }
  @media (max-width: 992px) {
    padding: 10px;
  }
  .card-users {
    padding: 20px;
    background: #fff;
    display: flex;
    flex-direction: column;
    &-title {
      padding: 20px;
      background: #fff;

      .card-title {
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }
    }
    &-content {
      padding: 20px;
      .avatar {
        img {
          border-radius: 50%;
        }
      }
      .payment-mode,
      .missions,
      .Status {
        margin-top: 30px;
        h3 {
          font-size: 16px;
          font-weight: bold;
          color: $primary;
        }
        p {
          font-size: 14px;
          color: #000;
        }
      }
    }
  }
}
</style>
