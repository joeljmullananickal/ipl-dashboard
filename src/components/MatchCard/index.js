// Write your code here
import './index.css'

const MatchCard = ({match}) => {
  const match1={
    competingTeam:match.competing_team,
    competingTeamLogo:match.competing_team_logo,
    result:match.result,
    matchStatus:match.match_status
  }
  const {competingTeam, competingTeamLogo, result, matchStatus} = match1

  const matchStatusClass = matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${matchStatusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
