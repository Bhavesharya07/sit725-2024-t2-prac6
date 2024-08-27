var expect = require("chai").expect;
var request = require("request");

describe("Appointment Booking API", function() {
    var url = "http://localhost:3000/appointments/submit_appointment";
    
    it("returns status 200 to check if the API works", function(done) {
        var appointmentData = {
            fullName: "Bhavesh Arya",
            phoneNumber: "7049972956",
            department: "Cardiology",
            appointmentDate: "2024-09-01"
        };

        request.post({ url: url, form: appointmentData }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("returns statusCode key in body to check if the API gives the correct status, should be 200", function(done) {
        var appointmentData = {
            fullName: "Bhavesh Arya",
            phoneNumber: "7049972956",
            department: "Cardiology",
            appointmentDate: "2024-09-01"
        };

        request.post({ url: url, form: appointmentData }, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });

    it("returns a message confirming the appointment", function(done) {
        var appointmentData = {
            fullName: "Bhavesh Arya",
            phoneNumber: "7049972956",
            department: "Cardiology",
            appointmentDate: "2024-09-01"
        };

        request.post({ url: url, form: appointmentData }, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.message).to.equal("Appointment booked successfully");
            done();
        });
    });

    it("returns an error if required fields are missing", function(done) {
        var appointmentData = {
            fullName: "Bhavesh Arya",
            appointmentDate: "2024-09-01"
        };

        request.post({ url: url, form: appointmentData }, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(400);
            expect(body.message).to.equal("Missing required fields");
            done();
        });
    });

    it("returns an error if the date format is incorrect", function(done) {
        var appointmentData = {
            fullName: "Bhavesh Arya",
            phoneNumber: "7049972956",
            department: "Cardiology",
            appointmentDate: "2024/09/01"
        };

        request.post({ url: url, form: appointmentData }, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(400);
            expect(body.message).to.equal("Invalid date format");
            done();
        });
    });
});
