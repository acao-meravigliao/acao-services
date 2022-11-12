export default {
  time: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
    timestamp: {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
  date: {
    ddd: {
      weekday: 'short',
    },

    dm: {
      day: '2-digit',
      month: '2-digit',
    },

    dm_long: {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    },
  },
  number: {
    compact: { notation: 'compact' },
    EUR: {
      style: 'currency',
      currency: 'EUR',
    },
    USD: {
      style: 'currency',
      currency: 'USD',
    },
  },
};
