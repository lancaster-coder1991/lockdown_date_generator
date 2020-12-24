const app = require("../app");
const request = require("supertest");
const pool = require("../db_connect");

afterAll(() => {
  console.log("closing connection");
  pool.end();
});

describe("/api", () => {
  it("requests to paths that don't exist receive a 404 with a custom response", () => {
    return request(app)
      .get("/api/nothing")
      .expect(404)
      .then((res) => {
        expect(
          "Path not found - please consult the documentation for valid paths."
        );
      });
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
      request(app).get("/api/dates/filter/timings/Evening?sort_by=categories"),
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
  it("GET /dates/:date_id should return the correct date when passed a valid date id that exists in the DB", () => {
    return request(app)
      .get("/api/dates/1")
      .expect(200)
      .then((res) => {
        expect(res.body.date_id).toBe(1);
      });
  });
  it("GET /dates/:date_id should return a 404 and an 'entry not found' message if passed a valid id but no date is found in the DB", () => {
    return request(app)
      .get("/api/dates/29847291847")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("entry not found");
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
        expect(body[0].rows[0].date_name).toBe("Book Club");
        expect(body[0].rows[0].date_description).toBe(
          "something about a book club"
        );
        expect(body[1].rows[0].date_id).toBe(body[0].rows[0].date_id);
        expect(body[2].rows[0].date_id).toBe(body[0].rows[0].date_id);
      });
  });
  it("POST /dates should return a 400 bad request if a body with invalid values is passed ", () => {
    return request(app)
      .post("/api/dates")
      .send({
        date_name: "9438?!3",
        date_description: "test",
        timings: ["Afternoon", "Evening"],
        categories: ["Games"],
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(
          "Invalid body values, please amend your request."
        );
      });
  });
  it("should ", () => {});
});
