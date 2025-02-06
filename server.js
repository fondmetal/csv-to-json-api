const express = require('express')
const axios = require('axios')
const csv = require('csvtojson')

const app = express()
const PORT = process.env.PORT || 10000

// URL del CSV remoto
const CSV_URL = 'https://fondmetal.com/ApplicationList.csv'

// Endpoint per convertire CSV in JSON
app.get('/csv', async (req, res) => {
  try {
    const response = await axios.get(CSV_URL)
    const json = await csv().fromString(response.data)

    res.setHeader('Content-Type', 'application/json') // Forza il Content-Type
    res.json(json) // Manda la risposta in formato JSON
  } catch (error) {
    console.error('Errore nel recupero del CSV:', error)
    res.status(500).json({ error: 'Errore nel recupero del CSV' })
  }
})

// Endpoint root per evitare errori 404
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send('Server attivo! Usa /csv per ottenere i dati.')
})

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server attivo su porta ${PORT}`)
})