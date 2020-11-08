const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const pubSub = {
  channels: {},

  subscribe: function (channel, cb, id) {
    if (Object.keys(this.channels).includes(channel)) {
      this.channels[channel][id] = cb;
    } else {
      this.channels[channel] = { [id]: cb };
    }

    return () => this.unsubscribe(channel, id);
  },

  publish: function (channel, data) {
    if (!this.channels[channel]) {
      console.error(JSON.stringify({ message: 'Dont have this channel in pubSub' }));
      return;
    }
    Object.values(this.channels[channel]).forEach((listener) => {
      listener(data);
    });
  },

  unsubscribe: function (channel, id) {
    delete this.channels[channel][id];
    if (!Object.keys(this.channels[channel]).length) {
      delete this.channels[channel];
    }
  }
};

module.exports = {
  getRandom,
  // pubSub,
};
