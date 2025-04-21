const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class User {
  async createUser(data) {
    try {
      const user = await prisma.user.create({
        data,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, data) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new User();
