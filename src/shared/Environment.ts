export default class Environment{

    public static readonly getDomain=(): string =>{
        const PORT= process.env['PORT'] ?? 4000
        const HOST=  '34.23.146.241'
        const PROTOCOL= process.env['PROTOCOL'] ?? 'http'

        return(`${PROTOCOL}://${HOST}`)
    }
    
    public static readonly getDomainInventory=(): string =>{
        const PORT=  5000
        const HOST=  'localhost'
        const PROTOCOL= process.env['PROTOCOL'] ?? 'http'

        return(`${PROTOCOL}://${HOST}:${PORT}`)
    } 

    public static readonly getDomainAdminInventory=(): string =>{
        const PORT=  6000
        const HOST= '34.23.21.25'
        const PROTOCOL= process.env['PROTOCOL'] ?? 'http'

        return(`${PROTOCOL}://${HOST}:${PORT}`)
    } 
}