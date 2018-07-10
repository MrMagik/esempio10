/*const model = require("../model");

describe("asbolute", () => {
  it("Should return a positive number if input is positive", () => {
    const result = model.absolute(1);
    expect(result).toBe(1);
  }); //nome del test, e il secondo argomento è l'implementazione del test

  it("Should return a positive number if input is negative", () => {
    const result = model.absolute(-1);
    expect(result).toBe(1);
  });

  it("Should return 0 if input is 0", () => {
    const result = model.absolute(0);
    expect(result).toBe(0);
  });
});

describe("test", () => {
  it("Should throw if username is falsy", () => {
    const args = [null, undefined, 0, NaN, "", false];
    args.forEach(a => {
      expect(() => model.absolute(a)).toThrow();
    });
  });
  it("Should return a user object if valid username is passed", () => {
      const result = model.absolute("Mosh");
      expect(result).toMatchObject({username : "mosh"});//matcha l'ogggetto creato con le sottoproprietà dell'ohgget con username mosh
      expect(result).tobeg  
    });
});
*/
const request = require("supertest");
const { Course } = require("../model");
let server; //il problema con server è che si tenta di creare un server ogni volta che si modifica il file jest

describe("/api/genres", () => {
  beforeEach(async () => {
    server = require("../index");
    await Course.remove({});
  }); //impediamo che questo accada, jest chiama questa funzione prima di ogni test
  afterEach(async () => {
    server.close();
    await Course.remove({}); //chiudiamo il serve dopo ogni test
  });
  describe("GET /", () => {
    it("Should return all genres", async () => {
      await Course.collection.insertMany([
        { name: "Prova2" },
        { name: "prova4" },
      ]);

      const res = await request(server).get("/");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "Prova2")).toBeTruthy();
    });
  });
  describe("GET /:name", () => {
    it("Should return a genre if valid id is passed", async () => {
      const course = new Course({ name: "Prova2" });
      await course.save();
      const res = await request(server).get("/" + course.name);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", course.name);
    });
    it("Should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/1");
      expect(res.status).toBe(404);
    });
  });
  describe("POST /", () => {
    it("Should return 400 if genre is an empty string", async () => {
      const res = await request(server)
        .post("/")
        .send({ name: "" });
      expect(res.status).toBe(400);
    });
    it("Should save the genre in the database if it is valid", async () => {
      const res = await request(server)
        .post("/")
        .send({ name: "Prova2" });
      const genre = await Course.find({ name: "Prova2" });
      expect(res.status).toBe(200);
      expect(genre).not.toBeNull();
    });
    it("Should return the genre in the database if it is valid", async () => {
      const res = await request(server)
        .post("/")
        .send({ name: "Prova2" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "Prova2");
    });
  });

  describe("PUT /:name", () => {
    it("Should update the genre", async () => {
      const course = new Course({ name: "Prova2" });
      await course.save();
      const res = await request(server)
        .put("/Prova2")
        .send({ name: "Prova4" });
      expect(res.status).toBe(200);
      const genre = await Course.find({ name: "Prova4" });
      expect(genre).not.toBeNull();
    });
    it("Should return the updated genre", async () => {
      const course = new Course({ name: "Prova2" });
      await course.save();
      const res = await request(server)
        .put("/Prova2")
        .send({ name: "Prova4" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Prova4");
    });
    it("Should return 404 if invalid id is passed", async () => {
      const course = new Course({ name: "Prova2" });
      await course.save();
      const res = await request(server)
        .put("/Prova")
        .send({ name: "Prova4" });
      expect(res.status).toBe(404);
    });
  });
  describe("DELETE /:name", () => {
    it("Should delete the genre in the database", async () => {
      const course = new Course({ name: "Prova2" });
      await course.save();
      const res = await request(server).delete("/Prova2");
      expect(res.status).toBe(200);
      const genre = await Course.findOne({ name: "Prova2" });
      expect(genre).toBeNull();
    });
    it("Should return the deleted genre in the database", async () => {
      const course = new Course({ name: "Prova2" });
      await course.save();
      const res = await request(server).delete("/Prova2");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Prova2");
    });
    it("Should return 404 if invalid id is passed", async () => {
      const res = await request(server).delete("/1");
      expect(res.status).toBe(404);
    });
  });
});
