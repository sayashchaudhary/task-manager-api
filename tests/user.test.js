const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User =  require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    name: 'test',
    email: 'test@test.com',
    password: '123456789',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save()
})

test('Should signup new user', async () => {
    await request(app).post('/users').send({
        name: 'Sayash',
        email: 'sayash@sayash.com',
        password: '123456789'
    }).expect(201)
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
});

test('Should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: '123456098765'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send().expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401)
})
