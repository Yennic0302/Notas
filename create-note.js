'use strict'

const btnOpen = document.querySelector('.add-note')
const btnClose = document.getElementById('close')
const creatingNote = document.querySelector('.container-crating-note')


btnOpen.addEventListener('click',()=>{
    creatingNote.style.opacity = "1"
    creatingNote.style.visibility = "visible"
})

btnClose.addEventListener('click',()=>{
    creatingNote.style.opacity = "0"
    setTimeout(()=>{creatingNote.style.visibility = "hidden"},500)
})


const createElementNote = (id,title,content)=>{
    const noteGrid = document.createElement('div')
    const exampleNote = document.createElement('div')
    const titleNote = document.createElement('h3')
    const contentNote = document.createElement('p')

    noteGrid.classList.add('note-grid')
    exampleNote.classList.add('example-note')
    titleNote.classList.add('title-note')
    contentNote.classList.add('content-note')

    titleNote.textContent = title
    contentNote.textContent= content

    noteGrid.appendChild(exampleNote)
    exampleNote.appendChild(titleNote)
    exampleNote.appendChild(contentNote)

    noteGrid.addEventListener('click',()=>{
        const readTitle = document.querySelector('.read-title-note')
        const readContent = document.querySelector('.read-content-note')
        const oneNoteFond = document.querySelector('.one-note-fond')
        readTitle.textContent = title
        readContent.textContent = content 

        readTitle.setAttribute('contenteditable', 'true')
        readTitle.setAttribute('spellcheck', 'false')

        readContent.setAttribute('contenteditable', 'true')
        readContent.setAttribute('spellcheck', 'false')

        const optionsEdit = document.querySelector('.options-edits')

        optionsEdit.style.visibility ='visible'
        readTitle.style.visibility ='visible'
        readContent.style.visibility ='visible'
        oneNoteFond.style.display = 'none'
        
        const btnSave = document.createElement('button')
        btnSave.classList.add('disabled')
        btnSave.textContent= 'Guardar'
        
        const btnDelete = document.createElement('button')
        btnDelete.classList.add('delete')
        btnDelete.textContent = 'Eliminar'

        readTitle.addEventListener('keyup',()=>{
            btnSave.classList.replace('disabled', 'enable')  
        })
        readContent.addEventListener('keyup',()=>{
            btnSave.classList.replace('disabled', 'enable')  
        })
        
        optionsEdit.innerHTML = ''
        optionsEdit.appendChild(btnSave)
        optionsEdit.appendChild(btnDelete)

        btnSave.addEventListener('click',()=>{
            if(btnSave.className == 'enable'){
                modifiObject(id,{Titulo: readTitle.textContent, Content: readContent.textContent})
                btnSave.classList.replace('enable', 'disabled')
                readObjects()
            }    
        })

        btnDelete.addEventListener('click',()=>{
            deleteObject(id)
            readObjects()
            readTitle.textContent = ''
            readContent.textContent = ''
        })
    })



    return noteGrid
}


