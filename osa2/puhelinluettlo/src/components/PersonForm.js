const PersonForm = ({ aP, name, number, hP, hN }) => {
    return (
    <form onSubmit={aP}>
        <div>
          name: <input 
                  value={name}
                  onChange={hP}
                /><br />
          number: <input
                    value={number}
                    onChange={hN}
                  />
          <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm