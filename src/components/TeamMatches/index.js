// Write your code here
import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }

    this.setState({teamData: formattedData, isLoading: false})
  }

  render() {
    const {teamData, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData
    const {match} = this.props
    const {params} = match
    const {id} = params

    const teamColors = {
      RCB: 'linear-gradient(to bottom, #1e293b, #a4261d)',
      MI: 'linear-gradient(to bottom, #5755a7, #d91c1f)',
      CSK: 'linear-gradient(to bottom, #f7db00, #ffffff33)',
      KKR: 'linear-gradient(to bottom, #da237b, #13418b)',
      SRH: 'linear-gradient(to bottom, #f26d22, #4f5db0)',
      DC: 'linear-gradient(to bottom, #0f172a, #5755a7)',
      // Add more teams as required
    }

    const backgroundStyle = {
      background: teamColors[id],
    }

    return (
      <div className="team-matches-container" style={backgroundStyle}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch latestMatch={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
