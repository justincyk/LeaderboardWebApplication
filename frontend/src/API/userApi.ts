import { User } from "../User/User.ts";
import { Player } from "../User/Player.ts";

const baseUrl = "http://localhost:8080/api";
const url = `${baseUrl}/players`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
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

function convertToUserModels(data: any[]): User[] {
  let users: User[] = data.map(convertToUserModel);
  return users;
}

function convertToUserModel(item: any): User {
  return new User(item);
}

const userAPI = {
  get() {
    return fetch(`${url}/users`, { headers: { "API-KEY": "pingpongapp" } })
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToUserModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the players. Please try again.",
        );
      });
  },
  post(player: Player) {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(player),
      headers: {
        "API-KEY": "pingpongapp",
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error("There was an error with creating the player.");
      });
  },
};

export { userAPI };
