type HobbiesProps = {
    hob1: string
    hob2: string
    hob3: string
    hob4: string
}

function MisHobbies({ hob1, hob2, hob3,hob4 }: HobbiesProps) {
    return (
        <>
            <p>Mis Hobbies: </p>
            <p>-{hob1}</p>
            <p>-{hob2}</p>
            <p>-{hob3}</p>
            <p>-{hob4}</p>
        </>
    )
}
export default MisHobbies