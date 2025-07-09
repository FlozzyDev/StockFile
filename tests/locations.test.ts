import { locationValidationSchema, locationIdValidationSchema } from '../src/validation/location.validation';

describe('Location Validation', () => {
  test('Should validate valid location data', () => {
    const validLocation = {
      name: 'Warehouse A',
      description: 'Main storage facility'
    };

    const { error } = locationValidationSchema.validate(validLocation);
    expect(error).toBeUndefined();
  });

  test('Should validate location with optional empty description', () => {
    const validLocation = {
      name: 'Office Storage',
      description: ''
    };

    const { error } = locationValidationSchema.validate(validLocation);
    expect(error).toBeUndefined();
  });

  test('Should validate location with null description', () => {
    const validLocation = {
      name: 'Basement',
      description: null
    };

    const { error } = locationValidationSchema.validate(validLocation);
    expect(error).toBeUndefined();
  });

  test('Should validate location without description field', () => {
    const validLocation = {
      name: 'Garage'
    };

    const { error } = locationValidationSchema.validate(validLocation);
    expect(error).toBeUndefined();
  });

  test('Should reject location without required name', () => {
    const invalidLocation = {
      description: 'Missing name'
    };

    const { error } = locationValidationSchema.validate(invalidLocation);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject location with name too short', () => {
    const invalidLocation = {
      name: 'A', // needs to be at least 2
      description: 'Too short'
    };

    const { error } = locationValidationSchema.validate(invalidLocation);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject location with name too long', () => {
    const longName = 'A'.repeat(101); // needs to be at most 100
    const invalidLocation = {
      name: longName,
      description: 'Too long'
    };

    const { error } = locationValidationSchema.validate(invalidLocation);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  describe('Location Parameter Validation', () => {
    test('Should validate valid locationId', () => {
      const validLocationId = {
        locationId: 123
      };

      const { error } = locationIdValidationSchema.validate(validLocationId);
      expect(error).toBeUndefined();
    });

    test('Should reject invalid locationId type', () => {
      const invalidLocationId = {
        locationId: 'invalid'
      };

      const { error } = locationIdValidationSchema.validate(invalidLocationId);
      expect(error).toBeDefined();
      expect(error?.message).toContain('locationId');
    });

    test('Should reject missing locationId', () => {
      const invalidLocationId = {};

      const { error } = locationIdValidationSchema.validate(invalidLocationId);
      expect(error).toBeDefined();
      expect(error?.message).toContain('locationId');
    });
  });
}); 