<template>
  <div class="users">
    <div class="row align-items-center justify-content-between">
      <div class="users-search">
        <div class="form-group">
          <input
            class="form-control my-2"
            type="search"
            placeholder="Rechercher un utilisateur"
          />
        </div>
      </div>
      <div class="users-create">
        <nuxt-link to="/dashboard/users/create" class="btn btn-primary"
          >créer un utilisateur</nuxt-link
        >
      </div>
    </div>
    <div class="w-100 users-infos">
      <TableUsers />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',
  layout: 'dashboard',
}
</script>
<style lang="scss" scoped>
.users {
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
  &-search {
    width: 50%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  &-infos {
    margin-top: 50px;
  }
  &-create {
    a {
      @media (max-width: 768px) {
        margin-top: 20px;
      }
    }
  }
}
</style>
