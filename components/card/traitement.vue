<template>
  <div class="card-content">
    <div class="card card-generated">
      <div class="card-number">
        <h2 class="number">4</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="40"
          height="40"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M25 4.03c-.765 0-1.517.3-2.094.876L13 14.78l-.22.22l-.06.313l-.69 3.5l-.31 1.468l1.467-.31l3.5-.69l.313-.06l.22-.22l9.874-9.906A2.968 2.968 0 0 0 25 4.032zm0 1.94c.235 0 .464.12.688.343c.446.446.446.928 0 1.375L16 17.374l-1.72.344l.345-1.72l9.688-9.688c.223-.223.452-.343.687-.343zM4 8v20h20V14.812l-2 2V26H6V10h9.188l2-2H4z"
          />
        </svg>
      </div>
      <div class="title">
        <h2>Ordres de Mission traités</h2>
      </div>
    </div>
    <div class="card card-pending">
      <div class="card-number">
        <h2 class="number">8</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="40"
          height="40"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
          />
        </svg>
      </div>
      <div class="title">
        <h2>En attente de traitement</h2>
      </div>
    </div>
    <div class="card card-validated">
      <div class="card-number">
        <h2 class="number">30</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="40"
          height="40"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 48 48"
        >
          <g fill="currentColor">
            <path
              d="M32.707 22.707a1 1 0 0 0-1.414-1.414L24 28.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L24 31.414l8.707-8.707Z"
            />
            <path
              fill-rule="evenodd"
              d="M38 15v21a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h11l10 10Zm-10 1a1 1 0 0 1-1-1V7H17a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V16h-8Zm1-7.172L34.172 14H29V8.828Z"
              clip-rule="evenodd"
            />
            <path d="M12 11v27a3 3 0 0 0 3 3h19v2H15a5 5 0 0 1-5-5V11h2Z" />
          </g>
        </svg>
      </div>
      <div class="title">
        <h2>Validés</h2>
      </div>
    </div>
    <div class="card card-in-progress">
      <div class="card-number">
        <h2 class="number">30</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="30px"
          height="30px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm0 26a12 12 0 0 1 0-24v12l8.481 8.481A11.963 11.963 0 0 1 16 28Z"
          />
        </svg>
      </div>
      <div class="title">
        <h2>Rejetés ou en attente</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTraitement',
}
</script>

<style lang="scss" scoped>
.card-content {
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .card {
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    color: $white;
    border-radius: 10px;
    &-number {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .number {
        font-size: 40px;
        font-weight: bold;
      }
    }
    .title {
      margin-top: 20px;
      h2 {
        font-size: 16px;
        font-weight: 500;
      }
    }
    &.card-generated {
      background: $primary;
    }
    &.card-pending {
      background: $yellow;
    }
    &.card-validated {
      background: $green;
    }
    &.card-in-progress {
      background: $blue;
    }
  }
}
</style>
