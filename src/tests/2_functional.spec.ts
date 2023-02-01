import 'mocha'
import chai from "chai";
import chaiHttp from 'chai-http'

chai.use(chaiHttp);

import server from '../server.js'

describe('Functional Tests', function () {
    it('converts a valid input', function (done) {
        const input = '10L'
        const expectedInitNum = 10
        const expectedInitUnit = 'L'
        const expectedReturnNum = 2.64172
        const expectedReturnUnit = 'gal'
        const expectedString = '10 litres converts to 2.64172 gallons'

        chai.request(server)
            .get(`/api/convert?input=${input}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200)

                chai.expect(res.body).to.have.property('initNum').equal(expectedInitNum)
                chai.expect(res.body).to.have.property('initUnit').equal(expectedInitUnit)
                chai.expect(res.body).to.have.property('returnNum').equal(expectedReturnNum)
                chai.expect(res.body).to.have.property('returnUnit').equal(expectedReturnUnit)
                chai.expect(res.body).to.have.property('string').equal(expectedString)

                done()
            })
    })

    it('does not convert an invalid input', (done) => {
        const input = '32g'
        const expectedResponse = 'invalid unit'

        chai.request(server)
            .get(`/api/convert?input=${input}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
                chai.expect(res.text).to.equal(expectedResponse)

                done()
            })
    })

    it('does not convert an invalid number', (done) => {
        const input = '3/7.2/4kg'
        const expectedResponse = 'invalid number'

        chai.request(server)
            .get(`/api/convert?input=${input}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
                chai.expect(res.text).to.equal(expectedResponse)

                done()
            })
    })

    it('does not convert an invalid number AND unit', (done) => {
        const input = '3/7.2/4kilomegagram'
        const expectedResponse = 'invalid number and unit'

        chai.request(server)
            .get(`/api/convert?input=${input}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200)
                chai.expect(res.text).to.equal(expectedResponse)

                done()
            })
    })

    it('converts a unit WITHOUT and number', (done) => {
        const input = 'kg'
        const expectedInitNum = 1
        const expectedInitUnit = 'kg'
        const expectedReturnNum = 2.20462
        const expectedReturnUnit = 'lbs'
        const expectedString = '1 kilograms converts to 2.20462 pounds'

        chai.request(server)
            .get(`/api/convert?input=${input}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200)

                chai.expect(res.body).to.have.property('initNum').equal(expectedInitNum)
                chai.expect(res.body).to.have.property('initUnit').equal(expectedInitUnit)
                chai.expect(res.body).to.have.property('returnNum').equal(expectedReturnNum)
                chai.expect(res.body).to.have.property('returnUnit').equal(expectedReturnUnit)
                chai.expect(res.body).to.have.property('string').equal(expectedString)

                done()
            })
    })
});
