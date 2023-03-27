import { Test } from '@nestjs/testing';
import * as Joi from 'joi';
import { join } from 'path';
import { ConfigModule, DB_CONFIG_SCHEMA } from '../config.module';

const expectValidate = (schema: Joi.Schema, value: any) => {
  return expect(schema.validate(value, { abortEarly: true }).error.message);
};

describe('Config Schema Unit Tests', () => {
  describe('DB Config Schema', () => {
    const schema = Joi.object({ ...DB_CONFIG_SCHEMA });

    describe('DB_URL', () => {
      test('invalid cases', () => {
        expectValidate(schema, {}).toContain('"DB_URL" is required');

        expectValidate(schema, { DB_URL: 1 }).toContain(
          '"DB_URL" must be a string',
        );

        expectValidate(schema, {
          DB_URL: 'mysql://localhost:3306',
        }).toContain(
          '"DB_URL" must be a valid uri with a scheme matching the postgres pattern',
        );
      });

      test('valid cases', () => {
        const schemaValidated = schema.validate({
          DB_URL: 'postgres://localhost:5432',
        });

        expect(schemaValidated.error).toBeUndefined();
      });
    });
  });
});

describe('ConfigModule Unit Tests', () => {
  it('should throw an error when env vars are invalid', () => {
    try {
      Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: join(__dirname, '.env.fake'),
          }),
        ],
      });

      fail('ConfigModule should throw an error when env vars are invalid');
    } catch (e) {
      expect(e.message).toContain(
        '"DB_URL" must be a valid uri with a scheme matching the postgres pattern',
      );
    }
  });
});
