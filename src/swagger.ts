export default {
  openapi: '3.0.0',
  info: {
    title: 'StockFile API',
    version: '1.0.0',
    description: 'A REST API for managing StockFile inventory information',
  },
  servers: [
    {
      url: 'https://stockfile.onrender.com',
      description: 'Production',
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/auth/logout': {
      post: {
        summary: 'Logout from user account',
        operationId: 'logoutUser',
        tags: ['Authentication'],
        security: [{ sessionAuth: [] }],
        responses: {
          '200': {
            description: 'User logged out successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'User logged out successfully' },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '500': {
            description: 'Error logging out',
          },
        },
      },
    },
    '/auth/oauth/github': {
      get: {
        summary: 'Initiate GitHub OAuth login',
        description: 'Redirects the user to GitHub for authentication. No request body required.',
        tags: ['Authentication'],
        responses: {
          '302': {
            description: 'Redirect to GitHub for authentication',
          },
        },
      },
    },
    '/auth/oauth/github/callback': {
      get: {
        summary: 'GitHub OAuth callback',
        description:
          'Handles the OAuth callback from GitHub, creates a session, and returns a success message. This route is called by GitHub after user authentication.',
        tags: ['Authentication'],
        responses: {
          '200': {
            description: 'Successfully authenticated with GitHub',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Successfully authenticated with GitHub' },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Authentication failed',
          },
          '500': {
            description: 'Error during authentication',
          },
        },
      },
    },
    '/items': {
      get: {
        summary: 'Get all items',
        operationId: 'getAllItems',
        tags: ['Items'],
        security: [{ sessionAuth: [] }],
        responses: {
          '200': {
            description: 'List of all items found in the database',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Item',
                  },
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '404': {
            description: 'No items found in the database',
          },
          '500': {
            description: 'Error fetching items',
          },
        },
      },
      post: {
        summary: 'Create a new item',
        operationId: 'createItem',
        tags: ['Items'],
        security: [{ sessionAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ItemInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Item created successfully',
          },
          '400': {
            description: 'Request body is required',
          },
          '409': {
            description: 'Item with ID already exists',
          },
          '500': {
            description: 'Error creating item',
          },
        },
      },
    },
    '/items/{itemId}': {
      get: {
        summary: 'Get an item by ID',
        operationId: 'getItemById',
        tags: ['Items'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'itemId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the item',
          },
        ],
        responses: {
          '200': {
            description: 'Item found in the database',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Item',
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '400': {
            description: 'Item ID is required.',
          },
          '404': {
            description: 'Item not found with the given ID',
          },
          '500': {
            description: 'Error fetching item',
          },
        },
      },
      put: {
        summary: 'Update an item',
        operationId: 'updateItem',
        tags: ['Items'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'itemId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the item',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ItemInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '400': {
            description: 'Item ID is required',
          },
          '404': {
            description: 'Item not found with the given ID',
          },
          '500': {
            description: 'Error updating item',
          },
        },
      },
      delete: {
        summary: 'Delete an item',
        operationId: 'deleteItem',
        tags: ['Items'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'itemId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the item',
          },
        ],
        responses: {
          '200': {
            description: 'Item deleted successfully',
          },
          '400': {
            description: 'Item ID is required',
          },
          '404': {
            description: 'Item not found with the given ID',
          },
          '500': {
            description: 'Error deleting item',
          },
        },
      },
    },
    '/categories': {
      get: {
        summary: 'Get all categories',
        operationId: 'getAllCategories',
        tags: ['Categories'],
        security: [{ sessionAuth: [] }],
        responses: {
          '200': {
            description: 'List of all categories found in the database',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Category',
                  },
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '404': {
            description: 'No categories found in the database',
          },
          '500': {
            description: 'Error fetching categories',
          },
        },
      },
      post: {
        summary: 'Create a new category',
        operationId: 'createCategory',
        tags: ['Categories'],
        security: [{ sessionAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoryInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Category created successfully',
          },
          '400': {
            description: 'Request body is required',
          },
          '409': {
            description: 'Category with ID already exists',
          },
          '500': {
            description: 'Error creating category',
          },
        },
      },
    },
    '/categories/{categoryId}': {
      get: {
        summary: 'Get a category by ID',
        operationId: 'getCategoryById',
        tags: ['Categories'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'categoryId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the category',
          },
        ],
        responses: {
          '200': {
            description: 'Category found in the database',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category',
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '400': {
            description: 'Category ID is required',
          },
          '404': {
            description: 'Category not found with the given ID',
          },
          '500': {
            description: 'Error fetching category',
          },
        },
      },
      put: {
        summary: 'Update a category',
        operationId: 'updateCategory',
        tags: ['Categories'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'categoryId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the category',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoryInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '400': {
            description: 'Category ID is required',
          },
          '404': {
            description: 'Category not found with the given ID',
          },
          '500': {
            description: 'Error updating category',
          },
        },
      },
      delete: {
        summary: 'Delete a category',
        operationId: 'deleteCategory',
        tags: ['Categories'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'categoryId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the category',
          },
        ],
        responses: {
          '200': {
            description: 'Category deleted successfully',
          },
          '400': {
            description: 'Category ID is required',
          },
          '404': {
            description: 'Category not found with the given ID',
          },
          '500': {
            description: 'Error deleting category',
          },
        },
      },
    },
    '/locations': {
      get: {
        summary: 'Get all locations',
        operationId: 'getAllLocations',
        tags: ['Locations'],
        security: [{ sessionAuth: [] }],
        responses: {
          '200': {
            description: 'List of all locations found in the database',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Location',
                  },
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '404': {
            description: 'No locations found in the database',
          },
          '500': {
            description: 'Error fetching locations',
          },
        },
      },
      post: {
        summary: 'Create a new location',
        operationId: 'createLocation',
        tags: ['Locations'],
        security: [{ sessionAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LocationInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Location created successfully',
          },
          '400': {
            description: 'Request body is required',
          },
          '409': {
            description: 'Location with ID already exists',
          },
          '500': {
            description: 'Error creating location',
          },
        },
      },
    },
    '/locations/{locationId}': {
      get: {
        summary: 'Get a location by ID',
        operationId: 'getLocationById',
        tags: ['Locations'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'locationId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the location',
          },
        ],
        responses: {
          '200': {
            description: 'Location found in the database',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Location',
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '400': {
            description: 'Location ID is required',
          },
          '404': {
            description: 'Location not found with the given ID',
          },
          '500': {
            description: 'Error fetching location',
          },
        },
      },
      put: {
        summary: 'Update a location',
        operationId: 'updateLocation',
        tags: ['Locations'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'locationId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the location',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LocationInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '400': {
            description: 'Location ID is required',
          },
          '404': {
            description: 'Location not found with the given ID',
          },
          '500': {
            description: 'Error updating location',
          },
        },
      },
      delete: {
        summary: 'Delete a location',
        operationId: 'deleteLocation',
        tags: ['Locations'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'locationId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The unique identifier for the location',
          },
        ],
        responses: {
          '200': {
            description: 'Location deleted successfully',
          },
          '400': {
            description: 'Location ID is required',
          },
          '404': {
            description: 'Location not found with the given ID',
          },
          '500': {
            description: 'Error deleting location',
          },
        },
      },
    },
    '/suppliers': {
      get: {
        summary: 'Get all suppliers',
        operationId: 'getAllSuppliers',
        tags: ['Suppliers'],
        security: [{ sessionAuth: [] }],
        responses: {
          '200': {
            description: 'List of all suppliers found in the database',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Returned all suppliers. Total Count: 5.' },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Supplier',
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '404': {
            description: 'No suppliers found in the database',
          },
          '500': {
            description: 'Error fetching suppliers',
          },
        },
      },
      post: {
        summary: 'Create a new supplier',
        operationId: 'createSupplier',
        tags: ['Suppliers'],
        security: [{ sessionAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SupplierInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Supplier created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'New supplier created.' },
                    data: {
                      $ref: '#/components/schemas/Supplier',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Request body is required',
          },
          '409': {
            description: 'Supplier with ID already exists',
          },
          '500': {
            description: 'Error creating supplier',
          },
        },
      },
    },
    '/suppliers/{supplierId}': {
      get: {
        summary: 'Get a supplier by ID',
        operationId: 'getSupplierById',
        tags: ['Suppliers'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'supplierId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'The unique identifier for the supplier',
          },
        ],
        responses: {
          '200': {
            description: 'Supplier found in the database',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Located supplier with ID 1.' },
                    data: {
                      $ref: '#/components/schemas/Supplier',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Please login first',
          },
          '400': {
            description: 'Supplier ID is required',
          },
          '404': {
            description: 'Supplier not found with the given ID',
          },
          '500': {
            description: 'Error fetching supplier',
          },
        },
      },
      put: {
        summary: 'Update a supplier',
        operationId: 'updateSupplier',
        tags: ['Suppliers'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'supplierId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'The unique identifier for the supplier',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SupplierInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '400': {
            description: 'Supplier ID is required',
          },
          '404': {
            description: 'Supplier not found with the given ID',
          },
          '500': {
            description: 'Error updating supplier',
          },
        },
      },
      delete: {
        summary: 'Delete a supplier',
        operationId: 'deleteSupplier',
        tags: ['Suppliers'],
        security: [{ sessionAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'supplierId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'The unique identifier for the supplier',
          },
        ],
        responses: {
          '200': {
            description: 'Supplier deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Supplier with ID 1 was deleted.' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Supplier ID is required',
          },
          '404': {
            description: 'Supplier not found with the given ID',
          },
          '500': {
            description: 'Error deleting supplier',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      sessionAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid',
        description: 'Session cookie for authentication',
      },
      githubOAuth: {
        type: 'oauth2',
        description: 'GitHub OAuth 2.0 authentication flow',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            tokenUrl: 'https://github.com/login/oauth/access_token',
            scopes: {
              'user:email': 'Access user email address from GitHub profile',
            },
          },
        },
      },
    },
    schemas: {
      Item: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the item',
            example: '507f1f77bcf86cd799439011',
          },
          itemId: {
            type: 'number',
            description: 'The auto-incremented item ID',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'The name of the item',
            example: 'Laptop',
          },
          categoryId: {
            type: 'string',
            description: 'The category ID of the item',
            example: '507f1f77bcf86cd799439012',
            nullable: true,
          },
          supplierId: {
            type: 'string',
            description: 'The supplier ID of the item',
            example: '507f1f77bcf86cd799439013',
            nullable: true,
          },
          locationId: {
            type: 'string',
            description: 'The location ID where the item is stored',
            example: '507f1f77bcf86cd799439014',
            nullable: true,
          },
          purchaseDate: {
            type: 'string',
            format: 'date',
            description: 'The date when the item was purchased',
            example: '2025-06-25',
            nullable: true,
          },
          quantity: {
            type: 'number',
            description: 'The quantity of the item',
            example: 5,
          },
          price: {
            type: 'number',
            description: 'The price of the item',
            example: 899.99,
            nullable: true,
          },
          imageUrl: {
            type: 'string',
            description: 'The URL of the item image',
            example: 'https://example.com/laptop.jpg',
            nullable: true,
          },
          SerialNumber: {
            type: 'string',
            description: 'The serial number of the item',
            example: 'SN123456789',
            nullable: true,
          },
          warranty: {
            type: 'boolean',
            description: 'Whether the item has warranty',
            example: true,
          },
          expiration: {
            type: 'boolean',
            description: 'Whether the item has expiration',
            example: false,
            nullable: true,
          },
          expirationDate: {
            type: 'string',
            format: 'date-time',
            description: 'The expiration date of the item',
            example: '2025-06-25T10:30:00Z',
            nullable: true,
          },
          warrantyDate: {
            type: 'string',
            format: 'date-time',
            description: 'The warranty expiration date',
            example: '2026-01-15T10:30:00Z',
            nullable: true,
          },
          notes: {
            type: 'string',
            description: 'Additional notes about the item',
            example: 'High-performance laptop for development',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the item was created',
            example: '2025-06-25T10:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the item was last updated',
            example: '2025-06-25T10:30:00Z',
          },
        },
      },
      ItemInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the item',
            example: 'Macbook Air M2',
          },
          categoryId: {
            type: 'string',
            description: 'The category ID of the item',
            example: '2',
            nullable: true,
          },
          supplierId: {
            type: 'string',
            description: 'The supplier ID of the item',
            example: '6',
            nullable: true,
          },
          locationId: {
            type: 'string',
            description: 'The location ID where the item is stored',
            example: '2',
            nullable: true,
          },
          purchaseDate: {
            type: 'string',
            format: 'date',
            description: 'The date when the item was purchased',
            example: '2025-06-25',
            nullable: true,
          },
          quantity: {
            type: 'number',
            description: 'The quantity of the item',
            example: 1,
          },
          price: {
            type: 'number',
            description: 'The price of the item',
            example: 899.99,
            nullable: true,
          },
          imageUrl: {
            type: 'string',
            description: 'The URL of the item image.',
            nullable: true,
          },
          SerialNumber: {
            type: 'string',
            description: 'The serial number of the item',
            example: 'NN123456789',
            nullable: true,
          },
          warranty: {
            type: 'boolean',
            description: 'Does the item have a warranty?',
            example: true,
          },
          expiration: {
            type: 'boolean',
            description: 'Does the item have an expiration date?',
            example: false,
            nullable: true,
          },
          expirationDate: {
            type: 'string',
            format: 'date',
            description: 'The expiration date of the item',
            example: '2025-06-25',
            nullable: true,
          },
          warrantyDate: {
            type: 'string',
            format: 'date',
            description: 'The warranty expiration date.',
            example: '2026-06-25',
            nullable: true,
          },
          notes: {
            type: 'string',
            description: 'Additional notes about the item.',
            example: 'This is the old laptop, has photos of the cat.',
            nullable: true,
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the category from the db',
            example: '507f1f77bcf86cd799439012',
          },
          categoryId: {
            type: 'string',
            description: 'The unique identifier for the category',
            example: '2',
          },
          name: {
            type: 'string',
            description: 'The name of the category',
            example: 'Electronics',
          },
          description: {
            type: 'string',
            description: 'Additional notes about the category',
            example: 'All electronic devices and accessories',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the category was created',
            example: '2025-06-25T10:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the category was last updated',
            example: '2025-06-25T10:30:00Z',
          },
        },
      },
      CategoryInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the category',
            example: 'Electronics',
          },
          description: {
            type: 'string',
            description: 'Additional notes about the category',
            example: 'All electronic devices and accessories',
            nullable: true,
          },
        },
      },
      Location: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the location from the db',
            example: '507f1f77bcf86cd799439014',
          },
          locationId: {
            type: 'string',
            description: 'The unique identifier for the location',
            example: '1',
          },
          name: {
            type: 'string',
            description: 'The name of the location',
            example: 'Office - Desk',
          },
          description: {
            type: 'string',
            description: 'Description of the location',
            example: 'This is the desk where I work.',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the location was created',
            example: '2025-06-25T10:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the location was last updated',
            example: '2025-06-25T10:30:00Z',
          },
        },
      },
      LocationInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the location',
            example: 'Office - Desk',
          },
          description: {
            type: 'string',
            description: 'Description of the location',
            example: 'This is the desk where I work.',
          },
        },
      },
      Supplier: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the supplier from the db',
            example: '12311413123123',
          },
          supplierId: {
            type: 'number',
            description: 'The auto-incremented supplier ID',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'The name of the supplier',
            example: 'Apple',
          },
          website: {
            type: 'string',
            description: 'The website of the supplier',
            example: 'https://apple.com',
            nullable: true,
          },
          address: {
            type: 'boolean',
            description: 'Whether the supplier has an address',
            example: true,
          },
          addressLine1: {
            type: 'string',
            description: 'The first line of the supplier address',
            example: '123 Apple Street',
            nullable: true,
          },
          addressLine2: {
            type: 'string',
            description: 'The second line of the supplier address',
            example: 'Suite 100',
            nullable: true,
          },
          city: {
            type: 'string',
            description: 'The city of the supplier',
            example: 'Rexburg',
            nullable: true,
          },
          state: {
            type: 'string',
            description: 'The state of the supplier',
            example: 'ID',
            nullable: true,
          },
          zip: {
            type: 'string',
            description: 'The zip code of the supplier',
            example: '83440',
            nullable: true,
          },
          country: {
            type: 'string',
            description: 'The country of the supplier',
            example: 'United States',
            nullable: true,
          },
          email: {
            type: 'string',
            description: 'The email of the supplier',
            example: 'contact@apple.com',
            nullable: true,
          },
          phone: {
            type: 'string',
            description: 'The phone number of the supplier',
            example: '+1-888-123-4232',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the supplier was created',
            example: '2025-06-25T10:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the supplier was last updated',
            example: '2025-06-25T10:30:00Z',
          },
        },
      },
      SupplierInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the supplier',
            example: 'Apple',
          },
          website: {
            type: 'string',
            description: 'The website of the supplier',
            example: 'https://apple.com',
            nullable: true,
          },
          address: {
            type: 'boolean',
            description: 'Whether the supplier has an address',
            example: true,
          },
          addressLine1: {
            type: 'string',
            description: 'The first line of the supplier address',
            example: '123 Apple Street',
            nullable: true,
          },
          addressLine2: {
            type: 'string',
            description: 'The second line of the supplier address',
            example: 'Suite 100',
            nullable: true,
          },
          city: {
            type: 'string',
            description: 'The city of the supplier',
            example: 'Rexburg',
            nullable: true,
          },
          state: {
            type: 'string',
            description: 'The state of the supplier',
            example: 'ID',
            nullable: true,
          },
          zip: {
            type: 'string',
            description: 'The zip code of the supplier',
            example: '83440',
            nullable: true,
          },
          country: {
            type: 'string',
            description: 'The country of the supplier',
            example: 'United States',
            nullable: true,
          },
          email: {
            type: 'string',
            description: 'The email of the supplier',
            example: 'contact@apple.com',
            nullable: true,
          },
          phone: {
            type: 'string',
            description: 'The phone number of the supplier',
            example: '+1-888-123-4232',
            nullable: true,
          },
        },
      },
    },
  },
};
