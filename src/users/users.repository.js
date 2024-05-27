const { prisma } = require('../../prisma/prisma-client');

const UsersRepository = {
    create: async ({ email, password, name, avatarUrl }) => {
        console.log(avatarUrl);
        return prisma.user.create({
            data: {
                email,
                password,
                name,
                avatarUrl: `uploads/${avatarUrl}`
            }
        });
    },
    find: async (email) => {
        return prisma.user.findUnique({ where: { email } });
    },
    findById: async (id) => {
        return prisma.user.findUnique({
            where: { id },
            include: {
                followers: true,
                following: true
            }
        });
    },
    isFollowing: async (id, userId) => {
        return await prisma.follows.findFirst({
            where: {
                AND: [
                    { followerId: userId },
                    { followingId: id }
                ]
            }
        });
    },
    getCurrentUser: async (userId) => {
        return prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                followers: {
                    include: {
                        follower: true
                    }
                },
                following: {
                    include: {
                        following: true
                    }
                }
            }
        });
    },
    update: async (userId, body, filePath) => {
        const { email, name, dateOfBirth, bio, location, } = body;

        return await prisma.user.update({
            where: { id: userId },
            data: {
                email: email || undefined,
                name: name || undefined,
                avatarUrl: filePath ? `/${filePath}` : undefined,
                dateOfBirth: dateOfBirth || undefined,
                bio: bio || undefined,
                location: location || undefined
            }
        });
    }
};

module.exports = UsersRepository;