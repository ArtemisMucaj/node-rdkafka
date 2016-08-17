/*
 * node-rdkafka - Node.js wrapper for RdKafka C/C++ library
 *
 * Copyright (c) 2016 Blizzard Entertainment
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

var t = require('assert');

// This replaces some stuff so the next module should be aware
var mock = require('./librdkafka-mock');
var Producer = require('../lib/producer');
Producer.useMock(mock);

module.exports = {
  'Producer': {
    'exports a function': function() {
      t.equal(typeof Producer, 'function', 'Should export a function');
    },
    'should instantiate to an object': function() {
      var client = new Producer();
      t.equal(typeof client, 'object', 'Should export an object');
    },
    'should instantiate an object with default parameters': function() {
      var client = new Producer();
    }
  }
};
