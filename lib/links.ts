import { ApiGetStatementListParams } from "./api-client/use-statement-list";
import { buildUrl } from "./utils";

export default {
  statement: (id: number) => `/p/${id}`,
  index: () => `/`,
  login: () => `/signin`,
  logout: () => `/signout`,
  api: {
    statements: {
      get(params: ApiGetStatementListParams) {
        return buildUrl("/api/statements", params);
      }
    }
  }
};
