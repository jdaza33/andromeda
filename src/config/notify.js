import global from './global'

export default (component, cod) => {

    let auxType = cod.split('')[0]
    let type = auxType == 'S' ? 'success' : auxType == 'W' ? 'warn' : 'error'
    let title = auxType == 'S' ? 'OK' : auxType == 'W' ? 'AVISO' : 'ERROR'
    let text = global[type][cod]
    
    component.$notify({
        group: 'notify',
        title, 
        type,
        text,
        speed: 800,
        duration: 2000,
        max: 5
    })
}