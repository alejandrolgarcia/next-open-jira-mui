
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending - Cillum et culpa adipisicing nulla veniam veniam consequat.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In-progress - Et sint laboris irure voluptate deserunt.',
            status: 'in-progress',
            createdAt: Date.now()-1000000
        },
        {
            description: 'Finished - Minim excepteur ex tempor nostrud officia.',
            status: 'finished',
            createdAt: Date.now()-100000
        }
    ]
}