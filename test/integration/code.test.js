let server;
const request = require("supertest");

describe("register endpoint", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(() => {
    server.close();
  });
  describe("get request /", () => {
    it("should return is the server up and running?", async () => {
      const serverStat = await request(server).get("/");
      expect(serverStat.status).toBe(200);
    });
  });

  describe("/charecters Get all Mervel charecters", () => {
    it("should return 200 for succesfull return", async () => {
      
      const allMarvelChraecters = await request(server).get("/charecters")
      expect(allMarvelChraecters.status).toBe(200);
      expect(allMarvelChraecters.body.status).toEqual("success");
      expect(allMarvelChraecters.body.message).toEqual("Getting all Marvel Charecters List.");
    });
  });

  describe("/charecters/{charecterId} Get Chareter's details", () => {
    it("should return 200 for succesfull return", async () => {
      let charecterId = 1011334;
      const allMarvelChraecters = await request(server).get(`/charecters/${charecterId}`)
      expect(allMarvelChraecters.status).toBe(200);
      expect(allMarvelChraecters.body.status).toEqual("success");
      expect(allMarvelChraecters.body.message).toEqual("Getting charecter Details");
    });
  });

  describe("/charecters/{InvalidCharecterId} Get Chareter's details", () => {
    it("should return Failed for unsuccesfull Response", async () => {
      let InvalidCharecterId = 10113347921897;
      const allMarvelChraecters = await request(server).get(`/charecters/${InvalidCharecterId}`)
      expect(allMarvelChraecters.body.status).toEqual("Failed");
      expect(allMarvelChraecters.body.message).toEqual("Third-Party api error");
    });
  });


});