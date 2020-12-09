const app = require("../app");
const request = require("supertest");
const { Client } = require("pg");

// const client = new Client({
//   user: "george",
//   host: "localhost",
//   database: "lockdown_dates",
//   password: "georgescott123",
//   port: 5432,
// });

// beforeAll(() => {
//   client.connect();
// });

// afterAll(() => {
//   client.end();
// });

describe("/api", () => {
  it("GET requests to /api receive a 200 status and placeholder response", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.text).toBe(
          "This is the Lockdown Date Generator API. Consult the documentation for the available endpoints and methods."
        );
      });
  });
  describe("/categories", () => {
    it("GET /categories should return a 200 and a categories object with an array of categories", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(Array.isArray(res.body.categories)).toBe(true);
          expect(res.body.categories.length).toBeTruthy();
        });
    });
  });
});
