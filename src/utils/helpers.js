export const levels = [
    { id: 1, name: 'L1', description: 'First Year' },
    { id: 2, name: 'L2', description: 'Second Year' },
    { id: 3, name: 'L3', description: 'Third Year' }
]
export const specialities = [
    { id: 1, name: 'WDIT', description: 'Web Digital and IT' },
    { id: 2, name: 'HR', description: 'Human Resources' },
    { id: 3, name: 'ACC', description: 'Accountancy' },
    { id: 3, name: 'BAF', description: 'Banking' },
    { id: 3, name: 'LAT', description: 'Logistics and Transport' },
]
export const sports = [
    { id: 1, name: 'Football', description: 'Football sport', individual: false },
    { id: 2, name: 'Basketball', description: 'Basketball sport', individual: false },
    { id: 3, name: 'Tennis', description: 'Tennis sport', individual: false },
    { id: 4, name: 'Swimming', description: 'Swimming', individual: false },
]

export const users = [
    { id: 1, username: 'John Doe', role: 'Administration', language: 'English', password: 'password123', defaultTheme: 'light' },
    { id: 2, username: 'Jane Smith', role: 'Student', language: 'French', password: 'password456', defaultTheme: 'light' },
    { id: 3, username: 'Alice Johnson', role: 'Teacher', language: 'French', password: 'password789', defaultTheme: 'dark' },
    { id: 4, username: 'Bob Brown', role: 'Student', language: 'English', password: 'password321', defaultTheme: 'dark' },
]

export const athletes = [
    { id: 1, name: 'Michael jordan', gender: 'Male', age: 30, levelID: 3, specialityID: 1, enrolledsports: [1, 2] },
    { id: 2, name: 'Serena Williams', gender: 'Female', age: 28, levelID: 3, specialityID: 1, enrolledsports: [3] },
    { id: 3, name: 'Usain Bolt', gender: 'Male', age: 32, levelID: 3, specialityID: 1, enrolledsports: [4] },
    { id: 4, name: 'LeBron James', gender: 'Male', age: 35, levelID: 3, specialityID: 1, enrolledsports: [4] },
    { id: 5, name: 'Lionel Messi', gender: 'Male', age: 33, levelID: 3, specialityID: 1, enrolledsports: [1] },
]