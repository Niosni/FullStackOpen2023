const Total = ({course}) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <strong>Total of {totalExercises} exercises</strong>
        </div>
    )
}

export default Total