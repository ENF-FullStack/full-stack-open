const Person = ({ persons, search }) => {
    return (
        <div >
        {persons.filter(person => 
            person.name.toUpperCase().includes(search.toUpperCase())).map(persons => 
            <p key={persons.id}>{persons.name} {persons.number}</p> 
        )}
        </div>
    )
}

export default Person