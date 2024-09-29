export default class Environment{
    public static readonly getDomain=(): string =>{
        const PORT= process.env['PORT'] ?? 4000
        const HOST= process.env['HOST'] ?? 'localhost'
        const PROTOCOL= process.env['PROTOCOL'] ?? 'http'

        return(`${PROTOCOL}://${HOST}:${PORT}`)
    }
    
    public static readonly getDomainInventory=(): string =>{
        const PORT= process.env['PORT'] ?? 4000
        const HOST= process.env['HOST'] ?? 'localhost'
        const PROTOCOL= process.env['PROTOCOL'] ?? 'http'

        return(`${PROTOCOL}://${HOST}:${5000}`)
    } 
}