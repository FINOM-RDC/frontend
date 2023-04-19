<template>
  <div
    v-if="error !== undefined || error !== false"
    class="content"
    @click="onCancel"
  >
    <div class="card">
      <div class="error-message"></div>
      <div class="error-title">
        {{ error }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NotificationError',

  computed: {
    ...mapGetters({
      error: 'missions/error',
    }),
  },
  created() {
    this.onCancel()
  },
  methods: {
    onCancel() {
      this.$store.dispatch('missions/cancelError', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.error-title {
  color: black !important;
}
.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: red;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px red;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  position: relative;
  top: 5px;
  right: 5px;
  margin: 0 auto;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: red;
  fill: #fff;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
.content {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  color: red;
  background-color: rgba(0, 0, 0, 0.5);

  & > .card {
    padding: 50px;
    width: max-content;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .error-message {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
    @media (max-width: 992px) {
      padding-top: 50px;
    }
    @media (max-width: 768px) {
      padding-top: 0;
      justify-content: center;
    }
    h2 {
      font-size: 2rem;
      margin-top: 50px;
    }

    @keyframes stroke {
      100% {
        stroke-dashoffset: 0;
      }
    }

    @keyframes scale {
      0%,
      100% {
        transform: none;
      }

      50% {
        transform: scale3d(1.1, 1.1, 1);
      }
    }

    @keyframes fill {
      100% {
        box-shadow: inset 0px 0px 0px 30px red;
      }
    }
  }
}
</style>
