import { buildUrl } from "./utils";

export interface ApiGetStatementListParams {
  orderBy: string;
  languageCode: string;
  limit: number;
  offset?: number;
}

export interface ApiPostVoteParams {
  statementId: number;
  points: number;
}

export default {
  statement: (id: number) => `/p/${id}`,
  index: () => `/`,
  login: () => `/signin`,
  logout: () => `/signout`,
  api: {
    statements: {
      get(params: ApiGetStatementListParams) {
        return buildUrl("/api/statements", params);
      },
      counts(statementId: number) {
        return `/api/statements/${statementId}/counts`;
      }
    },
    votes: {
      post(params: Partial<ApiPostVoteParams> = {}) {
        return buildUrl("/api/votes", params);
      }
    }
  }
};
