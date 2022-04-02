export interface Fixtures {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: [];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Response[];
}

export interface Response {
  fixture: Fixture;
  league: League;
  teams: Team;
  goals: Goal;
}

interface Fixture {
  date: string;
}

interface League {
  round: string;
}

interface Goal {
  home: number;
  away: number;
}

interface Team {
  home: HomeTeam;
  away: AwayTeam;
}

interface HomeTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

interface AwayTeam extends HomeTeam {}
