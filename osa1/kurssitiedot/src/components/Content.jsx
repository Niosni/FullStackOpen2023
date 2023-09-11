import Part from "./Part";

const Content = ({course}) => {
    return (
        <>
            {course.parts.map(part => 
                <Part key={part.name} part={part}/>
            )}
        </>
    )
}

export default Content
