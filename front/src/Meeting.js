import React from 'react'

const Meeting = ({ meeting_no, team_no, meeting_subject, meeting_date, meeting_starts_at, meeting_end_at, place_of_meeting
}) => {
  return (
    <article className="meeting">
      <div>
        <h4>Meeting No' {meeting_no}</h4>
        <h4>Meeting Subject : {meeting_subject}</h4>
        <h4>Team No : {team_no}</h4>
        <h4>Meeting Date : {meeting_date}</h4>
        <h4>Meeting Starts At {meeting_starts_at}</h4>
        <h4>Meeting End at {meeting_end_at}</h4>
        <h4>Place Of Meeting - {place_of_meeting
}</h4>
      </div>
    </article>
  )
}

export default Meeting
