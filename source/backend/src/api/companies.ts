import type { FastifyInstance } from 'fastify';
import type DB from '../../class/DB';
import { companiesList, companyCreate } from '../service/companies';
import { CompanyModel } from '@app/types/model/company';

const companiesApi = (
  fastify: FastifyInstance,
  options: { db: DB },
  done: () => void
): void => {
  const { db } = options;

  /** Получение списка всех компаний */
  fastify.post('/list', async (request, reply) => {
    try {
      const items = await companiesList(db);
      return { items };
    } catch (error) {
      //
    }
  });

  /** Создание новой компании */
  fastify.post('/append', async (request, reply) => {
    const eventData = JSON.parse(request.body as string) as CompanyModel;
    const id = await companyCreate(eventData, db);
    return {
      ...eventData,
      id,
    };
  });

  done();
};

export default companiesApi;
