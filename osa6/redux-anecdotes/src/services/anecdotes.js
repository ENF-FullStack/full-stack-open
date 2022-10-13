import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async (id) => {
    const response = await axios.get(baseUrl)
    const anecdoteToChange = response.data.find(n => n.id === id)
    const content = anecdoteToChange.content
    const votes = anecdoteToChange.votes + 1
    const newObject = { content: content, votes: votes }

    let url = baseUrl + '/' +id
    const updatedAnecdote = await axios.put(url, newObject)
    return updatedAnecdote
}

export default { getAll, createNew, vote }