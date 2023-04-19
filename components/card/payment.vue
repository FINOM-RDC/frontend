<template>
  <div class="card-payment">
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
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14 13q1.25 0 2.125-.875T17 10q0-1.25-.875-2.125T14 7q-1.25 0-2.125.875T11 10q0 1.25.875 2.125T14 13Zm-7 3q-.825 0-1.412-.588Q5 14.825 5 14V6q0-.825.588-1.412Q6.175 4 7 4h14q.825 0 1.413.588Q23 5.175 23 6v8q0 .825-.587 1.412Q21.825 16 21 16Zm-4 4q-.825 0-1.412-.587Q1 18.825 1 18V8q0-.425.288-.713Q1.575 7 2 7t.713.287Q3 7.575 3 8v10h16q.425 0 .712.288q.288.287.288.712t-.288.712Q19.425 20 19 20ZM7 8q.825 0 1.412-.588Q9 6.825 9 6H7Zm14 0V6h-2q0 .825.587 1.412Q20.175 8 21 8ZM7 14h2q0-.825-.588-1.413Q7.825 12 7 12v2Zm12 0h2v-2q-.825 0-1.413.587Q19 13.175 19 14Z"
            />
          </svg>
        </div>
        <div class="title">
          <h2>Paiements effectués</h2>
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
          <h2>Paiement en attente</h2>
        </div>
      </div>
      <div class="card card-validated">
        <div class="card-number">
          <h2 class="number">30 000 000</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="40"
            height="40"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M10 8.23c-.8-.737-2.207-1.25-3.5-1.282M3 15.23c.752.925 2.15 1.453 3.5 1.498m0-9.781c-1.539-.038-2.917.604-2.917 2.36c0 3.23 6.417 1.615 6.417 4.846c0 1.842-1.708 2.634-3.5 2.575m0-9.781V5m0 11.729V19M21 12h-8m0 0l3.84-4M13 12l3.84 4"
            />
          </svg>
        </div>
        <div class="title">
          <h2>Montant Payés</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPayment',
}
</script>
<style lang="scss" scoped>
.card-content {
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
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
      @media (max-width: 768px) {
        width: calc(50% - 10px);
      }
    }
    &.card-pending {
      background: $yellow;
      @media (max-width: 768px) {
        width: calc(50% - 10px);
      }
    }
    &.card-validated {
      background: $secondary;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
}
</style>
