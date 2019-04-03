const request = require('supertest');
const assert = require('assert');


const baseAPI = 'http://localhost:5001/api'

describe('TEST API', function() {
    it('fisrt get test', function(done) {
        request(baseAPI)
            .get('/users/test')
            // .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (!('msg' in res.body)) throw new Error("missing msg key");
                assert.equal(res.body.msg, 'login works', '不是期望的结果')

                return done();
            })
    });

    // 注册
    it('测试注册是否成功', function(done) {
        let data = {
            name: 'roy',
            email: 'roy@qq.com',
            avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png',
            password: '123456',
            identity: 'admin'
        }
        request(baseAPI)
            .post('/users/register')
            .send(data)
            .end((err, res) => {
                if (err) return done(err);

                if (!('email' in res.body)) throw new Error("未返回邮箱");
                return done();
            })
    });

    let token

    it('测试登陆', function(done) {
        let data = {
            email: 'roy@qq.com',
            password: '123456',
        }
        request(baseAPI)
            .post('/users/login')
            .send(data)
            .end((err, res) => {
                if (err) return done(err);

                // console.log(res.text)
                assert.equal(res.body.success, true, '获取token失败')
                token = res.body.token

                return done();
            })
    });
    it('获取当前登陆用户的信息', function(done) {
        let data = {
            name: 'roy',
            email: 'roy@qq.com',
            avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png',
            password: '123',
            identity: 'admin'
        }
        request(baseAPI)
            .get('/users/current')
            .set('Authorization', token)
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                assert.ok(res.body.id, 'id 不存在！')
                assert.ok(res.body.name, 'name 不存在！')
                assert.ok(res.body.email, 'email 不存在！')
                assert.ok(res.body.identity, 'identity 不存在！')

                return done();
            })
    });
});