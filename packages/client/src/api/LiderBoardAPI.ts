import { User } from './AuthAPI'
import { request } from './rest/request'

const GATE = '/leaderboard'

const ratingFieldName = 'gofResult'
const teamName = 'Gang of five'

interface ISendRequestData {
  user: Partial<User>
  gofResult: number
}

interface ILiderBoardEntity {
  gofResult: number
  user: Partial<User>
}

class LeaderBoardAPI {
  sendGameResult = (data: ISendRequestData) =>
    request.post(`${GATE}`, { data, ratingFieldName, teamName })

  getLeaderBoard = () =>
    request.post<Array<{ data: ILiderBoardEntity }>>(`${GATE}/all`, {
      ratingFieldName,
      cursor: 0,
      limit: 10,
    })
}

export default new LeaderBoardAPI()
