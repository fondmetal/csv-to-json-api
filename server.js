const express = require('express')
const axios = require('axios')
const csv = require('csvtojson')

const app = express()
const PORT = process.env.PORT || 10000

// URL del CSV remoto
const CSV_URL = 'https://fondmetal.com/FM_FitmentTechData_v01.csv'

// Endpoint per convertire CSV in JSON
app.get('/csv', async (req, res) => {
  try {
    const response = await axios.get(CSV_URL)
    const json = await csv().fromString(response.data)
    res.json(json) // Manda la risposta in formato JSON
  } catch (error) {
    console.error('Errore nel recupero del CSV:', error)
    res.status(500).json({ error: 'Errore nel recupero del CSV' })
  }
})

// Endpoint root (per evitare il "Not Found")
app.get('/', (req, res) => {
  res.send('Server attivo! Usa /csv per ottenere i dati.')
})

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server attivo su porta ${PORT}`)
})