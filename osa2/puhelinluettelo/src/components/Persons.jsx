const Persons = ({personsToShow, removePerson}) => {
    return (
        <>
            {personsToShow.map(person => {
                return (
                <div key={person.name}>
                    <p>{person.name} {person.number}
                        <button onClick={() => removePerson(person.id)}>
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