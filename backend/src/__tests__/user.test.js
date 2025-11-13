// Basic Jest test for User model
import User from '../models/User.js';

describe('User Model', () => {
  it('should create a user with correct fields', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'sales',
    });
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('sales');
    await user.destroy();
  });
});
