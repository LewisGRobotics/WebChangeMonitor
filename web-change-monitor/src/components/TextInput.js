const TextInput = ({setText, defaultText, onEnter}) => {
    
    const keydown = (key) =>{
        if(key === 'Enter') onEnter();
    }
    return (
        <input className="TextInput" type="Text" maxLength="100" defaultValue={defaultText} onChange={(e) => setText(e.target.value)} onKeyDown={(e) =>keydown(e.key)}/>
    )
}

export default TextInput
