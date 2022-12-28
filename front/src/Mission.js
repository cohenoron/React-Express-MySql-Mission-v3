import React, { useEffect, useState } from 'react'
import MeetingContainer from './MeetingContainer'
import { createContext } from 'react'
import axios from 'axios'
export const NewDataProvider = createContext(null)

export const Mission = () => {
  const getMeetings = () =>
    axios
      .get('http://localhost:8080/meetings')
      .then((response) => setNewData(response.data))
  const getTeams = () =>
    axios
      .get('http://localhost:8080/teams/')
      .then((response) => setDbTeams(response.data))

  const [dbTeams, setDbTeams] = useState([
    { id: 1, name: 'All Teams Meetings' },
  ])
  const [sub, setSub] = useState('')
  const [date, setDate] = useState('')
  const [startHour, setStartHour] = useState('')
  const [endHour, setEndHour] = useState('')
  const [place, setPlace] = useState('')
  const [newData, setNewData] = useState([{}])
  const [selects, setSelects] = useState('')
  const [add, setAdd] = useState({})

  const choice = dbTeams.find((team) => {
    if (team.name === selects) {
      return team.id
    }
  })

  const handle = () => {
    setAdd({
      meeting_subject: sub,
      team_no: choice.id,
      meeting_date: date,
      meeting_starts_at: startHour,
      meeting_end_at: endHour,
      place_of_meeting: place,
    })
    axios
      .post('http://localhost:8080/new', {
        meeting_subject: sub,
        team_no: choice.id,
        meeting_date: date,
        meeting_starts_at: startHour,
        meeting_end_at: endHour,
        place_of_meeting: place,
      })
      .then(function (response) {
        getMeetings()
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getMeetings()
    getTeams()
  }, [])

  console.log(selects)

  return (
    <NewDataProvider.Provider value={{ newData, dbTeams }}>
      <form className="Mission">
        <h4>Add New Meeting</h4>
        <section>
          <label>Meeting Subject : </label>
          <input
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            type="text"
            placeholder="Meeting Subject"
            required
          ></input>
        </section>
        <section className="label">
          <label>Select Your Team : </label>
          <select
            value={selects}
            onChange={(e) => setSelects(e.target.value)}
            required
          >
            {dbTeams.map((team) => {
              return (
                <option id={team.id} key={team.id} value={team.name}>
                  {team.name}
                </option>
              )
            })}
          </select>
        </section>
        <section>
          <label>Set Date : </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="Date"
            required
          ></input>
        </section>
        <section>
          <label>Set Start Hour : </label>
          <input
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            type="time"
            required
          ></input>
        </section>
        <section>
          <label>Set End Hour : </label>
          <input
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            type="time"
            required
          ></input>
        </section>
        <section>
          <lable>Place Of Meeting : </lable>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            type="text"
            placeholder="Place Of Meeting"
            required
          ></input>
        </section>
        <button
          className="btn"
          onClick={() => {
            handle()
          }}
          type="button"
        >
          Submit
        </button>

        <div className="meetingsDiv">
          <MeetingContainer />
        </div>
      </form>
    </NewDataProvider.Provider>
  )
}
