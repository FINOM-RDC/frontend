<template>
  <div class="loading">
    <div class="loading__content">
      <div class="loading__content__title">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div class="loading__content__text">
        <p>Veuillez patienter...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingMain',
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__title {
      padding-bottom: 10px;
    }
    &__text {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
