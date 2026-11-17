import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { app, auth, registerUser } from './helpers';

describe('Proyectos', () => {
  it('crea un proyecto', async () => {
    const { token } = await registerUser('proj1@test.com');

    const res = await request(app)
      .post('/api/projects')
      .set(auth(token))
      .send({ name: 'Mi Proyecto', description: 'Descripción' });

    expect(res.status).toBe(201);
  });

  it('rechaza crear un proyecto sin nombre', async () => {
    const { token } = await registerUser('project-empty@test.com');

    const res = await request(app)
      .post('/api/projects')
      .set(auth(token))
      .send({ name: '' });

    expect(res.status).toBe(400);
  });

  it('rechaza crear un proyecto con nombre corto', async () => {
    const { token } = await registerUser('project-short@test.com');

    const res = await request(app)
      .post('/api/projects')
      .set(auth(token))
      .send({ name: 'Ab' });

    expect(res.status).toBe(400);
  });

  it('crea un proyecto con nombre válido', async () => {
    const { token } = await registerUser('project-valid@test.com');

    const res = await request(app)
      .post('/api/projects')
      .set(auth(token))
      .send({ name: 'Proyecto válido' });

    expect(res.status).toBe(201);
  });

  it('lista los proyectos del usuario', async () => {
    const { token } = await registerUser('proj2@test.com');
    await request(app).post('/api/projects').set(auth(token)).send({ name: 'Proyecto A' });
    await request(app).post('/api/projects').set(auth(token)).send({ name: 'Proyecto B' });

    const res = await request(app).get('/api/projects').set(auth(token));

    expect(res.body).toHaveLength(2);
  });

  it('rechaza crear un proyecto sin autenticación', async () => {
    const res = await request(app).post('/api/projects').send({ name: 'Sin token' });

    expect(res.status).toBe(401);
  });
});