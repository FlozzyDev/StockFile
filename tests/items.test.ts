import { itemValidationSchema, itemIdValidationSchema } from '../src/validation/item.validation';

describe('Item Validation', () => {
  test('Should validate valid item data', () => {
    const validItem = {
      name: 'Can of chili',
      quantity: 5
    };

    const { error } = itemValidationSchema.validate(validItem);
    expect(error).toBeUndefined();
  });

  test('Should reject item without required name', () => {
    const invalidItem = {
      quantity: 5
    };

    const { error } = itemValidationSchema.validate(invalidItem);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject item with invalid quantity', () => {
    const invalidItem = {
      name: 'Can of chili',
      quantity: -1
    };

    const { error } = itemValidationSchema.validate(invalidItem);
    expect(error).toBeDefined();
    expect(error?.message).toContain('quantity');
  });

  test('Should reject item with name too short', () => {
    const invalidItem = {
      name: 'A', // needs to be at least 2
      quantity: 5
    };

    const { error } = itemValidationSchema.validate(invalidItem);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject item with name too long', () => {
    const longName = 'A'.repeat(101); // needs to be at most 100
    const invalidItem = {
      name: longName,
      quantity: 5
    };

    const { error } = itemValidationSchema.validate(invalidItem);
    expect(error).toBeDefined();
    expect(error?.message).toContain('name');
  });

  test('Should reject item with negative price', () => {
    const invalidItem = {
      name: 'Can of chili',
      quantity: 5,
      price: -10.50
    };

    const { error } = itemValidationSchema.validate(invalidItem);
    expect(error).toBeDefined();
    expect(error?.message).toContain('price');
  });

  test('Should validate item with all optional fields', () => {
    const completeItem = {
      name: 'Laptop',
      quantity: 1,
      categoryId: '1',
      supplierId: '1',
      locationId: '1',
      purchaseDate: '2024-01-15',
      price: 799.99,
      imageUrl: 'Base64string123123123',
      SerialNumber: 'SN123456789',
      warranty: true,
      expiration: false,
      expirationDate: "",
      warrantyDate: '2027-01-15',
      notes: 'A laptop with pictures of my old dog John'
    };

    const { error } = itemValidationSchema.validate(completeItem);
    expect(error).toBeUndefined();
  });

  test('Should reject item with invalid categoryId', () => {
    const completeItem = {
      name: 'Laptop',
      quantity: 1,
      categoryId: 'Electronics',
      supplierId: '1',
      locationId: '1',
      purchaseDate: '2024-01-15',
      price: 799.99,
      imageUrl: 'Base64string123123123',
      SerialNumber: 'SN123456789',
      warranty: true,
      expiration: false,
      expirationDate: "",
      warrantyDate: '2027-01-15',
      notes: 'A laptop with pictures of my old dog John'
    };

    const { error } = itemValidationSchema.validate(completeItem);
    expect(error).toBeDefined();
    expect(error?.message).toContain('categoryId');
  });

  

  test('Should reject item with invalid locationId', () => {
    const completeItem = {
      name: 'Laptop',
      quantity: 1,
      categoryId: '1',
      supplierId: '1',
      locationId: 'Pantry',
      purchaseDate: '2024-01-15',
      price: 799.99,
      imageUrl: 'Base64string123123123',
      SerialNumber: 'SN123456789',
      warranty: true,
      expiration: false,
      expirationDate: "",
      warrantyDate: '2027-01-15',
      notes: 'A laptop with pictures of my old dog John'
    };

    const { error } = itemValidationSchema.validate(completeItem);
    expect(error).toBeDefined();
    expect(error?.message).toContain('locationId');
  });

  describe('Item Parameter Validation', () => {
    test('Should validate valid itemId', () => {
      const validItemId = {
        itemId: 123
      };

      const { error } = itemIdValidationSchema.validate(validItemId);
      expect(error).toBeUndefined();
    });

    test('Should reject invalid itemId', () => {
      const invalidItemId = {
        itemId: 'Laptop'
      };

      const { error } = itemIdValidationSchema.validate(invalidItemId);
      expect(error).toBeDefined();
      expect(error?.message).toContain('itemId');
    });
  });

});
