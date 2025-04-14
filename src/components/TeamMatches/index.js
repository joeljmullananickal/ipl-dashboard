// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'
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

  goBack = () => {
    const {history} = this.props
    history.replace('/')
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
    const COLORS = {
      Won: '#00C49F',
      Lost: '#FF4D4F',
      Draw: '#FFBB28',
    }

    const gamestats = {Won: 0, Lost: 0, Draw: 0}
    if (recentMatches) {
      recentMatches.forEach(match1 => {
        const status = match1.match_status
        if (gamestats[status] !== undefined) {
          gamestats[status] += 1
        }
      })
    }
    const pieChartData = Object.entries(gamestats).map(([name, value]) => ({
      name,
      value,
      color: COLORS[name],
    }))

    return (
      <div className="team-matches-container" style={backgroundStyle}>
        {isLoading ? (
          <div data-testid="loader">
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
              {recentMatches.map(match1 => (
                <MatchCard key={match1.id} match={match1} />
              ))}
            </ul>
            <div className="A">
              <h2>Game Statistics</h2>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map(entry => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </div>
            <button onClick={this.goBack} type="button" className="butt">
              Back
            </button>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
