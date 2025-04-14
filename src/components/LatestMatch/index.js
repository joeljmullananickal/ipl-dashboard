// Write your code here
import './index.css'

const LatestMatch = ({latestMatch}) => {
  const toCamelCase = str =>
    str
      .replace(/_./g, match => match.charAt(1).toUpperCase())
      .replace(/^[A-Z]/, match => match.toLowerCase())

  // Function to convert each object key to camel case
  const convertObjectKeysToCamelCase = obj =>
    Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key)
      acc[camelCaseKey] = obj[key]
      return acc
    }, {})
  const camelCaseObj = convertObjectKeysToCamelCase(latestMatch)

  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = camelCaseObj
  return (
    <div className="latest-match-container">
      <h1 className="section-heading">Latest Match</h1>
      <div className="latest-match-details">
        <div className="competing-team-section">
          <p className="competing-team">{competingTeam}</p>
          <p className="match-date">{date}</p>
          <p className="match-venue">{venue}</p>
          <p className="match-result">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competing-team-logo"
        />
        <div className="additional-details">
          <p className="match-detail">
            <span className="detail-label">First Innings:</span> {firstInnings}
          </p>
          <p className="match-detail">
            <span className="detail-label">Second Innings:</span>{' '}
            {secondInnings}
          </p>
          <p className="match-detail">
            <span className="detail-label">Man of the Match:</span>{' '}
            {manOfTheMatch}
          </p>
          <p className="match-detail">
            <span className="detail-label">Umpires:</span> {umpires}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
