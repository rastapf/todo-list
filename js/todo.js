window.addEventListener('load', function () {
    const taskInput = document.querySelector('#novaTarefa')
    const addButton = document.querySelector('#add')
    const boardDiv = document.querySelector('#board')
    let taskList = []

    if(typeof localStorage.taskList !== 'undefined') {
        taskList = JSON.parse(localStorage.taskList)
    }

    taskList.forEach(task => {
        addTask(task, false)
    });

    addButton.addEventListener('click', addTask)
    taskInput.addEventListener('keyup', (event) => {
        if(event.keyCode === 13) {
            addTask()
        }
    })

    boardDiv.addEventListener('click', (event) => {
        if(event.target.id != "board"){
            const targetClasses = event.target.classList
            for(let i = 0; i < targetClasses.length; i++) {
                let taskValue = ""
                if(targetClasses[i] == "checkmark") {
                    taskValue = event.target.previousElementSibling.innerHTML                   
                } else if(targetClasses[i] == "icon") {
                    taskValue = event.target.parentElement.previousElementSibling.innerHTML
                }

                if(taskValue != "") {                                
                    for(let j = 0; j < taskList.length; j++) {
                        if(taskList[j] == taskValue) {
                            taskList.splice(j, 1)
                            localStorage.taskList = JSON.stringify(taskList)
                            event.target.closest('.tarefa').remove()
                            return
                        }
                    }
                }
            }
        }
    })

    function addTask(text = "", save = true) {
        if(text == "") {
            text = taskInput.value
        }

        if(text.trim() != "") {
            boardDiv.innerHTML += `
                <div class="tarefa">
                    <div class="col-md-8 taskValue">${text}</div>
                    <div class="col-md-2 checkmark"><img class="icon" src="img/check.png"></div>
                </div>
            `
            if(save === false) {
                return
            }

            taskList.push(text)
            localStorage.taskList = JSON.stringify(taskList)
            taskInput.value = ""
            taskInput.style.borderColor = 'black'
            return;
        } else {
            alert("Descrição da tarefa não pode estar vazia")
            taskInput.style.borderColor = 'red'
            return;
        }
    }
})