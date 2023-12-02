// At the top of test/index.test.js
const sinon = require("sinon");
const admin = require("firebase-admin");
const test = require("firebase-functions-test")(
  {
    databaseURL: "https://study-buddy-51a85-default-rtdb.firebaseio.com",
    storageBucket: "study-buddy-51a85.appspot.com",
    projectId: "study-buddy-51a85",
  },
  "./study-buddy-51a85-d6a815364a38.json"
);

const functions = require("firebase-functions");
const rooms = require("../src/api/Room.ts");

describe("Cloud Function: addRoom", () => {
  let mockReq, mockRes;

  before(() => {
    // Mock Firebase Admin SDK
    sinon.stub(admin, "initializeApp");

    // Mock any other dependencies here
  });

  beforeEach(() => {
    mockReq = { method: "GET", query: {} };
    mockRes = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  after(() => {
    admin.app().delete();
  });

  it("getRoom: should retrieve room data for a valid room ID", async () => {
    mockReq.query.roomID = "validRoomID";
    const fakeRoomData = {
      name: "Test Room",
      description: "A room for testing",
    };

    sinon.stub(admin.database().ref(`Room/validRoomID`), "once").resolves({
      value: () => fakeRoomData,
    });

    await myFunctions.getRoom(mockReq, mockRes);

    assert(mockRes.status.calledWith(200));
    assert(mockRes.json.calledWith(fakeRoomData));
  });

  it("getRoom: should send 400 error when room ID is missing", async () => {
    mockReq.query.roomID = "";

    await myFunctions.getRoom(mockReq, mockRes);

    assert(mockRes.status.calledWith(400));
    assert(mockRes.send.calledWith("Room ID is required"));
  });
});
