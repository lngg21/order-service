const request = require('supertest');
const app = require('./app');

describe('Order Service', () => {
  it('should return list of orders', async () => {
    const res = await request(app).get('/orders');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('orders');
    expect(res.body.orders.length).toBeGreaterThanOrEqual(2);
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ item: 'Keyboard', quantity: 1 });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Order created');
    expect(res.body.order).toHaveProperty('item', 'Keyboard');
  });

  it('should reject order without item or quantity', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ item: 'Keyboard' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
