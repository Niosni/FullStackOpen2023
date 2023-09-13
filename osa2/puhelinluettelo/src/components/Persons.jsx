const Persons = ({personsToShow, removePerson}) => {
    return (
        <>
            {personsToShow.map(person => {
                return (
                <div className='person' key={person.name}>
                    <p>{person.name} {person.number}
                        <button onClick={() => removePerson(person.id, person.name)}>
                            delete
                        </button>
                    </p>
                </div>
                )
            }
            )}
        </>
    )
}

export default Persons