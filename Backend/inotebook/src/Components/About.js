
import React from 'react'

export const About = (props) => {
    let myStyle = {
        color: props.mode === 'dark' ? 'white' : '#48599a',
        backgroundColor: props.mode === 'dark' ? '#48599a' : 'dark'
    }
    return (
        <div style={myStyle}>
            <h2>This is About </h2>
            <p>This is the iNotebook app where you can store your notes on cloud</p>
        </div>
    )
}
export default About
