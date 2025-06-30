import { supplierValidationSchema, supplierIdValidationSchema } from '../src/validation/supplier.validation';

describe('Supplier Validation', () => {
  test('Should validate valid supplier data', () => {
    const validSupplier = {
      name: 'Apple',
    };

    const { error } = supplierValidationSchema.validate(validSupplier);
    expect(error).toBeUndefined();
  });

  test('Should validate valid supplier data with all optional fields', () => {
    const validSupplier = {   
        name: 'Apple',
        website: 'https://apple.com',
        address: true,
        addressLine1: '123 Main Street',
        addressLine2: 'Suite 100',
        city: 'Rexburg',
        state: 'ID',
        zip: '83440',
        email: 'contact@apple.com',
        phone: '123-456-7890',
    };

    const { error } = supplierValidationSchema.validate(validSupplier);
    expect(error).toBeUndefined();
  });

  test('Should reject supplier without required name', () => {
    const invalidSupplier = {
      website: 'https://apple.com',
      address: true,
      addressLine1: '123 Apple Street',
      addressLine2: 'Suite 100',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014',
    };

    const { error } = supplierValidationSchema.validate(invalidSupplier);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject supplier with name too short', () => {
    const invalidSupplier = {
      name: 'A', // needs to be at least 2
      website: 'https://apple.com',
    };

    const { error } = supplierValidationSchema.validate(invalidSupplier);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject supplier with name too long', () => {
    const supplierLongName = 'A'.repeat(101); // needs to be at most 100
    const invalidSupplier = {
      name: supplierLongName,
      website: 'https://apple.com',
      address: true,
      addressLine1: '123 Main Street',
      addressLine2: 'Suite 100',
      city: 'Rexburg',
      state: 'ID',
      zip: '83440',
    };

    const { error } = supplierValidationSchema.validate(invalidSupplier);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  describe('Supplier Parameter Validation', () => {
    test('Should validate valid supplierId', () => {
      const validSupplierId = {
        supplierId: 123
      };

      const { error } = supplierIdValidationSchema.validate(validSupplierId);
      expect(error).toBeUndefined();
    });

    test('Should reject invalid supplierId', () => {
      const invalidSupplierId = {
        supplierId: 'Apple'
      };

      const { error } = supplierIdValidationSchema.validate(invalidSupplierId);
      expect(error).toBeDefined();
      expect(error?.message).toContain('supplierId');
    });
  });

});
