import axios from 'axios'

const sqlTeams = axios.get('http://localhost:8080/teams/')
.then((response) => {return response.data})
console.log(sqlTeams)

