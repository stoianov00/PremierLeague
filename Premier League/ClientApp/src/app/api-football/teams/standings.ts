export interface FullResponse {
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
  [x: string]: any;
  standings: Standings[][];
}

interface Standings {
  rank: number;
  team: Team;
  points: number;
  form: string;
  description: string;
  all: All;
}

interface Team {
  id: number;
  name: string;
}

interface All {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

interface Goals {
  for: number;
  against: number;
}
