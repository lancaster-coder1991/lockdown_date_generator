const app = require("../app");
const request = require("supertest");
const pool = require("../db_connect");

afterAll(() => {
  console.log("closing connection");
  pool.end();
});

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
  describe("/timings", () => {
    it("GET /timings should return a 200 and a timings object with an array of timings", () => {
      return request(app)
        .get("/api/timings")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(Array.isArray(res.body.timings)).toBe(true);
          expect(res.body.timings.length).toBeTruthy();
        });
    });
  });
  describe("/dates", () => {
    it("GET /dates should return a 200 and a dates object with an array of dates", () => {
      return request(app)
        .get("/api/dates")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(Array.isArray(res.body.dates)).toBe(true);
          expect(res.body.dates.length).toBeTruthy();
        });
    });
    it("GET /dates should accept a timings sort query that sorts results by morning/afternoon/evening", () => {
      return request(app)
        .get("/api/dates?sort_by=timings")
        .expect(200)
        .then((res) => {
          expect(res.body.dates).toBeSortedBy("timing_id");
        });
    });
    it("GET /dates should accept a categories sort query that sorts results alphabetically by category", () => {
      return request(app)
        .get("/api/dates?sort_by=categories")
        .expect(200)
        .then((res) => {
          expect(res.body.dates).toBeSortedBy("category_name");
        });
    });
    it("GET /dates should accept timing and category parameters that filter results accordingly", () => {
      return Promise.all([
        request(app).get("/api/dates/filter/timings/Evening").expect(200),
        request(app).get("/api/dates/filter/categories/Outdoors").expect(200),
      ]).then(([timingRes, categoryRes]) => {
        expect(timingRes.body.dates.every((date) => date.timing_id === 3)).toBe(
          true
        );
        expect(
          categoryRes.body.dates.every((date) => date.category_id === 2)
        ).toBe(true);
      });
    });
    it("GET /dates should be able to use sort queries and filter parameters together", () => {
      return Promise.all([
        request(app).get(
          "/api/dates/filter/timings/Evening?sort_by=categories"
        ),
        request(app).get("/api/dates/filter/categories/Games?sort_by=timings"),
      ]).then(([timingsFilter, categoriesFilter]) => {
        expect(
          timingsFilter.body.dates.every((date) => date.timing_id === 3)
        ).toBe(true);
        expect(timingsFilter.body.dates).toBeSortedBy("category_name");
        expect(
          categoriesFilter.body.dates.every((date) => date.category_id === 3)
        ).toBe(true);
        expect(categoriesFilter.body.dates).toBeSortedBy("timing_id");
      });
    });
    it.only("POST /dates should insert a new row into the dates table, as well as the appropriate junction tables", () => {
      return request(app)
        .post("/api/dates")
        .send({
          date_name: "Book Club",
          date_description: "something about a book club",
          timings: ["Morning", "Afternoon", "Evening"],
          categories: ["Social"],
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .then(({ body }) => {
          console.log(body);
        });
    });
  });
});
