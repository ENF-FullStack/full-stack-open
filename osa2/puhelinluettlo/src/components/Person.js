const Person = ({ persons, search, dP }) => {
    return (
        <div >
        {persons.filter(person => 
            person.name.toUpperCase().includes(search.toUpperCase())).map(persons => 
            <p key={persons.id}>{persons.name} {persons.number} 
            <button value={persons.id} onClick={dP}>delete</button></p> 
        )}
        </div>
    )
}

export default Person