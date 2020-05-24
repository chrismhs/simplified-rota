export const PARSE_ENDPOINT = {
  development: "http://localhost:5000/parse",
  staging:
    "https://staging.europe-west2-simplerotas.cloudfunctions.net/parse-rota",
  production: "https://europe-west2-simplerotas.cloudfunctions.net/parse-rota",
}[process.env.NODE_ENV || "production"];
