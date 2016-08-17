/*
 * node-rdkafka - Node.js wrapper for RdKafka C/C++ library
 *
 * Copyright (c) 2016 Blizzard Entertainment
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

var t = require('assert');
var util = require('util');

// This replaces some stuff so the next module should be aware
var mock = require('./librdkafka-mock');
var KafkaConsumer = require('../lib/kafka-consumer');
KafkaConsumer.useMock(mock);

module.exports = {
  'KafkaConsumer': {
    'exports a function': function() {
      t.equal(typeof KafkaConsumer, 'function', 'Should export a function');
    },
    'should instantiate to an object': function() {
      var client = new KafkaConsumer();
      t.equal(typeof client, 'object', 'Should export an object');
    },
    'should instantiate an object with default parameters': function() {
      var client = new KafkaConsumer();
    },
    'should set an onEvent callback on the native bindings by default': function(cb) {
      var client = new KafkaConsumer();
      var onEvent = client.getClient().onEvent;

      t.equal(typeof onEvent, 'function');

      client.once('event.log', function(data) {
        cb();
      });

      // Let's call onEvent and make sure it routes properly
      onEvent('log', {});
    },
    'error events should propagate to the proper emitted event': function(cb) {
      var client = new KafkaConsumer();
      var onEvent = client.getClient().onEvent;

      t.equal(typeof onEvent, 'function');

      client.once('error', function(error) {
        t.equal(util.isError(error), true, 'Did not convert the object to an error');
        t.equal(error.code, -1, 'Error codes are not equal');
        cb();
      });

      // Let's call onEvent and make sure it routes properly
      onEvent('error', { code: -1, message: 'Uh oh' });
    },
    'should set a rebalance event by default': function(cb) {
      var client = new KafkaConsumer();
      var onRebalance = client.getClient().onRebalance;

      t.equal(typeof onRebalance, 'function', 'Did not set a rebalance event');

      client.on('rebalance', function() {
        cb();
      });

      onRebalance();
    }

  }
};
