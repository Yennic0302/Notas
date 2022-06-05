'use strict'

const IDBRequest = indexedDB.open('Notas', 2)


IDBRequest.addEventListener('success', e=>{
    console.log('la base de datos esta abierta')
    readObjects()

})

IDBRequest.addEventListener('upgradeneeded', e=>{
    let db = IDBRequest.result
    db.createObjectStore("nota",{
    autoIncrement: true})
})

IDBRequest.addEventListener('error', e=>{
    console.log(e)
})


const getIDBData = (mode,msg)=>{
    const db = IDBRequest.result;
    const transaccion = db.transaction('nota',mode)
    const objectStore = transaccion.objectStore('nota')
    transaccion.addEventListener('complete',()=>{
        console.log(msg)
    })
    return objectStore;
}

const addObject = (obj)=>{
    const data = getIDBData('readwrite','se agrego la nota')
    data.add(obj)
}

const readObjects = ()=>{
    const data = getIDBData('readonly')
    const cursor = data.openCursor()
    document.querySelector('.notes-radys').innerHTML = ''
    const fragment = document.createDocumentFragment()
    cursor.addEventListener('success',()=>{
        if(cursor.result){
            let elemento = createElementNote(cursor.result.key,cursor.result.value.Titulo,cursor.result.value.Content)
            fragment.appendChild(elemento)
            cursor.result.continue()
        }else document.querySelector('.notes-radys').appendChild(fragment)
    })
}

const modifiObject = (key,obj) =>{
    const data = getIDBData('readwrite','objeto modificado correctamente')
    data.put(obj,key)
}

const deleteObject = (key) =>{
    const data = getIDBData('readwrite','objeto eliminado correctamente')
    data.delete(key)
}


const btnSave = document.getElementById('save')
btnSave.addEventListener('click',()=>{
    const titleNote = document.getElementById('title')
    const contentNote = document.getElementById('content')
    let Titulo = titleNote.value
    let content = contentNote.value

    let obj = {Titulo: Titulo, Content: content}
    addObject(obj)
    readObjects()
    creatingNote.style.opacity = "0"
    setTimeout(()=>{creatingNote.style.visibility = "hidden"},500)
    titleNote.value = ''
    contentNote.value = ''
})


