import React, { useState, useContext } from 'react'
import Meeting from './Meeting'
import { NewDataProvider } from './Mission'



const MeetingContainer = () => {

  const { newData, dbTeams } = useContext(NewDataProvider)
  const [selects, setSelects] = useState('All Teams Meetings')
  console.log(selects)
  const choice = dbTeams.find((team) => {
    if (team.name === selects) {
      return team.id
    }
  })
  return (
    <>
      <section>
        <div>
          <h3>Choose your team</h3>
          <form>
            <select
              value={selects}
              onChange={(e) => setSelects(e.target.value)}
            >
              {dbTeams.map((team) => {
                return (
                  <option id={team.id} key={team.id} value={team.name}>
                    {team.name}
                  </option>
                )
              })}
            </select>
          </form>
        </div>
      </section>
      <section>
        <header>
          <h2>Your Team Meetings</h2>
        </header>
        <div>
          {newData.map((meet) => {
            if (choice.id === 1) {
              return <Meeting key={meet.meeting_no} {...meet} />
            }
            if (meet.team_no === choice.id) {
              return <Meeting key={meet.meeting_no} {...meet} />
            }
          })}
        </div>
      </section>{' '}
    </>
  )
}

export default MeetingContainer
