const taskInput = document.querySelector('#novaTarefa')
    const addButton = document.querySelector('#add')
    const boardDiv = document.querySelector('#board')

    addButton.addEventListener('click', addTask)
    taskInput.addEventListener('keyup', (event) => {
        if(event.keyCode === 13) {
            addTask()
        }
    })

    boardDiv.addEventListener('click', (event) => {
        if(event.target.id != "board"){
            event.target.closest('.tarefa').remove()
        }
    })

    function addTask() {
        text = taskInput.value
        if(text.trim() != "") {
            boardDiv.innerHTML += `
                <div class="tarefa">
                    <div class="col-md-8">${text}</div>
                    <div class="col-md-2"><img class="icon" src="img/check.png"></div>
                </div>
            `
            taskInput.value = ""
            taskInput.style.borderColor = 'black'
            return;
        } else {
            alert("Descrição da tarefa não pode estar vazia")
            taskInput.style.borderColor = 'red'
            return;
        }
    }