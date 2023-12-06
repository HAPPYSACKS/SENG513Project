const chai = require("chai");
const assert = chai.assert; // Import the assert interface
const request = require("supertest");
const cors = require("cors");
const sinon = require("sinon");
const authModule = require("../src/auth/verify"); // Adjust path as necessary
const admin = require("../src/utils/firebaseInit").default;

const axios = require("axios");

// Import your functions
const myFunctions = require("../src/api/Room");

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  res.set = sinon.stub().returns(res);
  res.setHeader = sinon.stub().returns(res);
  res.getHeader = sinon.stub().returns(null); // Add this line
  res.json = sinon.stub().returns(res);
  res.end = sinon.stub().returns(res);
  res.vary = sinon.stub().returns(res);
  // Add other necessary methods and properties
  return res;
};

// describe("Integration Test for addRoom", function () {
//   let verifyTokenStub;

//   beforeEach(() => {
//     verifyTokenStub = sinon
//       .stub(authModule, "verifyToken")
//       .resolves({ uid: "mocked-uid" });
//   });

//   corsStub = sinon.stub(cors, "call").callsFake((req, res, next) => {
//     if (typeof next === "function") {
//       next();
//     }
//   });

//   afterEach(() => {
//     verifyTokenStub.restore();
//     corsStub.restore();
//   });

//   it("should create a new room", function (done) {
//     this.timeout(5000); // Increase timeout for potential network requests

//     let res = mockResponse();

//     admin
//       .auth()
//       .createCustomToken("test-user")
//       .then((customToken) => {
//         return axios.post(
//           "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken",
//           { token: customToken, returnSecureToken: true },
//           { params: { key: "AIzaSyBAHAWBLyC6sKnffYHzk8e1MMC4AzpP0lA" } }
//         );
//       })
//       .then((idTokenResponse) => {
//         const idToken = idTokenResponse.data.idToken;

//         const req = {
//           method: "POST",
//           body: {},
//           headers: {
//             origin: "http://example.com",
//             authorization: `Bearer ${idToken}`,
//           },
//         };

//         return myFunctions.addRoom(req, res); // Return the promise
//       })
//       .then(() => {
//         // Place assertions here
//         // If res.status was called, assert its first call arguments
//         if (res.status.firstCall) {
//           const statusCode = res.status.firstCall.args[0];
//           assert.equal(
//             statusCode,
//             200,
//             `Expected status code 200, but got ${statusCode}`
//           );
//         } else {
//           assert.fail("res.status was not called");
//         }
//         done();
//       })
//       .catch((error) => {
//         done(error); // Pass any errors to done to fail the test
//       });
//   });
// });

// describe("Authentication Failure Test for addRoom", function () {
//   let verifyTokenStub;

//   beforeEach(() => {
//     // Stub the verifyToken function to simulate a failure
//     verifyTokenStub = sinon
//       .stub(authModule, "verifyToken")
//       .rejects(new Error("Token verification failed"));
//   });

//   afterEach(() => {
//     verifyTokenStub.restore();
//   });

//   it("should fail to create a new room due to token verification failure", function (done) {
//     this.timeout(5000);

//     const res = mockResponse();

//     // Simulating a valid request but with a token that will fail verification
//     const req = {
//       method: "POST",
//       body: {},
//       headers: {
//         origin: "http://example.com",
//         authorization: "Bearer invalidToken",
//       },
//     };

//     myFunctions
//       .addRoom(req, res)
//       .then(() => {
//         // Expect the function to respond with an error status code (like 500)
//         assert.isTrue(
//           res.status.calledWith(500),
//           "Expected status code 500 for internal server error"
//         );

//         done();
//       })
//       .catch((error) => {
//         done(error);
//       });
//   });
// });

describe("Integration Test for getAllRooms", function () {
  it("should list all rooms", function (done) {
    this.timeout(5000); // Increase timeout for potential database requests

    const res = mockResponse();

    // Simulate database call with mock data
    const req = {
      method: "GET",
    };

    myFunctions
      .getAllRooms(req, res)
      .then(() => {
        // Check if res.status was called with 200
        assert.isTrue(
          res.status.calledWith(200),
          "Status code 200 was not called"
        );

        done();
      })
      .catch((error) => {
        roomsRefStub.restore(); // Ensure the stub is restored even if there is an error
        done(error);
      });
  });
  it("should return 405 if the method is not GET", function (done) {
    const res = mockResponse();

    const req = {
      method: "POST", // Incorrect method
    };

    myFunctions
      .getAllRooms(req, res)
      .then(() => {
        assert.isTrue(
          res.status.calledWith(405),
          "Expected status code 405 for incorrect method"
        );
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

describe("Integration Test for getRoom", function () {
  it("should retrieve a specific room", function (done) {
    this.timeout(5000); // Increase timeout for potential database requests

    const res = mockResponse();

    // Simulate database call with mock data for a specific room
    const mockRoomData = {
      CreationTimestamp: "2023-12-05T12:06:41.869Z",
      LastActivityTimestamp: "2023-12-05T12:06:41.869Z",
      Owner: "ojTMAHLbX5eQ2iObwNuoBvWdiXG2",
      Status: "active",
    };
    const roomRefStub = sinon
      .stub(admin.database().ref(`Room/-NktrszMOxKjmARu8epr`), "once")
      .resolves({
        val: () => mockRoomData,
      });

    const req = {
      method: "GET",
      query: { roomID: "-NktrszMOxKjmARu8epr" },
    };

    myFunctions
      .getRoom(req, res)
      .then(() => {
        // Check if res.status was called with 200
        assert.isTrue(
          res.status.calledWith(200),
          "Status code 200 was not called"
        );

        // Check if res.json was called with the correct data
        assert.isTrue(
          res.json.calledWith(mockRoomData),
          "Incorrect data in response"
        );

        roomRefStub.restore(); // Restore the stubbed method
        done();
      })
      .catch((error) => {
        roomRefStub.restore(); // Ensure the stub is restored even if there is an error
        done(error);
      });
  });
  it("should return 400 if no room ID is provided", function (done) {
    const res = mockResponse();

    const req = {
      method: "GET",
      query: {}, // No roomID provided
    };

    myFunctions
      .getRoom(req, res)
      .then(() => {
        assert.isTrue(
          res.status.calledWith(400),
          "Expected status code 400 for missing room ID"
        );
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  it("should return 404 if room not found", function (done) {
    const res = mockResponse();

    // Stub the database call to simulate no room found
    const roomRefStub = sinon
      .stub(admin.database().ref(`Room/nonexistent-room`), "once")
      .resolves({
        val: () => null,
      });

    const req = {
      method: "GET",
      query: { roomID: "nonexistent-room" },
    };

    myFunctions
      .getRoom(req, res)
      .then(() => {
        assert.isTrue(
          res.status.calledWith(404),
          "Expected status code 404 for room not found"
        );
        roomRefStub.restore();
        done();
      })
      .catch((error) => {
        roomRefStub.restore();
        done(error);
      });
  });
});
