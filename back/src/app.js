import express, { query, request, response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { pool, getMeetings, getTeams, createNewMeeting } from './database.js'

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())

app.get('/teams', async (req, res) => {
  const teamTable = await getTeams()
  try {
    res.send(teamTable)
  } catch (error) {
    res.status(500)
  }
})

app.get('/meetings', async (req, res) => {
  const meetingsTable = await getMeetings()
  try {
    res.send(meetingsTable)
  } catch (error) {
    res.status(500)
  }
})

app.post('/new', async (req, res) => {
  const {
    meeting_subject,
    team_no,
    meeting_date,
    meeting_starts_at,
    meeting_end_at,
    place_of_meeting, 
  } = req.body
  const addMeeting = await createNewMeeting(
    meeting_subject,
    team_no,
    meeting_date,
    meeting_starts_at,
    meeting_end_at,
    place_of_meeting
  )
  try {
    res.send('meeting added successfully')
  } catch (error) {
    res.status(500)
  }
})

app.listen(process.env.APP_PORT, () =>
  console.log(`server is listening on port ${process.env.APP_PORT}`)
)
