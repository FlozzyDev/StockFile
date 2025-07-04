

import { categoryValidationSchema, categoryIdValidationSchema } from '../src/validation/category.validation';

describe('Category Validation', () => {
  test('Should validate valid category data', () => {
    const validCategory = {
      name: 'Electronics',
      description: 'Devices and gadgets'
    };

    const { error } = categoryValidationSchema.validate(validCategory);
    expect(error).toBeUndefined();
  });

  test('Should validate category with optional empty description', () => {
    const validCategory = {
      name: 'Pantry',
      description: ''
    };

    const { error } = categoryValidationSchema.validate(validCategory);
    expect(error).toBeUndefined();
  });

  test('Should reject category without required name', () => {
    const invalidCategory = {
      description: 'Missing name'
    };

    const { error } = categoryValidationSchema.validate(invalidCategory);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject category with name too short', () => {
    const invalidCategory = {
      name: 'A',
      description: 'Too short'
    };

    const { error } = categoryValidationSchema.validate(invalidCategory);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject category with name too long', () => {
    const longName = 'A'.repeat(101);
    const invalidCategory = {
      name: longName,
      description: 'Too long'
    };

    const { error } = categoryValidationSchema.validate(invalidCategory);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  describe('Category Parameter Validation', () => {
    test('Should validate valid categoryId', () => {
      const validCategoryId = {
        categoryId: 1
      };

      const { error } = categoryIdValidationSchema.validate(validCategoryId);
      expect(error).toBeUndefined();
    });

    test('Should reject invalid categoryId', () => {
      const invalidCategoryId = {
        categoryId: 'invalid'
      };

      const { error } = categoryIdValidationSchema.validate(invalidCategoryId);
      expect(error).toBeDefined();
      expect(error?.message).toContain('categoryId');
    });
  });
});