import { Matches } from "../User/Matches.ts";

const baseUrl = "http://localhost:8080/api";
const url = `${baseUrl}/matches`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the match(es).";
    default:
      return "There was an error retrieving the match(es). Please try again.";
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function convertToMatchModels(data: any[]): Matches[] {
  let matches: Matches[] = data.map(convertToMatchModel);
  return matches;
}

function convertToMatchModel(item: any): Matches {
  return new Matches(item);
}

const matchAPI = {
  get() {
    return fetch(`${url}/users`, { headers: { "API-KEY": "pingpongapp" } })
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToMatchModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the players. Please try again.",
        );
      });
  },
  post(match: Matches) {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(match),
      headers: {
        "API-KEY": "pingpongapp",
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error("There was an error with adding new match.");
      });
  },
};

export { matchAPI };
