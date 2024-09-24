import { useState } from 'react'

const getIndexOfBiggestValue = (values) => {
  if (values.length == 0) {
    return -1;
  }

  let index = 0;
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
      index = i;
    }
  }
  return index;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVote(newVotes)
  }

  let mostVotes = getIndexOfBiggestValue(votes)

    return(
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={handleVotes}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostVotes]}</p>
        <p>has {votes[mostVotes]} votes</p>
      </div>
    )
}

export default App