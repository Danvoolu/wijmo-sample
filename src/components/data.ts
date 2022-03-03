// get some sample data
export function getData() {
  return [
    {
      name: 'Constant Growth',
      currency: 'USD',
      perf: {
        ytd: 0.0523,
        m1: 0.0142,
        m6: 0.0443,
        m12: 0.0743,
      },
      alloc: {
        stock: 0.17,
        bond: 0.32,
        cash: 0.36,
        other: 0.15,
        amount: 23432,
      },
    },
    {
      name: 'Optimus Prime',
      currency: 'EUR',
      perf: {
        ytd: 0.0343,
        m1: 0.043,
        m6: 0.0244,
        m12: 0.0543,
      },
      alloc: {
        stock: 0.61,
        bond: 0.8,
        cash: 0.9,
        other: 0.22,
        amount: 43223,
      },
    },
    {
      name: 'Crypto Planet',
      currency: 'BTC',
      perf: {
        ytd: 0.0343,
        m1: 0.014,
        m6: 0.034,
        m12: 0.01243,
      },
      alloc: {
        stock: 0.1,
        bond: 0,
        cash: 0,
        other: 0.9,
        amount: 2234,
      },
    },
    {
      name: 'MegaZone',
      currency: 'EUR',
      perf: {
        ytd: 0.0443,
        m1: 0.034,
        m6: 0.0424,
        m12: 0.0343,
      },
      alloc: {
        stock: 0.51,
        bond: 0.9,
        cash: 0.8,
        other: 0.12,
        amount: 32234,
      },
    },
    {
      name: 'Serenity',
      currency: 'YEN',
      perf: {
        ytd: 0.0522,
        m1: 0.0143,
        m6: 0.0458,
        m12: 0.0732,
      },
      alloc: {
        stock: 0.66,
        bond: 0.09,
        cash: 0.19,
        other: 0.06,
        amount: 65624,
      },
    },
  ];
}
