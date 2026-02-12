// server/kafka.js
const { Kafka } = require('kafkajs')

// configure Kafka
const kafka = new Kafka({
  clientId: 'asciiapp-server',
  brokers: ['localhost:9092'] // your broker list
})

// producer & consumer
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'asciiapp-group' })

module.exports = { kafka, producer, consumer }
