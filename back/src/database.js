// import mysql from 'mysql2'
import { createPool } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = createPool({
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
}).promise()

const getTeams = async () => {
  const [teams] = await pool.query('SELECT * FROM teams')
  return teams
}
const teamsTable = await getTeams()

const getMeetings = async () => {
  const [meetings] = await pool.query('SELECT * FROM meetings')
  return meetings
}

const createNewMeeting = async (
  meeting_subject,
  team_no,
  meeting_date,
  meeting_starts_at,
  meeting_end_at,
  place_of_meeting
) => {
  const newMeeting = await pool.query(
    `insert into meetings (
    meeting_subject,
    team_no,
    meeting_date,
    meeting_starts_at,
    meeting_end_at, 
    place_of_meeting
    )
    
    values (?,?,?,?,?,?)`,
    [
      meeting_subject,
      team_no,
      meeting_date,
      meeting_starts_at,
      meeting_end_at,
      place_of_meeting,
    ]
  )
  return newMeeting
}

export { createNewMeeting, getMeetings, getTeams, pool }
