btnAdicionar = document.querySelector('#adicionar')
btnLimpar = document.querySelector('#limpar')
listaAlunos = document.querySelector('#listaAlunos')
mensagemErro = document.querySelector('#mensagemErro')

const alunos = []

adicionarElementos()

btnLimpar.addEventListener('click', (e) => {
    e.preventDefault()
    limparDados()
})

btnAdicionar.addEventListener('click', (e) =>{
    e.preventDefault()
    adicionarAluno()
})

function adicionarAluno(){
    let nome = prompt('Adicione o nome e sobrenome do aluno ->')
    let id = prompt('Adicione o ID do aluno [99999] ->')
    let nota1 = Number(prompt('Adicione a nota do primeiro trimestre do aluno ->'))
    let nota2 = Number(prompt('Adicione a nota do segundo trimestre do aluno ->'))
    let nota3 = Number(prompt('Adicione a nota do terceiro trimestre do aluno ->'))

    let situacao;
    const regexID = /^\d{5}$/
    const media = (nota1+nota2+nota3)/3
    if(media >=6){
        situacao = 'Aprovado'
    }else{
        situacao = 'Reprovado'
    }

    if(regexID.test(id)){
        alert('ID VÁLIDO')
    }else{
        throw Error('ID INVÁLIDO')
        mensagemErro.textContent = "ID INVÁLIDO"
    }

    const novoAluno = {
        nome : nome,
        ID: id,
        media: media,
        situacao: situacao
    };

    alunos.unshift(novoAluno)
    adicionarElementos(nome,id,media,situacao)
}

function adicionarElementos(nome,id,media,situacao){
    listaAlunos.innerHTML = "";
    alunos.forEach((aluno,index) =>{
        const novoAluno = document.createElement('li')
        novoAluno.innerHTML = `<h1>Nome: ${aluno.nome}</h1>
                            <p>ID: ${aluno.ID}</p>
                            <p>Média: ${aluno.media}</p>
                            <p>Situação: ${aluno.situacao}</p>
                            <button onclick ="editarAluno(${index})">Editar</button>
                            <button onclick ="apagarAluno(${index})">Apagar</button>
                            `
        listaAlunos.appendChild(novoAluno)
        localStorage.setItem(`ALUNO_${nome}`, `Nome: ${nome},ID: ${id},MÉDIA :${media},SITUAÇÃO: ${situacao}`)
    })
}

function limparDados(){
    listaAlunos.innerHTML = ''
    localStorage.clear()
}


function editarAluno(){

}

function apagarAluno(){

}