# Simple API

A simple API that allows for managing todos and generating random things. No authentication or additional setup required.

**Note:** Todos are not persisted thus all data is lost when the server is stopped/restarted.

## Getting started

To get started, clone the repository and simply run the following:

```
npm install
npm start
```

Then the API will be available from `localhost:5005`. (See [Configuration](#configuration) for how to change the port.)

## Configuration

The port can be changed by copying `.env.example` into `.env` and changing `PORT` followed by restarting the server.

## Todos

A todo consists of the following data:

| Field       | Required           | Description                                       |
| ----------- | ------------------ | ------------------------------------------------- |
| `id`        | Yes (in responses) | The ID of the todo.                               |
| `title`     | Yes                | The title of the todo                             |
| `done`      | Yes (in responses) | Whether the todo is done (defaults to false)      |
| `important` | Yes (in responses) | Whether the todo is important (defaults to false) |
| `deadline`  | No                 | An optional deadline for the todo                 |
| `note`      | No                 | An optional note                                  |

## Operations

The following operations can be run:

| Operation               | Description                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `GET /random/number`    | Returns a random number between 0 and 100 (exclusive); query parameters "min" and "max" available |
| `GET /random/coin`      | Flips a coin!                                                                                     |
| `POST /random/pick`     | Picks a random string in a list of strings                                                        |
| `GET /random/color`     | Returns a random color.                                                                           |
| `GET /todos/`           | Gets all todos                                                                                    |
| `GET /todos/done`       | Gets all done todos                                                                               |
| `GET /todos/incomplete` | Gets all incomplete todos                                                                         |
| `GET /todos/overdue`    | Gets all incomplete todos that are overdue                                                        |
| `GET /todos/:id`        | Gets a todo                                                                                       |
| `POST /todos/`          | Creates a new todo and returns it                                                                 |
| `PUT /todos/:id`        | Updates a todo and returns the updated todo                                                       |
| `DELETE /todos/:id`     | Deletes a todo                                                                                    |
